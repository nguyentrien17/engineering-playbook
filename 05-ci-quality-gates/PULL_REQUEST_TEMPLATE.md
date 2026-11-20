## 1. Mô tả thay đổi (Summary)
- **Mục tiêu:** 
- **Loại thay đổi:** `[ ] feat` | `[ ] fix` | `[ ] refactor` | `[ ] test` | `[ ] docs` | `[ ] chore`
- **Issue / Ticket liên quan:** #

## 2. Chi tiết kỹ thuật & Thay đổi Database (nếu có)
- [ ] Có thay đổi Database Schema (Đã kèm file Migration & Rollback an toàn Expand-Contract)
- [ ] Có bổ sung/cập nhật hằng số hoặc `errorCode` trong `constants/`
- [ ] Không có thay đổi phá vỡ hợp đồng API cũ (Breaking Changes)

## 3. Bảng Xác minh Tuân thủ (Compliance Verification Matrix)
> Đánh dấu trạng thái thực tế theo chuẩn Chương 12 (`PASS` | `FAIL` | `NOT VERIFIED` | `EXEMPTED`):

| Tiêu chí chất lượng | Trạng thái | Ghi chú / Bằng chứng kiểm tra |
| :--- | :---: | :--- |
| 1. Cấu trúc module & Quy ước đặt tên | `PASS` | |
| 2. Loại bỏ Magic Numbers/Strings & Bí mật (.env) | `PASS` | |
| 3. Validation đầu vào & Bảo vệ dữ liệu (SQLi/XSS/IDOR) | `PASS` | |
| 4. Xử lý Exception tập trung & Database Transaction | `PASS` | |
| 5. Hợp đồng API (HTTP Status & JSON Envelope) | `PASS` | |
| 6. Linter, Type Check & Security Scan | `PASS` | |
| 7. Automated Tests (Unit / Integration / Regression) | `PASS` | |
