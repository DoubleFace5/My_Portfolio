import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SkillsGrid from "./components/SkillsGrid";
import EducationTimeline from "./components/EducationTimeline";
import Projects from "./components/Projects";
import GameStation from "./components/GameStation";
import AiChatbot from "./components/AiChatbot";
import { Github, Linkedin, Mail, Heart, Calendar, ArrowUp } from "lucide-react";
import { PORTFOLIO_OWNER } from "./data";

export default function App() {
  const [selectedSkillForChat, setSelectedSkillForChat] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("about");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Scroll handler to track active section for header
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "education", "projects", "arcade", "ai-assistant"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const handleSelectSkillForChat = (skillName: string) => {
    setSelectedSkillForChat(skillName);
    // Smooth scroll down to the chatbot section so they can see the chat starting!
    handleScrollToSection("ai-assistant");
  };

  return (
    <div className="min-h-screen bg-warmbg flex flex-col justify-between selection:bg-ochre selection:text-warmbg" id="app-root">
      
      {/* Dynamic Header Component */}
      <Header onScrollToSection={handleScrollToSection} activeSection={activeSection} />

      {/* Main Sections Body */}
      <main className="flex-grow" id="app-main-content">
        
        {/* Dynamic entrance Hero Section with avatar image */}
        <Hero onScrollToSection={handleScrollToSection} />

        {/* Dynamic interactive Skills Grid connected to AI Advisor */}
        <SkillsGrid onSelectSkillForChat={handleSelectSkillForChat} />

        {/* Education Milestone Timeline */}
        <EducationTimeline />

        {/* New Projects Showcase */}
        <Projects />

        {/* Vintage HTML5 Canvas Dual Game Arcade Hub */}
        <GameStation />

        {/* Gemini Secure AI Chatbot Terminal */}
        <AiChatbot
          initialSkillPrompt={selectedSkillForChat}
          onClearSkillPrompt={() => setSelectedSkillForChat("")}
        />

      </main>

      {/* Elegant Visual Footer */}
      <footer className="bg-clay text-sand border-t border-sand/15 py-12 px-6 md:px-12 mt-16" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Brand Credits */}
          <div className="text-center md:text-left" id="footer-logo-block">
            <h4 className="text-warmbg font-extrabold text-xl tracking-wide">{PORTFOLIO_OWNER.name}</h4>
            <p className="text-xs text-sand/65 mt-1 font-mono">{PORTFOLIO_OWNER.title}</p>
            <p className="text-xs text-sand/40 mt-3 font-mono">
              Designed with care using standard #37463D palette theme.
            </p>
          </div>

          {/* Socials & Connectors */}
          <div className="flex flex-col items-center gap-4" id="footer-center-links">
            <div className="flex gap-4">
              <a
                href={`mailto:${PORTFOLIO_OWNER.email}`}
                className="bg-warmcard/10 text-sand hover:bg-ochre hover:text-warmbg p-3 rounded-full transition-all duration-300"
                title="Send Email"
                id="footer-email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={PORTFOLIO_OWNER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-warmcard/10 text-sand hover:bg-ochre hover:text-warmbg p-3 rounded-full transition-all duration-300"
                title="LinkedIn"
                id="footer-linkedin"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={PORTFOLIO_OWNER.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-warmcard/10 text-sand hover:bg-ochre hover:text-warmbg p-3 rounded-full transition-all duration-300"
                title="GitHub"
                id="footer-github"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
            
            <p className="text-xs text-sand/60 flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-ochre fill-current animate-pulse" />
              <span>in Tunisia &bull; Academic Year 2026</span>
            </p>
          </div>

          {/* Sitemaps Reference links */}
          <div className="text-center md:text-right text-xs text-sand/65 flex flex-col gap-1.5 font-mono" id="footer-links-row">
            <button
              onClick={() => handleScrollToSection("about")}
              className="hover:text-warmbg tracking-wide text-left md:text-right"
              id="footer-link-about"
            >
              ABOUT & BIO
            </button>
            <button
              onClick={() => handleScrollToSection("skills")}
              className="hover:text-warmbg tracking-wide text-left md:text-right"
              id="footer-link-skills"
            >
              DISCOVER SKILLS
            </button>
            <button
              onClick={() => handleScrollToSection("education")}
              className="hover:text-warmbg tracking-wide text-left md:text-right"
              id="footer-link-education"
            >
              ACADEMIC TIMELINE
            </button>
            <button
              onClick={() => handleScrollToSection("projects")}
              className="hover:text-warmbg tracking-wide text-left md:text-right"
              id="footer-link-projects"
            >
              PROJECTS WORKSPACE
            </button>
            <button
              onClick={() => handleScrollToSection("arcade")}
              className="hover:text-warmbg tracking-wide text-left md:text-right"
              id="footer-link-arcade"
            >
              RETRO ARCADE GAMES
            </button>
          </div>

        </div>
      </footer>

      {/* Back to top dynamic button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 bg-ochre cursor-pointer hover:bg-amber text-warmbg hover:text-clay p-3 rounded-2xl shadow-xl border border-sand/25 hover:rotate-6 transition-all z-40"
            title="Scroll To Top"
            id="back-to-top-btn"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
