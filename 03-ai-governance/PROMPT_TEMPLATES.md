# BỘ PROMPT MẪU CHUẨN HÓA CHO AI CODING AGENTS

## 1. Prompt Tạo Mới Một Phân Hệ Nghiệp Vụ (Feature Module)
```text
Hãy đọc file `AGENTS.md`, `UNIVERSAL_STANDARD_v2.md` và `PROJECT_STANDARD.md`.
Nhiệm vụ: Xây dựng phân hệ nghiệp vụ `[TÊN_MODULE]` với các yêu cầu sau:
- Chức năng: [Mô tả chi tiết luồng nghiệp vụ]
- Dữ liệu đầu vào/ra: [Mô tả các trường]

Yêu cầu thực thi:
1. Khảo sát mã nguồn hiện có trong `src/common/` và `src/modules/` để tái sử dụng helper, exception và middleware chuẩn.
2. Chỉ tạo các file cần thiết theo đúng kiến trúc phân tầng; không tạo file rỗng.
3. Định nghĩa đầy đủ hằng số trạng thái và `errorCode` mới vào file constant/error catalog.
4. Viết Schema Validation tại cửa ngõ, xử lý Transaction nếu ghi đa bảng, và ném `AppException` chuẩn.
5. Viết Unit Test / Integration Test cho các luồng thành công và các trường hợp lỗi chính.
6. Chạy linter và test, sau đó xuất Báo cáo Xác minh Tuân thủ theo đúng định dạng trong `AGENTS.md`.
```

## 2. Prompt Sửa Lỗi Kèm Regression Test (Bug Fix)
```text
Hãy đọc `AGENTS.md` và phân tích lỗi sau:
- Mô tả lỗi / TraceId: [Dán log hoặc mô tả]
- Hành vi mong muốn: [Mô tả]

Yêu cầu thực thi:
1. Tìm nguyên nhân gốc rễ (Root Cause), không sửa chắp vá bề mặt và không dùng try-catch để nuốt lỗi.
2. Viết một bài Regression Test tái hiện chính xác lỗi này (đảm bảo test fail trước khi sửa).
3. Sửa lỗi và chạy lại toàn bộ test suite để đảm bảo test mới PASS và không làm hỏng tính năng khác.
4. Xuất Báo cáo Xác minh Tuân thủ.
```

## 3. Prompt Tự Kiểm Toán Code (Code Audit & Review)
```text
Hãy đóng vai Tech Lead kiểm toán đoạn code / Pull Request hiện tại dựa trên `UNIVERSAL_STANDARD_v2.md` và `AGENTS.md`.
Kiểm tra kỹ:
1. Có Magic Numbers/Strings nào chưa đưa vào constant không?
2. Có Controller nào gọi thẳng DB hoặc chứa logic nghiệp vụ không?
3. Có khối try-catch nào nuốt lỗi hoặc thiếu rollback transaction không?
4. API response và HTTP status code đã khớp 100% hợp đồng chưa?
5. Có lỗ hổng IDOR, SQLi, XSS hoặc lộ dữ liệu nhạy cảm trong log không?
Liệt kê từng vi phạm kèm mức độ nghiêm trọng và đề xuất cách sửa cụ thể.
```
