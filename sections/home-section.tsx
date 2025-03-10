"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"

export default function HomeSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/geetansh", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/geetansh", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/geetansh", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, href: "mailto:hello@geetansh.com", label: "Email" },
  ]

  return (
    <section id="home" ref={ref} className="min-h-screen flex flex-col justify-center pt-20 pb-10 relative">
      <motion.div
        style={{ y, opacity }}
        className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      >
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Hi, I'm{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c392ec] to-[#85d5c8]">
                Geetansh
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-white/80 mt-4">Full Stack Developer & 3D Enthusiast</h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/70 text-lg max-w-lg"
          >
            I create immersive digital experiences that blend creativity with cutting-edge technology. Specializing in
            interactive web applications and 3D visualizations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Button className="bg-gradient-to-r from-[#c392ec] to-[#85d5c8] hover:opacity-90 text-white px-6 py-6">
              View My Work
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-6 py-6 relative group overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#c392ec]/20 to-[#85d5c8]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute -inset-1 bg-gradient-to-r from-[#c392ec] to-[#85d5c8] rounded-lg blur opacity-30 group-hover:opacity-50 animate-pulse-glow"></span>
              <span className="relative">Download Resume</span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-4 pt-4"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#c392ec] hover:to-[#85d5c8] transition-all duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="h-[400px] md:h-[500px] w-full">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <Sphere args={[1.5, 64, 64]} position={[0, 0, 0]}>
                <MeshDistortMaterial color="#c392ec" attach="material" distort={0.4} speed={2} roughness={0.2} />
              </Sphere>
            </Float>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full bg-white/10 hover:bg-white/20 border border-white/20 w-12 h-12"
          >
            <ArrowDown />
            <span className="sr-only">Scroll down</span>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

