import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { educationData } from '../../data/about-data/education-data'
import EducationDetail from './EducationDetail'
import MainAbout from './MainAbout';

export default function About() {
  const { educationLevel } = useParams();
  const navigate = useNavigate();
  const activeSection = educationLevel;

  

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
            <MainAbout />
          ) : (
            <EducationDetail />
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}