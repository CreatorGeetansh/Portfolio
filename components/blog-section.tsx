"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, MessageCircle, Heart, ArrowRight } from "lucide-react"
import ButtonWithTooltip from "@/components/button-with-tooltip"

export default function BlogSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const categories = ["All", "3D Modeling", "AR/VR", "Design", "Technology"]
  const [activeCategory, setActiveCategory] = useState("All")

  const blogPosts = [
    {
      id: 1,
      title: "The Future of 3D Web Experiences",
      excerpt:
        "Exploring how 3D technologies are transforming the way we experience the web and creating more immersive digital environments.",
      category: "3D Modeling",
      image: "/placeholder.svg?height=400&width=600",
      date: "Mar 15, 2023",
      readTime: "8 min read",
      comments: 24,
      likes: 156,
    },
    {
      id: 2,
      title: "Designing for Virtual Reality: Best Practices",
      excerpt:
        "Learn the key principles and techniques for creating compelling and comfortable experiences in virtual reality applications.",
      category: "AR/VR",
      image: "/placeholder.svg?height=400&width=600",
      date: "Feb 28, 2023",
      readTime: "10 min read",
      comments: 18,
      likes: 132,
    },
    {
      id: 3,
      title: "How AI is Revolutionizing 3D Content Creation",
      excerpt:
        "Artificial intelligence tools are making 3D modeling and animation more accessible and efficient. Here's how they're changing the industry.",
      category: "Technology",
      image: "/placeholder.svg?height=400&width=600",
      date: "Apr 5, 2023",
      readTime: "6 min read",
      comments: 31,
      likes: 203,
    },
    {
      id: 4,
      title: "Color Theory in Digital 3D Environments",
      excerpt:
        "Understanding how color theory applies to 3D spaces and how to use color effectively to create mood and direct attention.",
      category: "Design",
      image: "/placeholder.svg?height=400&width=600",
      date: "Jan 20, 2023",
      readTime: "7 min read",
      comments: 12,
      likes: 98,
    },
    {
      id: 5,
      title: "Creating Photorealistic Materials in 3D",
      excerpt:
        "A deep dive into the techniques and tools for creating materials that look and behave like their real-world counterparts.",
      category: "3D Modeling",
      image: "/placeholder.svg?height=400&width=600",
      date: "May 10, 2023",
      readTime: "12 min read",
      comments: 27,
      likes: 176,
    },
    {
      id: 6,
      title: "The Rise of WebXR and What It Means for Developers",
      excerpt:
        "WebXR is making immersive experiences more accessible through the browser. Learn what this means for web developers and content creators.",
      category: "AR/VR",
      image: "/placeholder.svg?height=400&width=600",
      date: "Jun 2, 2023",
      readTime: "9 min read",
      comments: 15,
      likes: 121,
    },
  ]

  const filteredPosts =
    activeCategory === "All" ? blogPosts : blogPosts.filter((post) => post.category === activeCategory)

  return (
    <section id="blog" ref={ref} className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            My Blog
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Discover insights, tutorials, and trends in 3D design and immersive technologies
          </p>

          <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="mt-8">
            <TabsList className="bg-black/40 border border-white/10 backdrop-blur-md p-1 mx-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white data-[state=active]:shadow-md"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-black/40 backdrop-blur-lg border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden h-full flex flex-col">
                <div className="overflow-hidden">
                  <motion.img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                      {post.category}
                    </span>
                    <div className="flex items-center text-white/60 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400 transition-all duration-300">
                    {post.title}
                  </h3>
                </CardHeader>

                <CardContent className="pb-2 flex-grow">
                  <p className="text-white/70">{post.excerpt}</p>
                </CardContent>

                <CardFooter className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-4 text-sm text-white/60">
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </div>
                  </div>

                  <ButtonWithTooltip
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300 p-0"
                    tooltipText="Read full article"
                    icon={ArrowRight}
                  >
                    Read more
                  </ButtonWithTooltip>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ButtonWithTooltip
            className="bg-white/5 hover:bg-white/10 border-2 border-purple-500/30 text-white"
            tooltipText="Browse all blog articles"
          >
            View All Articles
          </ButtonWithTooltip>
        </div>
      </div>
    </section>
  )
}

