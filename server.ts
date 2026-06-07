import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

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
  1. Flutter & Dart (Expertise in cross-platform mobile frontend)
  2. JS / JavaScript / TypeScript (Dynamic interactions and type-safe development)
  3. React (Modern frontend library for dynamic UIs)
  4. Node.js & Express (Robust server-side REST APIs)
  5. PostgreSQL & Firebase (Relational and Real-time databases)
  6. Oracle SQL (Enterprise query building and DB structures)
  7. PHP (Server scripts and legacy patterns)
  8. After Effects (High-fidelity motion design, visual effects)
  9. HTML & CSS (Tailwind CSS, Grid, Flexbox, custom animations)
  10. Python (Data analysis and scripting)
  11. PowerBI (Interactive data pipelines and dashboards)
  12. Git & JWT (Version control and secure authentication)

Theme color palette utilized on this website:
- Clay Brown (#6A645A)
- Sand/Champagne (#E3CD8B)
- Sage Sage (#5D7052)
- Ochre Gold (#C18845)
- Soft Amber (#F0BE86)

In addition to playing a small nostalgic Canvas game (Snake or Bounce Ball) on her site, users can learn about her custom motion work, database schemas, and academic projects.

Guidelines for your tone and communication:
1. Always be welcoming, polite, and clear.
2. Formulate your answers creatively but match her listed qualifications perfectly. Do NOT fabricate skills or experiences.
3. Keep answers relatively concise and highly readable. Use formatting (e.g. lists or bold tags) where appropriate.
4. If a user asks a question unrelated to Fatma or computer science/design, guide the topic back politely.
`;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for chat endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: "Invalid messages format" });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        res.status(500).json({
          error: "GEMINI_API_KEY environment variable is not configured on the server. Please check the Secrets panel in AI Studio.",
        });
        return;
      }

      // Lazy initialization of GoogleGenAI SDK to avoid module load crash
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Format history messages into model compatible role blocks
      // In @google/genai SDK: role must be 'user' or 'model'
      const formattedContents = messages.map((m) => {
        const mappedRole = m.role === "assistant" || m.role === "model" ? "model" : "user";
        return {
          role: mappedRole,
          parts: [{ text: m.text }],
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_BOT_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const text = response.text || "I was unable to retrieve a response from the model.";
      res.json({ reply: text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: "Failed to communicate with the Gemini AI service.",
        details: error?.message || "Unknown error",
      });
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
