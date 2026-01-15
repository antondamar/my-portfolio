import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: "Aurum Tracker",
    description: "A real-time investment portfolio tracker with multi-currency support, live price updates, and detailed analytics. tambahin nanti",
    tags: ["React", "Firebase", "Tailwind", "Finance"],
    image: "/images/projects/logo-aurum.jpg", // Add cover image
    screenshots: [
        "/images/projects/aurum-tracker-home.png",
        "/images/projects/aurum-tracker-performance.png",
        "/images/projects/aurum-tracker-analytics.png",
        "/images/projects/aurum-tracker-history.png"
    ],
    techStack: ["React", "Firebase", "Tailwind CSS", "Recharts"],
    features: [
        "Real-time cryptocurrency & stock prices",
        "Multi-currency support (USD, CAD, IDR)",
        "Portfolio allocation charts",
        "Transaction history tracking",
        "Profit & Loss calculations"
    ],
    liveUrl: "https://aurum-au.com/",
    githubUrl: "https://github.com/antondamar/aurum"
  },
  // Add more projects here as needed
];

export default function Projects({ setSelectedProject }) {
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
            onClick={() => setSelectedProject(project)}
          >
            <ProjectCard 
                title={project.title}
                description={project.description}
                tags={project.tags}
                image={project.image}
                onClick={() => setSelectedProject(project)} // Add this
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}