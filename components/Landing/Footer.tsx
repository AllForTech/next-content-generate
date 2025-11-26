'use client';

import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, BookOpen } from 'lucide-react';
import Link from 'next/link';

// Dummy Navigation Links to flesh out the footer
const navLinks = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Contact', href: '/contact' },
];

export const Footer = () => {
  return (
    // 1. Dramatic Background Change: Pure Black
    <footer className="border-t border-gray-900 bg-black py-16 text-white">
      <div className="container mx-auto max-w-7xl px-4">
        {/* TOP TIER: Branding and Primary Navigation */}
        <div className="mb-8 flex flex-col items-start justify-between border-b border-gray-800 pb-10 md:flex-row md:items-center">
          {/* Brand/Logo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6 flex items-center text-3xl font-extrabold tracking-tighter text-white md:mb-0"
          >
            <BookOpen className="mr-2 h-6 w-6 text-indigo-500" /> ThinkInk
          </motion.div>

          {/* Navigation Links */}
          <motion.nav
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-8"
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors duration-200 hover:text-indigo-500"
              >
                {link.name}
              </Link>
            ))}
          </motion.nav>
        </div>

        {/* BOTTOM TIER: Copyright and Social Media */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-4 text-sm text-white/60 md:mb-0"
          >
            &copy; {new Date().getFullYear()} ThinkInk, Inc. All rights reserved.
          </motion.div>

          {/* Social Icons (Enhanced Hover) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex space-x-5"
          >
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6 text-white transition-colors duration-200 hover:text-indigo-500" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6 text-white transition-colors duration-200 hover:text-indigo-500" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-white transition-colors duration-200 hover:text-indigo-500" />
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
