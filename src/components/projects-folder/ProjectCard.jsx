import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import AnimatedImage from '../AnimatedImage';

const ProjectCard = ({ title, description, tags, image, onClick }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group block p-4 bg-zinc-900/40 border border-white/5 rounded-[32px] 
                 hover:border-white/20 hover:bg-zinc-900/60 transition-all cursor-pointer"
      onClick={onClick}
    >
      {/* Project Image Container - REMOVE ALL BACKGROUNDS HERE */}
      <div className="relative aspect-video mb-6 overflow-hidden rounded-[24px]">
        <AnimatedImage
          src={image}
          alt={title}
          containerClassName="relative aspect-video mb-6 overflow-hidden rounded-[24px]"
          className="transition-transform duration-500 group-hover:scale-105"
          eager={true} // Add eager loading for project cards
        />
        <div className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md 
                        rounded-full border border-white/10 opacity-0 group-hover:opacity-100 
                        transition-opacity">
          <ArrowUpRight size={18} className="text-white" />
        </div>
      </div>
      
      <div className="px-2 pb-4">
        <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 
                                     text-[10px] font-bold uppercase tracking-widest 
                                     rounded-full text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;