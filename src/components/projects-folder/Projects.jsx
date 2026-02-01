import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import AnimatedImage from '../AnimatedImage';
import { useNavigate } from 'react-router-dom';
import { projects } from '../../data/projects';

export default function Projects() {
  const navigate = useNavigate();

  const handleProjectClick = (projectTitle) => {
    const slug = projectTitle.toLowerCase().replace(/ /g, '-');
    navigate(`/projects/${slug}`);
  };

  React.useEffect(() => {
    projects.forEach(project => {
      if (project.image) {
        const img = new Image();
        img.src = project.image;
      }
    });
  }, []);

  return (
    <section className="pt-32 pb-20">
      <div className="mb-16">
        <title>Projects</title>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-500 mb-4">
          Selected Works
        </h2>
        <p className="text-5xl font-extrabold tracking-tighter text-white">
          Projects
        </p>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={project.title} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="cursor-pointer"
          >
            <ProjectCard 
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              onClick={() => handleProjectClick(project.title)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}