"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { HelpCircle, MailIcon } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import ButtonWithTooltip from "@/components/button-with-tooltip"

export default function FaqSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const faqs = [
    {
      question: "What types of 3D services do you offer?",
      answer:
        "We offer a comprehensive range of 3D services including 3D modeling, animation, AR/VR development, web 3D implementation, product visualization, architectural visualization, character design, and more. Our team can help with projects of any size or complexity.",
    },
    {
      question: "How  and more. Our team can help with projects of any size or complexity.",
    },
    {
      question: "How long does a typical 3D project take to complete?",
      answer:
        "Project timelines vary depending on complexity, scope, and specific requirements. A simple 3D model might take a few days, while a complex interactive experience could take several weeks or months. During our initial consultation, we&apos;ll provide you with a detailed timeline based on your project needs.",
    },
    {
      question: "Do you work with clients internationally?",
      answer:
        "Yes! We work with clients from around the world. Our digital workflow and communication systems allow us to collaborate effectively regardless of geographic location. We can schedule meetings across different time zones to ensure smooth project management.",
    },
    {
      question: "What file formats do you deliver 3D models in?",
      answer:
        "We can deliver 3D models in various formats depending on your needs, including OBJ, FBX, GLTF/GLB, USDZ (for AR), STL (for 3D printing), and more. We&apos;ll discuss your requirements and provide the most appropriate formats for your specific use case.",
    },
    {
      question: "Can you help optimize 3D models for web and mobile?",
      answer:
        "We specialize in creating performant 3D experiences for web and mobile platforms. Our optimization process ensures models maintain visual quality while achieving fast loading times and smooth performance on various devices and connection speeds.",
    },
    {
      question: "What information do you need to provide a quote?",
      answer:
        "To provide an accurate quote, we typically need a description of the project, reference images or sketches if available, information about intended use (web, print, AR, etc.), timeline requirements, and any specific technical considerations. The more details you can provide, the more precise our estimate will be.",
    },
  ]

  return (
    <section id="faq" ref={ref} className="relative py-20 px-6">
      <div className="container mx-auto max-w-4xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Find answers to common questions about our services and process
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-white/5 data-[state=open]:bg-gradient-to-r data-[state=open]:from-purple-900/30 data-[state=open]:to-blue-900/30">
                  <div className="flex items-start">
                    <HelpCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0 text-purple-400" />
                    <span className="font-medium text-white">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-white/70">
                  <div className="pl-7">{faq.answer}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-white/80 mb-6">Still have questions? We&apos;re here to help!</p>
            <ButtonWithTooltip
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-2 border-white/10"
              tooltipText="Contact our support team"
              icon={MailIcon}
            >
              Contact Us
            </ButtonWithTooltip>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

