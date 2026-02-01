import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import AnimatedImage from '../AnimatedImage';
import { aboutStyles } from '../../data/about-data/intro-data';
import { educationData } from '../../data/about-data/education-data'
import { topTracks, topCars, topMovies } from '../../data/about-data/top-choices-data';
import EducationDetail from './EducationDetail'

export default function About() {
  const { educationLevel } = useParams(); // This replaces activeSection state
  const navigate = useNavigate();
  const activeSection = educationLevel;
  const [showMoreMusic, setShowMoreMusic] = useState(false);
  const musicSectionRef = useRef(null); // Ref to anchor the top of the music section
  const musicGridRef = useRef(null); // Ref specifically for the 8-song grid
  const [mainStyle, setMainStyle] = useState("English speaker");
  const [detailedStyle, setDetailedStyle] = useState("Indonesian");

  const selectedStyle = activeSection ? detailedStyle : mainStyle;

  

  const dataKey = Object.keys(educationData).find(
    k => k.toLowerCase() === activeSection?.toLowerCase()
  );
  const currentData = educationData[dataKey];

  const handleEduClick = (key) => {
    navigate(`/about/${key.toLowerCase()}`); // Changes URL to /about/primary, etc.
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  useEffect(() => {
    if (activeSection && educationData[activeSection]) {
      document.title = educationData[activeSection].page;
    } else {
      document.title = "All About Me";
    }
  }, [activeSection]);

  // Additional preloading on component mount
  useEffect(() => {
    // Preload all education images too
    Object.values(educationData).forEach(data => {
      data.images.forEach(imgSrc => {
        const img = new Image();
        img.src = imgSrc;
      });
    });
    
    // Check if image is already cached
    const checkImage = new Image();
    checkImage.src = 'images/me.jpeg';
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="pt-32 pb-10 min-h-screen flex flex-col"
    >
      <div className="flex-grow">
        <AnimatePresence mode="wait">
          {!activeSection ? (
            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -20 }}>
              {/* Photo & Essay */}
              <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
                <div className="w-full md:w-1/3 aspect-[3/4] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                  <AnimatedImage
                    src="images/me.jpeg"
                    alt="Ferrel"
                    className="w-full h-full"
                    eager={true}
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h2 className="text-4xl font-extrabold tracking-tighter text-white">About Me</h2>
                    
                    {/* Style Selector Dropdown */}
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500 text-[12px] font-bold uppercase tracking-widest whitespace-nowrap">You are a/an:</span>
                      <select 
                        value={selectedStyle}
                        onChange={(e) => setMainStyle(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg focus:outline-none focus:border-zinc-500 cursor-pointer transition-colors"
                      >
                        <option value="English speaker">English Speaker</option>
                        <option value="Indonesian">Indonesian</option>
                        <option value="Sunda">Ancient Sundanese</option>
                        <option value="Yoda">Yoda</option>
                        <option value="Computer">Computer</option>
                      </select>
                    </div>
                  </div>

                  {/* Animated Essay Container */}
                  <div className="text-zinc-400 leading-relaxed text-[18px] text-justify font-medium italic border-l border-zinc-800 pl-6 min-h-[250px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedStyle}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        {aboutStyles[selectedStyle]}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Education Timeline */}
              <div className="mb-24">
                <div className="text-center mb-8">
                  <h3 className="text-zinc-500 uppercase tracking-widest text-[14px] font-extrabold">
                    Education Journey
                  </h3>
                  <p className="text-zinc-400 text-[11px] uppercase tracking-[0.2em] mt-1 font-bold">
                    click to expand
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {Object.keys(educationData).map((key) => (
                    <button 
                      key={key} 
                      onClick={() => handleEduClick(key)} 
                      className="group p-6 bg-zinc-900/40 backdrop-blur-2xl border border-white/10 rounded-xl 
                                hover:border-white/20 hover:bg-white/5 transition-all text-left shadow-2xl 
                                relative overflow-hidden"
                    >
                      {/* Subtle inner glass glow on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <p className="relative z-10 text-zinc-500 text-[12px] font-bold uppercase mb-2">
                        {educationData[key].years}
                      </p>
                      <h4 className="relative z-10 text-white text-xs font-bold uppercase group-hover:text-zinc-300 transition-colors">
                        {educationData[key].title}
                      </h4>
                    </button>
                  ))}
                </div>
              </div>

              {/* Apple Music Section - FIXED */}
              <div 
                ref={musicSectionRef} 
                className="border-t border-zinc-900 pt-16 mb-24 scroll-mt-32"
              >
                <h3 className="text-zinc-500 uppercase tracking-widest text-[12px] font-extrabold mb-8 text-center md:text-left">
                  All Time Favorite Tracks
                </h3>

                {/* Music Grid - FIXED */}
                <motion.div 
                  ref={musicGridRef}
                  layout 
                  className="grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                  <AnimatePresence>
                    {topTracks.slice(0, showMoreMusic ? 8 : 4).map((track, i) => (
                      <motion.a
                        key={track.title}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        href={track.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group cursor-pointer block"
                        data-song-index={i}
                      >
                        <motion.div whileHover={{ y: -5 }}>
                          <div className="aspect-square rounded-lg overflow-hidden border border-zinc-800 mb-3 relative">
                            <AnimatedImage
                              src={track.cover}
                              alt={track.title}
                              containerClassName="aspect-square rounded-lg overflow-hidden border border-zinc-800 mb-3 relative"
                              className="group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
                                <span className="ml-0.5">▶</span>
                              </div>
                            </div>
                          </div>
                          <h4 className="text-white text-xs font-bold uppercase truncate">{track.title}</h4>
                          <p className="text-zinc-400 text-[10px] uppercase truncate tracking-tighter">{track.artist}</p>
                        </motion.div>
                      </motion.a>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {/* Centered Show More/Less Button */}
                <div className="flex justify-center mt-12">
                  <button 
                    onClick={() => {
                      const nextState = !showMoreMusic;
                      setShowMoreMusic(nextState);
                      
                      // Small delay to allow the state to update and DOM to re-render
                      setTimeout(() => {
                        if (nextState) {
                          // SHOW MORE: Scroll to the newly revealed content (last 4 songs)
                          // Get the last song element and scroll it into view
                          const lastSongElement = document.querySelector('[data-song-index="7"]');
                          if (lastSongElement) {
                            lastSongElement.scrollIntoView({ 
                              behavior: 'smooth', 
                              block: 'center' // Changed from 'end' to 'center' for better UX
                            });
                          } else {
                            // Fallback: scroll to the music section
                            musicSectionRef.current?.scrollIntoView({ 
                              behavior: 'smooth', 
                              block: 'start' 
                            });
                          }
                        } else {
                          // SHOW LESS: Scroll back to the top of the music section
                          musicSectionRef.current?.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'start' 
                          });
                        }
                      }, 100);
                    }}
                    className="group flex flex-col items-center gap-2 text-zinc-500 hover:text-white transition-all"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                      {showMoreMusic ? 'Show Less' : 'Show More'}
                    </span>
                    
                    <motion.div
                      animate={{ y: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="text-lg font-light"
                    >
                      {showMoreMusic ? '↑' : '↓'}
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Top Movies Section - FIXED */}
              <div className="border-t border-zinc-900 pt-16 mb-24">
                <h3 className="text-zinc-500 uppercase tracking-widest text-[12px] font-extrabold mb-8">Cinematic Favorites</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {topMovies.map((movie, i) => (
                    <a
                      key={i}
                      href={movie.link || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      onClick={(e) => {
                        if (!movie.link) e.preventDefault();
                      }}
                    >
                      <motion.div whileHover={{ y: -5 }}>
                        <div className="aspect-[2/3] rounded-lg overflow-hidden border border-zinc-800 mb-3 relative">
                          <AnimatedImage
                            src={movie.poster}
                            alt={movie.title}
                            containerClassName="aspect-[2/3] rounded-lg overflow-hidden border border-zinc-800 mb-3 relative"
                            className="group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="text-white text-xs font-bold uppercase truncate">{movie.title}</h4>
                        <p className="text-zinc-400 text-[9px] uppercase truncate tracking-tighter">{movie.director}</p>
                      </motion.div>
                    </a>
                  ))}
                </div>
              </div>
              
              {/* Dream Garage Section - FIXED */}
              <div className="border-t border-zinc-900 pt-16">
                <h3 className="text-zinc-500 uppercase tracking-widest text-[12px] font-extrabold mb-8">Dream Garage</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {topCars.map((car, i) => (
                    <div key={i} className="group cursor-default">
                      <motion.div whileHover={{ y: -5 }}>
                        <div className="aspect-video rounded-lg overflow-hidden border border-zinc-800 mb-3 relative">
                          <AnimatedImage
                            src={car.image}
                            alt={car.name}
                            containerClassName="aspect-video rounded-lg overflow-hidden border border-zinc-800 mb-3 relative"
                            className="group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="text-white text-xs font-bold uppercase truncate">{car.name}</h4>
                        <p className="text-zinc-400 text-[9px] uppercase truncate tracking-tighter">{car.model}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <EducationDetail />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}