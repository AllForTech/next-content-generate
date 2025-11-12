'use client';

import React from 'react';
import { cn } from "@/lib/utils";
import { UserAvatar } from './UserAvatar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useGlobalState } from '@/context/GlobalStateContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { handleToggleEdit, isEditingRaw } = useGlobalState();

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
  ];

  return (
    <nav className="w-full h-[40px] bg-white bg-opacity-80 backdrop-blur-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-2 h-full">
        {/*<Link href="/" className="text-2xl font-bold text-black">*/}
        {/*  ThinkInk*/}
        {/*</Link>*/}
        <div className="hidden md:flex items-center space-x-8">
          {/*{navLinks.map((link) => (*/}
          {/*  <Link key={link.href} href={link.href} className="text-black hover:text-opacity-70 transition-colors">*/}
          {/*    {link.label}*/}
          {/*  </Link>*/}
          {/*))}*/}
        </div>
        <div className={'center w-full !justify-end gap-5'}>
          <Button
            onClick={() => handleToggleEdit}
            variant={'ghost'}

          >
            {isEditingRaw ? 'editing' : 'view'}
          </Button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <UserAvatar />
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <UserAvatar />
          <button onClick={() => setIsOpen(!isOpen)} className="text-black">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-black hover:text-opacity-70 transition-colors" onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};