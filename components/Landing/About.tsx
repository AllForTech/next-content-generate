'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const About = () => {
  return (
    <section id="about" className="relative overflow-hidden bg-black/5 py-24 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2"
        >
          {/* 1. VISUAL & IMPACT COLUMN (Left) - Unchanged */}
          <div className="relative flex h-96 items-center justify-center lg:h-auto lg:p-10">
            {/* The Creative Element: Layered, Stylized Text */}
            <h3 className="pointer-events-none absolute -translate-x-1/4 -translate-y-1/4 rotate-[-8deg] transform text-[15rem] leading-none font-extrabold tracking-tighter text-black/5 select-none md:text-[18rem]">
              TRUST
            </h3>

            <motion.blockquote
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative z-10 max-w-lg rounded-xl border-l-4 border-indigo-600 bg-white p-8 shadow-2xl"
            >
              <p className="text-2xl font-semibold text-black italic">
                “Intelligence is the ability to adapt to change. Creation is the ability to drive
                it.”
              </p>
              <footer className="mt-4 text-lg font-medium text-indigo-600">— Our Philosophy</footer>
            </motion.blockquote>
          </div>

          {/* 2. CONTENT & MISSION COLUMN (Right) - UPDATED TEXT */}
          <div className="space-y-8">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center text-sm font-semibold tracking-widest text-indigo-600 uppercase"
            >
              <Sparkles className="mr-2 h-4 w-4" /> The Engine of Productivity
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-5xl leading-tight font-extrabold text-black md:text-6xl"
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
              Our platform is powered by a **Supabase/Drizzle backend** for reliable scheduling and
              data integrity. We prioritize **factual accuracy** by integrating real-time web search
              (Tavily/Google) into every generation. This means your content is not only fast and
              automated but also grounded in up-to-date, verifiable information, making it genuinely
              impactful.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-black text-white transition-all duration-300 hover:bg-indigo-600 hover:shadow-xl"
                >
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
