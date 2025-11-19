
'use client';

import { cn, extractMarkdownImageUrls, formatDatabaseDate } from "@/lib/utils";
import Link from "next/link";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Delete, Trash } from 'lucide-react';
import { deleteContent } from "@/lib/actions/content.actions";
import { toast } from "sonner";
import { use, useEffect, useState } from 'react';
import { getContentHistoryById } from '@/lib/db/content';

interface ContentCardProps {
  id: string;
  createdAt: string;
  content: string;
  prompt: string;
}

export default function ContentCard({ id, createdAt, content, prompt }: ContentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const extractedUrls = content ? extractMarkdownImageUrls(content) : [];

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteContent(id);
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
        "bg-gradient-to-br from-stone-400 transition-300 to-stone-200 rounded-lg shadow-md p-2 flex flex-col justify-between w-full max-w-[350px] overflow-hidden h-[250px]",
        "transition-shadow duration-300"
      )}
    >
      <Link href={`/dashboard/generate/${id}`} className="block container-full center">
        <div
          style={{
            backgroundImage: `url(${extractedUrls && extractedUrls[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
          className={cn('container-full overflow-hidden rounded-md bg-white p-4 flex flex-col justify-between')}>
          <div>
            <h3 className="text-lg font-semibold text-gray-800"></h3>
            <p className="text-sm text-gray-500 mt-1">{formatDatabaseDate(Number(createdAt))}</p>
          </div>
          <div className="mt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {content && content?.slice(1, 20) || prompt && prompt?.slice(0, 20)}
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex justify-end items-center gap-2">
        <Link href={`/dashboard/generate/${id}`}>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : ( <Trash size={15} className={cn('text-red-500')}/>)}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                content.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
