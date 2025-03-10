"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export default function FloatingElements() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Create transforms for different elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -45])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      {/* Floating gradient circles */}
      <motion.div
        style={{ y: y1, rotate: rotate1, opacity }}
        className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-gradient-to-r from-[#c392ec]/20 to-[#c392ec]/5 blur-xl"
      />
      <motion.div
        style={{ y: y2, rotate: rotate2, opacity }}
        className="absolute top-[40%] right-[15%] w-40 h-40 rounded-full bg-gradient-to-r from-[#85d5c8]/20 to-[#85d5c8]/5 blur-xl"
      />
      <motion.div
        style={{ y: y3, opacity }}
        className="absolute bottom-[20%] left-[20%] w-24 h-24 rounded-full bg-gradient-to-r from-[#c392ec]/20 to-[#85d5c8]/20 blur-xl"
      />

      {/* Grid lines */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
    </div>
  )
}

