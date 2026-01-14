import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AwardTimeline from './components/AwardTimeline';
import ResumeViewer from './components/ResumeViewer';
import LiquidBackground from './components/LiquidBackground';
import About from './components/About';

function App() {
  const [currentView, setCurrentView] = useState('Home');

  useEffect(() => {
    const img = new Image();
    img.src = "/images/me.jpeg";
  }, []);

  return (
    <div className="min-h-screen text-white font-sans relative">
      
      {/* Background (behind everything) */}
      <LiquidBackground />

      <Navbar setView={setCurrentView} />

      {/* Foreground content */}
      <main className="max-w-6xl mx-auto px-6 pb-0 relative z-10">
        {currentView === 'Home' ? (
          <>
            <Hero />

            {/* spacing before timeline */}
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
            <About />
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
        {/* Footer */}
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
