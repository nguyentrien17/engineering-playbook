# TECHNOLOGY STANDARD (LEVEL 2): BACKEND PHP / LARAVEL
> Ánh xạ từ Universal Standard v2.0 sang hệ sinh thái PHP 8.2+ & Laravel Framework.

## 1. Quy ước Đặt tên & Kiến trúc
- **Class & File:** `PascalCase` theo chuẩn PSR-4 (`OrderController.php`, `OrderService.php`, `StoreOrderRequest.php`).
- **Method & Variable:** `camelCase`. **Hằng số & Enum:** `PascalCase` cho PHP 8.1+ Backed Enum (`enum OrderStatus: string { case PENDING = 'PENDING'; }`).
- **Tách tầng chuẩn Laravel:**
  - `FormRequest`: Đảm nhiệm Lớp 2A Validation (`rules()`) và kiểm tra quyền cơ bản (`authorize()`).
  - `Controller`: Chỉ nhận `FormRequest`, gọi `Service`, và trả về `ApiResponse` / `JsonResource`.
  - `Service`: Chứa nghiệp vụ thuần túy, nhận tham số kiểu nguyên thủy hoặc DTO (không truyền `$request` của HTTP vào Service).
  - `Action` (tùy chọn cho tác vụ phức tạp đơn lẻ): `CreateOrderAction.php`.

## 2. Quy tắc Truy vấn & Bảo mật Eloquent
- **Chống N+1 Query:** Bật `Model::preventLazyLoading(!app()->isProduction());` trong `AppServiceProvider` để phát hiện ngay lỗi N+1 từ môi trường Dev.
- **Chống Mass Assignment:** Mọi Model bắt buộc khai báo tường minh `$fillable` (cấm dùng `$guarded = []` bừa bãi).
- **Transaction:** Dùng `DB::transaction(function () { ... })` cho các thao tác ghi đa bảng.
- **Exception Handling:** Đăng ký render tập trung trong `bootstrap/app.php` (`withExceptions`) để chuyển đổi `ValidationException`, `ModelNotFoundException`, `AuthenticationException` và `AppException` về đúng JSON Envelope chuẩn.
