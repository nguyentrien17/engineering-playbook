# TECHNOLOGY STANDARD (LEVEL 2): BACKEND NODE.JS / TYPESCRIPT
> Ánh xạ từ Universal Standard v2.0 sang hệ sinh thái Node.js + TypeScript (Express / Fastify / NestJS).

## 1. Quy ước Đặt tên & Cấu trúc File
- **File:** `kebab-case` kèm hậu tố vai trò: `order.controller.ts`, `order.service.ts`, `order.repository.ts`, `order.schema.ts`, `order.constant.ts`.
- **Biến & Hàm:** `camelCase`. **Class, Interface, Type, Enum:** `PascalCase`. **Hằng số:** `UPPER_SNAKE_CASE`.
- **Strict TypeScript:** Bật `"strict": true`, cấm dùng kiểu `any` (thay bằng `unknown` kèm type guard hoặc Zod schema inference).

## 2. Công cụ & Thư viện Chuẩn
- **Validation (Lớp 2A):** Bắt buộc dùng **Zod** (hoặc Joi/class-validator). Luôn dùng `.strict()` hoặc `.strip()` trên object schema để tự động loại bỏ các trường lạ không khai báo (chống Mass Assignment).
- **Database & Transaction:** Sử dụng ORM/Query Builder hỗ trợ Transaction tường minh (Prisma, Sequelize, TypeORM, Knex). Mọi thao tác ghi từ 2 bảng trở lên bắt buộc bọc trong `db.transaction(async (tx) => { ... })`.
- **Logging:** Sử dụng **Pino** hoặc **Winston** xuất JSON structured log; cấu hình `redact` tự động che các key `['password', 'token', 'authorization', 'secret', 'otp']`.

## 3. Quy tắc Bất đồng bộ & Error Handling
- Không dùng `async` controller mà không có wrapper chuyển lỗi về `next(err)` (Express v4 cần `express-async-errors` hoặc wrapper; Express v5/Fastify hỗ trợ sẵn).
- Tuyệt đối không dùng `Promise.all()` không kiểm soát cho hàng trăm tác vụ I/O cùng lúc — sử dụng `p-limit` hoặc chia batch.
- Luôn lắng nghe sự kiện `unhandledRejection` và `uncaughtException` ở `main.ts` để ghi log khẩn cấp và thực hiện Graceful Shutdown.
