# OpenClaw Demo — Python

Dự án demo học tập dựa trên cách triển khai OpenClaw: chạy Gateway trên máy cá nhân và mở Control UI để trò chuyện với trợ lý AI. Bản demo dùng **Python 3** cho máy chủ web, không cần cài thư viện Python bên ngoài. Dự án này không sao chép mã nguồn OpenClaw.

## 1. Yêu cầu

- Python 3.10 trở lên (bản demo dùng thư viện chuẩn của Python).
- Muốn dùng trợ lý AI thật thì cần cài OpenClaw riêng và hoàn tất cấu hình mô hình AI. OpenClaw có yêu cầu runtime riêng; xem [Getting started](https://github.com/openclaw/openclaw/blob/main/docs/start/getting-started.md).

## 2. Chạy demo bằng Python trong VS Code

Mở terminal trong thư mục dự án:

```powershell
python --version
python app.py
```

Nếu máy bạn dùng lệnh `py` thay vì `python`, chạy:

```powershell
py app.py
```

Sau khi terminal hiện địa chỉ máy chủ, mở trình duyệt tại:

```text
http://127.0.0.1:3000
```

Nhấn **Ctrl+C** trong terminal để dừng máy chủ. Không cần chạy `npm install` để khởi động bản Python.

## 3. Kết nối OpenClaw thật (tùy chọn)

Cài OpenClaw theo [hướng dẫn chính thức](https://docs.openclaw.ai/install). Trên Windows PowerShell, tài liệu OpenClaw cung cấp lệnh cài đặt:

```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

Sau khi cài đặt, hoàn tất cấu hình và kiểm tra Gateway:

```powershell
openclaw onboard
openclaw doctor
openclaw gateway status
```

Demo kiểm tra Gateway tại `http://127.0.0.1:18789/` và có nút mở Control UI. Nếu Gateway chưa chạy, trang demo vẫn mở được nhưng sẽ hiển thị trạng thái chưa kết nối.

## 4. Cấu trúc

```text
du-an4/
├─ app.py             # Máy chủ web Python
├─ public/
│  ├─ index.html      # Giao diện
│  ├─ app.js          # Kiểm tra trạng thái trên trình duyệt
│  └─ style.css       # Giao diện và kiểu dáng
├─ server.js          # Phiên bản máy chủ Node.js (tùy chọn)
├─ package.json       # Dùng nếu chạy phiên bản Node.js
├─ .gitignore
└─ README.md
```

## 5. An toàn

- Máy chủ demo chỉ lắng nghe trên `127.0.0.1`, không công khai cổng ra mạng.
- Không đưa API key, token hoặc tệp cấu hình cá nhân lên GitHub.
- Đây là demo học tập, không phải máy chủ production. Thư viện `http.server` của Python chỉ phù hợp với máy chủ thử nghiệm đơn giản ([tài liệu Python](https://docs.python.org/3/library/http.server.html)).
- Gateway có thể thực thi công cụ trên máy theo cấu hình; chỉ dùng với nguồn tin cậy và cấu hình quyền truy cập phù hợp.

## Tài liệu

- [OpenClaw trên GitHub](https://github.com/openclaw/openclaw)
- [Getting started](https://github.com/openclaw/openclaw/blob/main/docs/start/getting-started.md)
- [Hướng dẫn cài đặt OpenClaw](https://docs.openclaw.ai/install)
- [Python http.server](https://docs.python.org/3/library/http.server.html)
