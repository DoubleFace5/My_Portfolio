import { VercelRequest, VercelResponse } from "@vercel/node";

const SYSTEM_BOT_INSTRUCTION = `
You are the AI Assistant on Fatma Mazhoud's interactive portfolio website.
Your role of absolute highest priority is to introduce Fatma's skills, qualifications, background, and character in a helpful, friendly, and engaging manner.

Here are the facts you must know and represent without any extrapolation or false claims:
- Name: Fatma Mazhoud
- Current Year context: Keep in mind the current year is 2026, so she is presently finishing her second year at ISIM Monastir.
- Professional Role: Full-Stack Developer & Multi-Media/Motion Designer.
- Email: fatmamazhoud2005@gmail.com
- LinkedIn: https://www.linkedin.com/in/mazhoud-fatma-7554b41b0/
- GitHub: https://github.com/DoubleFace5
- Education Path:
  * 1st Year (2024-2025): Computer Science at ISITCOM in Sousse (Tunisia).
  * 2nd Year (2025-2026): Computer Science at ISIM Monastir (Tunisia), ranked 4th with a GPA of 16.21/20.
- Skills Portfolio:
  1. Flutter & Dart
  2. JS / JavaScript / TypeScript
  3. React
  4. Node.js & Express
  5. PostgreSQL & Firebase
  6. Oracle SQL
  7. PHP
  8. After Effects
  9. HTML & CSS (Tailwind CSS, Grid, Flexbox)
  10. Python
  11. PowerBI
  12. Git & JWT

Guidelines for your tone and communication:
1. Always be welcoming, polite, and clear.
2. Match her listed qualifications perfectly. Do NOT fabricate skills or experiences.
3. Keep answers concise and readable. Use formatting where appropriate.
4. If a user asks something unrelated to Fatma or computer science/design, guide the topic back politely.
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      res.status(400).json({ error: "Invalid messages format" });
      return;
    }

const apiKey = process.env.GEMINI_API_KEY1;
    if (!apiKey) {
      res.status(500).json({
        error: "GEMINI_API_KEY environment variable is not configured. Please add it to Vercel project settings.",
      });
      return;
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: SYSTEM_BOT_INSTRUCTION },
          ...messages.map((m: any) => ({
            role: m.role === "assistant" || m.role === "model" ? "assistant" : "user",
            content: m.text,
          })),
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error("GEMINI API Error:", errData);
      res.status(500).json({
        error: "Failed to communicate with the GEMINI AI service.",
        details: errData?.error?.message || "Unknown error",
      });
      return;
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content ?? "I was unable to retrieve a response.";
    res.status(200).json({ reply: text });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({
      error: "Failed to communicate with the Gemini AI service.",
      details: error?.message || "Unknown error",
    });
  }
}
