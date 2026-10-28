from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import URLError, HTTPError
from urllib.request import Request, urlopen
from urllib.parse import urlsplit
import json
import os
import mimetypes

HOST = "127.0.0.1"
PORT = int(os.environ.get("PORT", "3000"))
GATEWAY_URL = "http://127.0.0.1:18789/"
PUBLIC_DIR = Path(__file__).resolve().parent / "public"


def gateway_status():
    request = Request(GATEWAY_URL, headers={"User-Agent": "OpenClaw-Python-Demo/1.0"})
    try:
        with urlopen(request, timeout=1.8) as response:
            return {
                "running": True,
                "status": response.status,
                "url": GATEWAY_URL,
                "message": "Đã kết nối được cổng Gateway cục bộ."
            }
    except (URLError, HTTPError, TimeoutError, OSError):
        return {
            "running": False,
            "status": None,
            "url": GATEWAY_URL,
            "message": "Chưa kết nối được Gateway. Hãy chạy openclaw gateway status và hoàn tất openclaw onboard."
        }


class DemoHandler(BaseHTTPRequestHandler):
    def send_body(self, status, body, content_type="text/plain; charset=utf-8", head_only=False):
        if isinstance(body, str):
            body = body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if not head_only:
            self.wfile.write(body)

    def do_GET(self):
        self.handle_request(head_only=False)

    def do_HEAD(self):
        self.handle_request(head_only=True)

    def handle_request(self, head_only=False):
        pathname = urlsplit(self.path).path

        if pathname == "/api/status":
            payload = json.dumps(
                {"demo": "running", "gateway": gateway_status()},
                ensure_ascii=False
            )
            self.send_body(
                200, payload, "application/json; charset=utf-8",
                head_only=head_only
            )
            return

        if pathname == "/":
            requested = "index.html"
        else:
            requested = pathname.lstrip("/")

        # Prevent traversal outside the public directory.
        file_path = (PUBLIC_DIR / requested).resolve()
        try:
            file_path.relative_to(PUBLIC_DIR.resolve())
        except ValueError:
            self.send_body(403, "Forbidden", head_only=head_only)
            return

        if not file_path.is_file():
            self.send_body(404, "Không tìm thấy tệp.", head_only=head_only)
            return

        content_type = mimetypes.guess_type(str(file_path))[0] or "application/octet-stream"
        if content_type.startswith("text/") or content_type in ("application/javascript", "application/json"):
            content_type += "; charset=utf-8"

        try:
            self.send_body(200, file_path.read_bytes(), content_type, head_only=head_only)
        except OSError:
            self.send_body(500, "Không thể đọc tệp.", head_only=head_only)

    def log_message(self, fmt, *args):
        print("[demo] " + (fmt % args))


def main():
    server = ThreadingHTTPServer((HOST, PORT), DemoHandler)
    print(f"OpenClaw Python Demo đang chạy: http://{HOST}:{PORT}")
    print("Nhấn Ctrl+C để dừng. Máy chủ chỉ lắng nghe trên máy tính hiện tại.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nĐang dừng máy chủ...")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
