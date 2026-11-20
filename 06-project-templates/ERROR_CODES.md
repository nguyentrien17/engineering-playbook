# DANH MỤC MÃ LỖI CHUẨN CỦA DỰ ÁN (ERROR CODE CATALOG)
> Nguồn chân lý duy nhất (Single Source of Truth) cho Backend phát sinh lỗi và Frontend xử lý điều hướng.

| HTTP Status | `errorCode` | Thông báo mặc định (Tiếng Việt) | Hành động đề xuất tại Frontend |
| :---: | :--- | :--- | :--- |
| `400` | `ERR_VALIDATION_FAILED` | Dữ liệu đầu vào không hợp lệ, vui lòng kiểm tra lại. | Map mảng `errors[]` xuống từng field của Form. |
| `400` | `ERR_INVALID_QUERY_PARAM` | Tham số truy vấn không hợp lệ. | Hiển thị Toast thông báo lỗi. |
| `401` | `ERR_TOKEN_EXPIRED` | Phiên đăng nhập đã hết hạn. | Kích hoạt Single-Flight Refresh Token ngầm. |
| `401` | `ERR_INVALID_CREDENTIALS` | Tài khoản hoặc mật khẩu không chính xác. | Hiển thị thông báo lỗi ngay tại Form đăng nhập. |
| `403` | `ERR_FORBIDDEN` | Bạn không có quyền thực hiện thao tác này. | Hiển thị thông báo hoặc điều hướng trang 403. |
| `403` | `ERR_ACCOUNT_LOCKED` | Tài khoản của bạn đã bị khóa. | Đăng xuất và chuyển về trang thông báo khóa. |
| `404` | `ERR_RESOURCE_NOT_FOUND` | Không tìm thấy dữ liệu yêu cầu. | Hiển thị Empty State / nút quay lại. |
| `409` | `ERR_DUPLICATE_VALUE` | Dữ liệu đã tồn tại trong hệ thống. | Gắn lỗi trùng lặp vào field tương ứng trên Form. |
| `409` | `ERR_INVALID_STATE_TRANSITION` | Trạng thái hiện tại không cho phép thực hiện thao tác này. | Tải lại dữ liệu mới nhất của bản ghi. |
| `429` | `ERR_TOO_MANY_REQUESTS` | Bạn thao tác quá nhanh, vui lòng thử lại sau. | Khóa tạm nút bấm và đếm ngược thời gian chờ. |
| `500` | `ERR_INTERNAL_SERVER` | Hệ thống đang gặp sự cố kỹ thuật. | Hiển thị thông báo thân thiện kèm `traceId`. |
