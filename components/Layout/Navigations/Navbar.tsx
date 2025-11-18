'use client';

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { UserAvatar } from './UserAvatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Eye, Code } from 'lucide-react';
import { useGlobalState } from '@/context/GlobalStateContext';
import { useContent } from '@/context/GenerationContext'
import { motion } from 'framer-motion';


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setIsEditingRaw, isEditingRaw } = useGlobalState();
  const { generatedContent, handleDocxExport } = useContent();

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="w-full shadow-lg shadow-black/5"
    >

      <nav className="w-full h-[35px] bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="container mx-auto px-4 flex items-center justify-between h-full">

          {/* Center/Main Links (Empty as per original) */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Placeholder for future primary navigation links */}
          </div>

          {/* Right: Actions and Avatar */}
          <div className={'center gap-5'}>
            {/* Placeholder for Search or other actions */}
            {generatedContent && (
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
            )}

            {/* DocX Export*/}
            {generatedContent && (
              <Button
                onClick={() => handleDocxExport(generatedContent)}
                className={cn(
                  "text-xs px-3 py-3 h-auto rounded-full transition-colors",
                  "bg-white text-black hover:bg-white/80"
                )}
              >
                Export
              </Button>
            )}

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