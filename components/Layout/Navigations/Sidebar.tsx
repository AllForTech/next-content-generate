'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PanelLeft, FileText, Globe, MessageSquare, Menu, BookOpen, Settings, Home } from 'lucide-react'; // Added Home icon

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react'; // Import useState for collapse state
import { nanoid } from 'nanoid';

// --- 1. Define Navigation Routes ---
const navigation = [
  {
    title: 'Core Routes',
    items: [
      { href: '/dashboard', icon: Home, label: 'Dashboard' }, // Added Dashboard
      { href: '/dashboard/generate', icon: BookOpen, label: 'Generate Content' }, // Modified label
      { href: '/dashboard/history', icon: FileText, label: 'Content History' }, // Moved/Added History
    ],
  },
  {
    title: 'Other',
    items: [
      { href: '/dashboard/chats', icon: MessageSquare, label: 'AI Chat' }, // Added Chat
      { href: '/dashboard/explore', icon: Globe, label: 'Explore Tools' }, // Added Explore
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
      <div className="py-4 flex flex-col !items-start w-full h-full">
        {/* Logo/Title and Collapse Button */}
        <div className={cn("flex items-center w-full mb-6", isCollapsed ? "justify-center" : "justify-between pl-2 pr-1")}>
          {!isCollapsed && (
            <h2 className="text-lg font-semibold tracking-tight text-primary">
              Think-Ink
            </h2>
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

        <div className={cn('flex-grow center')}>
          {/* Placeholder for center content */}
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

        <div className={cn('w-full !h-[40px] bg-stone-300 rounded-md center')}>
          {/* Placeholder for user profile or status */}
          {!isCollapsed && <span className='text-xs text-black/80'>User Status</span>}
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