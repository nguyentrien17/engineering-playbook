/**
 * Mẫu Global Error Handler Middleware (Express/Node.js)
 * Tập trung hóa việc ghi log có cấu trúc và chuẩn hóa JSON Envelope trả về Client
 */
import { Request, Response, NextFunction } from 'express';
import { AppException } from './app-exception';

export function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  const traceId = (req.headers['x-request-id'] as string) || 'unknown-trace';
  const isProduction = process.env.NODE_ENV === 'production';

  // 1. Xử lý lỗi nghiệp vụ đã được định danh (Operational Error)
  if (err instanceof AppException && err.isOperational) {
    console.warn(JSON.stringify({
      timestamp: new Date().toISOString(),
      level: 'WARN',
      traceId,
      method: req.method,
      path: req.originalUrl,
      statusCode: err.httpStatus,
      errorCode: err.errorCode,
      message: err.message,
    }));

    res.status(err.httpStatus).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message,
      ...(err.errors.length > 0 ? { errors: err.errors } : {}),
      traceId,
    });
    return;
  }

  // 2. Xử lý lỗi hệ thống không mong muốn (500 Internal Server Error)
  const unknownError = err instanceof Error ? err : new Error(String(err));
  console.error(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'ERROR',
    traceId,
    method: req.method,
    path: req.originalUrl,
    statusCode: 500,
    message: unknownError.message,
    stack: unknownError.stack,
  }));

  res.status(500).json({
    success: false,
    errorCode: 'ERR_INTERNAL_SERVER',
    message: isProduction
      ? 'Hệ thống đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.'
      : unknownError.message,
    traceId,
  });
}
