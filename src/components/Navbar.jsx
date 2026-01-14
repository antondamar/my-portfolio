import React, { useState, useRef, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar({ setView }) {
  const navItems = ["Home", "About", "Projects", "Resume"]

  const containerRef = useRef(null)
  const itemRefs = useRef([])

  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const glassIndex = hoveredIndex ?? activeIndex
  const [glassStyle, setGlassStyle] = useState({ width: 0, x: 0 })

  // Initialize refs with default values
  useLayoutEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, navItems.length)
  }, [])

  // Calculate glass position
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
  }, [glassIndex])

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center p-6">
      <div
        ref={containerRef}
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative bg-zinc-900/40 backdrop-blur-2xl border border-white/10
                   px-2 py-2 rounded-full flex gap-1 shadow-2xl"
      >
        {/* Glass - Always render but with initial zero width */}
        <motion.div
          className="absolute inset-[2px] rounded-full
                     bg-white/10 border border-white/20
                     shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_0_20px_rgba(255,255,255,0.12)]"
          animate={{
            width: glassStyle.width,
            x: glassStyle.x,
            scale: hoveredIndex !== null ? 1.04 : 1
          }}
          initial={{
            width: 0,
            x: 0,
            scale: 1
          }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30
          }}
        />

        {/* Buttons */}
        {navItems.map((item, index) => (
          <button
            key={item}
            ref={el => (itemRefs.current[index] = el)}
            onMouseEnter={() => setHoveredIndex(index)}
            onClick={() => {
              setActiveIndex(index)
              setView(item)
            }}
            className="relative px-6 py-2 rounded-full text-sm font-medium
                       text-zinc-400 hover:text-white transition-colors duration-300
                       whitespace-nowrap min-w-[80px] flex items-center justify-center"
          >
            <span className="relative z-10">{item}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}