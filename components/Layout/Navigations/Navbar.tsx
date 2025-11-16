'use client';

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { UserAvatar } from './UserAvatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, BookOpen, Search, Eye, Code } from 'lucide-react';
import { useGlobalState } from '@/context/GlobalStateContext';
import { motion } from 'framer-motion';

// --- NEW: Top Bar for System Functions ---
const TopBar = ({ isEditingRaw, setIsEditingRaw }) => {
  return (
    <div className="w-full h-10 bg-black text-white/90">
      <div className="container mx-auto px-4 h-full flex items-center justify-between text-xs font-medium">
        {/* Left: Status / Info */}
        <div className="flex items-center space-x-2">
          <span className="text-indigo-400">STATUS:</span>
          <span>Dashboard Active</span>
        </div>

        {/* Right: Raw Editor Toggle (Creative Toggle Button) */}
        <Button
          onClick={() => setIsEditingRaw(prev => !prev)}
          className={cn(
            "text-xs px-3 py-1 h-auto rounded-full transition-colors",
            isEditingRaw
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/30"
              : "bg-white text-black hover:bg-white/80"
          )}
        >
          {isEditingRaw ? <Code className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
          {isEditingRaw ? 'Editing Raw' : 'View Mode'}
        </Button>
      </div>
    </div>
  );
}

// --- Main Navbar Component (Refined) ---
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsEditingRaw, isEditingRaw } = useGlobalState();

  return (
    // Use motion for a subtle entrance, and position it fixed at the top
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full shadow-lg shadow-black/5"
    >
      {/* 1. New Top Bar */}
      {/*<TopBar isEditingRaw={isEditingRaw} setIsEditingRaw={setIsEditingRaw} />*/}

      {/* 2. Main Navigation Bar (Floating Aesthetic) */}
      <nav className="w-full h-14 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between h-full">

          {/* Center/Main Links (Empty as per original) */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Placeholder for future primary navigation links */}
          </div>

          {/* Right: Actions and Avatar */}
          <div className={'center gap-5'}>
            {/* Placeholder for Search or other actions */}
            <Button
              onClick={() => setIsEditingRaw(prev => !prev)}
              className={cn(
                "text-xs px-3 py-3 h-auto rounded-full transition-colors",
                isEditingRaw
                  ? "bg-black hover:bg-stone-700 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-white text-black hover:bg-white/80"
              )}
            >
              {isEditingRaw ? <Code className="h-3 w-3 mr-1" /> : <Eye className="h-3 w-3 mr-1" />}
              {isEditingRaw ? 'Editing' : 'View Mode'}
            </Button>

            {/* Desktop Avatar */}
            <div className="hidden md:flex items-center space-x-4">
              <UserAvatar />
            </div>

            {/* Mobile Menu Button + Mobile Avatar */}
            <div className="md:hidden flex items-center space-x-4">
              <UserAvatar />
              <button onClick={() => setIsOpen(!isOpen)} className="text-black p-1 hover:bg-gray-100 rounded transition-colors">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown (Animated) */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="container mx-auto px-4 flex flex-col space-y-4 py-4">
              {/* Mobile Links would go here */}
              <Link href="/settings" className="text-black font-medium hover:text-indigo-600">Settings</Link>
              <Link href="/help" className="text-black font-medium hover:text-indigo-600">Help</Link>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.div>
  );
};