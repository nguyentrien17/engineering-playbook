/**
 * Mẫu triển khai Chuẩn hóa Exception & Global Error Handler (Tham chiếu TypeScript/Node.js)
 * Áp dụng cho Chương 5 & Chương 6 - Universal Standard v2.0
 */

export interface FieldErrorDetail {
  field: string;
  code: string;
  message: string;
}

export interface AppExceptionOptions {
  httpStatus: number;
  errorCode: string;
  message: string;
  errors?: FieldErrorDetail[];
  isOperational?: boolean;
  cause?: unknown;
}

export class AppException extends Error {
  public readonly httpStatus: number;
  public readonly errorCode: string;
  public readonly errors: FieldErrorDetail[];
  public readonly isOperational: boolean;

  constructor(options: AppExceptionOptions) {
    super(options.message);
    this.name = this.constructor.name;
    this.httpStatus = options.httpStatus;
    this.errorCode = options.errorCode;
    this.errors = options.errors ?? [];
    this.isOperational = options.isOperational ?? true;
    if (options.cause) {
      (this as { cause?: unknown }).cause = options.cause;
    }
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(errorCode: string, message: string, errors: FieldErrorDetail[] = []) {
    return new AppException({ httpStatus: 400, errorCode, message, errors });
  }

  static unauthorized(errorCode = 'ERR_UNAUTHORIZED', message = 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.') {
    return new AppException({ httpStatus: 401, errorCode, message });
  }

  static forbidden(errorCode = 'ERR_FORBIDDEN', message = 'Bạn không có quyền thực hiện thao tác này.') {
    return new AppException({ httpStatus: 403, errorCode, message });
  }

  static notFound(errorCode = 'ERR_NOT_FOUND', message = 'Không tìm thấy dữ liệu yêu cầu.') {
    return new AppException({ httpStatus: 404, errorCode, message });
  }

  static conflict(errorCode: string, message: string) {
    return new AppException({ httpStatus: 409, errorCode, message });
  }
}
