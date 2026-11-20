# PROJECT STANDARD (LEVEL 3): [TÊN DỰ ÁN]
> Tài liệu bổ sung quy định đặc thù cho dự án này, kế thừa từ `UNIVERSAL_STANDARD_v2.md`.

## 1. Tech Stack & Phiên bản Chuẩn
- **Backend:** [Ví dụ: Node.js 20 + Express + TypeScript]
- **Database:** [Ví dụ: PostgreSQL 16 + PostGIS / MySQL 8.0]
- **Frontend:** [Ví dụ: React 19 + Vite + TypeScript]
- **Cache / Queue:** [Ví dụ: Redis 7]

## 2. Danh sách Phân hệ Nghiệp vụ (Domain Modules)
- `auth/`: Xác thực, phân quyền RBAC, quản lý phiên.
- `users/`: Quản lý hồ sơ người dùng.
- `[module-khac]/`: [Mô tả ngắn gọn trách nhiệm].

## 3. Từ điển Thuật ngữ & Viết tắt Được phép (Domain Glossary)
> Các từ viết tắt dưới đây được phép dùng trong tên biến, hàm và bảng DB của riêng dự án này:
- `gis`: Geographic Information System (Hệ thống thông tin địa lý)
- `txng`: Truy xuất nguồn gốc
- `iot`: Internet of Things

## 4. Danh mục Ngoại lệ Được phê duyệt (`EXEMPTED`)
| Mã quy tắc gốc | Nội dung ngoại lệ | Lý do kỹ thuật | Người phê duyệt |
| :--- | :--- | :--- | :--- |
| Ch.06 - JSON Envelope | Endpoint `/api/v1/webhooks/payment` trả về `{ "RspCode": "00" }` | Định dạng bắt buộc theo chuẩn của cổng thanh toán đối tác | Tech Lead |
