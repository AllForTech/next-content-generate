'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Zap, BookOpen } from 'lucide-react'; // Added Zap and BookOpen for visual flair

// --- New Component: Dynamic Background Blob (Optional but Recommended) ---
// This adds subtle, animated color that avoids using a heavy image.
const AnimatedBlob = () => (
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 blur-[150px] bg-indigo-500/30 rounded-full opacity-50 animate-pulse-slow" />
);

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-white overflow-hidden">

      {/* 1. Enhanced Background */}
      <div className="absolute inset-0 bg-grid-black/[0.05] [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]" />
      <AnimatedBlob /> {/* Added animated background effect */}

      <div className="relative z-20 text-center px-4"> {/* Increased Z-index for text clarity */}

        {/*/!* 2. Enhanced Badge (More Polished) *!/*/}
        {/*<motion.div*/}
        {/*  initial={{ opacity: 0, y: -50 }}*/}
        {/*  animate={{ opacity: 1, y: 0 }}*/}
        {/*  transition={{ duration: 0.8 }}*/}
        {/*  className="inline-flex items-center px-3 py-1.5 mb-8 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200/50 rounded-full shadow-md backdrop-blur-sm"*/}
        {/*>*/}
        {/*  <Zap className="h-4 w-4 mr-1.5 text-indigo-500" /> /!* Added icon *!/*/}
        {/*  Powered by Vercel Ai SDK*/}
        {/*</motion.div>*/}

        {/* 3. Improved Typography & Visual Impact */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-extrabold mb-4 bg-clip-text text-black leading-tight"
        >
          ThinkInk
        </motion.h1>

        {/* 4. Refined Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-800 font-normal"
        >
          The ultimate **AI-powered content creation platform**. Generate high-quality articles, blog posts, and more in **seconds**.
        </motion.p>

        {/* 5. Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center space-x-6"
        >
          <Link href="/sign-up">
            <Button
              size="lg" // Increased size for impact (if you have an 'xl' size defined)
              className="bg-black text-white hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03]"
            >
              Start Generating <Zap className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#features">
            <Button
              size="lg"
              variant="link" // Changed to 'link' for a subtle secondary button
              className="text-black hover:text-stone-800 transition-colors"
            >
              <BookOpen className="mr-2 h-4 w-4" /> Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};