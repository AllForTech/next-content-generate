
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
        "bg-stone-400 rounded-lg shadow-md p-6 flex flex-col justify-between w-full max-w-[350px] overflow-hidden h-[200px]",
        "hover:shadow-xl transition-shadow duration-300"
      )}
    >
      <Link href={`/dashboard/content/${id}`} className="block container-full center">
        <div>
          <h3 className={cn("text-lg font-bold")}></h3>
          <p className={cn("text-sm text-gray-500 mt-2")}>
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
        <p className={cn("text-sm text-indigo-500 mt-4")}>{type}</p>
      </Link>
      <div className="mt-4 flex justify-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
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
