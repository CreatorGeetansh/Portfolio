"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, Check, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import ButtonWithTooltip from "@/components/button-with-tooltip";
import { toast } from "@/hooks/use-toast";

export default function NewsletterSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [email, setEmail] = useState("");
  const [subscriptionType, setSubscriptionType] = useState({
    news: true,
    updates: false,
    events: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setError("");
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSuccess(true);
      setEmail("");
      setSubscriptionType({
        news: true,
        updates: false,
        events: false,
      });

      toast({
        title: "Successfully subscribed!",
        description: "You've been added to our newsletter.",
        variant: "default",
      });
    } catch (_) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" ref={ref} className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20 z-0"></div>

      <div className="container mx-auto max-w-4xl z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              Stay Updated
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Subscribe to our newsletter for the latest 3D trends, tips, and exclusive content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 mb-6">
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email address"
                    className="bg-white/5 border-2 border-white/20 focus:border-purple-500 text-white py-6 pl-4 pr-4 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && (
                    <div className="absolute -bottom-6 left-0 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {error}
                    </div>
                  )}
                </div>
              </div>

              <ButtonWithTooltip
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-2 border-white/10 py-6 px-8 rounded-lg"
                tooltipText="Subscribe to our newsletter"
                icon={success ? Check : Send}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Subscribing...
                  </span>
                ) : success ? (
                  "Subscribed!"
                ) : (
                  "Subscribe"
                )}
              </ButtonWithTooltip>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-center text-sm text-white/70">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="news"
                  checked={subscriptionType.news}
                  onCheckedChange={(checked) => setSubscriptionType((prev) => ({ ...prev, news: checked === true }))}
                  className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label htmlFor="news" className="cursor-pointer">
                  Newsletter & Articles
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="updates"
                  checked={subscriptionType.updates}
                  onCheckedChange={(checked) => setSubscriptionType((prev) => ({ ...prev, updates: checked === true }))}
                  className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label htmlFor="updates" className="cursor-pointer">
                  Product Updates
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="events"
                  checked={subscriptionType.events}
                  onCheckedChange={(checked) => setSubscriptionType((prev) => ({ ...prev, events: checked === true }))}
                  className="data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
                <Label htmlFor="events" className="cursor-pointer">
                  Events & Webinars
                </Label>
              </div>
            </div>

            <div className="mt-4 text-center text-xs text-white/50">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}