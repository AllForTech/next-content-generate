'use client';

import { cn, extractMarkdownImageUrls, formatDatabaseDate } from '@/lib/utils';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Delete, Trash } from 'lucide-react';
import { deleteContent } from '@/lib/actions/content.actions';
import { toast } from 'sonner';
import { use, useEffect, useState } from 'react';
import { getContentHistoryById } from '@/lib/db/content';
import { useContent } from '@/context/GenerationContext';

interface ContentCardProps {
  id: string;
  createdAt: string;
  content: string;
  prompt: string;
}

export default function ContentCard({ id, createdAt, content, prompt }: ContentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const { setAllContents, allContents } = useContent();

  const extractedUrls = content ? extractMarkdownImageUrls(content) : [];

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteContent(id);
    setAllContents(allContents.filter((c) => c?.contentId !== id));
    setIsDeleting(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.success);
    }
  };

  return (
    <div
      className={cn(
        'transition-300 flex h-[250px] w-full max-w-[350px] flex-col justify-between overflow-hidden rounded-lg bg-gradient-to-br from-stone-400 to-stone-200 p-2 shadow-md',
        'transition-shadow duration-300',
      )}
    >
      <Link href={`/dashboard/generate/${id}`} className="container-full center block">
        <div
          style={{
            backgroundImage: `url(${extractedUrls && extractedUrls[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className={cn(
            'container-full flex flex-col justify-between overflow-hidden rounded-md bg-white',
          )}
        >
          <div className={cn('between w-full rounded-md bg-white/5 px-3 py-3 backdrop-blur-sm')}>
            <h3 className="text-lg font-semibold text-black"></h3>
            <p className="mt-1 text-xs font-semibold text-neutral-950">
              {formatDatabaseDate(createdAt)}
            </p>
          </div>
          <div className="mt-4 mb-3 px-3">
            <span className="inline-block rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700">
              {(content && content?.slice(1, 20)) || (prompt && prompt?.slice(0, 20))}
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex items-center justify-end gap-2">
        <Link href={`/dashboard/generate/${id}`}>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" disabled={isDeleting}>
              {isDeleting ? 'Deleting...' : <Trash size={15} className={cn('text-red-500')} />}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this content.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
