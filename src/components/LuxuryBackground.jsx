import React from 'react';

const LuxuryBackground = () => (
  <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-black to-slate-950/50 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[#010203]">
      {[...Array(80)].map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            background: 'white',
            borderRadius: '50%',
            boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(255, 255, 255, 0.9), 0 0 ${Math.random() * 10 + 5}px rgba(191, 219, 254, 0.7)`,
            animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: `-${Math.random() * 3}s`
          }}
        />
      ))}
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes sparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
      }
    `}} />
  </div>
);

export default LuxuryBackground;