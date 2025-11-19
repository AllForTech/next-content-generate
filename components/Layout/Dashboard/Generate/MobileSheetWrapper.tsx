'use client'
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileSheetWrapperProps {
  children: React.ReactNode;
  isMobile: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Wrapper for the Sidebar content
const SidebarContentWrapper = ({ children, isMobile }: { children: React.ReactNode, isMobile: boolean }) => (
  <div
    className={cn(
      'flex-col gap-2.5 center',
      // Desktop styles: fixed width, visible
      !isMobile && 'container-full shadow-md shadow-stone-400 rounded-lg !max-w-[410px]',
      // Mobile styles: full height, full width for sheet content
      isMobile && 'container-full'
    )}
  >
    {children}
  </div>
);


const MobileSheetWrapper = ({ children, isMobile, isOpen, setIsOpen }: MobileSheetWrapperProps) => {

  // Desktop View: Just render the sidebar content directly
  if (!isMobile) {
    return <SidebarContentWrapper isMobile={false}>{children}</SidebarContentWrapper>;
  }

  // Mobile View: Render the sidebar content inside a Sheet
  return (
    <div className="md:hidden">
      {/* Mobile Trigger Button (Should be placed in the main page layout) */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-black text-white hover:bg-neutral-800"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        {/* The SheetContent holds the actual sidebar */}
        <SheetContent
          side="right"
          className="w-full max-w-[420px] sm:max-w-md p-0 flex flex-col border-none bg-white dark:bg-neutral-900"
        >
          <SheetHeader className='p-4 border-b dark:border-neutral-700'>
            <SheetTitle className='text-xl font-bold dark:text-white'>Content Tools</SheetTitle>
          </SheetHeader>
          {/* Render the sidebar content within the sheet body */}
          <SidebarContentWrapper isMobile={true}>{children}</SidebarContentWrapper>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSheetWrapper;