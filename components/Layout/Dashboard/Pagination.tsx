
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="inline-flex">
      <Button
        asChild
        variant="outline"
        className={cn({ 'pointer-events-none opacity-50': isFirstPage })}
      >
        <Link href={createPageURL(currentPage - 1)} scroll={false}>
          Previous
        </Link>
      </Button>
      <div className="flex items-center px-4">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
      <Button
        asChild
        variant="outline"
        className={cn({ 'pointer-events-none opacity-50': isLastPage })}
      >
        <Link href={createPageURL(currentPage + 1)} scroll={false}>
          Next
        </Link>
      </Button>
    </div>
  );
}
