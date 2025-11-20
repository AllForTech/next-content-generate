'use client'

import React from 'react';
import { cn } from "@/lib/utils";
import { Clock, CalendarCheck, CalendarX, Repeat, Settings } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScheduleNewJobDialog } from '@/components/Layout/Dashboard/schedule/ScheduleNewJobDialog';

// Define the expected shape of a schedule item
interface ScheduleItem {
  userId: string;
  cronSchedule: string; // e.g., '30 9 * * *'
  jobType: string;      // e.g., 'content_generation'
  isActive: boolean;
  lastRunAt: string | null;
}

// --- Placeholder Data for Demonstration ---
const MOCK_SCHEDULES: ScheduleItem[] = [
  {
    userId: 'user-1',
    cronSchedule: '0 8 * * *', // Every day at 8:00 AM
    jobType: 'content_generation',
    isActive: true,
    lastRunAt: '2025-11-19 08:00:00+00',
  },
  {
    userId: 'user-2',
    cronSchedule: '0 15 * * 5', // Every Friday at 3:00 PM
    jobType: 'image_generation',
    isActive: true,
    lastRunAt: '2025-11-15 15:00:00+00',
  },
  {
    userId: 'user-3',
    cronSchedule: '0 12 1 * *', // First day of the month at 12:00 PM
    jobType: 'content_generation',
    isActive: false, // Disabled job
    lastRunAt: null,
  },
];
// ------------------------------------------

interface ScheduledJobsDashboardProps {
  schedules?: ScheduleItem[];
  // You would integrate your actual data fetching here
}

// Placeholder for a date formatter (assuming you have one, or use the one suggested earlier)
const formatRelativeTime = (timestamp: string | null): string => {
  if (!timestamp) return 'Never';
  // In a real app, use date-fns: return formatDistanceToNowStrict(new Date(timestamp), { addSuffix: true });
  const diff = Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60));
  return diff > 24 ? `${new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : `${diff} hours ago`;
};

const ScheduledJobsDashboard: React.FC<ScheduledJobsDashboardProps> = ({ schedules = MOCK_SCHEDULES }) => {

  return (
    <div className={cn('w-full flex flex-col p-6 bg-white text-black')}>

      {/* Header */}
      <div className={cn('w-full h-fit between')}>
        <h2 className="text-xl font-bold mb-6 pb-3">
          <Clock className="inline h-6 w-6 mr-2" />
          Scheduled Automations
        </h2>

        <ScheduleNewJobDialog/>
      </div>

      {/* List Container */}
      <div className="flex flex-col container-full overflow-hidden space-y-4">
        <ScrollArea className={cn('container-full p-2.5 center flex-col !justify-start')}>
          {schedules.length === 0 ? (
            <div className="text-center p-8 text-black/70 font-medium border border-dashed border-black rounded-md">
              No automated schedules configured.
            </div>
          ) : (
            schedules.map((job) => (
              <JobCard key={job.userId + job.jobType} job={job} />
            ))
          )}
        </ScrollArea>
      </div>
    </div>
  );
};


// Individual Job Card Component
const JobCard: React.FC<{ job: ScheduleItem }> = ({ job }) => {

  // Determine the status text and icon color
  const statusText = job.isActive ? 'Active' : 'Disabled';
  const statusColor = job.isActive ? 'text-black' : 'text-black/50';
  const statusIcon = job.isActive ? CalendarCheck : CalendarX;

  return (
    <div className={cn(
      'w-full p-4 border rounded-lg shadow-md shadow-neutral-200 mb-3.5 transition-all duration-200',
      job.isActive
        ? 'bg-neutral-50 border-black/20 hover:bg-neutral-200' // Neutral background for active
        : 'bg-neutral-200/50 border-black/10 opacity-70 hover:opacity-100' // Lighter neutral for disabled
    )}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">

        {/* Left Section: Job Type and Status */}
        <div className="flex items-center space-x-4">
          <div className={cn('p-2 rounded-full border border-black', job.isActive ? 'bg-black text-white' : 'bg-white text-black/50')}>
            <Settings className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-bold uppercase tracking-wider">
              {job.jobType.replace(/_/g, ' ')}
            </p>
            <div className={cn('flex items-center text-xs font-semibold', statusColor)}>
              <span className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: job.isActive ? 'black' : 'rgba(0,0,0,0.5)' }}></span>
              {statusText}
            </div>
          </div>
        </div>

        {/* Right Section: Schedule and Last Run */}
        <div className="flex flex-col md:flex-row md:space-x-8 text-right md:items-center">

          {/* Schedule */}
          <div className="flex items-center justify-end md:justify-start space-x-2 text-xs">
            <Repeat className="h-4 w-4 text-black/70" />
            <span className="font-medium text-black/90">
                            Schedule:
                        </span>
            <code className="text-xs font-mono bg-white border border-black/20 px-2 py-0.5 rounded">
              {job.cronSchedule}
            </code>
          </div>

          {/* Last Run */}
          <div className="flex items-center justify-end md:justify-start space-x-2 text-xs mt-1 md:mt-0">
            <Clock className="h-4 w-4 text-black/70" />
            <span className="font-medium text-black/90">
                            Last Run:
                        </span>
            <span className="font-semibold text-black">
                            {formatRelativeTime(job.lastRunAt)}
                        </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduledJobsDashboard;