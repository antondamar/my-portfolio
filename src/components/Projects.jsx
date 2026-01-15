import React from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import AnimatedImage from './AnimatedImage';

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
    techStack: ["React", "Firebase", "Tailwind CSS", "Recharts", "Render"],
    features: [
        "Real-time cryptocurrency & stock prices",
        "Multi-currency support (USD, CAD, IDR)",
        "Portfolio allocation charts",
        "Transaction history tracking",
        "Profit & Loss calculations"
    ],
    liveUrl: "https://aurum-au.com/",
    githubUrl: "https://github.com/antondamar/aurum"
  }
//   {
//     title: "Codeforces++",
//     description: ".",
//     tags: ["#", "#"],
//     image: "/images/projects/logo-cp.jpg", // Add cover image
//     screenshots: [
//         "/images/projects/#.png",
//         "/images/projects/#.png",
//         "/images/projects/#.png",
//         "/images/projects/#.png"
//     ],
//     techStack: ["#", "#"],
//     features: [
//         "Compare user to user (ini nanti benerin ya semuanya kata katanya)",
//         "Problem recommendations from AI",
//         "What problem to solve next",
//         "Ratings calculator (rank target on the next contest to get xxx ratings)",
//         "..."
//     ],
//     liveUrl: "#",
//     githubUrl: "#"
//   },
//   {
//     title: "Aurum Crypto Insights",
//     description: ".",
//     tags: ["#", "#"],
//     image: "/images/projects/logo-aurum-insights.webp", // Add cover image
//     screenshots: [
//         "/images/projects/#.png",
//         "/images/projects/#.png",
//         "/images/projects/#.png",
//         "/images/projects/#.png"
//     ],
//     techStack: ["#", "#"],
//     features: [
//         "Technical Analysis by AI",
//         "Suggestion on an tokens",
//         "Gather news, sentiment, and technical analysis",
//         "",
//         "..."
//     ],
//     liveUrl: "#",
//     githubUrl: "#"
//   },
//   {
//     title: "Mirror Mirror",
//     description: ".",
//     tags: ["#", "#"],
//     image: "/images/projects/logo-mirror.jpg", // Add cover image
//     screenshots: [
//         "/images/projects/#.png",
//         "/images/projects/#.png",
//         "/images/projects/#.png",
//         "/images/projects/#.png"
//     ],
//     techStack: ["#", "#"],
//     features: [
//         "Fashion check",
//         "Color harmony check",
//         "Style check",
//         "Compliments and roasts",
//         "etc."
//     ],
//     liveUrl: "#",
//     githubUrl: "#"
//   },
//   {
//     title: "UofT P2P Loan",
//     description: "If didn't paid, added to tuition fee etc etc",
//     tags: ["#", "#"],
//     image: "/images/projects/logo-p2p-loan.jpeg",
//     screenshots: [
//         "/images/projects/#.png",
//         "/images/projects/#.png",
//         "/images/projects/#.png",
//         "/images/projects/#.png"
//     ],
//     techStack: ["#", "#"],
//     features: [
//         "Peer-to-peer loan system in UofT",
//         "Available to UofT students only",
//         "Custom interest rates and due date",
//         "etc",
//         "etc"
//     ],
//     liveUrl: "#",
//     githubUrl: "#"
//   }
];

export default function Projects({ setSelectedProject }) {
  // Preload project images when component mounts
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
            onClick={() => setSelectedProject(project)}
          >
            <ProjectCard 
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              onClick={() => setSelectedProject(project)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}