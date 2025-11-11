'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="py-8 bg-[#F5F5F5]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-black"
        >
          &copy; {new Date().getFullYear()} ThinkInk. All rights reserved.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex space-x-4 mt-4 md:mt-0"
        >
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="h-6 w-6 text-black hover:text-opacity-70" />
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 text-black hover:text-opacity-70" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-6 w-6 text-black hover:text-opacity-70" />
          </Link>
        </motion.div>
      </div>
    </footer>
  );
};
