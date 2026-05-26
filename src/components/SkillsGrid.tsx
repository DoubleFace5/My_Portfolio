import { useState } from "react";
import { SKILLS } from "../data";
import { Skill } from "../types";
import { 
  Smartphone, 
  Server, 
  Database, 
  Layers, 
  Code2, 
  Film, 
  Layout, 
  Binary, 
  BarChart3, 
  Presentation, 
  FileJson, 
  Sparkles,
  Search,
  CheckCircle2
} from "lucide-react";

interface SkillsGridProps {
  onSelectSkillForChat: (skillName: string) => void;
}

export default function SkillsGrid({ onSelectSkillForChat }: SkillsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend & Mobile" },
    { id: "backend", label: "Backend Core" },
    { id: "database", label: "Databases (SQL)" },
    { id: "design", label: "Motion & Design" },
    { id: "other", label: "Data & Office" },
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Smartphone": return <Smartphone className="w-5 h-5 text-ochre" />;
      case "FileJson": return <FileJson className="w-5 h-5 text-ochre" />;
      case "Server": return <Server className="w-5 h-5 text-ochre" />;
      case "Database": return <Database className="w-5 h-5 text-ochre" />;
      case "Layers": return <Layers className="w-5 h-5 text-ochre" />;
      case "Code2": return <Code2 className="w-5 h-5 text-ochre" />;
      case "Film": return <Film className="w-5 h-5 text-ochre animate-pulse" />;
      case "Layout": return <Layout className="w-5 h-5 text-ochre" />;
      case "Binary": return <Binary className="w-5 h-5 text-ochre" />;
      case "BarChart3": return <BarChart3 className="w-5 h-5 text-ochre" />;
      case "Presentation": return <Presentation className="w-5 h-5 text-ochre" />;
      default: return <Code2 className="w-5 h-5 text-ochre" />;
    }
  };

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-16 bg-[#E3CD8B]/10 border-y border-[#E3CD8B]/20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6" id="skills-title-block">
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-sand/80 font-bold block mb-1">Technical Arsenal</span>
            <h2 className="text-3xl md:text-4xl font-serif italic font-extrabold text-sand mt-1">
              Professional <span className="text-amber">Expertise Workspace</span>
            </h2>
            <p className="text-amber/85 text-sm mt-2 max-w-xl font-light">
              An exhaustive deck of my creative developmental software stacks. Select a tech block to prompt the interactive advisor.
            </p>
          </div>

          {/* Core Search bar */}
          <div className="relative w-full max-w-xs self-center" id="skill-search-wrapper">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber/60" />
            <input
              type="text"
              placeholder="Filter specific skill..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#37463D]/80 pl-9 pr-4 py-2.5 rounded-full border border-ochre/40 text-sm font-semibold focus:outline-none focus:border-sand focus:ring-1 focus:ring-sand/25 text-sand placeholder-amber/50"
              id="skill-search-input"
            />
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start" id="skills-category-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-[#C18845] text-[#37463D] shadow-sm font-black"
                  : "bg-clay/55 text-amber/80 border border-ochre/25 hover:bg-clay/90 hover:text-sand"
              }`}
              id={`filter-pill-${cat.id}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dynamic Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="skills-grid-wrapper">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              onClick={() => onSelectSkillForChat(skill.name)}
              className="bg-[#37463D]/80 rounded-3xl p-6 border border-ochre/25 hover:border-sand/60 cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div>
                {/* Card Top: Icon & Category badge */}
                <div className="flex justify-between items-center mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center border border-sand/20 group-hover:bg-[#C18845] transition-all duration-300">
                    {getIconComponent(skill.iconName)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#E3CD8B] bg-sage/40 px-3 py-1 rounded-full font-bold border border-sand/15">
                    {skill.category}
                  </span>
                </div>

                {/* Skill Title & description */}
                <h3 className="font-extrabold text-lg text-sand group-hover:text-amber transition-colors duration-200 flex items-center gap-1.5 font-sans uppercase tracking-wide">
                  {skill.name}
                </h3>
                <p className="text-sm text-amber/80 line-clamp-3 mt-2 group-hover:text-amber transition-colors duration-200 font-light leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Card Bottom: Level gauge & Action indicator */}
              <div className="mt-6 pt-4 border-t border-ochre/20 flex items-center justify-between">
                
                {/* Indicator dots mapping level */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <span
                      key={dot}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        dot <= skill.level
                          ? "bg-sand scale-110"
                          : "bg-clay/55"
                      }`}
                    />
                  ))}
                  <span className="text-[11px] font-mono text-amber/60 ml-1.5">
                    {skill.level}/5
                  </span>
                </div>

                {/* Direct Action Badge */}
                <span className="text-[11px] text-[#E3CD8B] font-bold uppercase tracking-wider transition-all duration-300 opacity-60 group-hover:opacity-100 flex items-center gap-1 group-hover:translate-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-sand animate-pulse" />
                  Ask AI
                </span>
              </div>
            </div>
          ))}

          {filteredSkills.length === 0 && (
            <div className="col-span-full text-center py-12 bg-clay/40 rounded-3xl border border-ochre/25" id="skill-not-found">
              <p className="text-amber/80 text-sm font-light">No skills found matching that criteria.</p>
              <button
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); }}
                className="mt-3 text-xs bg-sage text-sand px-4 py-2 rounded-full hover:bg-ochre transition-all duration-300 uppercase tracking-widest font-bold"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
