import { motion } from "motion/react";
import { Github, Linkedin, Mail, Sparkles, Gamepad2, GraduationCap, Code } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onScrollToSection, activeSection }: HeaderProps) {
  const navItems = [
    { id: "about", label: "About", icon: Code },
    { id: "skills", label: "Skills", icon: Code },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "arcade", label: "Interactive Arcade", icon: Gamepad2 },
    { id: "ai-assistant", label: "AI Advisor", icon: Sparkles },
  ];

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-md bg-clay/90 border-b border-ochre/30 py-4 px-6 md:px-12 flex justify-between items-center"
      id="header-nav"
    >
      {/* Brand Initials / Logo */}
      <div 
        onClick={() => onScrollToSection("about")} 
        className="flex items-center gap-2 cursor-pointer group"
        id="nav-logo"
      >
        <span className="text-2xl font-black italic tracking-wide text-sand select-none group-hover:scale-105 transition-transform duration-300">
          FM.
        </span>
        <div className="hidden sm:block">
          <h3 className="font-bold text-amber tracking-tight group-hover:text-sand transition-colors duration-200 text-sm leading-none">
            {PORTFOLIO_OWNER.name}
          </h3>
          <p className="text-[10px] text-amber/60 font-mono tracking-widest uppercase mt-0.5">Computational Art</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-1.5 bg-clay/55 p-1 rounded-full border border-ochre/20">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onScrollToSection(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                isActive
                  ? "bg-sage text-sand shadow-sm"
                  : "text-amber/80 hover:text-sand hover:bg-[#FAF8F5]/5"
              }`}
              id={`nav-btn-${item.id}`}
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Social Actions / Quick Connects */}
      <div className="flex items-center gap-2.5" id="nav-actions">
        {/* Email */}
        <a
          href={`mailto:${PORTFOLIO_OWNER.email}`}
          className="p-2.5 rounded-full border border-sand/20 bg-clay/40 text-amber hover:bg-sand hover:text-clay hover:border-transparent transition-all duration-300"
          title="Send Email"
          id="social-email"
        >
          <Mail className="w-4 h-4" />
        </a>

        {/* LinkedIn - Design pattern class */}
        <a
          href={PORTFOLIO_OWNER.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-xs font-bold bg-[#C18845] text-[#37463D] rounded-full hover:bg-[#E3CD8B] transition-all duration-300 flex items-center gap-1"
          title="Connect on LinkedIn"
          id="social-linkedin"
        >
          <Linkedin className="w-3.5 h-3.5" />
          <span className="hidden sm:inline uppercase tracking-wider text-[10px]">LinkedIn</span>
        </a>

        {/* GitHub - Design pattern class */}
        <a
          href={PORTFOLIO_OWNER.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 text-xs font-bold border border-[#E3CD8B] rounded-full text-sand hover:bg-[#E3CD8B] hover:text-[#37463D] transition-all duration-300 flex items-center gap-1"
          title="Discover GitHub"
          id="social-github"
        >
          <Github className="w-3.5 h-3.5" />
          <span className="hidden sm:inline uppercase tracking-wider text-[10px]">GitHub</span>
        </a>

        <button
          onClick={() => onScrollToSection("ai-assistant")}
          className="bg-sand hover:bg-amber text-clay font-bold text-[11px] px-3.5 py-2 rounded-full shadow-md transition-all duration-300 flex items-center gap-1.5"
          id="nav-action-chat"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-clay" />
          <span className="uppercase tracking-wider">AI Bot</span>
        </button>
      </div>
    </motion.header>
  );
}
