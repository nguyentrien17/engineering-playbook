# TECHNOLOGY STANDARD (LEVEL 2): FRONTEND (REACT / VUE / TYPESCRIPT)
> Ánh xạ từ Universal Standard v2.0 sang ứng dụng Web SPA/SSR sử dụng TypeScript.

## 1. Cấu trúc Thư mục Frontend
```text
src/
├── api/                 # Axios/Fetch instance, Interceptors, API modules theo domain
├── assets/              # Hình ảnh, font, icon tĩnh
├── components/          # UI Components dùng chung toàn app (Button, Modal, DataTable)
├── constants/           # Hằng số, Enum trạng thái, Route paths, Error codes
├── hooks/ (hoặc composables/) # Logic tái sử dụng (useDebounce, usePermission)
├── layouts/             # Khung giao diện (AuthLayout, DashboardLayout)
├── modules/             # Các tính năng nghiệp vụ (mỗi module có pages/, components/, types/)
├── stores/              # Global state (Auth user, Permissions, App settings)
└── utils/               # Pure helpers (formatCurrency, formatUtcToLocal)
```

## 2. Quy tắc Bắt buộc
- **Server State vs Client State:** Dữ liệu lấy từ API nên quản lý qua thư viện chuyên biệt (TanStack Query / SWR) để tự động hóa caching, deduplication và 4 trạng thái (`isLoading`, `isError`, `data`, `isEmpty`).
- **Form & Validation:** Sử dụng thư viện Form chuẩn (React Hook Form + Zod / VeeValidate + Yup). Khi API trả về lỗi `400/422` kèm mảng `errors[]`, dùng vòng lặp `setError(item.field, { message: item.message })` để gắn lỗi trực tiếp vào từng ô nhập liệu.
- **Hiển thị Thời gian & Tiền tệ:** API trả về chuỗi UTC ISO-8601; component hiển thị bắt buộc gọi hàm `formatDateTimeLocal(utcString)` thay vì cắt chuỗi thủ công.
