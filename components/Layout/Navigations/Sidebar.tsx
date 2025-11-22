'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PanelLeft, FileText, Globe, MessageSquare, Menu, BookOpen, Settings, Home } from 'lucide-react'; // Added Home icon

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import React, { useState } from 'react'; // Import useState for collapse state
import { nanoid } from 'nanoid';
import { UserAvatar } from '@/components/Layout/Navigations/UserAvatar';
import { useAuth } from '@/context/AuthContext';
import { ChatHistoryRenderer } from '@/components/Layout/Dashboard/Generate/ChatHistoryRenderer';

// --- 1. Define Navigation Routes ---
const navigation = [
  {
    title: ' ',
    items: [
      { href: '/dashboard', icon: Home, label: 'Dashboard' },
      { href: '/dashboard/generate', icon: BookOpen, label: 'Generate Content' },
      { href: '/dashboard/schedule', icon: BookOpen, label: 'schedule Ai' },
    ],
  },
  {
    title: 'Other',
    items: [
      { href: '/dashboard/explore', icon: Globe, label: 'Explore Tools' },
    ],
  },
];

// --- 2. Navigation Link Component ---
interface NavLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  pathname: string;
  isCollapsed: boolean; // New prop
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, label, pathname, isCollapsed }) => {
  const isActive = pathname === href;
  const isGenerate = pathname.startsWith(href);

  const router = useRouter();

  return href === '/dashboard/generate' ? (
    <Button
      onClick={() => {
        const randomId = nanoid();
        router.push(`/dashboard/generate/${randomId}`);
      }}
      className={cn(
        'w-full justify-start my-1 transition-300 bg-transparent text-xs text-foreground gap-3 transition-colors duration-200',
        'hover:bg-neutral-900 hover:text-white/90',
        'h-10', // Standard height for buttons
        { 'bg-neutral-900 text-white/90 hover:bg-neutral-900 hover:text-white/90': isGenerate },
        // Conditional styles for collapsed state
        isCollapsed ? 'p-0 w-10 justify-center' : 'px-3'
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && label}
      {isCollapsed && <span className="sr-only">{label}</span>}
    </Button>
    ) : (
    <Link href={href} passHref>
      <Button
        className={cn(
          'w-full justify-start my-1 transition-300 bg-transparent text-xs text-foreground gap-3 transition-colors duration-200',
          'hover:bg-neutral-900 hover:text-white/90',
          'h-10', // Standard height for buttons
          { 'bg-neutral-900 text-white/90 hover:bg-neutral-900 hover:text-white/90': isActive },
          // Conditional styles for collapsed state
          isCollapsed ? 'p-0 w-10 justify-center' : 'px-3'
        )}
      >
        <Icon className="h-5 w-5" />
        {!isCollapsed && label}
        {isCollapsed && <span className="sr-only">{label}</span>}
      </Button>
    </Link>
  );
};


// --- 3. Main Sidebar Component ---
export function Sidebar() {
  const pathname = usePathname();

  const {user} = useAuth();

  // New state for toggling the collapsed status
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // --- Sidebar Content ---
  const sidebarContent = (
    <aside
      // Conditional width for desktop collapse
      className={cn(
        "h-full bg-white shadow-xl border-none outline-none shadow-stone-300 px-3 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-[200px]"
      )}
    >
      <div className="py-3 flex flex-col !items-start w-full h-full">
        {/* Logo/Title and Collapse Button */}
        <div className={cn("flex items-center w-full mb-6", isCollapsed ? "justify-center" : "justify-between pl-1 pr-1")}>
          {!isCollapsed && (
            <div className="w-full gap-2 center !justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                className="mx-auto fill-black"
                width="32px"
                fill="black"
              >
                <path d="M350-63q-46 0-82.5-24T211-153q-16 21-40.5 32.5T120-109q-51 0-85.5-35T0-229q0-43 28-77.5T99-346q-14-20-21.5-42.5T70-436q0-40 20.5-75t57.5-57q5 18 13.5 38.5T181-494q-14 11-22 26.5t-8 32.5q0 56 46 69t87 21l19 32q-11 32-19 54.5t-8 40.5q0 30 21.5 52.5T350-143q38 0 63-34t41-80q16-46 24.5-93t13.5-72l78 21q-9 45-22 103t-36.5 110.5Q488-135 449.5-99T350-63ZM120-189q17 0 28.5-11.5T160-229q0-17-11.5-28.5T120-269q-17 0-28.5 11.5T80-229q0 17 11.5 28.5T120-189Zm284-158q-46-41-83.5-76.5t-64.5-69q-27-33.5-41.5-67T200-629q0-65 44.5-109.5T354-783q4 0 7 .5t7 .5q-4-10-6-20t-2-21q0-50 35-85t85-35q50 0 85 35t35 85q0 11-2 20.5t-6 19.5h14q60 0 102 38.5t50 95.5q-18-3-40.5-3t-41.5 2q-7-23-25.5-38T606-703q-35 0-54.5 20.5T498-623h-37q-35-41-54.5-60.5T354-703q-32 0-53 21t-21 53q0 23 13 47.5t36.5 52q23.5 27.5 57 58.5t74.5 67l-57 57Zm76-436q17 0 28.5-11.5T520-823q0-17-11.5-28.5T480-863q-17 0-28.5 11.5T440-823q0 17 11.5 28.5T480-783ZM609-63q-22 0-43.5-6T524-88q11-14 22-33t20-35q11 7 22 10t22 3q32 0 53.5-22.5T685-219q0-19-8-41t-19-54l19-32q42-8 87.5-21t45.5-69q0-40-29.5-58T716-512q-42 0-98 16t-131 41l-21-78q78-25 139-42t112-17q69 0 121 41t52 115q0 25-7.5 47.5T861-346q43 5 71 39.5t28 77.5q0 50-34.5 85T840-109q-26 0-50.5-11.5T749-153q-20 42-56.5 66T609-63Zm232-126q17 0 28-11.5t11-28.5q0-17-11.5-29T840-270q-17 0-28.5 11.5T800-230q0 17 12 29t29 12Zm-721-40Zm360-594Zm360 593Z" />
              </svg>
              <h1 className={'text-lg font-semibold tracking-tight gap-2.5 text-primary'}>
                Think-Ink
              </h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapse}
            className={cn("text-black hover:bg-neutral-900/10 hover:text-black", isCollapsed ? "mx-auto" : "mr-0")}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeft className={cn("h-5 w-5 transition-transform duration-300", isCollapsed ? 'rotate-180' : 'rotate-0')} />
          </Button>
        </div>

        {/* Navigation Sections */}
        {navigation.map((section, index) => (
          <div key={index} className="space-y-1 w-full pb-4">
            {!isCollapsed && (
              <h3 className="mb-2 px-4 text-sm font-medium tracking-wider text-foreground/80">
                {section.title}
              </h3>
            )}
            <div className="space-y-1 w-full">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  pathname={pathname}
                  isCollapsed={isCollapsed} // Pass new prop
                />
              ))}
            </div>
          </div>
        ))}

        <Separator className="my-2" />

        <div className={cn('flex-grow w-full center')}>
          <ChatHistoryRenderer/>
        </div>

        <Separator className="my-2" />

        {/* --- Bottom Links (History and Settings) --- */}
        <div className="space-y-1 w-full">
          {/* History is now included in the main navigation */}
          <NavLink
            href="/settings"
            icon={Settings}
            label="Settings"
            pathname={pathname}
            isCollapsed={isCollapsed}
          />
        </div>

        <Separator className="my-2" />

        <div className={cn('w-full !h-[50px] between p-2.5 space-y-1.5 flex-col bg-stone-300 rounded-md center')}>
          {/* Placeholder for user profile or status */}
          <p className="text-sm font-medium leading-none">{user && user?.user_metadata?.full_name || user && user?.email?.split('@')[0] || 'User'}</p>
          <p className="text-[10px] leading-none font-normal text-black/80">
            {user && user?.email}
          </p>
        </div>
      </div>
    </aside>
  );


  // --- 4. Return Statement (Handling Desktop vs. Mobile) ---
  return (
    <>
      {/* 4a. Desktop Sidebar (Hidden on small screens) */}
      <div
        className={cn(
          "hidden h-screen shadow-xl border-none outline-none shadow-stone-300 bg-card lg:block transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-[200px]" // Dynamic width applied here
        )}
      >
        {/* We render the sidebar content directly inside the container to manage width */}
        {sidebarContent}
      </div>

      {/* 4b. Mobile Sheet (Visible on small screens) */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden fixed top-4 left-4 z-50">
          <Button variant="outline" size="icon" className="bg-white border-black text-black hover:bg-gray-100">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[260px] p-0 border-r-black">
          {/* Rendered full-width inside the Sheet Content */}
          {sidebarContent}
        </SheetContent>
      </Sheet>
    </>
  );
}