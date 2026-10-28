# OpenClaw Demo — Trợ lý AI chạy cục bộ

Dự án demo học tập dựa trên cách triển khai OpenClaw: chạy Gateway trên máy cá nhân và mở Control UI để trò chuyện với trợ lý AI. Dự án này **không sao chép mã nguồn OpenClaw**; nó cung cấp hướng dẫn và tiện ích khởi chạy/kiểm tra cài đặt OpenClaw chính thức.

## Yêu cầu

- Windows 10/11, macOS hoặc Linux
- Node.js theo yêu cầu hiện hành của OpenClaw (xem [Getting started](https://github.com/openclaw/openclaw/blob/main/docs/start/getting-started.md))
- Một phương thức truy cập mô hình AI được OpenClaw hỗ trợ (đăng nhập CLI hoặc API key)

## Cài đặt OpenClaw

### Windows PowerShell

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

Sau khi cài đặt, chạy hướng dẫn cấu hình:

```powershell
openclaw onboard
openclaw doctor
openclaw gateway status
```

Nếu lệnh `openclaw` chưa nhận diện được, hãy đóng và mở lại terminal rồi kiểm tra PATH.

## Chạy demo

Tại thư mục dự án:

```powershell
npm install
npm start
```

Mở `http://127.0.0.1:3000`. Trang demo kiểm tra Gateway cục bộ và cung cấp liên kết mở Control UI của OpenClaw tại `http://127.0.0.1:18789/`.

> Lưu ý: ứng dụng demo không thay thế OpenClaw và không tự tạo API key. Hãy hoàn tất `openclaw onboard` trước khi sử dụng.

## Cấu trúc

```text
 du-an4/
 ├─ public/
 │  ├─ index.html
 │  ├─ app.js
 │  └─ style.css
 ├─ server.js
 ├─ package.json
 ├─ .gitignore
 └─ README.md
```

## An toàn

- Chỉ bind máy chủ demo vào `127.0.0.1`, không công khai cổng ra Internet.
- Không đưa API key, token hoặc tệp cấu hình cá nhân lên GitHub.
- Không kết nối kênh nhắn tin hoặc người dùng khác trước khi đọc hướng dẫn bảo mật chính thức.
- Gateway có thể thực thi công cụ trên máy chủ theo cấu hình; chỉ dùng với nguồn tin cậy và cấu hình quyền truy cập phù hợp.

## Tài liệu

- [OpenClaw trên GitHub](https://github.com/openclaw/openclaw)
- [Getting started](https://github.com/openclaw/openclaw/blob/main/docs/start/getting-started.md)
- [Hướng dẫn cài đặt](https://docs.openclaw.ai/install)
