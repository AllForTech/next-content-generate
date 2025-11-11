'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-white">
      <div className="absolute inset-0 bg-grid-black/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]" />
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-2 mb-8 text-sm font-semibold text-black bg-white border border-black rounded-full"
        >
          Powered by Google Gemini
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-4 text-black"
        >
          ThinkInk
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-black"
        >
          The ultimate AI-powered content creation platform. Generate high-quality articles, blog posts, and more in seconds.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center space-x-4"
        >
          <Link href="/dashboard">
            <Button size="lg" className="bg-black text-white hover:bg-opacity-80">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="bg-transparent border-black text-black hover:bg-black hover:text-white">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
