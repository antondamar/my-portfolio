import React, { useState, useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Resume", path: "/resume" }
  ]

  const location = useLocation()
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const isInitialMount = useRef(true)

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [glassStyle, setGlassStyle] = useState({ width: 0, x: 0 })

  const activeIndex = navItems.findIndex(item => 
    item.path === "/" 
      ? location.pathname === "/" // Exact match for Home only
      : location.pathname.startsWith(item.path) // "Starts with" for everything else
  );
  const glassIndex = hoveredIndex ?? (activeIndex !== -1 ? activeIndex : 0)

  useLayoutEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, navItems.length)
  }, [navItems.length])

  useLayoutEffect(() => {
    const el = itemRefs.current[glassIndex]
    const container = containerRef.current

    if (!el || !container) return

    const elRect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()

    setGlassStyle({
      width: elRect.width,
      x: elRect.left - containerRect.left
    })

    if (isInitialMount.current) {
      const timeout = setTimeout(() => {
        isInitialMount.current = false
      }, 50)
      return () => clearTimeout(timeout)
    }
  }, [glassIndex])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-6">
      <div
        ref={containerRef}
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/10
                   px-2 py-2 rounded-full flex gap-1 shadow-2xl"
      >
        {/* Animated Glass Selection Indicator */}
        <motion.div
          className="absolute inset-[2px] rounded-full bg-white/10 border border-white/20"
          animate={{
            width: glassStyle.width,
            x: glassStyle.x,
            scale: hoveredIndex !== null ? 1.04 : 1
          }}
          transition={isInitialMount.current ? { duration: 0 } : {
            type: "spring",
            stiffness: 380,
            damping: 30
          }}
        />

        {navItems.map((item, index) => (
          <Link
            key={item.name}
            to={item.path}
            ref={el => (itemRefs.current[index] = el)}
            onMouseEnter={() => setHoveredIndex(index)}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300
                      ${location.pathname === item.path ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
          >
            <span className="relative z-10">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}