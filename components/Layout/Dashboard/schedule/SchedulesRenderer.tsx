'use client'

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
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
import {
  Clock,
  CalendarCheck,
  CalendarX,
  Repeat,
  Settings,
  Trash,
  Sparkles,
  MessageSquare,
  AlignLeft,
  Globe
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScheduleNewJobDialog } from '@/components/Layout/Dashboard/schedule/ScheduleNewJobDialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { deleteScheduledJobAction } from '@/lib/db/content';
import { useContent } from '@/context/GenerationContext';
import { Skeleton } from '@/components/ui/skeleton';

// Placeholder for a date formatter
const formatRelativeTime = (timestamp: string | null): string => {
  if (!timestamp) return 'Never';
  const diff = Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60));
  return diff > 24 ? `${new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : `${diff} hours ago`;
};

// Job Card Skeleton Component
const JobCardSkeleton = () => (
  <div className="w-full p-4 border rounded-lg shadow-md shadow-neutral-200 mb-3.5 transition-all duration-200 bg-neutral-100 border-black/20 animate-pulse">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-8 w-8 rounded-full bg-gray-200" />
        <div className="flex flex-col space-y-1">
          <Skeleton className="h-4 w-32 bg-gray-200" />
          <Skeleton className="h-3 w-20 bg-gray-200" />
        </div>
        <Skeleton className="h-8 w-8 rounded-md bg-gray-200" />
      </div>

      {/* Right Section */}
      <div className="flex flex-col md:flex-row md:space-x-8 text-right md:items-center">
        <div className="flex items-center justify-end space-x-2 text-xs">
          <Skeleton className="h-4 w-4 bg-gray-200" />
          <Skeleton className="h-3 w-16 bg-gray-200" />
          <Skeleton className="h-5 w-24 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center justify-end space-x-2 text-xs mt-1 md:mt-0">
          <Skeleton className="h-4 w-4 bg-gray-200" />
          <Skeleton className="h-3 w-16 bg-gray-200" />
          <Skeleton className="h-3 w-20 bg-gray-200" />
        </div>
      </div>
    </div>
    {/* Bottom Details Skeleton */}
    <div className="mt-4 pt-3 border-t border-black/5 flex gap-4">
      <Skeleton className="h-3 w-24 bg-gray-200" />
      <Skeleton className="h-3 w-24 bg-gray-200" />
    </div>
  </div>
);

const ScheduledJobsDashboard = () => {
  const { scheduledJobs: schedules, isSchedulesLoading } = useContent();

  // Array to map over for skeleton loading
  const skeletonCards = Array.from({ length: 3 });

  const renderScheduleContent = () => {
    if (isSchedulesLoading) {
      return (
        <div className="flex flex-col container-full overflow-hidden space-y-4 p-2.5">
          {skeletonCards.map((_, index) => <JobCardSkeleton key={index} />)}
        </div>
      );
    }

    if (schedules && schedules?.length === 0) {
      return (
        <div className="text-center p-8 text-black/70 font-medium border border-dashed border-black rounded-md">
          No automated schedules configured.
        </div>
      );
    }

    return (
      <ScrollArea className={cn('container-full p-2.5 center flex-col !justify-start')}>
        {schedules.map((job: any) => (
          <JobCard key={job?.job_id} job={job} />
        ))}
      </ScrollArea>
    );
  };

  return (
    <div className={cn('w-full flex flex-col p-6 bg-white text-black')}>
      {/* Header */}
      <div className={cn('w-full h-fit flex justify-between items-center mb-6 pb-3 border-b border-gray-100')}>
        <h2 className="text-xl font-bold">
          <Clock className="inline h-6 w-6 mr-2" />
          Scheduled Automations
        </h2>
        <ScheduleNewJobDialog/>
      </div>

      {/* List Container */}
      <div className="flex flex-col container-full overflow-hidden space-y-4">
        {renderScheduleContent()}
      </div>
    </div>
  );
};

// Individual Job Card Component
const JobCard = ({ job }: { job: any }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { setScheduledJobs, scheduledJobs  } = useContent();

  // Determine the status text and icon color
  const statusText = job?.is_active ? 'Active' : 'Disabled';
  const statusColor = job?.is_active ? 'text-black' : 'text-black/50';

  const handleDelete = async () => {
    if (!job?.user_id || !job?.job_id) return;

    setIsDeleting(true);
    const toastId = toast.loading("Deleting schedule...");

    try {
      const result = await deleteScheduledJobAction(job.job_id, job.job_type);

      if (result.error) {
        throw new Error(result.error);
      }

      setScheduledJobs(
        scheduledJobs.filter(scheduledJob => scheduledJob.job_id !== job?.job_id)
      )

      toast.success("Schedule Deleted", {
        id: toastId,
        description: `The '${job.job_type.replace(/_/g, ' ')}' job has been removed.`,
      });

    } catch (error: any) {
      console.log(error);
      toast.error("Deletion Failed", {
        id: toastId,
        description: error.message || "Could not delete the job from the database.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Helper to handle cases where tone might be a string or an object
  const getDisplayValue = (value: any) => {
    if (!value) return null;
    if (typeof value === 'object' && value.label) return value.label;
    if (typeof value === 'string') return value;
    return JSON.stringify(value);
  };

  return (
    <div className={cn(
      'w-full p-4 border rounded-lg shadow-md shadow-neutral-200 mb-3.5 transition-all duration-200',
      job?.is_active
        ? 'bg-neutral-100 border-black/20 hover:bg-neutral-200'
        : 'bg-neutral-200/50 border-black/10 opacity-70 hover:opacity-100'
    )}>
      {/* TOP SECTION: Status, Controls, Time */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">

        {/* Left Section: Job Type, Status, and DELETE BUTTON */}
        <div className="flex items-center space-x-4">
          <div className={cn('p-2 rounded-full border border-black', job?.is_active ? 'bg-black text-white' : 'bg-white text-black/50')}>
            <Settings className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-bold uppercase tracking-wider">
              {job && job?.job_type?.replace(/_/g, ' ')}
            </p>
            <div className={cn('flex items-center text-xs font-semibold', statusColor)}>
              <span className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: job?.is_active ? 'black' : 'rgba(0,0,0,0.5)' }}></span>
              {statusText}
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-neutral-300 h-8 w-8 p-0 text-black/70 hover:text-black transition-colors"
                title="Delete Schedule"
              >
                <Trash className="h-4 text-md font-semibold w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border-black">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-black/70">
                  This action cannot be undone. This will permanently delete your scheduled job for **{job?.job_type?.replace(/_/g, ' ')}** and stop all future automated content generation for this type.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-black/30 hover:bg-neutral-200 hover:text-black">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-black text-white hover:bg-neutral-800"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>

        {/* Right Section: Schedule and Last Run */}
        <div className="flex flex-col md:flex-row md:space-x-8 text-right md:items-center">
          {/* Schedule */}
          <div className="flex items-center justify-end md:justify-start space-x-2 text-xs">
            <Repeat className="h-4 w-4 text-black/70" />
            <span className="font-medium text-black/90">Schedule:</span>
            <code className="text-xs font-mono bg-white border border-black/20 px-2 py-0.5 rounded">
              {job?.cron_schedule}
            </code>
          </div>

          {/* Last Run */}
          <div className="flex items-center justify-end md:justify-start space-x-2 text-xs mt-1 md:mt-0">
            <Clock className="h-4 w-4 text-black/70" />
            <span className="font-medium text-black/90">Last Run:</span>
            <span className="font-semibold text-black">
              {formatRelativeTime(job?.last_run_at)}
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Job Configuration Details */}
      {/* We check if any relevant details exist before rendering the divider and section */}
      {(job?.job_type || job?.tone) && (
        <div className="mt-4 pt-3 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap gap-y-2 gap-x-6 text-sm">

          {/* Topic / Query */}
          {job?.job_type && (
            <div className="flex items-center text-neutral-600 max-w-md" title={job.job_type}>
              <MessageSquare className="w-3.5 h-3.5 mr-2 text-black/60" />
              <span className="font-bold text-black mr-1.5">Type:</span>
              <span className="truncate block">{job.job_type}</span>
            </div>
          )}

          {/* Tone */}
          {job?.tone && (
            <div className="flex items-center text-neutral-600">
              <Sparkles className="w-3.5 h-3.5 mr-2 text-black/60" />
              <span className="font-bold text-black mr-1.5">Tone:</span>
              <span className="capitalize">{getDisplayValue(job.tone)}</span>
            </div>
          )}

          {/*/!* Length / Size *!/*/}
          {/*{job?.length && (*/}
          {/*  <div className="flex items-center text-neutral-600">*/}
          {/*    <AlignLeft className="w-3.5 h-3.5 mr-2 text-black/60" />*/}
          {/*    <span className="font-bold text-black mr-1.5">Length:</span>*/}
          {/*    <span className="capitalize">{getDisplayValue(job.length)}</span>*/}
          {/*  </div>*/}
          {/*)}*/}

          {/*/!* Language - if applicable *!/*/}
          {/*{job?.language && (*/}
          {/*  <div className="flex items-center text-neutral-600">*/}
          {/*    <Globe className="w-3.5 h-3.5 mr-2 text-black/60" />*/}
          {/*    <span className="font-bold text-black mr-1.5">Language:</span>*/}
          {/*    <span className="capitalize">{getDisplayValue(job.language)}</span>*/}
          {/*  </div>*/}
          {/*)}*/}

        </div>
      )}
    </div>
  );
};

export default ScheduledJobsDashboard;