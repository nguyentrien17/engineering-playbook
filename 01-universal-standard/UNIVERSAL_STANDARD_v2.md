# HỆ THỐNG TIÊU CHUẨN & QUẢN TRỊ CHẤT LƯỢNG PHÁT TRIỂN PHẦN MỀM (VERSION 2.0)
> **Phạm vi:** Language-Agnostic Master Standard (Level 1) — Áp dụng cho toàn bộ dự án Backend, Frontend, Mobile & AI Coding Agents.

## MÔ HÌNH QUẢN TRỊ 5 TẦNG (5-LEVEL GOVERNANCE)
1. **Level 1 — Universal Engineering Standard:** Nguyên tắc chung, kiến trúc, dữ liệu, hợp đồng lỗi, bảo mật và kiểm thử (độc lập ngôn ngữ).
2. **Level 2 — Technology Standard:** Triển khai cụ thể theo từng stack (`02-tech-standards/`).
3. **Level 3 — Project Standard:** Đặc thù nghiệp vụ, từ điển thuật ngữ và ngoại lệ được duyệt của từng dự án (`PROJECT_STANDARD.md`).
4. **Level 4 — Automated Enforcement:** Linter, Static Analysis, Architecture Rules, Security Scan trên CI/CD (`05-ci-quality-gates/`).
5. **Level 5 — Compliance & Verification:** Báo cáo xác minh bằng chứng (`PASS | FAIL | NOT VERIFIED | EXEMPTED`).

---

## CHƯƠNG 01: CẤU TRÚC THƯ MỤC & KIẾN TRÚC PHÂN TẦNG
- **Feature-First Modularization:** Chia mã nguồn theo miền nghiệp vụ (`modules/orders/`, `modules/auth/`) thay vì gom theo loại kỹ thuật.
- **No Boilerplate Bloat:** Cấu trúc thư mục chỉ mang tính tham chiếu. Chỉ tạo file/tầng trung gian khi có trách nhiệm thực tế; cấm tạo file rỗng đối phó.
- **Dependency Rule (Luồng phụ thuộc một chiều):**
  - `Controller / Handler`: Chỉ nhận Input, gọi Validator/Service, đóng gói Response. Cấm truy vấn DB hoặc xử lý logic nghiệp vụ tại đây.
  - `Service / UseCase`: Chứa toàn bộ logic nghiệp vụ; độc lập với HTTP Request/Response để tái sử dụng cho API, Worker, Cronjob, CLI.
  - `Repository / DAO`: Chỉ đọc/ghi DB hoặc Cache; không chứa logic nghiệp vụ.

## CHƯƠNG 02: QUY ƯỚC ĐẶT TÊN (NAMING CONVENTIONS)
- **Thư mục:** `kebab-case` (số nhiều cho nhóm chung, số ít cho module cụ thể).
- **File mã nguồn:** `kebab-case.<vai-tro>.<ext>` (hoặc theo chuẩn ngôn ngữ ở Level 2).
- **Class / Struct / Component:** `PascalCase`.
- **Biến & Hàm:** `camelCase` (hoặc `snake_case` theo chuẩn ngôn ngữ); hàm bắt đầu bằng động từ (`get`, `create`, `update`, `delete`, `validate`, `calculate`, `sync`).
- **Biến Boolean:** Bắt đầu bằng tiền tố khẳng định (`is`, `has`, `can`, `should`, `allow`). Tránh phủ định kép (`isNotDisabled`).
- **Hằng số & Enum:** `UPPER_SNAKE_CASE`.
- **Database:** `snake_case`; khóa ngoại `<bảng_số_ít>_id`; thời gian `_at` (`created_at`, `updated_at`, `deleted_at`).
- **API Endpoint:** `kebab-case`, danh từ số nhiều, không chứa động từ trong URL.
- **Từ viết tắt:** Chỉ dùng từ viết tắt phổ biến (`id`, `url`, `api`, `json`, `dto`, `db`, `ip`, `uuid`, `otp`, `sku`) hoặc thuật ngữ đã khai báo trong Domain Glossary của dự án.

## CHƯƠNG 03: QUẢN LÝ HẰNG SỐ & CẤU HÌNH
- Cấm Magic Numbers và Magic Strings. Mọi trạng thái nghiệp vụ, mã quyền, mã lỗi (`errorCode`), giới hạn phân trang, TTL, Regex phải đưa vào `constants/`.
- **Ranh giới Constant vs `.env`:** Giá trị logic bất biến đưa vào Constant trong code; thông số thay đổi theo môi trường hoặc thông tin nhạy cảm đưa vào `.env` / Secret Manager và kiểm tra tồn tại ngay khi khởi động (Fail-Fast on Startup).

## CHƯƠNG 04: LƯU TRỮ DỮ LIỆU, VÒNG ĐỜI DỮ LIỆU & VALIDATION
- **Thời gian:** Lưu trữ và truyền API theo chuẩn UTC ISO-8601 (`2026-11-20T06:16:00Z`). Chỉ đổi múi giờ địa phương ở tầng hiển thị cuối.
- **Tiền tệ & Số học chính xác:** Cấm `FLOAT/DOUBLE`. Dùng `DECIMAL(18,4)` hoặc số nguyên ở đơn vị nhỏ nhất.
- **Data Lifecycle Policy (Không ép Soft Delete 100%):**
  - Dữ liệu cần đối soát lịch sử (Đơn hàng, Hóa đơn): Soft Delete (`deleted_at`) hoặc `ARCHIVED`.
  - Dữ liệu định danh cá nhân (PII): Hỗ trợ Xóa hoặc Ẩn danh hóa (Anonymization) theo quy định bảo vệ dữ liệu.
  - Dữ liệu tạm (OTP, Token nháp): Hard Delete hoặc TTL tự hủy.
  - Dữ liệu Log: Có Retention Policy và tự động dọn dẹp định kỳ.
- **Validation 2 lớp & Bảo vệ ngữ cảnh:**
  - Lớp 1 (Frontend): Validate UX tức thì.
  - Lớp 2A (Backend Schema/DTO): Validate kiểu dữ liệu, gom tất cả lỗi một lần, tự động loại bỏ trường lạ (`strip unknown`) để chống Mass Assignment.
  - Lớp 2B (Backend Business): Validate quy tắc nghiệp vụ trong Service.
  - **Chống XSS & SQLi:** Dùng Parameterized Queries/ORM (cấm cộng chuỗi SQL). Không escape HTML bừa bãi trước khi lưu; dùng Output Encoding khi hiển thị hoặc HTML Sanitizer allowlist cho Rich Text.

## CHƯƠNG 05: KIẾN TRÚC XỬ LÝ NGOẠI LỆ (EXCEPTION HANDLING)
- **Nguyên tắc vàng:** Chỉ dùng `try...catch` tại nơi hệ thống có khả năng: (1) Phục hồi trạng thái, (2) Bù trừ/dọn dẹp (Rollback Transaction, giải phóng tài nguyên), (3) Chuyển đổi sang Custom Exception có cấu trúc, hoặc (4) Bổ sung ngữ cảnh truy vết. Nếu không, để lỗi tự nổi lên (`bubble up`) tới `Global Error Handler`.
- **Cấm nuốt lỗi:** Nghiêm cấm `catch (e) { console.log(e); return null; }`.
- **Phân loại lỗi:** Tách bạch `Operational Error` (lỗi nghiệp vụ dự kiến qua `AppException`) và `System Error` (lỗi 5xx không mong muốn — ghi log Stack Trace + `traceId`, che chi tiết kỹ thuật khi trả về Production).

## CHƯƠNG 06: HỢP ĐỒNG API & HTTP STATUS CODE
- **Status Code chuẩn:** `200` (OK), `201` (Created), `202` (Accepted - xử lý bất đồng bộ qua Queue), `204` (No Content - không kèm body), `400` (Bad Request), `401` (Unauthorized), `403` (Forbidden), `404` (Not Found), `409` (Conflict - trùng lặp/xung đột trạng thái), `422` (Unprocessable Entity), `429` (Rate Limit), `5xx` (Server Error).
- **JSON Envelope thống nhất:**
  - Thành công: `{ "success": true, "message": "...", "data": ..., "meta": {...}, "traceId": "..." }`
  - Thất bại: `{ "success": false, "errorCode": "ERR_...", "message": "...", "errors": [{ "field": "...", "code": "...", "message": "..." }], "traceId": "..." }`
  - Ngoại lệ Envelope: `204 No Content`, File Download nhị phân, SSE/Streaming, Webhook đối tác.

## CHƯƠNG 07: TIẾP NHẬN LỖI & TRẠNG THÁI TẠI FRONTEND
- Xử lý tập trung tại HTTP Client Interceptor:
  - `401 Unauthorized`: Cơ chế khóa **Single-Flight Refresh** (chỉ 1 request gọi refresh token dù nhiều API cùng 401), sau đó chỉ tự động retry các request an toàn (Idempotent).
  - `400 / 422`: Map mảng `errors[]` trực tiếp xuống từng ô input của Form theo `field`.
  - `5xx`: Hiển thị thông báo thân thiện kèm `traceId`.
- **UI State Rules:** Đủ 4 trạng thái (`Loading`, `Success`, `Empty`, `Error`) và khóa nút bấm ngay khi Submit để chống Double-Submit.

## CHƯƠNG 08 – 12: BẢO MẬT, KIỂM THỬ, MIGRATION, CI/CD & AI GOVERNANCE
- **Bảo mật:** Mật khẩu băm Argon2id/bcrypt; kiểm tra phân quyền theo bản ghi (chống IDOR); chống SSRF (chặn IP nội bộ); kiểm tra Magic Bytes file upload; che dữ liệu nhạy cảm trong log (`***REDACTED***`).
- **Kiểm thử:** Unit, Integration, API Contract, E2E và Regression Test (bắt buộc thêm khi fix bug).
- **Database Migration:** 100% thay đổi qua migration có version; triển khai cột phá vỡ tương thích theo mô hình Expand-Contract (Zero-Downtime).
- **AI Compliance:** Tuân thủ 12 quy tắc kỷ luật AI và xuất báo cáo xác minh theo 4 trạng thái: `PASS | FAIL | NOT VERIFIED | EXEMPTED`.
