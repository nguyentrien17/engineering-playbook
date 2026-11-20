# ENGINEERING GOVERNANCE KIT (VERSION 2.0)

Bộ khung tiêu chuẩn phát triển phần mềm toàn diện, kết hợp quản trị chất lượng cho đội ngũ lập trình viên và kỷ luật thực thi cho AI Coding Agents.

## Cấu trúc Thư mục
- `01-universal-standard/`: Bộ quy chuẩn gốc độc lập ngôn ngữ (`UNIVERSAL_STANDARD_v2.md`).
- `02-tech-standards/`: Quy chuẩn triển khai cụ thể cho từng công nghệ (Node.js/TS, Laravel, Python, React/Vue).
- `03-ai-governance/`: File chỉ thị `AGENTS.md` và bộ `PROMPT_TEMPLATES.md` dùng cho AI Agent / Vibe Coding.
- `04-starter-templates/`: Code mẫu chuẩn hóa cho Backend (`AppException`, `GlobalErrorHandler`) và Frontend (`HTTP Client Single-Flight Interceptor`).
- `05-ci-quality-gates/`: Mẫu `PULL_REQUEST_TEMPLATE.md` và cấu hình CI/CD tự động chặn lỗi (`ci-pipeline-sample.yml`).
- `06-project-templates/`: Bộ file mẫu copy trực tiếp vào từng dự án mới (`PROJECT_STANDARD.md`, `ERROR_CODES.md`, `ADR/`).

## Hướng dẫn Áp dụng Nhanh cho Dự án Mới
1. Copy thư mục `06-project-templates/` vào thư mục `docs/` của dự án mới và điền thông tin đặc thù.
2. Copy `03-ai-governance/AGENTS.md` ra thư mục gốc (root) của dự án để AI Agent tự động đọc mỗi khi làm việc.
3. Copy `05-ci-quality-gates/PULL_REQUEST_TEMPLATE.md` vào `.github/` (hoặc `.gitlab/merge_request_templates/`).
4. Tích hợp code mẫu từ `04-starter-templates/` vào lớp Core của Backend và Frontend.
