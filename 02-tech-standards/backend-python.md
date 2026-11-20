# TECHNOLOGY STANDARD (LEVEL 2): BACKEND PYTHON (FASTAPI / DJANGO)
> Ánh xạ từ Universal Standard v2.0 sang hệ sinh thái Python 3.11+ & FastAPI.

## 1. Quy ước Đặt tên (Tuân thủ PEP8 + Ngữ nghĩa Universal)
- **File & Thư mục:** `snake_case` (`order_router.py`, `order_service.py`, `order_schema.py`).
- **Hàm & Biến:** `snake_case` (`get_order_by_id`, `is_verified`).
- **Class & Pydantic Model:** `PascalCase` (`OrderService`, `CreateOrderRequest`).
- **Hằng số:** `UPPER_SNAKE_CASE` (`MAX_UPLOAD_SIZE_MB`).
- **Type Hints:** Bắt buộc khai báo Type Hints đầy đủ cho mọi tham số và giá trị trả về của hàm.

## 2. Validation, Async & Error Handling
- **Validation:** Bắt buộc dùng **Pydantic v2** (`BaseModel`) với cấu hình `model_config = ConfigDict(extra='forbid')` hoặc `'ignore'` để chặn Mass Assignment.
- **Async Safety:** Trong FastAPI `async def`, tuyệt đối không gọi các thư viện I/O đồng bộ chặn luồng (blocking I/O như `requests`, `time.sleep`, driver DB đồng bộ) trực tiếp — phải dùng bản async (`httpx`, `asyncio.sleep`, `asyncpg`) hoặc đẩy qua `run_in_threadpool`.
- **Exception Handler:** Đăng ký `@app.exception_handler(AppException)` và `@app.exception_handler(RequestValidationError)` để chuẩn hóa toàn bộ lỗi về JSON Envelope có `traceId`.
