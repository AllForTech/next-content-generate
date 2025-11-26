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
    open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    // --- Enhanced Floating Capsule Container ---
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.1 }}
      className="fixed top-4 right-[50%] z-50 mx-auto w-[96%] max-w-7xl translate-x-[50%] border border-gray-100 bg-white/70 shadow-xl shadow-black/10 backdrop-blur-md md:w-auto md:rounded-full"
    >
      <div className="container mx-auto flex h-16 items-center justify-between gap-5.5 px-6 md:px-5">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link
            href="/"
            className="flex items-center text-xl font-extrabold tracking-tighter text-black"
          >
            <BookOpen className="mr-1.5 h-5 w-5 !text-black" />
            ThinkInk
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center space-x-10 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-black transition-colors hover:text-black"
            >
              {link.label}
              {/* Active/Hover Underline Effect */}
              <span className="absolute bottom-[-5px] left-0 h-[2px] w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100"></span>
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Link href="/sign-up">
            <Button
              size="sm"
              className="bg-black text-white transition-colors duration-300 hover:bg-stone-800"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2 text-black transition-colors hover:bg-neutral-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Animated) */}
      <motion.div
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
        variants={menuVariants}
        className={`absolute left-0 w-full overflow-hidden border-t border-gray-100 bg-white md:hidden ${!isOpen ? 'pointer-events-none' : ''}`}
      >
        <div className="container mx-auto flex flex-col space-y-3 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-1 text-lg font-medium text-black transition-colors hover:text-black"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="w-full bg-black text-white transition-colors duration-300 hover:bg-stone-800"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};
