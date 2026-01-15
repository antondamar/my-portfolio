import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LinkedInIcon, 
  InstagramIcon, 
  TikTokIcon, 
  XIcon, 
  GmailIcon,
  GitHubIcon 
} from './SocialIcons';

const insights = [
  "I am a Proud Indonesian",
  "Building the world with AI",
  "Tahu Bulat",
  "I don't sell Bitcoin, I HODL",
  "AI is the future"
];

const socials = [
  { 
    Icon: LinkedInIcon, 
    link: "https://linkedin.com/in/ferrelhandoyo", 
    label: "LinkedIn",
    color: "#0A66C2"
  },
  { 
    Icon: InstagramIcon, 
    link: "https://instagram.com/ferrelhandoyo", 
    label: "Instagram",
    color: "#E4405F"
  },
  { 
    Icon: TikTokIcon, 
    link: "https://tiktok.com/@ferrelhandoyo30", 
    label: "TikTok",
    color: "#000000"
  },
  { 
    Icon: XIcon, 
    link: "https://x.com/ferrelhandoyo", 
    label: "X",
    color: "#000000"
  },
  { 
    Icon: GmailIcon, 
    link: "mailto:ferrelhandoyo@gmail.com", 
    label: "Gmail",
    color: "#EA4335"
  },
  { 
    Icon: GitHubIcon, 
    link: "https://github.com/ferrelhandoyo", 
    label: "GitHub",
    color: "#181717"
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % insights.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-32 mb-10"
    >
      <title>Ferrel Handoyo | Portfolio</title>
      
      {/* Simple Social Media Icons */}
      <div className="flex gap-6 mb-6">
        {socials.map((social, idx) => (
          <a 
            key={idx}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative"
          >
            {/* Simple hover animation - just color change */}
            <div className="p-2 rounded-lg transition-all duration-300 
                         bg-transparent group-hover:bg-zinc-900/50
                         border border-transparent group-hover:border-zinc-800">
              <social.Icon 
                className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors duration-300" 
              />
            </div>
            
            {/* Simple tooltip */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-200
                         px-2 py-1 bg-zinc-900 text-xs text-white rounded-md pointer-events-none
                         whitespace-nowrap">
              {social.label}
            </div>
          </a>
        ))}
      </div>
      
      {/* Name and Major */}
      <h1 className="text-6xl font-extrabold tracking-tighter mb-4 text-white">
        Ferrel Himawan Handoyo
      </h1>
      <p className="text-xl text-zinc-400 font-medium mb-4">
        Economics & CS Student <br/> University of Toronto
      </p>
      
      {/* Infinite Fade Animation */}
      <div className="h-10 relative border-y border-zinc-900/50 py-20 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-lg md:text-xl font-bold uppercase tracking-[0.3em] text-zinc-400 text-center absolute w-full"
          >
            {insights[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.header>
  );
}