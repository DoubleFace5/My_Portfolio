var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var SYSTEM_BOT_INSTRUCTION = `
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
  * 2nd Year (2025-2026): Computer Science at ISIM Monastir (Tunisia).
- Skills Portfolio:
  1. Flutter (Expertise in cross-platform mobile frontend)
  2. JS / JavaScript (Dynamic client interactions and canvas)
  3. Node.js & Express (Robust server-side REST APIs)
  4. PostgreSQL (Relational schema modeling and structured storage)
  5. Oracle SQL (Enterprise query building and DB structures)
  6. PHP (Server scripts, dynamic page serving, legacy patterns)
  7. After Effects (High-fidelity motion design, visual effects)
  8. HTML & CSS (Web structures, rich layout styling, custom animations)
  9. Python (Scripting, prototyping, computational logic, data analysis)
  10. PowerBI (Interactive data pipelines and visual dashboards)
  11. PowerPoint (Effective presentations and slides)

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
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
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
          error: "GEMINI_API_KEY environment variable is not configured on the server. Please check the Secrets panel in AI Studio."
        });
        return;
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      const formattedContents = messages.map((m) => {
        const mappedRole = m.role === "assistant" || m.role === "model" ? "model" : "user";
        return {
          role: mappedRole,
          parts: [{ text: m.text }]
        };
      });
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_BOT_INSTRUCTION,
          temperature: 0.7
        }
      });
      const text = response.text || "I was unable to retrieve a response from the model.";
      res.json({ reply: text });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: "Failed to communicate with the Gemini AI service.",
        details: error?.message || "Unknown error"
      });
    }
  });
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: (/* @__PURE__ */ new Date()).toISOString() });
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
//# sourceMappingURL=server.cjs.map
