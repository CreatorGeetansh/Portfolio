"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Users, Lightbulb, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const features = [
    {
      icon: <Users className="h-10 w-10 text-purple-500" />,
      title: "Expert Team",
      description: "Our team of 3D artists, developers, and designers bring years of experience to every project.",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-blue-500" />,
      title: "Innovative Approach",
      description: "We combine cutting-edge technology with creative thinking to deliver unique solutions.",
    },
    {
      icon: <Award className="h-10 w-10 text-cyan-500" />,
      title: "Award Winning",
      description: "Our work has been recognized with multiple industry awards for excellence in 3D design.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section id="about" ref={ref} className="relative min-h-screen flex items-center py-20 px-6">
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            About Me
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            We are a creative studio specializing in immersive 3D experiences that push the boundaries of digital
            design.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-black/40 backdrop-blur-lg border-white/10 hover:border-purple-500/50 transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mb-6 mt-4">
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl p-8 border border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">My Story</h3>
              <p className="text-white/80 mb-4">
                Founded in 2018, our studio began with a simple mission: to create digital experiences that amaze and
                inspire. What started as a small team of passionate creators has grown into a full-service 3D studio
                working with clients worldwide.
              </p>
              <p className="text-white/80">
                We believe in pushing the boundaries of what&apos;s possible in the digital realm, combining technical
                expertise with artistic vision to deliver experiences that stand out in today&apos;s crowded digital
                landscape.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                <motion.div
                  animate={{
                    rotateY: [0, 360],
                    rotateX: [0, 15, 0, -15, 0],
                  }}
                  transition={{
                    rotateY: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    rotateX: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                  className="w-40 h-40 md:w-60 md:h-60 relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl transform rotate-45" />
                  <div className="absolute inset-4 bg-black/80 rounded-xl" />
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                    AI studio
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

