'use client';

import { motion } from 'framer-motion';
// Assuming '@/components/ui/button' is available and using Link as a standard anchor replacement
import { Button } from '@/components/ui/button';
// Replaced import from 'next/link' with a standard variable declaration for Link
const Link = (props) => <a {...props} />;
import { Menu, X, BookOpen } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
  ];

  // Variants for the mobile menu animation
  const menuVariants: any = {
    open: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    // --- Enhanced Floating Capsule Container ---
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
      className="fixed top-4 md:rounded-full right-[50%] translate-x-[50%] w-[96%] md:w-auto max-w-7xl mx-auto z-50
                 bg-white/70 backdrop-blur-md border border-gray-100 shadow-xl shadow-black/10"
    >
      <div className="container mx-auto px-6 md:px-5 gap-5.5 flex items-center justify-between h-16">

        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/" className="text-xl font-extrabold text-black tracking-tighter flex items-center">
            <BookOpen className="h-5 w-5 mr-1.5 !text-black" />
            ThinkInk
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-black hover:text-black transition-colors relative group"
            >
              {link.label}
              {/* Active/Hover Underline Effect */}
              <span className="absolute bottom-[-5px] left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link href="/sign-up">
            <Button size="sm" className="bg-black text-white hover:bg-stone-800 transition-colors duration-300">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black p-2 rounded-full hover:bg-neutral-100 transition-colors">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Animated) */}
      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className={`md:hidden absolute left-0 w-full bg-white border-t border-gray-100 overflow-hidden ${!isOpen ? 'pointer-events-none' : ''}`}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-black hover:text-black transition-colors py-1"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link href="/sign-up">
              <Button size="lg" className="w-full bg-black text-white hover:bg-stone-800 transition-colors duration-300">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};