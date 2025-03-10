"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import ButtonWithTooltip from "@/components/button-with-tooltip"
import { ArrowRight, Zap, Gauge, Globe, Code, LayoutGrid } from "lucide-react"

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const features = [
    {
      id: "design",
      name: "Design",
      icon: <LayoutGrid className="h-5 w-5" />,
      title: "Cutting-edge 3D Design",
      description:
        "Our design process combines creativity with technical precision to create stunning 3D visuals that captivate and engage.",
      benefits: [
        "Photorealistic 3D rendering",
        "Custom material creation",
        "Advanced lighting techniques",
        "Optimized for performance",
      ],
      image: "/placeholder.svg?height=500&width=800",
    },
    {
      id: "development",
      name: "Development",
      icon: <Code className="h-5 w-5" />,
      title: "Powerful 3D Development",
      description:
        "We build robust 3D applications that perform flawlessly across devices, from high-end workstations to mobile phones.",
      benefits: [
        "Cross-platform compatibility",
        "Optimized for web and mobile",
        "Interactive 3D elements",
        "Custom shaders and effects",
      ],
      image: "/placeholder.svg?height=500&width=800",
    },
    {
      id: "performance",
      name: "Performance",
      icon: <Gauge className="h-5 w-5" />,
      title: "Optimized for Speed",
      description:
        "Our 3D experiences are carefully optimized to deliver smooth performance without compromising on visual quality.",
      benefits: ["Fast loading times", "Smooth animations", "Efficient memory usage", "Progressive loading techniques"],
      image: "/placeholder.svg?height=500&width=800",
    },
    {
      id: "accessibility",
      name: "Accessibility",
      icon: <Globe className="h-5 w-5" />,
      title: "Accessible 3D Experiences",
      description:
        "We believe 3D should be for everyone. Our experiences are designed to be accessible across different devices and abilities.",
      benefits: [
        "Screen reader compatibility",
        "Keyboard navigation",
        "Fallbacks for older devices",
        "Responsive design principles",
      ],
      image: "/placeholder.svg?height=500&width=800",
    },
  ]

  return (
    <section id="features" ref={ref} className="relative py-20 px-6">
      <div className="container mx-auto max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border-purple-500/20">
            Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Why Choose Our 3D Services
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Discover the advantages that set our 3D services apart from the competition
          </p>
        </motion.div>

        <Tabs defaultValue="design" className="w-full">
          <TabsList className="bg-black/40 border border-white/10 backdrop-blur-md p-1 grid grid-cols-2 md:grid-cols-4 gap-1 mb-8">
            {features.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white flex items-center gap-2"
              >
                {feature.icon}
                <span className="hidden md:inline">{feature.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {features.map((feature) => (
            <TabsContent
              key={feature.id}
              value={feature.id}
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
              >
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-white/80 mb-6">{feature.description}</p>

                  <ul className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <div className="mt-1 text-purple-500">
                          <Zap className="h-5 w-5" />
                        </div>
                        <span className="text-white">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <ButtonWithTooltip
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-2 border-white/10"
                    tooltipText={`Learn more about ${feature.name}`}
                    icon={ArrowRight}
                  >
                    Learn More
                  </ButtonWithTooltip>
                </div>

                <div className="rounded-xl overflow-hidden border-2 border-white/10 shadow-xl">
                  <motion.img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto object-cover"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}

