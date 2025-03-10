"use client"

import type { ElementType, ReactNode } from "react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ButtonWithTooltipProps extends ButtonProps {
  tooltipText: string
  icon?: ElementType<{ className?: string }> // Explicitly type the icon prop
  children: ReactNode
  className?: string
  tooltipSide?: "top" | "right" | "bottom" | "left"
  tooltipAlign?: "start" | "center" | "end"
}

export default function ButtonWithTooltip({
  tooltipText,
  icon: Icon,
  children,
  className,
  tooltipSide = "top",
  tooltipAlign = "center",
  ...props
}: ButtonWithTooltipProps) {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button className={cn("relative group overflow-hidden transition-all duration-300", className)} {...props}>
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600/40 to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:w-full" />
            <span className="relative flex items-center gap-2 z-10">
              {Icon && <Icon className="h-5 w-5" />} {/* No more type error */}
              {children}
            </span>
          </Button>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent
        side={tooltipSide}
        align={tooltipAlign}
        className="bg-black/80 backdrop-blur-sm border border-purple-500/20 text-white"
      >
        {tooltipText}
      </TooltipContent>
    </Tooltip>
  )
}