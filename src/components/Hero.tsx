import { motion } from "motion/react";
import { Sparkles, ArrowRight, Gamepad2, Compass, ShieldCheck, Download } from "lucide-react";
import { PORTFOLIO_OWNER } from "../data";
import projectImg from "../assets/images/fatma_mazhoud.png";
import cvFile from "../assets/images/my_CV.pdf";

interface HeroProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  // Safe image path resolution
  const AVATAR_PATH = projectImg;

  return (
    <section id="about" className="py-12 md:py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Bio & Value Proposition */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="lg:col-span-7 flex flex-col gap-6"
          id="hero-intro-column"
        >
          {/* Status Badge */}
          <div className="flex" id="hero-badge-container">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage/20 text-sand text-xs font-bold tracking-widest uppercase border border-sage/40">
              <ShieldCheck className="w-3.5 h-3.5 text-sand animate-pulse" />
              Available for Internships
            </span>
          </div>

          <div id="hero-titles">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif italic font-extrabold tracking-tight text-sand leading-none mb-1">
              {PORTFOLIO_OWNER.name}
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-amber tracking-wide mt-2 font-sans uppercase">
              {PORTFOLIO_OWNER.title}
            </h2>
          </div>

          <p className="text-base sm:text-lg text-amber/90 font-light leading-relaxed max-w-xl" id="hero-bio">
            {PORTFOLIO_OWNER.bio}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-4 py-3.5 border-y border-sand/20 max-w-md my-2" id="hero-mini-stats">
            <div>
              <p className="text-2xl font-black text-sand font-mono">2+</p>
              <p className="text-xs text-amber/70 uppercase tracking-widest">Academic Yrs</p>
            </div>
            <div>
              <p className="text-2xl font-black text-sand font-mono">11+</p>
              <p className="text-xs text-amber/70 uppercase tracking-widest">Core Techs</p>
            </div>
            <div>
              <p className="text-2xl font-black text-sand font-mono">100%</p>
              <p className="text-xs text-amber/70 uppercase tracking-widest">Creative</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center" id="hero-actions-container">
            <button
              onClick={() => onScrollToSection("ai-assistant")}
              className="bg-ochre hover:bg-sand text-clay font-extrabold px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 group cursor-pointer text-xs uppercase tracking-wider"
              id="hero-btn-assistant"
            >
              <Sparkles className="w-4 h-4 text-clay group-hover:rotate-12 transition-transform duration-300" />
              <span>Ask My AI Skill Bot</span>
              <ArrowRight className="w-4 h-4 text-clay group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button
              onClick={() => onScrollToSection("arcade")}
              className="bg-sage hover:bg-[#5D7052]/80 text-sand border border-sand/20 font-extrabold px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 group cursor-pointer text-xs uppercase tracking-wider"
              id="hero-btn-arcade"
            >
              <Gamepad2 className="w-4.5 h-4.5 text-sand group-hover:animate-bounce" />
              <span>Canvas Game Desk</span>
            </button>

            <a
              href={cvFile}
              download="Fatma_Mazhoud_CV.pdf"
              className="bg-clay border border-ochre/40 hover:bg-ochre hover:text-clay text-sand font-extrabold px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2 group cursor-pointer text-xs uppercase tracking-wider"
              id="hero-btn-cv"
            >
              <Download className="w-4 h-4 group-hover:animate-bounce" />
              <span>Download CV</span>
            </a>
          </div>
        </motion.div>

        {/* Right Side: Portrait Avatar Image representation */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="lg:col-span-12 xl:col-span-5 flex justify-center"
          id="hero-image-column"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96" id="hero-avatar-wrapper">
            {/* Ambient decorative glowing blobs matching the palette */}
            <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-sand via-amber to-ochre opacity-30 blur-2xl animate-pulse" />
            
            {/* Framing Container - Styling uses #5D7052 (Sage Green) with #E3CD8B (Sand) */}
            <div className="absolute inset-0 rounded-[2rem] bg-[#5D7052] border-4 border-[#E3CD8B] p-3 shadow-2xl overflow-hidden flex items-center justify-center rotate-1 hover:rotate-0 transition-all duration-500" id="avatar-frame">
              <img
                src={AVATAR_PATH}
                alt="Portrait of Fatma Mazhoud"
                className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Accent Caption Tag */}
            <div 
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-ochre text-[#37463D] px-5 py-2 rounded-full shadow-xl border border-sand/40 flex items-center gap-2 whitespace-nowrap"
              id="avatar-pill"
            >
              <span className="w-2 h-2 rounded-full bg-sand animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest font-black">{PORTFOLIO_OWNER.name}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
