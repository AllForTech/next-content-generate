'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const About = () => {
  return (
    <section id="about" className="py-24 bg-black/5 backdrop-blur-md relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* 1. VISUAL & IMPACT COLUMN (Left) - Unchanged */}
          <div className="relative h-96 flex items-center justify-center lg:h-auto lg:p-10">
            {/* The Creative Element: Layered, Stylized Text */}
            <h3
              className="absolute text-[15rem] md:text-[18rem] font-extrabold text-black/5 select-none pointer-events-none
                         transform rotate-[-8deg] -translate-y-1/4 -translate-x-1/4 tracking-tighter leading-none"
            >
              TRUST
            </h3>

            <motion.blockquote
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative z-10 p-8 border-l-4 border-indigo-600 bg-white shadow-2xl rounded-xl max-w-lg"
            >
              <p className="text-2xl font-semibold text-black italic">
                “Intelligence is the ability to adapt to change. Creation is the ability to drive it.”
              </p>
              <footer className="mt-4 text-lg font-medium text-indigo-600">
                — Our Philosophy
              </footer>
            </motion.blockquote>
          </div>

          {/* 2. CONTENT & MISSION COLUMN (Right) - UPDATED TEXT */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-indigo-600 uppercase tracking-widest flex items-center"
            >
              <Sparkles className="h-4 w-4 mr-2" /> The Engine of Productivity
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-extrabold text-black leading-tight"
            >
              Verified speed meets automated delivery.
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl leading-relaxed text-black"
            >
              Our platform is powered by a **Supabase/Drizzle backend** for reliable scheduling and data integrity. We prioritize **factual accuracy** by integrating real-time web search (Tavily/Google) into every generation. This means your content is not only fast and automated but also grounded in up-to-date, verifiable information, making it genuinely impactful.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/dashboard">
                <Button size="lg" className="bg-black text-white hover:bg-indigo-600 hover:shadow-xl transition-all duration-300">
                  See the Automation in Action <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};