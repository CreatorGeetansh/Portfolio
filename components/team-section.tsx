"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GithubIcon, LinkedinIcon, TwitterIcon, MailIcon, BriefcaseIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import ButtonWithTooltip from "@/components/button-with-tooltip"

export default function TeamSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const team = [
    {
      id: 1,
      name: "Emma Wilson",
      role: "Creative Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Emma leads our creative vision with over 10 years of experience in 3D design and animation.",
      skills: ["3D Modeling", "Animation", "Creative Direction", "VR Design"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "emma@3dstudio.com",
      },
    },
    {
      id: 2,
      name: "David Chen",
      role: "Technical Director",
      image: "/placeholder.svg?height=400&width=400",
      bio: "David oversees all technical aspects of our projects, bringing expertise in WebGL, Three.js, and real-time rendering.",
      skills: ["WebGL", "Three.js", "Real-time 3D", "Technical Direction"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "david@3dstudio.com",
      },
    },
    {
      id: 3,
      name: "Maya Rodriguez",
      role: "3D Artist",
      image: "/placeholder.svg?height=400&width=400",
      bio: "Maya creates stunning 3D models and environments with an eye for detail that brings digital worlds to life.",
      skills: ["3D Modeling", "Texturing", "Lighting", "Environment Design"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "maya@3dstudio.com",
      },
    },
    {
      id: 4,
      name: "James Taylor",
      role: "AR/VR Developer",
      image: "/placeholder.svg?height=400&width=400",
      bio: "James specializes in creating immersive AR and VR experiences that push the boundaries of interactive technology.",
      skills: ["AR Development", "VR Experiences", "Unity", "WebXR"],
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        email: "james@3dstudio.com",
      },
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
    <section id="team" ref={ref} className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Meet Our Team
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            The talented individuals behind our innovative 3D experiences
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <Card className="bg-black/40 backdrop-blur-lg border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden h-full">
                <CardContent className="p-0 relative">
                  <div className="overflow-hidden aspect-square">
                    <motion.img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500"
                      animate={hoveredMember === member.id ? { scale: 1.05 } : { scale: 1 }}
                    />

                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      initial={{ y: 0 }}
                      animate={hoveredMember === member.id ? { y: -30 } : { y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-bold text-white">{member.name}</h3>
                      <p className="text-purple-300">{member.role}</p>
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/90 via-black/70 to-transparent"
                      initial={{ opacity: 0 }}
                      animate={hoveredMember === member.id ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white/80 mb-4 text-sm">{member.bio}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.skills.map((skill, idx) => (
                          <span key={idx} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-2 justify-center">
                        <ButtonWithTooltip
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full bg-white/10 hover:bg-purple-500/30 hover:text-purple-300"
                          tooltipText={`Twitter: ${member.name}`}
                          icon={TwitterIcon}
                        >
                          <span className="sr-only">Twitter</span>
                        </ButtonWithTooltip>
                        <ButtonWithTooltip
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full bg-white/10 hover:bg-purple-500/30 hover:text-purple-300"
                          tooltipText={`LinkedIn: ${member.name}`}
                          icon={LinkedinIcon}
                        >
                          <span className="sr-only">LinkedIn</span>
                        </ButtonWithTooltip>
                        <ButtonWithTooltip
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full bg-white/10 hover:bg-purple-500/30 hover:text-purple-300"
                          tooltipText={`GitHub: ${member.name}`}
                          icon={GithubIcon}
                        >
                          <span className="sr-only">GitHub</span>
                        </ButtonWithTooltip>
                        <ButtonWithTooltip
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-full bg-white/10 hover:bg-purple-500/30 hover:text-purple-300"
                          tooltipText={`Email: ${member.social.email}`}
                          icon={MailIcon}
                        >
                          <span className="sr-only">Email</span>
                        </ButtonWithTooltip>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-md rounded-2xl border border-white/10 text-center"
        >
          <h3 className="text-2xl font-bold mb-4 text-white">Join Our Team</h3>
          <p className="text-white/80 mb-6 max-w-3xl mx-auto">
            We&apos;re always looking for talented individuals who are passionate about 3D and immersive technologies.
            Check out our current openings or send us your portfolio.
          </p>
          <ButtonWithTooltip
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-2 border-white/10"
            tooltipText="View current job openings"
            icon={BriefcaseIcon}
          >
            View Open Positions
          </ButtonWithTooltip>
        </motion.div>
      </div>
    </section>
  )
}

