"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Calendar } from "lucide-react"

export default function BlogSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const blogPosts = [
    {
      title: "Creating Immersive 3D Experiences with Three.js",
      excerpt:
        "Learn how to build engaging 3D web experiences using Three.js and React, with tips for optimizing performance and enhancing user interaction.",
      date: "June 15, 2023",
      readTime: "8 min read",
      category: "Development",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      title: "The Future of Web Animation: Beyond CSS",
      excerpt:
        "Explore advanced animation techniques using JavaScript libraries like GSAP and Framer Motion to create fluid, physics-based animations.",
      date: "May 22, 2023",
      readTime: "6 min read",
      category: "Design",
      image: "/placeholder.svg?height=300&width=600",
    },
    {
      title: "Building Accessible 3D Web Experiences",
      excerpt:
        "Accessibility considerations when creating 3D web content, ensuring your immersive experiences are usable by everyone.",
      date: "April 10, 2023",
      readTime: "10 min read",
      category: "Accessibility",
      image: "/placeholder.svg?height=300&width=600",
    },
  ]

  return (
    <section id="blog" ref={ref} className="min-h-screen py-20 relative">
      <motion.div style={{ opacity }} className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#c392ec] to-[#85d5c8]">
            Blog
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development and design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              style={{ y: y }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="bg-[#1a1a1a]/60 backdrop-blur-sm border-white/10 hover:border-[#c392ec]/50 transition-all duration-300 h-full flex flex-col">
                <div className="overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <CardContent className="p-6 flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <Badge className="bg-gradient-to-r from-[#c392ec]/20 to-[#85d5c8]/20 text-white">
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-white/50 text-sm">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{post.title}</h3>
                  <p className="text-white/70 mb-4">{post.excerpt}</p>

                  <div className="flex items-center text-white/50 text-sm">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0">
                  <Button variant="ghost" className="text-[#c392ec] hover:text-[#85d5c8] hover:bg-transparent p-0">
                    Read Article
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button className="bg-gradient-to-r from-[#c392ec]/20 to-[#85d5c8]/20 hover:from-[#c392ec]/30 hover:to-[#85d5c8]/30 text-white border border-white/10">
            View All Articles
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

