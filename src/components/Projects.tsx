import { motion } from "motion/react";
import { ExternalLink, Github, Linkedin, PlayCircle } from "lucide-react";
import { PROJECTS } from "../data";

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-widest font-mono text-amber/80 font-bold block mb-1">My Work</span>
        <h2 className="text-4xl md:text-5xl font-serif italic font-extrabold text-sand mt-1">
          Featured <span className="text-amber">Projects</span>
        </h2>
        <div className="w-20 h-1.5 bg-ochre mt-4 rounded-full" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.title}
            variants={itemVariants}
            className="bg-clay/40 rounded-3xl overflow-hidden border border-sand/10 hover:border-ochre/40 transition-all duration-300 group flex flex-col h-full"
          >
            {/* Project Visual Container */}
            <div className="relative aspect-video overflow-hidden bg-clay/60">
              {project.videoUrl ? (
                <video
                  src={project.videoUrl}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sage/20 to-ochre/20 group-hover:scale-110 transition-transform duration-700">
                  <PlayCircle className="w-12 h-12 text-sand/30" />
                </div>
              )}

              {/* Overlay with tech stack */}
              <div className="absolute inset-0 bg-gradient-to-t from-clay to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map(tech => (
                  <span key={tech} className="px-2 py-0.5 rounded-full bg-ochre/80 text-clay text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-sand mb-2 group-hover:text-amber transition-colors duration-300 uppercase tracking-tight">
                {project.title}
              </h3>
              <p className="text-sand/70 text-sm leading-relaxed mb-6 flex-grow font-light">
                {project.description}
              </p>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-sand/10">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sand/60 hover:text-sand transition-colors"
                    title="View GitHub Repository"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.linkedinUrl && (
                  <a
                    href={project.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sand/60 hover:text-sand transition-colors"
                    title="View on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sand/60 hover:text-sand transition-colors"
                    title="View Live Demo"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
                <div className="ml-auto">
                   <div className="flex flex-wrap gap-1 justify-end">
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] text-amber/60 font-mono">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
