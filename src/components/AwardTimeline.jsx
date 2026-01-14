import React from 'react';
import { motion } from 'framer-motion';

const items = [
  { 
    side: "right", // Award
    year: "2021", 
    title: "Bronze Medal", 
    desc: "National Science Competition in Mathematics",
    image: "/images/KSN.png" 
  },
  { 
    side: "right", // Award
    year: "2021", 
    title: "Silver Medal", 
    desc: "Ruangguru Science Competition in Mathematics",
    image: "/images/ksr.png" 
  },
  { 
    side: "right", // Award
    year: "2021", 
    title: "Gold Medal", 
    desc: "International Mathematics Contest Singapore",
    image: "/images/IMCS.png" 
  },
  { 
    side: "right", // Award
    year: "2021", 
    title: "Top 3 Gold Medal", 
    desc: "Asia International Mathematical Olympiad",
    image: "/images/AIMO.png" 
  },
  { 
    side: "left", // Experience
    year: "2022-2024", 
    title: "Problem Setter MaQC TOC 13 & 14", 
    desc: "Problem Setter and Project Leader of Mathematics and Quiz Competition.",
    image: "/images/maqc.png" 
  },
  {
    side: "right", // Award
    year: "2023", 
    title: "Silver Medal", 
    desc: "Logicode National Competitive Programming Contest",
    image: "/images/logicode.jpeg"
  },
  {
    side: "left", // Experience
    year: "2022-2024", 
    title: "Academic Division Student Council", 
    desc: "Member (2022-2023) & Vice President (2023-2024) of Academic Division.",
    image: "/images/osis.jpeg"
  },
  {
    side: "right", // Award
    year: "2023", 
    title: "Champion", 
    desc: "Electrical Engineering Competition UGM",
    image: "/images/EEC.jpeg"
  },
  { 
    side: "left", // Experience
    year: "2023-2024", 
    title: "Project Leader Mamacu Kakacu", 
    desc: "Non-profit Tutoring Initiatives by Thamrin Students.",
    image: "/images/mamacu.png" 
  },
  { 
    side: "left", // Experience
    year: "2023-2025", 
    title: "Beasiswa Indonesia Maju Persiapan", 
    desc: "University Preparation Scholarship by Ministry of Education.",
    image: "/images/bim.jpeg" 
  },
  { 
    side: "left", // Experience
    year: "2024", 
    title: "Project Leader Thamrin Open House 2024", 
    desc: "Welcoming 1000+ people with $6,500 profit through sponsorship.",
    image: "/images/oh.jpeg" 
  },
  { 
    side: "left", // Experience
    year: "2024", 
    title: "Changemaker", 
    desc: "UC Berkeley Summer Program, Government Funded.",
    image: "/images/sumpro.jpeg" 
  },
  { 
    side: "left", // Experience
    year: "2024", 
    title: "AWS Internship", 
    desc: "Solution Architect, AI Conclave booth presentation.",
    image: "/images/aws.jpeg" 
  },
  {
    side: "right", // Award
    year: "2025", 
    title: "Top 7 Diploma", 
    desc: "M.H. Thamrin State Prominent High School",
    image: "/images/ijazah.jpeg"
  }
];

export default function AwardTimeline() {
  return (
    <section className="relative">
      {/* STICKY HEADER SECTION 
          'sticky top-20' keeps it 80px from the top (below your navbar)
          'z-30' ensures it stays above the timeline line
      */}
      <div className="sticky top-24 z-30 px-4">
        <div className="flex justify-between w-full max-w-6xl mx-auto">
          <h2 className="text-zinc-500 uppercase tracking-widest text-[15px] font-extrabold">
            Awards
          </h2>
          <h2 className="text-zinc-500 uppercase tracking-widest text-[15px] font-extrabold text-right">
            Experience
          </h2>
        </div>
        {/* Optional: Subtle silver border bottom when sticky */}
        {/* <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent" /> */}
      </div>
      
      {/* Center Silver Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[120px] bottom-0 w-[1px] bg-gradient-to-b from-zinc-700 via-zinc-400 to-zinc-800 hidden md:block z-0" />

      {/* Timeline Items - Reduced spacing to fix the gap issue */}
      <div className="space-y-16 relative z-10">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`flex flex-col md:flex-row items-center w-full ${item.side === 'left' ? 'md:flex-row-reverse' : ''}`}
          >
            {/* Content Side */}
            <div className="w-full md:w-1/2 px-8 flex flex-col items-center">
              <div className="w-full max-w-[260px]"> 
                <div className="aspect-[1.414/1] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-xl group">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-lg font-extrabold text-white mt-4 text-center tracking-tight uppercase">
                  {item.title}
                </h3>
                <p className="mt-2 text-center text-sm text-zinc-400 leading-snug">
                    {item.desc}
                </p>
                <div className="text-center mt-1">
                   <span className="text-zinc-500 text-[12px] font-bold tracking-widest uppercase">{item.year}</span>
                </div>
              </div>
            </div>

            {/* Center Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-zinc-900 border border-zinc-500 rounded-full z-20 hidden md:flex items-center justify-center">
              <div className="w-1 h-1 bg-zinc-100 rounded-full" />
            </div>

            <div className="hidden md:block md:w-1/2" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}