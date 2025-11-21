'use client';

import { motion } from 'framer-motion';
import { CalendarCheck, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Component for a single feature card
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: delay }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
  >
    <div className="flex items-center space-x-3 mb-4">
      <div className="p-3 bg-indigo-600 rounded-full text-white">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-bold text-black">{title}</h3>
    </div>
    <p className="text-black/70">{description}</p>
  </motion.div>
);


export const HeroSecondary = () => {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          {/* Subheading */}
          <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
            The Power Behind Your Content
          </p>
          {/* Main Heading */}
          <h2 className="text-5xl md:text-6xl font-extrabold text-black leading-tight">
            Stop guessing, start scheduling.
          </h2>
          {/* Description */}
          <p className="max-w-3xl mx-auto text-xl text-black/80">
            Our platform merges real-time trend data with verifiable AI generation, giving you an unfair advantage in the creator economy.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={CalendarCheck}
            title="Trend-Based Automation"
            description="Schedule jobs to automatically create and publish content based on the latest global or local trending topics (via X API)."
            delay={0.2}
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Verified Accuracy"
            description="Every piece of content is fact-checked against real-time search results (Tavily/Google) to eliminate AI hallucination and build audience trust."
            delay={0.4}
          />
          <FeatureCard
            icon={Zap}
            title="Lightning Fast Engine"
            description="Built on Supabase, Drizzle, and Next.js, our stack is designed for extreme performance, delivering scheduled content without delay."
            delay={0.6}
          />
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/generator">
            <Button size="xl" className="bg-indigo-600 text-white hover:bg-black hover:shadow-2xl transition-all duration-300">
              Create Your First Automated Job <ArrowRight className="ml-3 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};