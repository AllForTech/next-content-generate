'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
  ];

  return (
    <nav className="fixed top-[10px] md:rounded-full right-[50%] md:shadow-md shadow-stone-100 translate-x-[50%] transition-300 w-[98%] mx-auto z-50 md:bg-stone-300/30 bg-opacity-80 backdrop-blur-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/" className="text-2xl font-bold text-black">
            ThinkInk
          </Link>
        </motion.div>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-black hover:text-opacity-70 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:block">
          <Link href="/dashboard">
            <Button size="lg" className="bg-black text-white hover:bg-opacity-80">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white py-4"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-black hover:text-opacity-70 transition-colors" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/dashboard">
              <Button size="lg" className="w-full bg-black text-white hover:bg-opacity-80">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};
