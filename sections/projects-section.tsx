"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowRight, ArrowLeft } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { PresentationControls, Environment, ContactShadows } from "@react-three/drei"

function Model({ path }) {
  // This is a placeholder - in a real app, you'd have actual 3D models
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#c392ec" />
    </mesh>
  )
}

export default function ProjectsSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const [activeProject, setActiveProject] = useState(0)

  const projects = [
    {
      title: "Immersive 3D Product Viewer",
      description:
        "An interactive 3D product visualization tool that allows users to explore products from all angles with realistic lighting and materials.",
      image: "/placeholder.svg?height=400&width=600",
      modelPath: "/model1.glb", // Placeholder
      technologies: ["Three.js", "React", "WebGL", "GSAP"],
      liveLink: "https://project1.com",
      githubLink: "https://github.com/geetansh/project1",
    },
    {
      title: "Virtual Reality Art Gallery",
      description:
        "A VR-compatible web experience showcasing digital art in an immersive virtual gallery space with customizable lighting and environment.",
      image: "/placeholder.svg?height=400&width=600",
      modelPath: "/model2.glb", // Placeholder
      technologies: ["A-Frame", "React", "WebVR", "Blender"],
      liveLink: "https://project2.com",
      githubLink: "https://github.com/geetansh/project2",
    },
    {
      title: "Interactive Data Visualization",
      description:
        "A dynamic data visualization platform that transforms complex datasets into interactive 3D graphs and charts for better insights.",
      image: "/placeholder.svg?height=400&width=600",
      modelPath: "/model3.glb", // Placeholder
      technologies: ["D3.js", "Three.js", "TypeScript", "Node.js"],
      liveLink: "https://project3.com",
      githubLink: "https://github.com/geetansh/project3",
    },
    {
      title: "Augmented Reality Web App",
      description:
        "A web-based AR application that allows users to place virtual objects in their real environment using just their browser.",
      image: "/placeholder.svg?height=400&width=600",
      modelPath: "/model4.glb", // Placeholder
      technologies: ["AR.js", "Three.js", "WebXR", "JavaScript"],
      liveLink: "https://project4.com",
      githubLink: "https://github.com/geetansh/project4",
    },
  ]

  const nextProject = () => {
    setActiveProject((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
  }

  return (
    <section id="projects" ref={ref} className="min-h-screen py-20 relative">
      <motion.div style={{ opacity }} className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#c392ec] to-[#85d5c8]">
            Projects
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">Explore my featured work and creative experiments</p>
        </motion.div>

        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevProject}
              className="rounded-full border-white/20 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Previous project</span>
            </Button>

            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeProject ? "bg-gradient-to-r from-[#c392ec] to-[#85d5c8] w-6" : "bg-white/30"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextProject}
              className="rounded-full border-white/20 text-white hover:bg-white/10"
            >
              <ArrowRight className="h-4 w-4" />
              <span className="sr-only">Next project</span>
            </Button>
          </div>

          <motion.div
            key={activeProject}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            <Card className="bg-[#1a1a1a]/60 backdrop-blur-sm border-white/10 overflow-hidden h-full">
              <div className="h-[300px] md:h-[400px] relative">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <PresentationControls
                    global
                    zoom={0.8}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                  >
                    <Model path={projects[activeProject].modelPath} />
                  </PresentationControls>
                  <Environment preset="city" />
                  <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.4} />
                </Canvas>
              </div>
            </Card>

            <div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-4">{projects[activeProject].title}</h3>
                <p className="text-white/70 mb-6">{projects[activeProject].description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {projects[activeProject].technologies.map((tech, idx) => (
                    <Badge key={idx} className="bg-gradient-to-r from-[#c392ec]/20 to-[#85d5c8]/20 text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-[#c392ec] to-[#85d5c8] hover:opacity-90 text-white" asChild>
                    <a href={projects[activeProject].liveLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>

                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                    <a href={projects[activeProject].githubLink} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                </div>
              </CardContent>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Mini Project 1",
              description: "A small experimental project exploring particle systems and interactive physics.",
              tech: ["Three.js", "JavaScript"],
            },
            {
              title: "Mini Project 2",
              description: "A creative coding experiment with generative art and procedural animations.",
              tech: ["P5.js", "Canvas API"],
            },
            {
              title: "Mini Project 3",
              description: "A UI component library with animated micro-interactions and 3D elements.",
              tech: ["React", "Framer Motion"],
            },
          ].map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="bg-[#1a1a1a]/60 backdrop-blur-sm border-white/10 hover:border-[#c392ec]/50 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <Badge key={idx} className="bg-white/10 text-white">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="ghost" className="text-[#c392ec] hover:text-[#85d5c8] hover:bg-transparent p-0">
                    View Details
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

