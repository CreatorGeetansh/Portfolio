"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi there! I'm Geetansh's AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot typing
    setIsTyping(true);

    try {
      // Send message to our API endpoint
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId,
          message: input,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Save session ID if it's new
      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }

      // Add bot response
      setMessages((prev) => [...prev, { role: "bot", content: data.response }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Sorry, I'm having trouble connecting right now. Please try again later." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={toggleChat}
          className={`w-14 h-14 rounded-full shadow-xl relative ${
            isOpen ? "bg-red-500 hover:bg-red-600" : "bg-gradient-to-r from-[#c392ec] to-[#85d5c8] hover:opacity-90"
          }`}
        >
          {!isOpen && (
            <span className="absolute -inset-1 bg-gradient-to-r from-[#c392ec] to-[#85d5c8] rounded-full blur opacity-30 animate-pulse-glow"></span>
          )}
          <span className="relative z-10">{isOpen ? <X /> : <MessageSquare />}</span>
          <span className="sr-only">{isOpen ? "Close chat" : "Open chat"}</span>
        </Button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-80 md:w-96 bg-[#1a1a1a]/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 overflow-hidden z-50"
          >
            <div className="p-4 bg-gradient-to-r from-[#c392ec] to-[#85d5c8] text-white">
              <h3 className="font-bold">Geetansh's Assistant</h3>
              <p className="text-sm text-white/80">Ask me anything about Geetansh</p>
            </div>

            <ScrollArea className="h-80 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-[#c392ec] to-[#85d5c8] text-white"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      {message.content}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-white/10 rounded-2xl px-4 py-2 text-white">
                      <span className="flex gap-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                          .
                        </span>
                        <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                          .
                        </span>
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="bg-white/5 border-white/10 text-white"
              />
              <Button
                type="submit"
                size="icon"
                className="bg-gradient-to-r from-[#c392ec] to-[#85d5c8] hover:opacity-90"
                disabled={isTyping}
                aria-label="Send message"
              >
                <Send size={18} />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}