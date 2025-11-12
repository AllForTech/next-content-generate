
'use client';

import { cn } from "@/lib/utils";
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
import { Delete } from 'lucide-react'
import { deleteContent } from "@/lib/actions/content.actions";
import { toast } from "sonner";
import { useState } from "react";

interface ContentCardProps {
  id: string;
  title: string;
  createdAt: string;
  type: string;
}

export default function ContentCard({ id, title, createdAt, type }: ContentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

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
        "bg-gradient-to-br from-stone-300 transition-300 to-stone-100 rounded-lg shadow-md p-2 flex flex-col justify-between w-full max-w-[350px] overflow-hidden h-[250px]",
        "transition-shadow duration-300"
      )}
    >
      <Link href={`/dashboard/content/${id}`} className="block container-full center">
        <div className={cn('container-full overflow-hidden rounded-md bg-white p-4 flex flex-col justify-between')}>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{title && title?.slice(0, 20)}</h3>
            <p className="text-sm text-gray-500 mt-1">{new Date(createdAt).toLocaleDateString()}</p>
          </div>
          <div className="mt-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {type}
            </span>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex justify-end items-center gap-2">
        <Link href={`/dashboard/generate/${type}/${id}`}>
          <Button variant="ghost" size="sm">
            Edit
          </Button>
        </Link>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : ( <Delete size={15} className={cn('text-red-500')}/>)}
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
