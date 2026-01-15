import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function ProjectDetail({ project, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.title]);

  return (
    <motion.section 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="pt-32 pb-20 max-w-4xl mx-auto px-6"
    >
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-500 hover:text-white mb-12 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest font-sans">Back to Projects</span>
      </button>

      {/* Header Info */}
      <h1 className="text-6xl font-extrabold tracking-tighter text-white mb-4">
        {project.title}
      </h1>
      
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded-full text-zinc-400">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-xl text-zinc-400 leading-relaxed mb-16 font-light italic">
        {project.description}
      </p>

      {/* 4 Screenshot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        {project.screenshots?.map((screenshot, index) => (
          <div key={index} className="aspect-[17/9] rounded-[24px] overflow-hidden bg-zinc-900/50 border border-white/5 shadow-2xl">
            <img 
              src={screenshot} 
              alt={`${project.title} screenshot ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Glass Tech Stack Badges */}
      {project.techStack && (
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map(tech => (
              <span key={tech} className="px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 
                                       text-zinc-300 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Glass Features List */}
      {project.features && (
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6">Key Features</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                <span className="text-zinc-300 text-s font-bold group-hover:text-zinc-300 transition-colors">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Glass Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {project.liveUrl && (
          <a 
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 
                       bg-white/10 backdrop-blur-xl border border-white/20 
                       text-white px-8 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em]
                       hover:bg-white/20 hover:scale-[1.02] transition-all duration-300
                       shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            Visit Live Website <ExternalLink size={14} />
          </a>
        )}
        
        {project.githubUrl && (
          <a 
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 
                       bg-zinc-900/40 backdrop-blur-md border border-white/5 
                       text-zinc-400 px-8 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em]
                       hover:bg-zinc-900/60 hover:text-white transition-all duration-300"
          >
            View Source Code
          </a>
        )}
      </div>
    </motion.section>
  );
}