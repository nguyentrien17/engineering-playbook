# AI CODING AGENT INSTRUCTIONS (AGENTS.md)
> File chỉ thị bắt buộc dành cho mọi AI Coding Agent (Cursor, Claude Code, Copilot, Gemini, Windsurf...) hoạt động trong repository này.

## 1. THỨ TỰ ĐỌC NGỮ CẢNH BẮT BUỘC
Trước khi lên kế hoạch hoặc viết bất kỳ dòng code nào, bạn BẮT BUỘC phải đối chiếu theo thứ tự ưu tiên:
1. `01-universal-standard/UNIVERSAL_STANDARD_v2.md` (Nguyên tắc gốc chung)
2. `02-tech-standards/<tech-stack-cua-du-an>.md` (Quy chuẩn ngôn ngữ/framework)
3. `PROJECT_STANDARD.md` & `ERROR_CODES.md` tại thư mục gốc dự án (Quy định riêng & danh mục mã lỗi)

## 2. 12 QUY TẮC KỶ LUẬT CỨNG (HARD CONSTRAINTS)
1. **Khảo sát trước khi tạo:** Kiểm tra kỹ các module, `common/utils`, `common/constants`, `common/exceptions` hiện có. Cấm tạo mới nếu đã có thành phần tương đương.
2. **Không tạo Boilerplate rỗng:** Chỉ tạo các file (`service`, `repository`, `validator`, `constant`) khi module thực sự có logic cho tầng đó.
3. **Tôn trọng ranh giới tầng:** `Controller` không được chứa truy vấn DB hoặc logic nghiệp vụ; `Service` không được phụ thuộc đối tượng HTTP Request/Response.
4. **Cấm Magic Numbers / Magic Strings:** Mọi trạng thái, mã lỗi, cấu hình giới hạn phải đưa vào `constants/`.
5. **Cấm nuốt lỗi:** Tuyệt đối không viết `catch (err) { console.log(err); return null; }`. Chỉ bắt lỗi khi có hành động phục hồi, rollback transaction, chuyển đổi `AppException` hoặc thêm ngữ cảnh.
6. **Tuân thủ API Contract:** Mọi API JSON phải trả đúng HTTP Status Code (`200, 201, 202, 204, 400, 401, 403, 404, 409, 429, 500`) và đúng khuôn mẫu `{ success, errorCode, message, data/errors, traceId }`.
7. **Không tự ý đổi Database Schema:** Mọi thay đổi bảng/cột phải tạo file Migration kèm phương án Rollback và báo cáo rõ ràng.
8. **Bảo toàn Bảo mật:** Cấm hardcode secret; luôn validate dữ liệu đầu vào tại cửa ngõ; luôn kiểm tra quyền sở hữu bản ghi (chống IDOR).
9. **Viết Test tương xứng:** Mọi logic nghiệp vụ mới hoặc bản sửa lỗi đều phải kèm Unit/Integration Test.
10. **Cấm sửa/xóa Test cũ để làm xanh CI:** Nếu test cũ thất bại, phải kiểm tra xem code mới có phá vỡ nghiệp vụ cũ hay không.
11. **Cấm tuyên bố hoàn thành giả:** Không được khẳng định "Đã hoàn thành 100%" nếu chưa chạy lệnh kiểm tra thực tế (`lint`, `typecheck`, `test`).
12. **Xuất Báo cáo Tuân thủ:** Kết thúc mọi tác vụ bằng bảng xác minh trạng thái theo mục 3 dưới đây.

## 3. ĐỊNH DẠNG BÁO CÁO XÁC MINH BẮT BUỘC SAU MỖI TÁC VỤ
Mọi phản hồi bàn giao code của AI Agent phải kết thúc bằng bảng sau:

| Hạng mục kiểm tra | Trạng thái (`PASS` / `FAIL` / `NOT VERIFIED` / `EXEMPTED`) | Bằng chứng / Ghi chú chi tiết |
| :--- | :--- | :--- |
| Kiến trúc & Đặt tên | | |
| Constants & Validation | | |
| Exception & API Contract | | |
| Bảo mật (Auth/IDOR/Secrets) | | |
| Linter & Type Check | | |
| Automated Tests | | |
