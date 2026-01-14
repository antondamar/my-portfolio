import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ProjectCard = ({ title, description, tags }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group p-8 bg-zinc-900/50 border border-zinc-800 rounded-3xl hover:border-zinc-700 hover:bg-zinc-900 transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-12">
        <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl" />
        <ArrowUpRight className="text-zinc-600 group-hover:text-white transition-colors" size={20} />
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6">{description}</p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-zinc-800/50 border border-zinc-700/50 text-[10px] uppercase tracking-wider rounded-lg text-zinc-400">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;