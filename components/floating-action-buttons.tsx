"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronUp, Search, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import ButtonWithTooltip from "@/components/button-with-tooltip"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function FloatingActionButtons() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)

    // Toggle dark class on the document
    if (newMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div className="fixed right-6 bottom-24 z-50 flex flex-col gap-3">
      <AnimatePresence>
        {window.scrollY > 300 && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <ButtonWithTooltip
              tooltipText="Scroll to top"
              variant="secondary"
              size="icon"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border-2 border-purple-500/30 hover:border-purple-500"
              icon={ChevronUp}
            >
              <span className="sr-only">Scroll to top</span>
            </ButtonWithTooltip>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog>
        <DialogTrigger asChild>
          <div>
            <ButtonWithTooltip
              tooltipText="Search content"
              variant="secondary"
              size="icon"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border-2 border-purple-500/30 hover:border-purple-500"
              icon={Search}
            >
              <span className="sr-only">Search</span>
            </ButtonWithTooltip>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-black/90 backdrop-blur-xl border border-purple-500/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Search our website</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="relative">
              <Input
                placeholder="Type to search..."
                className="bg-white/5 border-white/10 focus:border-purple-500 pl-10 py-6 text-white text-lg"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-sm text-white/60">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {["3D Modeling", "AR/VR", "Web Design", "Animation"].map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-purple-400"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <ButtonWithTooltip
        tooltipText={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        variant="secondary"
        size="icon"
        onClick={toggleDarkMode}
        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border-2 border-purple-500/30 hover:border-purple-500"
        icon={isDarkMode ? Sun : Moon}
      >
        <span className="sr-only">{isDarkMode ? "Light mode" : "Dark mode"}</span>
      </ButtonWithTooltip>
    </div>
  )
}

