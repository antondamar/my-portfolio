import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedImage = ({ 
  src, 
  alt, 
  className = '', 
  containerClassName = '',
  objectFit = 'cover',
  eager = false,
  onLoad,
  ...props 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Only check for complete if the component is visible
    if (isVisible && imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, [isVisible]);

  const handleLoad = () => {
    setImageLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Dark gradient background - only visible while image is loading */}
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 z-0" />
      )}
      
      {/* Image that smoothly fades in - only load when visible */}
      {isVisible && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: imageLoaded ? 1 : 0,
          }}
          transition={{ 
            duration: 0.3, // Faster transition
            ease: "easeInOut"
          }}
          className={`w-full h-full relative z-10 ${className}`}
          style={{ objectFit }}
          loading={eager ? "eager" : "lazy"}
          onLoad={handleLoad}
          {...props}
        />
      )}
    </div>
  );
};

export default AnimatedImage;