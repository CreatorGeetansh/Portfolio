"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import ButtonWithTooltip from "@/components/button-with-tooltip"
import Image from "next/image"

export default function TestimonialsSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Creative Director, VisualWorks",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "Working with 3D Studio transformed our product visualization strategy. Their team delivered exceptional 3D models that helped us increase conversion rates by 40%.",
      rating: 5,
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "CEO, TechVentures",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "The AR experience they created for our app exceeded all expectations. User engagement skyrocketed, and we&apos;ve received incredible feedback from our customers.",
      rating: 5,
    },
    {
      id: 3,
      name: "Michael Rodriguez",
      role: "Marketing Director, FutureGames",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "Their attention to detail and creativity is unmatched. The immersive VR environment they designed has become the cornerstone of our brand experience.",
      rating: 4,
    },
    {
      id: 4,
      name: "Emily Patel",
      role: "Product Manager, InnovateTech",
      image: "/placeholder.svg?height=200&width=200",
      quote:
        "From concept to execution, the team at 3D Studio delivered a flawless 3D web experience that has set a new standard in our industry.",
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  return (
    <section id="testimonials" ref={ref} className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-blue-900/10 z-0"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            What Our Clients Say
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Don&apos;t just take our word for it — hear from our satisfied clients
          </p>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 relative"
          >
            <div className="absolute top-8 right-8 text-purple-500 opacity-20">
              <Quote size={120} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 flex flex-col items-center md:items-start">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-purple-500/30 mb-6">
                  <Image
                    src={testimonials[currentIndex].image || "/placeholder.svg"}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{testimonials[currentIndex].name}</h3>
                <p className="text-white/60 mb-4">{testimonials[currentIndex].role}</p>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < testimonials[currentIndex].rating ? "fill-purple-400 text-purple-400" : "text-gray-600"
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="md:col-span-8">
                <p className="text-xl text-white/90 italic mb-8 relative z-10">
                  &ldquo;{testimonials[currentIndex].quote}&rdquo;
                </p>

                <div className="flex justify-center md:justify-end space-x-4">
                  <ButtonWithTooltip
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border-2 border-white/20 hover:border-purple-500 hover:bg-purple-500/20"
                    tooltipText="Previous testimonial"
                    icon={ChevronLeft}
                  >
                    <span className="sr-only">Previous</span>
                  </ButtonWithTooltip>

                  <ButtonWithTooltip
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full border-2 border-white/20 hover:border-purple-500 hover:bg-purple-500/20"
                    tooltipText="Next testimonial"
                    icon={ChevronRight}
                  >
                    <span className="sr-only">Next</span>
                  </ButtonWithTooltip>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-purple-500 w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

