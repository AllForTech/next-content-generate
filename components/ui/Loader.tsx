'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { LoaderIcon } from 'lucide-react';

type LoaderProps = {
  className?: string;
  text?: string;
  textClassName?: string;
  iconClassName?: string;
  iconSize?: number;
};

export default function Loader({
  className,
  text = 'Loading...',
  iconClassName,
  iconSize = 15,
  textClassName,
}: LoaderProps) {
  return (
    <div className={cn('container-fit center gap-2.5', className)}>
      <LoaderIcon className={cn('transition-300 animate-spin', iconClassName)} size={iconSize} />
      <span className={cn('text-xs font-medium text-black/80', textClassName)}>{text}</span>
    </div>
  );
}
