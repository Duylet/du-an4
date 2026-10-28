import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "public");
const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT || 3000);
const GATEWAY_URL = "http://127.0.0.1:18789/";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

async function gatewayStatus() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1800);
  try {
    const response = await fetch(GATEWAY_URL, {
      method: "GET",
      redirect: "manual",
      signal: controller.signal
    });
    return {
      running: true,
      status: response.status,
      url: GATEWAY_URL,
      message: "Đã kết nối được cổng Gateway cục bộ."
    };
  } catch {
    return {
      running: false,
      status: null,
      url: GATEWAY_URL,
      message: "Chưa kết nối được Gateway. Hãy chạy openclaw gateway status và hoàn tất openclaw onboard."
    };
  } finally {
    clearTimeout(timeout);
  }
}

const server = http.createServer(async (req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");

  const pathname = new URL(req.url || "/", `http://${HOST}:${PORT}`).pathname;

  if (req.method === "GET" && pathname === "/api/status") {
    const status = await gatewayStatus();
    res.writeHead(200, { "Content-Type": types[".json"], "Cache-Control": "no-store" });
    res.end(JSON.stringify({ demo: "running", gateway: status }));
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end("Method Not Allowed");
    return;
  }

  const requested = pathname === "/" ? "index.html" : decodeURIComponent(pathname).replace(/^\/+/, "");
  const filePath = path.resolve(publicDir, requested);
  if (!filePath.startsWith(publicDir + path.sep) && filePath !== path.join(publicDir, "index.html")) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(filePath);
    res.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Không tìm thấy tệp.");
  }
});

server.listen(PORT, HOST, () => {
  console.log(`OpenClaw Demo đang chạy: http://${HOST}:${PORT}`);
  console.log("Trang demo chỉ lắng nghe trên máy tính hiện tại.");
});