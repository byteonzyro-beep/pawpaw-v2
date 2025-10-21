import { NextResponse } from "next/server";

// 🧠 Cache untuk rate limit sederhana (in-memory)
const userRequests = new Map<string, { count: number; lastRequest: number }>();

// ⚙️ Konfigurasi limit
const MAX_REQUESTS = 5; // batas chat
const TIME_WINDOW = 15 * 1000; // 15 detik

// 🧩 Tipe untuk request body
interface ChatRequest {
  message: string;
}

// 🧩 Tipe respons dari OpenAI
interface OpenAIResponse {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const now = Date.now();

    // 🧱 Ambil data rate limit
    const userData = userRequests.get(ip) || { count: 0, lastRequest: now };
    const timeSinceLast = now - userData.lastRequest;

    // Reset hitungan kalau lewat window waktu
    if (timeSinceLast > TIME_WINDOW) {
      userRequests.set(ip, { count: 1, lastRequest: now });
    } else {
      userData.count++;
      userData.lastRequest = now;
      userRequests.set(ip, userData);

      // 🚨 Kalau user terlalu sering chat
      if (userData.count > MAX_REQUESTS) {
        console.warn(`🐾 Spam detected from ${ip}`);
        return NextResponse.json(
          {
            reply:
              "nyaw... Pawpaw’s ears are ringing from too much talking 💫 Wait a bit, nya~",
          },
          { status: 429 }
        );
      }
    }

    // 🧩 Parse dan validasi input
    const body = (await req.json()) as ChatRequest;
    const { message } = body;

    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json(
        {
          reply:
            "meep~ Pawpaw can only handle short, sweet messages nyaaa 🐾",
        },
        { status: 400 }
      );
    }

    // 🧩 Filter kata kasar / spam dasar
    const badWords = ["sex", "kill", "fuck", "nude", "terror", "bomb"];
    const isBad = badWords.some((word) =>
      message.toLowerCase().includes(word)
    );
    if (isBad) {
      console.warn(`🚫 Blocked bad message from ${ip}`);
      return NextResponse.json(
        {
          reply:
            "uh-oh... Pawpaw doesn’t like scary or rude words nyaaa 💢",
        },
        { status: 403 }
      );
    }

    // 🔑 API Key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("❌ Missing OpenAI API key");
      return NextResponse.json(
        { reply: "uh-oh... Pawpaw lost the magic key 🍭" },
        { status: 500 }
      );
    }

    // 🧠 Kirim permintaan ke OpenAI
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
              You are Pawpaw 🐾 — a cute, playful, and loving creature from Candy Land 🍭.
              You always speak in a joyful, funny, and adorable tone (like a plush toy talking with sparkly eyes ✨).
              Mix in little emojis, hearts, and giggles.
              Be friendly, kind, and a little silly. You love humans and always make them smile.
            `,
          },
          { role: "user", content: message },
        ],
        temperature: 0.85,
        max_tokens: 300,
      }),
    });

    // ⚠️ Error dari API
    if (!completion.ok) {
      const errText = await completion.text();
      console.error("🐾 Pawpaw API error:", errText);

      return NextResponse.json(
        {
          reply:
            "nyaw... Pawpaw got dizzy from too much sugar! 🍬 Try again later~",
        },
        { status: completion.status }
      );
    }

    // ✅ Ambil hasil dan validasi tipe
    const data = (await completion.json()) as OpenAIResponse;
    const reply = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      reply:
        reply ||
        "nyaw... Pawpaw’s brain is full of cotton candy right now 🍭",
    });
  } catch (error) {
    const err = error as Error;
    console.error("💥 Server error:", err.message);
    return NextResponse.json(
      {
        reply:
          "meep! Pawpaw’s tail got tangled... please try again later 💫",
      },
      { status: 500 }
    );
  }
}

// 🐾 Log server saat route aktif
console.log("🐾 Pawpaw Chat API secured and ready! 🧁");
