/**
 * Mẫu HTTP Client Interceptor chuẩn (Axios + TypeScript)
 * Áp dụng Chương 7 - Universal Standard v2.0:
 * - Single-Flight Refresh Token (Mutex khóa tránh gọi refresh trùng lặp khi 401)
 * - Chỉ tự động retry các request an toàn (GET/HEAD/OPTIONS)
 * - Chuẩn hóa lỗi trả về cho Form (400/422) và hiển thị traceId khi lỗi 5xx
 */
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

export interface ApiFieldError {
  field: string;
  code: string;
  message: string;
}

export interface NormalizedApiError {
  status: number;
  errorCode: string;
  message: string;
  errors: ApiFieldError[];
  traceId?: string;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const SAFE_RETRY_METHODS = new Set(['get', 'head', 'options']);
let isRefreshing = false;
let refreshSubscribers: Array<(newToken: string | null) => void> = [];

function onTokenRefreshed(newToken: string | null) {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (newToken: string | null) => void) {
  refreshSubscribers.push(callback);
}

export function createApiClient(options: {
  baseURL: string;
  getAccessToken: () => string | null;
  refreshAccessToken: () => Promise<string | null>;
  onAuthFailure: () => void;
  onNotifyError: (message: string) => void;
}): AxiosInstance {
  const client = axios.create({
    baseURL: options.baseURL,
    timeout: 15000,
    headers: { 'Content-Type': 'application/json' },
  });

  client.interceptors.request.use((config) => {
    const token = options.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => response.data,
    async (error: AxiosError<any>) => {
      const originalRequest = error.config as RetryableRequestConfig | undefined;

      // 1. Lỗi mạng / Timeout (không có response từ server)
      if (!error.response || !originalRequest) {
        const msg = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra đường truyền mạng.';
        options.onNotifyError(msg);
        return Promise.reject({
          status: 0,
          errorCode: 'ERR_NETWORK',
          message: msg,
          errors: [],
        } satisfies NormalizedApiError);
      }

      const { status, data } = error.response;
      const traceId: string | undefined = data?.traceId;

      // 2. Xử lý 401 Unauthorized với Single-Flight Refresh Token
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const newToken = await options.refreshAccessToken();
            isRefreshing = false;
            onTokenRefreshed(newToken);
            if (!newToken) {
              options.onAuthFailure();
              return Promise.reject(error);
            }
          } catch {
            isRefreshing = false;
            onTokenRefreshed(null);
            options.onAuthFailure();
            return Promise.reject(error);
          }
        }

        return new Promise((resolve, reject) => {
          addRefreshSubscriber((newToken) => {
            if (!newToken) {
              reject(error);
              return;
            }
            const method = (originalRequest.method || '').toLowerCase();
            // Chỉ tự động gọi lại request an toàn (Idempotent)
            if (SAFE_RETRY_METHODS.has(method)) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(client(originalRequest));
            } else {
              options.onNotifyError('Phiên làm việc vừa được làm mới. Vui lòng thực hiện lại thao tác.');
              reject(error);
            }
          });
        });
      }

      // 3. Chuẩn hóa đối tượng lỗi
      const normalized: NormalizedApiError = {
        status,
        errorCode: data?.errorCode || 'ERR_UNKNOWN',
        message: data?.message || 'Đã có lỗi xảy ra.',
        errors: Array.isArray(data?.errors) ? data.errors : [],
        traceId,
      };

      // 4. Thông báo tự động theo mã lỗi
      if (status === 403) {
        options.onNotifyError(normalized.message || 'Bạn không có quyền truy cập chức năng này.');
      } else if (status === 429) {
        options.onNotifyError('Bạn thao tác quá nhanh, vui lòng thử lại sau ít phút.');
      } else if (status >= 500) {
        const refCode = traceId ? ` (Mã hỗ trợ: ${traceId})` : '';
        options.onNotifyError(`Hệ thống đang gặp sự cố kỹ thuật${refCode}.`);
      } else if ((status === 400 || status === 422) && normalized.errors.length === 0) {
        // Lỗi nghiệp vụ chung không gắn với field cụ thể của Form
        options.onNotifyError(normalized.message);
      }

      return Promise.reject(normalized);
    }
  );

  return client;
}
