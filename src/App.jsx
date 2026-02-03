import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/home-folder/Home';
import AwardTimeline from './components/home-folder/AwardTimeline';
import About from './components/about-folder/About';
import Projects from './components/projects-folder/Projects';
import ResumeViewer from './components/cv-folder/ResumeViewer';
import LuxuryBackground from './components/LuxuryBackground';
import ScrollToTop from './components/ScrollToTop';
import ProjectDetail from './components/projects-folder/ProjectDetail';

function App() {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const currentYear = new Date().getFullYear();

  // Keep your asset preloading logic to maintain that high-end feel
  useEffect(() => {
    const criticalImages = ['/images/me.jpeg'];
    let loadedCount = 0;
    
    if (criticalImages.length === 0) {
      setImagesPreloaded(true);
      return;
    }

    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === criticalImages.length) setImagesPreloaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === criticalImages.length) setImagesPreloaded(true);
      };
    });

    const timeout = setTimeout(() => setImagesPreloaded(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (!imagesPreloaded) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-zinc-800 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
            Loading Portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen text-white font-sans relative bg-zinc-950">
        <LuxuryBackground />
        
        {/* Navbar stays visible across all pages */}
        <Navbar />

        <main className="relative z-10 max-w-6xl mx-auto px-6">
          <Routes>
            {/* HOME PAGE: Combines Home and Timeline */}
            <Route path="/" element={
              <>
                <Home />
                <div className="mt-10">
                  <AwardTimeline />
                </div>
                <div className="mt-32 mb-10 flex flex-col items-center text-center">
                  <p className="text-xl text-zinc-400 italic tracking-wide font-light max-w-2xl">
                    "There is nothing impossible to him who will try"
                  </p>
                  <span className="mt-4 text-zinc-500 font-bold uppercase text-[12px] tracking-[0.3em]">
                    — Alexander the Great
                  </span>
                </div>
              </>
            } />

            {/* ABOUT PAGE */}
            <Route path="/about" element={<About />} />
            <Route path="/about/:educationLevel" element={<About />} />

            {/* PROJECTS PAGE */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:projectId" element={<ProjectDetail />} />

            {/* RESUME PAGE */}
            <Route path="/resume" element={
              <div className="pt-32">
                <h1 className="text-6xl font-extrabold tracking-tighter text-white mb-2">
                  Curriculum Vitae
                </h1>
                <ResumeViewer />
              </div>
            } />
          </Routes>

          <footer className="mt-20 pb-6 border-t border-zinc-900 pt-4">
            <div className="flex justify-center items-center">
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                © {currentYear} FERREL HIMAWAN HANDOYO. ALL RIGHTS RESERVED.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </Router>
  );
}

export default App;