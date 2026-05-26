import { GraduationCap, Calendar, MapPin, CheckCircle2, Award } from "lucide-react";
import { EDUCATION } from "../data";

export default function EducationTimeline() {
  return (
    <section id="education" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center mb-16" id="education-title-block">
        <span className="text-xs uppercase tracking-widest font-mono text-sand/80 font-bold block mb-1">Academic Journey</span>
        <h2 className="text-3xl md:text-4xl font-serif italic font-extrabold text-sand mt-1">
          Education & <span className="text-amber font-sans uppercase">Milestones</span>
        </h2>
        <p className="text-amber/80 text-sm mt-3 max-w-lg mx-auto font-light leading-relaxed">
          Tracking my high-level computer science foundations at prominent Tunisian higher education institutes.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative max-w-3xl mx-auto" id="timeline-wrapper">
        
        {/* Central Vertical Connector Line */}
        <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-0.5 bg-ochre/25 -translate-x-1/2" />

        {/* Timeline Blocks */}
        {EDUCATION.map((edu, index) => {
          const isEven = index % 2 === 0;
          // Artistic alternate colors: even cards use custom ochre bg with dark text, odd cards use sage bg with amber text
          const cardBg = isEven ? "bg-[#C18845] text-[#3d3324] border-ochre/35" : "bg-[#5D7052] text-[#F0BE86] border-sand/25";
          const badgeClass = isEven ? "bg-[#37463D]/20 text-[#37463D]" : "bg-clay/50 text-[#E3CD8B]";
          const checkIconColor = isEven ? "text-[#5D7052]" : "text-sand";

          return (
            <div
              key={edu.year}
              className={`relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-0 mb-12 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
              id={`edu-block-${edu.year.replace(/\s+/g, '-')}`}
            >
              
              {/* Event Content Container */}
              <div className="w-full md:w-[45%] pl-10 md:pl-0" id={`edu-card-col-${index}`}>
                <div className={`${cardBg} rounded-3xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 relative group`}>
                  
                  {/* Header Meta (Timeline info) */}
                  <div className={`flex flex-wrap items-center justify-between gap-2 border-b ${isEven ? 'border-[#37463D]/15' : 'border-[#FAF8F5]/15'} pb-3 mb-4`}>
                    <span className={`flex items-center gap-1.5 text-xs font-bold font-mono ${badgeClass} px-3 py-1 rounded-full`}>
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.year}
                    </span>
                    <span className={`flex items-center gap-1 text-xs font-semibold ${isEven ? 'text-[#37463D]/85' : 'text-[#FAF8F5]/75'}`}>
                      <MapPin className="w-3.5 h-3.5" />
                      {edu.location}
                    </span>
                  </div>

                  {/* Institution name & degree */}
                  <h3 className="font-extrabold text-xl tracking-tight leading-snug font-serif italic">
                    {edu.institution}
                  </h3>
                  <p className={`text-xs font-mono uppercase tracking-widest mt-1.5 ${isEven ? 'text-[#3d3324]/80' : 'text-sand/90'}`}>
                    {edu.degree}
                  </p>

                  {/* Specialized details bullets */}
                  <div className="mt-4 flex flex-col gap-2.5 text-xs sm:text-sm font-light leading-relaxed" id="edu-details-bullets">
                    {edu.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${checkIconColor} mt-0.5 flex-shrink-0`} />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Central Circle Badge Pin */}
              <div className="absolute left-0 md:left-1/2 -translate-x-1/2 flex items-center justify-center top-1" id={`edu-pin-${index}`}>
                <div className="w-9 h-9 rounded-full bg-clay border-4 border-ochre flex items-center justify-center text-sand shadow-md group-hover:scale-110 transition-transform duration-300">
                  <GraduationCap className="w-4 h-4" />
                </div>
              </div>

              {/* Empty Spacer Counterbalance Side for screens bigger than md */}
              <div className="hidden md:block w-[45%]" />

            </div>
          );
        })}

        {/* Milestone Badge at the end of Timeline */}
        <div className="relative flex justify-center mt-6" id="timeline-milestone-footer">
          <div className="bg-ochre text-clay px-5 py-2.5 rounded-full shadow-lg border-4 border-clay flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest animate-pulse">
            <Award className="w-4 h-4 text-clay" />
            <span>Advancing Towards Tomorrow</span>
          </div>
        </div>

      </div>
    </section>
  );
}
