# 🎤 G-Dragon AI Chatbot

Chatbot AI nhập vai G-Dragon dành cho fan VIP, xây dựng bằng Node.js + Express + OpenAI API.

---

## 📁 Cấu trúc project

```
gdragon-chatbot/
├── public/
│   └── index.html      ← Giao diện web (HTML/CSS/JS)
├── server.js           ← Backend Express + gọi OpenAI API
├── .env                ← Chứa API key (KHÔNG commit lên git)
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Hướng dẫn cài đặt & chạy

### Bước 1 — Cài Node.js
Tải tại: https://nodejs.org (chọn bản LTS)
Kiểm tra: `node -v` và `npm -v` trong terminal

### Bước 2 — Lấy OpenAI API Key
1. Vào https://platform.openai.com/api-keys
2. Đăng ký / đăng nhập
3. Nhấn **"Create new secret key"** → copy key (dạng `sk-...`)
4. Nạp credit vào tài khoản (~$5 dùng rất lâu với gpt-4o-mini)

### Bước 3 — Cấu hình .env
Mở file `.env`, thay dòng này:
```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
Bằng API key thật của bạn.

### Bước 4 — Cài dependencies
Mở terminal trong VS Code (Ctrl + `) rồi chạy:
```bash
npm install
```

### Bước 5 — Chạy server
```bash
npm start
```
Hoặc dùng nodemon (tự reload khi sửa code):
```bash
npm run dev
```

### Bước 6 — Mở trình duyệt
Truy cập: **http://localhost:3000**

---

## 🛠 Tùy chỉnh

| Muốn thay đổi          | Chỉnh ở đâu                              |
|------------------------|------------------------------------------|
| Nhân cách GD           | `SYSTEM_PROMPT` trong `server.js`        |
| Model AI               | `model: "gpt-4o-mini"` trong `server.js` |
| Giao diện / màu sắc    | `:root` trong `public/index.html`        |
| Câu hỏi gợi ý          | `.quick-replies` trong `public/index.html` |
| Port server            | `PORT=3000` trong `.env`                 |

### Đổi model
- `gpt-4o-mini` — Rẻ, nhanh, đủ dùng ✅
- `gpt-4o`      — Mạnh hơn, đắt hơn 💰

---

## ⚠️ Lưu ý bảo mật
- **KHÔNG** commit file `.env` lên GitHub (đã có trong .gitignore)
- API key là thông tin nhạy cảm, chỉ để trên máy cá nhân
- Nếu deploy lên server, dùng biến môi trường của hosting (Vercel, Railway, Render...)

---

## 🌐 Deploy lên internet (tuỳ chọn)

### Railway (miễn phí / dễ nhất)
1. Tạo tài khoản tại https://railway.app
2. New Project → Deploy from GitHub repo
3. Thêm biến môi trường `OPENAI_API_KEY` trong Settings → Variables
4. Done! Bạn có URL public

### Render
1. Tạo tài khoản tại https://render.com
2. New → Web Service → kết nối GitHub repo
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Thêm `OPENAI_API_KEY` trong Environment

---

Made with ❤️ for VIP fans
