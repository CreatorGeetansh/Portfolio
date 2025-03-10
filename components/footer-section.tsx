"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  GithubIcon,
  YoutubeIcon,
  ArrowUpIcon,
} from "lucide-react"
import ButtonWithTooltip from "@/components/button-with-tooltip"

export default function FooterSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const footerLinks = [
    {
      title: "Company",
      links: [
        { name: "About", href: "#about" },
        { name: "Team", href: "#team" },
        { name: "Careers", href: "#careers" },
        { name: "Blog", href: "#blog" },
      ],
    },
    {
      title: "Services",
      links: [
        { name: "3D Modeling", href: "#services" },
        { name: "Animation", href: "#services" },
        { name: "VR/AR", href: "#services" },
        { name: "Web 3D", href: "#services" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "#" },
        { name: "Tutorials", href: "#" },
        { name: "Case Studies", href: "#" },
        { name: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "#" },
        { name: "Terms", href: "#" },
        { name: "Cookies", href: "#" },
        { name: "Licenses", href: "#" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <FacebookIcon className="h-5 w-5" />, name: "Facebook", href: "#", color: "hover:bg-blue-600" },
    { icon: <TwitterIcon className="h-5 w-5" />, name: "Twitter", href: "#", color: "hover:bg-sky-500" },
    { icon: <InstagramIcon className="h-5 w-5" />, name: "Instagram", href: "#", color: "hover:bg-pink-600" },
    { icon: <LinkedinIcon className="h-5 w-5" />, name: "LinkedIn", href: "#", color: "hover:bg-blue-700" },
    { icon: <GithubIcon className="h-5 w-5" />, name: "GitHub", href: "#", color: "hover:bg-gray-800" },
    { icon: <YoutubeIcon className="h-5 w-5" />, name: "YouTube", href: "#", color: "hover:bg-red-600" },
  ]

  return (
    <footer id="footer" ref={ref} className="relative bg-black border-t border-white/10 py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500 mb-4">
                3D Studio
              </h3>
              <p className="text-white/70 mb-6 max-w-md">
                Creating immersive 3D experiences that blend creativity with cutting-edge technology. Our team is
                dedicated to pushing the boundaries of what&apos;s possible in the digital realm.
              </p>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <ButtonWithTooltip
                    key={index}
                    variant="outline"
                    size="icon"
                    className={`h-10 w-10 rounded-full bg-white/5 border-white/10 ${link.color} hover:text-white hover:border-transparent`}
                    tooltipText={link.name}
                    icon={() => link.icon}
                  >
                    <span className="sr-only">{link.name}</span>
                  </ButtonWithTooltip>
                ))}
              </div>
            </motion.div>
          </div>

          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 * sectionIndex }}
            >
              <h4 className="font-semibold text-lg text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/70 hover:text-purple-400 transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} 3D Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <ButtonWithTooltip
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10"
              tooltipText="Back to top"
              icon={ArrowUpIcon}
            >
              <span className="sr-only">Back to top</span>
            </ButtonWithTooltip>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

