import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Instagram, X, Mail, Music2 } from 'lucide-react';
// Import your social icons here (Github, Linkedin, etc.)


const insights = [
  "I am a Proud Indonesian",
  "Building the world with AI and blockchain",
  "Tahu Bulat",
  "I don't sell Bitcoin, I HODL",
  "I believe that AI and blockchain are the future"
];

const socials = [
    { icon: <Linkedin size={20} />, link: "https://linkedin.com/in/ferrelhandoyo", label: "LinkedIn" },
    { icon: <Instagram size={20} />, link: "https://instagram.com/ferrelhandoyo", label: "Instagram" },
    { icon: <Music2 size={20} />, link: "https://tiktok.com/@ferrelhandoyo30", label: "TikTok" },
    { icon: <X size={20} />, link: "https://x.com/ferrelhandoyo", label: "X" },
    { icon: <Mail size={20} />, link: "mailto:ferrelhandoyo@gmail.com", label: "Gmail" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  // Controls the timing of the fade (4 seconds per phrase)
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
      {/* Socials */}
      <div className="flex gap-6 mb-6 text-zinc-500">
        {socials.map((social, index) => (
          <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            {social.icon}
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
      
      {/* Infinite Fade Animation (Replacing Running Text) */}
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