"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // @ts-ignore
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }
  
  // @ts-ignore
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
  
    try {
      // Send data to our API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }
  
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      })
  
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Error submitting form:", error)
  
      let errorMessage = "Please try again later."
  
      // Check if the error is an instance of Error
      if (error instanceof Error) {
        errorMessage = error.message || errorMessage
      }
  
      toast({
        title: "Something went wrong",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-[#c392ec]" />,
      title: "Email",
      details: "Geetanshmehta4@outlook.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-[#85d5c8]" />,
      title: "Phone",
      details: "+91 9812975990",
    },
    {
      icon: <MapPin className="h-6 w-6 text-[#c392ec]" />,
      title: "Location",
      details: "Boys Hostel, GGSIPU, New Delhi, 110032",
    },
  ]

  return (
    <section id="contact" ref={ref} className="min-h-screen py-20 relative">
      <motion.div style={{ opacity }} className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#c392ec] to-[#85d5c8]">
            Contact Me
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[#1a1a1a]/60 backdrop-blur-sm border-white/10 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-[#1a1a1a]/80 border-white/10 focus:border-[#c392ec] text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                      className="bg-[#1a1a1a]/80 border-white/10 focus:border-[#c392ec] text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      required
                      className="bg-[#1a1a1a]/80 border-white/10 focus:border-[#c392ec] text-white min-h-[150px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#c392ec] to-[#85d5c8] hover:opacity-90 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card className="bg-[#1a1a1a]/60 backdrop-blur-sm border-white/10 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-8 mb-10">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <div className="p-3 rounded-full bg-white/5">{item.icon}</div>
                      <div>
                        <h4 className="text-lg font-medium text-white">{item.title}</h4>
                        <p className="text-white/70">{item.details}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-medium text-white mb-4">Follow Me</h4>
                  <div className="flex gap-4">
                    {["github", "linkedin", "twitter", "instagram"].map((social, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        whileHover={{ y: -5 }}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#c392ec] hover:to-[#85d5c8] transition-all duration-300"
                      >
                        <span className="sr-only">{social}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}