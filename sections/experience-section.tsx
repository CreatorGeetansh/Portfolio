"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ExperienceSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const experiences = [
    {
      title: "Data Scientist",
      company: "Sentinal",
      period: "February 2025 - present",
      description:
        "Developed responsive web applications with focus on animation and interactive elements. Created custom 3D elements that enhanced user experience.",
      skills: ["Data Engineering", "Postgres", "Data Analysis", "Computer Vision", "NLP"],
    },
    {
      title: "AI/ML Engineer",
      company: "Shoppin'",
      period: "July 2024 - August 2024",
      description:
        "Leading development of interactive web applications using React, Three.js, and Node.js. Implemented 3D visualizations that increased user engagement by 40%.",
      skills: ["Computer Vision", "Fine-tuning", "Fast-API", "Recs System", "Scraping"],
    },
    {
      title: "Web Developer Intern",
      company: "CreativeMinds Agency",
      period: "2018 - 2019",
      description:
        "Assisted in building client websites and web applications. Learned modern web development practices and collaborated with design team.",
      skills: ["HTML5", "CSS3", "JavaScript", "WordPress", "UI/UX"],
    },
  ]

  return (
    <section id="experience" ref={ref} className="min-h-screen py-20 relative">
      <motion.div style={{ opacity }} className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#c392ec] to-[#85d5c8]">
            Experience
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            My professional journey and the skills I've developed along the way
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#c392ec] to-[#85d5c8] opacity-50" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              style={{ y: y }}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`relative mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 ${
                index % 2 === 0 ? "md:text-right" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-[#c392ec] to-[#85d5c8]" />

              {/* Content */}
              <div className={index % 2 === 0 ? "md:col-start-1" : "md:col-start-2"}>
                <Card className="bg-[#1a1a1a]/60 backdrop-blur-sm border-white/10 hover:border-[#c392ec]/50 transition-all duration-300 overflow-hidden h-full">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-[#85d5c8]">{exp.company}</p>
                        <p className="text-white/50 text-sm">{exp.period}</p>
                      </div>
                    </div>
                    <p className="text-white/70 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <Badge key={idx} className="bg-white/10 hover:bg-white/20 text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Empty column for layout */}
              <div className={index % 2 === 0 ? "hidden md:block" : "hidden md:block"} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Skills & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Python",
              "Java",
              "C/C++",
              "JavaScript",
              "Postgres",
              "MongoDb",
              "MySQL",
              "VectorDB",
              "Docker",
              "Kubernetes",
              "Cloud Computing",
              "GraphQL",
              "Recs System",
              "Computer Vision",
              "NLP",
              "Fast-API",
              "Scraping",
              "AWS",
              "GCP",
              "Azure",
              "Go",
              "PowerBI",
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <Badge className="px-4 py-2 bg-gradient-to-r from-[#c392ec]/10 to-[#85d5c8]/10 hover:from-[#c392ec]/20 hover:to-[#85d5c8]/20 text-white border border-white/10">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

