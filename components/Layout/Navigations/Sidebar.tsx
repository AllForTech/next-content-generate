'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PanelLeft, FileText, Globe, MessageSquare, Menu, BookOpen, Settings } from 'lucide-react';

import { cn } from '@/lib/utils'; // Utility for combining tailwind classes (from shadcn setup)
import { Button } from '@/components/ui/button';
import * as VisuallyHiddenPrimitive from '@radix-ui/react-visually-hidden';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

// --- 1. Define Navigation Routes ---
const navigation = [
    {
        title: 'Content Types',
        items: [
            { href: '/dashboard/generate', icon: BookOpen, label: 'Generate' },
        ],
    },
];

// --- 2. Navigation Link Component ---
interface NavLinkProps {
    href: string;
    icon: React.ElementType;
    label: string;
    pathname: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon: Icon, label, pathname }) => {
    const isActive = pathname === href;

    return (
        <Link href={href} passHref>
            <Button
                className={cn(
                    'w-full justify-start bg-transparent text-foreground gap-3 transition-300',
                  'hover:bg-neutral-900 hover:text-white/90',
                    { 'bg-neutral-900 text-white/90 hover:bg-neutral-900 hover:text-white/90': isActive }
                )}
            >
                <Icon className="h-5 w-5" />
                {label}
            </Button>
        </Link>
    );
};


// --- 3. Main Sidebar Component ---
export function Sidebar() {
    const pathname = usePathname();

    // The sidebar content rendered in both desktop and mobile
    const sidebarContent = (
        <ScrollArea className="h-full  bg-white px-4">
            <div className="py-4">
                <h2 className="mb-6 px-4 text-lg font-semibold tracking-tight text-primary">
                    AI Creator Hub
                </h2>

                {navigation.map((section, index) => (
                    <div key={index} className="space-y-1 pb-4">
                        <h3 className="mb-2 px-4 text-sm font-medium tracking-wider text-muted-foreground">
                            {section.title}
                        </h3>
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <NavLink
                                    key={item.href}
                                    href={item.href}
                                    icon={item.icon}
                                    label={item.label}
                                    pathname={pathname}
                                />
                            ))}
                        </div>
                    </div>
                ))}

                <Separator className="my-4" />

                {/* --- History and Settings Links --- */}
                <div className="space-y-1">
                    <NavLink
                        href="/history"
                        icon={FileText}
                        label="Content History"
                        pathname={pathname}
                    />
                    <NavLink
                        href="/settings"
                        icon={Settings}
                        label="Settings"
                        pathname={pathname}
                    />
                </div>

            </div>
        </ScrollArea>
    );


    // --- 4. Return Statement (Handling Desktop vs. Mobile) ---
    return (
        <>
            {/* 4a. Desktop Sidebar (Hidden on small screens) */}
            <div className="hidden h-screen w-64 border-r bg-card lg:block">
                {sidebarContent}
            </div>

            {/* 4b. Mobile Sheet (Visible on small screens) */}
            <Sheet>
                <SheetTrigger asChild className="lg:hidden fixed top-4 left-4 z-50">
                    <Button variant="outline" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle navigation</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                    {sidebarContent}
                </SheetContent>
            </Sheet>
        </>
    );
}