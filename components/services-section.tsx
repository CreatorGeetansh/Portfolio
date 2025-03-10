"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { CuboidIcon as Cube, Monitor, Smartphone, HeadsetIcon as VrHeadset, Layers, Palette } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const services = [
    {
      icon: <Cube className="h-10 w-10" />,
      title: "3D Modeling",
      description:
        "High-quality 3D models for various applications including product visualization, gaming, and architectural visualization.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <Monitor className="h-10 w-10" />,
      title: "Web 3D",
      description:
        "Interactive 3D experiences for websites that engage users and showcase products in an immersive way.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Smartphone className="h-10 w-10" />,
      title: "Mobile AR",
      description: "Augmented reality experiences for mobile devices that blend the digital and physical worlds.",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: <VrHeadset className="h-10 w-10" />,
      title: "VR Experiences",
      description: "Immersive virtual reality environments for gaming, training, education, and marketing.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Layers className="h-10 w-10" />,
      title: "3D Animation",
      description:
        "Dynamic animations that bring products, characters, and environments to life with movement and storytelling.",
      color: "from-pink-500 to-purple-500",
    },
    {
      icon: <Palette className="h-10 w-10" />,
      title: "UI/UX Design",
      description: "User-centered design for 3D interfaces that are intuitive, accessible, and visually stunning.",
      color: "from-orange-500 to-pink-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="services" ref={ref} className="relative min-h-screen flex items-center py-20 px-6">
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            What We Do
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            We offer a comprehensive range of 3D services to bring your vision to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="bg-black/40 backdrop-blur-lg border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full overflow-hidden group">
                <CardContent className="p-6 flex flex-col h-full relative">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <motion.div
                    animate={hoveredCard === index ? { y: -10, scale: 1.1 } : { y: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${service.color}`}
                  >
                    {service.icon}
                  </motion.div>

                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                    {service.title}
                  </h3>

                  <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                    {service.description}
                  </p>

                  <motion.div
                    animate={hoveredCard === index ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10 text-purple-400 font-medium"
                  >
                    Learn more →
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

