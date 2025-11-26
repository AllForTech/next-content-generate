'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
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
  Globe,
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
  return diff > 24
    ? `${new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : `${diff} hours ago`;
};

// Job Card Skeleton Component
const JobCardSkeleton = () => (
  <div className="mb-3.5 w-full animate-pulse rounded-lg border border-black/20 bg-neutral-100 p-4 shadow-md shadow-neutral-200 transition-all duration-200">
    <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
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
      <div className="flex flex-col text-right md:flex-row md:items-center md:space-x-8">
        <div className="flex items-center justify-end space-x-2 text-xs">
          <Skeleton className="h-4 w-4 bg-gray-200" />
          <Skeleton className="h-3 w-16 bg-gray-200" />
          <Skeleton className="h-5 w-24 rounded bg-gray-200" />
        </div>
        <div className="mt-1 flex items-center justify-end space-x-2 text-xs md:mt-0">
          <Skeleton className="h-4 w-4 bg-gray-200" />
          <Skeleton className="h-3 w-16 bg-gray-200" />
          <Skeleton className="h-3 w-20 bg-gray-200" />
        </div>
      </div>
    </div>
    {/* Bottom Details Skeleton */}
    <div className="mt-4 flex gap-4 border-t border-black/5 pt-3">
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
        <div className="container-full flex flex-col space-y-4 overflow-hidden p-2.5">
          {skeletonCards.map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (schedules && schedules?.length === 0) {
      return (
        <div className="rounded-md border border-dashed border-black p-8 text-center font-medium text-black/70">
          No automated schedules configured.
        </div>
      );
    }

    return (
      <ScrollArea className={cn('container-full center flex-col !justify-start p-2.5')}>
        {schedules.map((job: any) => (
          <JobCard key={job?.job_id} job={job} />
        ))}
      </ScrollArea>
    );
  };

  return (
    <div className={cn('flex w-full flex-col bg-white p-6 text-black')}>
      {/* Header */}
      <div
        className={cn(
          'mb-6 flex h-fit w-full items-center justify-between border-b border-gray-100 pb-3',
        )}
      >
        <h2 className="text-xl font-bold">
          <Clock className="mr-2 inline h-6 w-6" />
          Scheduled Automations
        </h2>
        <ScheduleNewJobDialog />
      </div>

      {/* List Container */}
      <div className="container-full flex flex-col space-y-4 overflow-hidden">
        {renderScheduleContent()}
      </div>
    </div>
  );
};

// Individual Job Card Component
const JobCard = ({ job }: { job: any }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { setScheduledJobs, scheduledJobs } = useContent();

  // Determine the status text and icon color
  const statusText = job?.is_active ? 'Active' : 'Disabled';
  const statusColor = job?.is_active ? 'text-black' : 'text-black/50';

  const handleDelete = async () => {
    if (!job?.user_id || !job?.job_id) return;

    setIsDeleting(true);
    const toastId = toast.loading('Deleting schedule...');

    try {
      const result = await deleteScheduledJobAction(job.job_id, job.job_type);

      if (result.error) {
        throw new Error(result.error);
      }

      setScheduledJobs(scheduledJobs.filter((scheduledJob) => scheduledJob.job_id !== job?.job_id));

      toast.success('Schedule Deleted', {
        id: toastId,
        description: `The '${job.job_type.replace(/_/g, ' ')}' job has been removed.`,
      });
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while deleting the schedule.');
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
    <div
      className={cn(
        'mb-3.5 w-full rounded-lg border p-4 shadow-md shadow-neutral-200 transition-all duration-200',
        job?.is_active
          ? 'border-black/20 bg-neutral-100 hover:bg-neutral-200'
          : 'border-black/10 bg-neutral-200/50 opacity-70 hover:opacity-100',
      )}
    >
      {/* TOP SECTION: Status, Controls, Time */}
      <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
        {/* Left Section: Job Type, Status, and DELETE BUTTON */}
        <div className="flex items-center space-x-4">
          <div
            className={cn(
              'rounded-full border border-black p-2',
              job?.is_active ? 'bg-black text-white' : 'bg-white text-black/50',
            )}
          >
            <Settings className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-bold tracking-wider uppercase">
              {job && job?.job_type?.replace(/_/g, ' ')}
            </p>
            <div className={cn('flex items-center text-xs font-semibold', statusColor)}>
              <span
                className="mr-2 h-2 w-2 rounded-full"
                style={{ backgroundColor: job?.is_active ? 'black' : 'rgba(0,0,0,0.5)' }}
              ></span>
              {statusText}
            </div>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-black/70 transition-colors hover:bg-neutral-300 hover:text-black"
                title="Delete Schedule"
              >
                <Trash className="text-md h-4 w-4 font-semibold" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="border-black bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-black/70">
                  This action cannot be undone. This will permanently delete your scheduled job for
                  **{job?.job_type?.replace(/_/g, ' ')}** and stop all future automated content
                  generation for this type.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-black/30 hover:bg-neutral-200 hover:text-black">
                  Cancel
                </AlertDialogCancel>
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
        <div className="flex flex-col text-right md:flex-row md:items-center md:space-x-8">
          {/* Schedule */}
          <div className="flex items-center justify-end space-x-2 text-xs md:justify-start">
            <Repeat className="h-4 w-4 text-black/70" />
            <span className="font-medium text-black/90">Schedule:</span>
            <code className="rounded border border-black/20 bg-white px-2 py-0.5 font-mono text-xs">
              {job?.cron_schedule}
            </code>
          </div>

          {/* Last Run */}
          <div className="mt-1 flex items-center justify-end space-x-2 text-xs md:mt-0 md:justify-start">
            <Clock className="h-4 w-4 text-black/70" />
            <span className="font-medium text-black/90">Last Run:</span>
            <span className="font-semibold text-black">{formatRelativeTime(job?.last_run_at)}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Job Configuration Details */}
      {/* We check if any relevant details exist before rendering the divider and section */}
      {(job?.job_type || job?.tone) && (
        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 border-t border-black/10 pt-3 text-sm sm:grid-cols-2 md:flex md:flex-wrap">
          {/* Topic / Query */}
          {job?.job_type && (
            <div className="flex max-w-md items-center text-neutral-600" title={job.job_type}>
              <MessageSquare className="mr-2 h-3.5 w-3.5 text-black/60" />
              <span className="mr-1.5 font-bold text-black">Type:</span>
              <span className="block truncate">{job.job_type}</span>
            </div>
          )}

          {/* Tone */}
          {job?.tone && (
            <div className="flex items-center text-neutral-600">
              <Sparkles className="mr-2 h-3.5 w-3.5 text-black/60" />
              <span className="mr-1.5 font-bold text-black">Tone:</span>
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
