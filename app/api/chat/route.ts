import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // 🔑 Ambil API key dari environment
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("Missing OpenAI API key");
    }

    // 🧠 Kirim permintaan ke OpenAI API
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // ⚙️ Model stabil & cepat
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
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.8,
        max_tokens: 300,
      }),
    });

    // ⚠️ Jika API error (401, 429, dsb)
    if (!completion.ok) {
      const errText = await completion.text();
      console.error("🐾 Pawpaw API error:", errText);
      return NextResponse.json({
        reply: "nyaw... Pawpaw got dizzy from too much sugar! 🍬 Try again later, meow~",
      });
    }

    // ✅ Ambil hasil dari API
    const data = await completion.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    return NextResponse.json({
      reply: reply || "nyaw... Pawpaw’s brain is full of cotton candy right now 🍭",
    });
  } catch (error: any) {
    console.error("💥 Server error:", error.message);
    return NextResponse.json({
      reply: "meep! Pawpaw’s tail got tangled... please try again later 💫",
    });
  }
}
console.log("🐾 API Key loaded?", !!process.env.OPENAI_API_KEY);
