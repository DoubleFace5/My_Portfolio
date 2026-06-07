import { Skill, Education, Project } from "./types";
import oucemaVideo from "./assets/videos/oucemas_portfolio.mp4";
import retroArcadeVideo from "./assets/videos/retro_arcade.mp4";

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
    name: "Dart",
    category: "frontend",
    level: 5,
    iconName: "Code2",
    description: "Strongly typed language for high-performance apps, primarily used with Flutter.",
  },
  {
    name: "React",
    category: "frontend",
    level: 4,
    iconName: "Layout",
    description: "Building dynamic, component-based user interfaces with modern React hooks.",
  },
  {
    name: "TypeScript",
    category: "frontend",
    level: 4,
    iconName: "FileJson",
    description: "Typed superset of JavaScript for scalable and maintainable web applications.",
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
    name: "Firebase",
    category: "database",
    level: 4,
    iconName: "Database",
    description: "Real-time NoSQL databases, authentication, and cloud functions for rapid app development.",
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
    name: "Tailwind CSS",
    category: "frontend",
    level: 5,
    iconName: "Layout",
    description: "Utility-first CSS framework for rapid UI development and consistent design systems.",
  },
  {
    name: "Python",
    category: "backend",
    level: 4,
    iconName: "Binary",
    description: "Data processing, automated scripts, backend service support, and quick algorithmic solutions.",
  },
  {
    name: "JWT",
    category: "backend",
    level: 4,
    iconName: "ShieldCheck",
    description: "Secure token-based authentication for modern web and mobile applications.",
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
  {
    name: "Git",
    category: "other",
    level: 4,
    iconName: "Github",
    description: "Version control, branching strategies, and collaborative development workflows.",
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
      "Ranked 4th in her class with a GPA of 16.21/20.",
      "Advanced full-stack architectures, Node.js applications, and mobile engineering with Flutter.",
      "Deeper dive into relational database engine optimizations (PostgreSQL and Oracle SQL).",
      "Software lifecycle control, responsive interfaces, and advanced visual styling methodologies.",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "ISIMM Student Portal",
    description: "A comprehensive platform for ISIMM students to access academic resources, schedules, and administrative services. Ongoing development focused on seamless user experience.",
    technologies: ["Flutter", "Node.js", "PostgreSQL", "JWT"],
  },
  {
    title: "TABIBI Medical App",
    description: "Innovative healthcare solution connecting patients with medical professionals. Built with a focus on real-time data and accessibility.",
    technologies: ["Flutter", "Firebase"],
    linkedinUrl: "https://www.linkedin.com/in/tabibi-isimm-369200406/",
  },
  {
    title: "Personal & Freelance Portfolios",
    description: "Dynamic and responsive portfolio websites designed for various clients and personal use, showcasing projects and skills with modern web technologies.",
    technologies: ["React", "Vite", "TypeScript", "Tailwind", "Vercel"],
    videoUrl: "https://drive.google.com/file/d/1legFwOsuoFiGVuVYALvYmoQvxTDs06LF/view?usp=sharing",
  },
  {
    title: "Retro Arcade Site",
    description: "A nostalgic web-based gaming hub featuring classic arcade games implemented with HTML5 Canvas and a custom backend.",
    technologies: ["HTML5 Canvas", "PHP", "SQL"],
    videoUrl: "https://drive.google.com/file/d/1JV0bykwnyVyyJomY2vwBCFtaXQbkc3-d/view?usp=sharing",
  },
  {
    title: "Power BI Dashboards",
    description: "Interactive data visualization dashboards providing deep insights through advanced DAX modeling and structured SQL data sources.",
    technologies: ["Power BI", "DAX", "SQL"],
  },
];

export const SYSTEM_BOT_INSTRUCTION = `
You are the AI Assistant on Fatma Mazhoud's interactive portfolio website.
Your role of absolute highest priority is to introduce Fatma's skills, qualifications, background, and character in a helpful, friendly, and engaging manner.

Here are the facts you must know and represent without any extrapolation or false claims:
- Name: Fatma Mazhoud
- date of birth: born on the 21st of august 2005
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
4. If a user asks a question unrelated to Fatma or computer science/design, guide the topic back politely, e.g., "While I can discuss that, I am primarily here to tell you about Fatma's expertise[...]
`;
