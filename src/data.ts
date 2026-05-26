import { Skill, Education } from "./types";

export const PORTFOLIO_OWNER = {
  name: "Fatma Mazhoud",
  title: "Full-Stack Developer & Multi-Media Designer",
  email: "fatmamazhoud2005@gmail.com",
  linkedin: "https://www.linkedin.com/in/mazhoud-fatma-7554b41b0/",
  github: "https://github.com/DoubleFace5",
  avatarUrl: "/src/assets/images/fatma_avatar_1779810990652.png",
  bio: "A highly creative and passionate developer specializing in mobile app development, robust full-stack systems, relational databases, and dynamic motion design. I thrive on translating complex concepts into delightful user experiences, blending engineering with aesthetics.",
};

export const SKILLS: Skill[] = [
  {
    name: "Flutter",
    category: "frontend",
    level: 5,
    iconName: "Smartphone",
    description: "Cross-platform mobile engineering with elegant, highly responsive visual layouts.",
  },
  {
    name: "JavaScript",
    category: "frontend",
    level: 5,
    iconName: "FileJson",
    description: "Modern ES6+, async systems, client-side animation, dynamic interaction.",
  },
  {
    name: "Node.js & Express",
    category: "backend",
    level: 4,
    iconName: "Server",
    description: "Robust asynchronous API architecture, server-side logic, and integration flows.",
  },
  {
    name: "PostgreSQL",
    category: "database",
    level: 4,
    iconName: "Database",
    description: "Advanced relational modeling, complex SQL operations, index optimization, and persistence.",
  },
  {
    name: "Oracle SQL",
    category: "database",
    level: 4,
    iconName: "Layers",
    description: "Enterprise relational database design, store procedures, triggers, and query analysis.",
  },
  {
    name: "PHP",
    category: "backend",
    level: 4,
    iconName: "Code2",
    description: "Dynamic server-side web backends, secure sessions, and custom database integrations.",
  },
  {
    name: "After Effects",
    category: "design",
    level: 5,
    iconName: "Film",
    description: "Cinematic visual design, sophisticated motion graphics, and rich timeline keyframe animation.",
  },
  {
    name: "HTML5 & CSS3",
    category: "frontend",
    level: 5,
    iconName: "Layout",
    description: "Semantic structures, custom CSS keyframe animations, Canvas API, and modern layout systems like Grid and Flexbox.",
  },
  {
    name: "Python",
    category: "backend",
    level: 4,
    iconName: "Binary",
    description: "Data processing, automated scripts, backend service support, and quick algorithmic solutions.",
  },
  {
    name: "PowerBI",
    category: "other",
    level: 4,
    iconName: "BarChart3",
    description: "Data visualization pipelines, dashboard modeling, and business analytics intelligence.",
  },
  {
    name: "PowerPoint",
    category: "other",
    level: 5,
    iconName: "Presentation",
    description: "Impactful visual presentations, custom deck design, and high-converting storytelling flows.",
  },
];

export const EDUCATION: Education[] = [
  {
    year: "2024 - 2025",
    institution: "ISITCOM (Institut Supérieur de l'Informatique et des Technologies de la Communication)",
    location: "Sousse, Tunisia",
    degree: "Computer Science (CS) - Year 1",
    details: [
      "Foundations of algorithmic reasoning, structural engineering, and math for computer science.",
      "Hands-on web development with pure JavaScript, HTML5, and database schemas with SQL.",
      "Explored initial UI designs and prototype architectures.",
    ],
  },
  {
    year: "2025 - 2026",
    institution: "ISIM Monastir (Institut Supérieur de l'Informatique de Monastir)",
    location: "Monastir, Tunisia",
    degree: "Computer Science - Year 2",
    details: [
      "Advanced full-stack architectures, Node.js applications, and mobile engineering with Flutter.",
      "Deeper dive into relational database engine optimizations (PostgreSQL and Oracle SQL).",
      "Software lifecycle control, responsive interfaces, and advanced visual styling methodologies.",
    ],
  },
];

export const SYSTEM_BOT_INSTRUCTION = `
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
  7. After Effects (High fidelity motion design, visual effects)
  8. HTML & CSS (Web structures, rich layout styling, custom animations)
  9. Python (Scripting, prototyping, computational logic, data analysis)
  10. PowerBI (Interactive data pipelines and visual dashboards)
  11. PowerPoint (Effective presentations and slides)

Theme color palette utilized on this website:
- Clay Brown (#37463D)
- Sand/Champagne (#E3CD8B)
- Sage Sage (#5D7052)
- Ochre Gold (#C18845)
- Soft Amber (#F0BE86)

In addition to playing a small nostalgic Canvas game (Snake or Bounce Ball) on her site, users can learn about her custom motion work, database schemas, and academic projects.

Guidelines for your tone and communication:
1. Always be welcoming, polite, and clear.
2. Formulate your answers creatively but match her listed qualifications perfectly. Do NOT fabricate skills or experiences (e.g. do not say she worked at Google or Microsoft).
3. Keep answers relatively concise and highly readable. Use formatting (e.g. lists or bold tags) where appropriate.
4. If a user asks a question unrelated to Fatma or computer science/design, guide the topic back politely, e.g., "While I can discuss that, I am primarily here to tell you about Fatma's expertise in Flutter, Full Stack Web development, and After Effects!"
`;
