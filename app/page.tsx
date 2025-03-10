"use client"

import { useState, useEffect, Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment, Preload } from "@react-three/drei"
import { AnimatePresence } from "framer-motion"

import LoadingScreen from "@/components/loading-screen"
import Navbar from "@/components/navbar"
import HomeSection from "@/sections/home-section"
import ExperienceSection from "@/sections/experience-section"
import ProjectsSection from "@/sections/projects-section"
import ContactSection from "@/sections/contact-section"
import BlogSection from "@/sections/blog-section"
import FloatingElements from "@/components/floating-elements"
import ScrollProgress from "@/components/scroll-progress"
import ChatbotButton from "@/components/chatbot-button"
import BackgroundScene from "@/components/background-scene"
import CursorFollower from "@/components/cursor-follower"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Determine active section based on scroll position
      const sections = ["home", "experience", "projects", "blog", "contact"]

      for (const section of sections) {
        const element = document.getElementById(section)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative bg-[#1a1a1a] text-white min-h-screen overflow-x-hidden">
      <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>

      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <BackgroundScene scrollY={scrollY} />
            <Environment preset="city" />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <ScrollProgress />
        <Navbar activeSection={activeSection} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <HomeSection />
          <ExperienceSection />
          <ProjectsSection />
          <BlogSection />
          <ContactSection />
        </div>
      </div>

      {/* Interactive Elements */}
      {!isMobile && <CursorFollower />}
      <FloatingElements />
      <ChatbotButton />
    </main>
  )
}

