import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AwardTimeline from './components/AwardTimeline';
import ResumeViewer from './components/ResumeViewer';
import LiquidBackground from './components/LiquidBackground';
import About from './components/About';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';

function App() {
  // 1. PERSISTENT STATE MANAGEMENT
  // Tracks the main view (Home, About, Projects, Resume)
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('portfolioView') || 'Home';
  });

  // Tracks the currently viewed project detail
  const [selectedProject, setSelectedProject] = useState(() => {
    const saved = localStorage.getItem('selectedProject');
    return saved ? JSON.parse(saved) : null;
  });

  // Tracks the active education section (SD, SMP, SMA, Kuliah)
  const [activeEducation, setActiveEducation] = useState(() => {
    return localStorage.getItem('activeEducation') || null;
  });

  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // 2. SYNCHRONIZE STATE WITH LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem('portfolioView', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('selectedProject', JSON.stringify(selectedProject));
  }, [selectedProject]);

  useEffect(() => {
    localStorage.setItem('activeEducation', activeEducation || "");
  }, [activeEducation]);

  // 3. NAVIGATION WRAPPER
  // This function ensures sub-views (like project details or education) 
  // are reset when clicking a top-level link in the Navbar.
  const handleViewChange = (view) => {
    if (view === 'About') setActiveEducation(null); // Reset to main About me essay
    if (view === 'Projects') setSelectedProject(null); // Reset to Projects grid
    setCurrentView(view);
    window.scrollTo(0, 0); // Always scroll to top on navigation
  };

  // 4. ASSET PRELOADING
  // Ensures high-resolution images are ready before showing the content to prevent flickering
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

  // 5. LOADING SCREEN
  if (!imagesPreloaded) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-zinc-800 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
            Initializing Portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white font-sans relative">
      <LiquidBackground />

      <Navbar setView={handleViewChange} currentView={currentView} />

      <main className="max-w-6xl mx-auto px-6 pb-0 relative z-10">
        {currentView === 'Home' ? (
          <>
            <Hero />
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
        ) : currentView === 'About' ? (
          /* PASSING THE LIFTED STATE PROPS TO ABOUT */
          <About 
            activeSection={activeEducation} 
            setActiveSection={setActiveEducation} 
          />
        ) : currentView === 'Projects' ? (
          selectedProject ? (
            <ProjectDetail 
              project={selectedProject} 
              onBack={() => setSelectedProject(null)} 
            />
          ) : (
            <Projects setSelectedProject={setSelectedProject} />
          )
        ) : currentView === 'Resume' ? (
          <div className="pt-32">
            <h1 className="text-6xl font-extrabold tracking-tighter text-white mb-2">
              Curriculum Vitae
            </h1>
            <ResumeViewer />
          </div>
        ) : (
          <div className="h-[80vh] flex flex-col items-center justify-center">
            <h1 className="text-7xl font-extrabold tracking-tighter text-white">
              {currentView} <span className="text-zinc-700">/ Soon</span>
            </h1>
          </div>
        )}
        
        <footer className="mt-10 pb-6 border-t border-zinc-900 pt-4">
          <div className="flex justify-center items-center">
            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
              © 2026 FERREL HIMAWAN HANDOYO. ALL RIGHTS RESERVED.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;