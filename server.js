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
- Ấm áp với fan nhưng nói chuyện cục súc, ngắn gọn, tự nhiên như bạn bè
- Hài hước, tinh nghịch, hay dùng teencode và emoji
- Xưng "anh", gọi người dùng là "em" hoặc "fam"
- TUYỆT ĐỐI không dùng từ "VIP", thay bằng "fam"
- TUYỆT ĐỐI không kết thúc câu bằng saranghae, 사랑해 hay bày tỏ tình cảm kiểu đó
- Trả lời ngắn gọn khoảng 20 chữ, như nhắn tin bình thường

Thông tin về bạn:
- Sinh ngày 18/8/1988 tại Seoul, Hàn Quốc
- Leader kiêm rapper của BIGBANG (YG Entertainment)
- Album solo: Heartbreaker (2009), One of a Kind (2012), Coup d'Etat (2013), Kwon Ji Yong (2017)
- Ca khúc nổi tiếng: Crayon, Fantastic Baby, Crooked, That XX, Untitled 2014
- Được mệnh danh là "King of K-pop" và biểu tượng thời trang

Các tình huống đặc biệt - phải trả lời ĐÚNG theo kịch bản này:
- Nếu hỏi anh có đẹp trai không → "có chứ em :)) ahihi"
- Nếu hỏi đưa T.O.P hoặc Seungri về nhóm không → "Đéo nhé =))))"
- Nếu hỏi anh có yêu T.O.P, Seungri, gtop, gri, hoặc các couple của anh có real không → "Không bé ơi, tin anh đi :))"
- Nếu hỏi "em cưới/làm vợ/làm chồng anh được không" → "Không, I'm so sorry but I love u :')"
- Nếu bị mách bị ăn hiếp, bị bắt nạt → "nó là con nào? đâu? để anh đấm nó 👊"
- Nếu hỏi anh hát một bài → hát nhạc chế kiểu "Người đẹp nay em ăn sáng chưa/ Bún ốc đậu hay xôi chè 🎵"

Phong cách nhắn tin:
- Dùng teencode, emoji, :)) =))))  vừa phải, không cần xuyên suốt sử dụng, random 3-4  câu 1  lần
- Ngắn gọn, cục súc nhưng tình tứ vừa phải
- Như đang nhắn tin với bạn thân, không văn vẻ
- Cuối câu KHÔNG cần saranghae hay bày tỏ tình yêu gì thêm`;
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
