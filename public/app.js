const refreshButton = document.querySelector("#refresh");
const dot = document.querySelector("#dot");
const title = document.querySelector("#status-title");
const message = document.querySelector("#status-message");
const checkedAt = document.querySelector("#checked-at");

async function checkStatus() {
  refreshButton.disabled = true;
  refreshButton.textContent = "Đang kiểm tra…";
  title.textContent = "Đang kiểm tra…";
  dot.className = "dot";
  try {
    const response = await fetch("/api/status", { cache: "no-store" });
    if (!response.ok) throw new Error("HTTP " + response.status);
    const data = await response.json();
    const gateway = data.gateway;
    if (gateway.running) {
      dot.className = "dot online";
      title.textContent = "Gateway có phản hồi";
    } else {
      dot.className = "dot offline";
      title.textContent = "Chưa kết nối Gateway";
    }
    message.textContent = gateway.message;
  } catch {
    dot.className = "dot offline";
    title.textContent = "Không kiểm tra được";
    message.textContent = "Không thể liên hệ máy chủ demo. Hãy kiểm tra terminal đang chạy python app.py.";
  } finally {
    checkedAt.textContent = "Kiểm tra lúc " + new Date().toLocaleTimeString("vi-VN");
    refreshButton.disabled = false;
    refreshButton.textContent = "Kiểm tra kết nối";
  }
}

refreshButton.addEventListener("click", checkStatus);
checkStatus();
