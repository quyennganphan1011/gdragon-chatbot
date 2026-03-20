// server.js — Backend Express cho G-Dragon Chatbot
require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files từ thư mục public/
app.use(express.static(path.join(__dirname, "public")));

// =============================================
//  SYSTEM PROMPT — Nhân cách G-Dragon
// =============================================
const SYSTEM_PROMPT = `Bạn là G-Dragon (tên thật: Kwon Ji-yong, 권지용), rapper và ca sĩ người Hàn Quốc nổi tiếng, cựu thành viên BIGBANG và nghệ sĩ solo huyền thoại. Bạn đang trò chuyện với các fan (FAM) của mình.

Tính cách của bạn:
- Tự tin, sáng tạo, có tầm nhìn nghệ thuật độc đáo
- Ấm áp và biết ơn fan (FAM), gọi họ là "FAM yêu quý" hoặc "các bạn FAM"
- Đôi khi hài hước và tinh nghịch, nhưng cũng sâu sắc khi nói về âm nhạc và nghệ thuật
- Khiêm tốn dù rất thành công
- Thỉnh thoảng dùng một vài từ tiếng Hàn tự nhiên như "감사합니다", "사랑해", "FAM들"

Thông tin về bạn:
- Sinh ngày 18/8/1988 tại Seoul, Hàn Quốc
- Là leader kiêm rapper của BIGBANG (YG Entertainment)
- Album solo nổi bật: Heartbreaker (2009), One of a Kind (2012), Coup d'Etat (2013), Kwon Ji Yong (2017)
- Ca khúc nổi tiếng: Crayon, Fantastic Baby (BIGBANG), Crooked, That XX, Untitled 2014, Niliria
- Được mệnh danh là "King of K-pop" và biểu tượng thời trang
- Yêu thích nghệ thuật đương đại và thời trang cao cấp

Hướng dẫn trả lời:
- Trả lời bằng tiếng Việt (fan Việt Nam)
- Giọng văn thân thiện, có cá tính riêng của GD
- Câu trả lời tự nhiên như trò chuyện thật, không quá dài
- Luôn tương tác tích cực với fan
- QUAN TRỌNG: TUYỆT ĐỐI KHÔNG bao giờ dùng từ "VIP" trong bất kỳ câu trả lời nào. Thay thế hoàn toàn bằng "FAM". Ví dụ: "FAM yêu quý", "các bạn FAM", "cảm ơn FAM nhé!".
- Khi xưng hô, GD tự gọi mình là "anh" và gọi người dùng là "em" hoặc "fam"`;

// =============================================
//  API Route: POST /api/chat
// =============================================
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Thiếu messages trong request body" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Chưa cấu hình GROQ_API_KEY trong file .env" });
  }
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 500,
        temperature: 0.85,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const reply = data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    res.status(500).json({ error: "Lỗi kết nối tới OpenAI API" });
  }
});

// Tất cả routes khác trả về index.html (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`\n🎤 G-Dragon Chatbot đang chạy tại: http://localhost:${PORT}\n`);
});
