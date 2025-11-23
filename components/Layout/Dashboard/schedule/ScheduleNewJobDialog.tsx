'use client'

import React, { useState } from 'react';
import { cn, generateCronString } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Clock, Plus, Repeat, Settings, Trash2, Link as LinkIcon, Briefcase, Smile, BookOpen, Cpu, User } from 'lucide-react';
import { saveNewSchedule } from '@/lib/db/content';
import { useContent } from '@/context/GenerationContext';
import { useAuth } from '@/context/AuthContext';
import { nanoid } from 'nanoid';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define the fixed schedule slots for the Vercel cron
const TIME_SLOTS = [
  { slug: 'early', label: '9:00 AM UTC (Early Run)', timeString: '09:00' },
  { slug: 'later', label: '5:00 PM UTC (Later Run)', timeString: '17:00' },
];

// Helper to get the HH:MM string from the slot slug
const getTimeStringFromSlug = (slug) => {
  return TIME_SLOTS.find(slot => slot.slug === slug)?.timeString || '09:00';
};

// Define the tone options
const TONE_OPTIONS = [
  { slug: 'professional', label: 'Professional', icon: Briefcase },
  { slug: 'casual', label: 'Casual', icon: Smile },
  { slug: 'academic', label: 'Academic', icon: BookOpen },
  { slug: 'technical', label: 'Technical', icon: Cpu },
  { slug: 'friendly', label: 'Friendly', icon: User },
];

// Basic URL validation
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (e) {
    return false;
  }
};

export function ScheduleNewJobDialog() {
  const { setScheduledJobs } = useContent();
  const { user } = useAuth();

  // State for all form fields
  const [jobType, setJobType] = useState('content_generation');
  const [prompt, setPrompt] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState(TIME_SLOTS[0].slug);
  const [tone, setTone] = useState(TONE_OPTIONS[0].slug); // New state for Tone, defaulting to 'professional'

  // URL management states
  const [urlInput, setUrlInput] = useState('');
  const [urls, setUrls] = useState([]); // Array to hold validated URLs

  const [isActive, setIsActive] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddUrl = () => {
    const trimmedUrl = urlInput.trim();
    if (!trimmedUrl) {
      toast.warning("URL field cannot be empty.");
      return;
    }
    if (!isValidUrl(trimmedUrl)) {
      toast.error("Please enter a valid URL (e.g., https://example.com).");
      return;
    }
    if (urls.includes(trimmedUrl)) {
      toast.info("This URL has already been added.");
      return;
    }

    setUrls(prev => [...prev, trimmedUrl]);
    setUrlInput(''); // Clear the input field
  };

  const handleRemoveUrl = (urlToRemove) => {
    setUrls(prev => prev.filter(url => url !== urlToRemove));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("Authentication required.");
      return;
    }

    setIsSaving(true);

    const timeString = getTimeStringFromSlug(time);
    const cronSchedule = generateCronString(frequency, timeString);
    const job_id = nanoid();

    // Prepare job data, now including 'tone'
    const jobData = {
      jobType,
      prompt,
      frequency,
      runSlot: time,
      time: timeString,
      referenceUrls: urls,
      isActive,
      cronSchedule,
      job_id,
      tone, // <-- Include the new tone state
    };

    const toastId = toast.loading("Saving new schedule...");

    try {
      const newJob = await saveNewSchedule(jobData);

      if (newJob?.error){
        console.error(newJob?.error);
        throw new Error("Database save failed.");
      }

      const savedData = newJob.schedule || jobData;

      // Update state with new job data, ensuring 'tone' is included
      setScheduledJobs(prev => ([{
        job_type: savedData.job_type,
        user_id: user.id,
        prompt: savedData.prompt,
        job_id: savedData.job_id,
        frequency: savedData.frequency,
        run_slot: savedData.run_slot,
        time: savedData.time,
        reference_urls: savedData.reference_urls,
        cron_schedule: savedData.cron_schedule,
        is_active: savedData.is_active,
        tone: savedData.tone, // <-- Include the new tone field
      },...prev]))

      toast.success("New schedule created!", {
        id: toastId,
        description: `Job set for the '${time}' run slot.`,
      });

      // Reset form and close dialog
      setIsOpen(false);
      setPrompt('');
      setTime(TIME_SLOTS[0].slug);
      setFrequency('daily');
      setTone(TONE_OPTIONS[0].slug); // Reset tone
      setUrls([]); // Reset array
      setUrlInput(''); // Reset single input

    } catch (error) {
      toast.error("Failed to save schedule", {
        id: toastId,
        description: error instanceof Error ? error.message : "An unknown error occurred.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black p-3 text-white hover:bg-neutral-800 shadow-md">
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Job
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white text-black w-[90%] sm:w-[400px] md:w-[650px] lg:max-w-[700px] rounded-lg shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold text-black">
            Configure New Automation
          </DialogTitle>
          <DialogDescription className="text-black/60">
            Set the prompt, content type, and scheduled time slot for the AI.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">

            {/* NEW ROW: Job Type and Tone Selector (Side-by-Side) */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* Job Type Select */}
              <div className="grid grid-cols-[80px_1fr] items-center gap-16">
                <Label htmlFor="job-type" className="text-right text-xs font-semibold">
                  Job Type
                </Label>
                <Select value={jobType} onValueChange={setJobType}>
                  <SelectTrigger id="job-type" className="col-span-1 border-black/30 text-xs">
                    <SelectValue placeholder="Select a job type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black rounded-lg shadow-lg">
                    <SelectItem value="content_generation">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-neutral-500" />
                        <span className={'text-xs'}>Content Generation</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="image_generation" disabled>
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-gray-400" />
                        <span className={'text-xs text-gray-500'}>Image Generation (Soon)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tone Select (New Component) */}
              <div className="grid grid-cols-[80px_1fr] items-center ml-10 !gap-0">
                <Label htmlFor="tone-select" className="text-right text-xs font-semibold">
                  Tone
                </Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone-select" className="col-span-1 border-black/30 text-xs">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black rounded-lg shadow-lg">
                    {TONE_OPTIONS.map((option) => {
                      const Icon = option.icon;
                      return (
                        <SelectItem key={option.slug} value={option.slug}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-neutral-500" />
                            <span className={'text-xs'}>{option.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* END NEW ROW */}


            {/* Master Prompt Textarea */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="prompt" className="text-right text-xs font-semibold pt-2">
                Master Prompt
              </Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Write a 500-word blog post about the top 3 trends in AI this week...'"
                className="col-span-3 text-xs min-h-[100px] border-black/30 rounded-md shadow-sm focus:border-neutral-500"
                required
              />
            </div>

            {/* Reference URLs Input / List */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="url-input" className="text-right text-xs font-semibold pt-2">
                Reference URLs
              </Label>
              <div className="col-span-3 flex flex-col gap-2">
                {/* Input and Add Button */}
                <div className="flex space-x-2">
                  <Input
                    id="url-input"
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
                    placeholder="Enter URL and click 'Add'"
                    className="flex-grow text-xs border-black/30 rounded-md shadow-sm"
                  />
                  <Button
                    type="button"
                    onClick={handleAddUrl}
                    variant="secondary"
                    className="bg-neutral-600 text-white hover:bg-neutral-700 text-xs px-3 py-1 h-auto shadow-md"
                  >
                    Add
                  </Button>
                </div>

                {/* List of URLs */}
                {urls.length > 0 && (
                  <div id={'hide-scrollbar'} className="bg-neutral-50 overflow-x-auto w-full center !justify-start border border-gray-200 rounded-md p-2 max-h-40 overflow-y-auto">
                    {urls.map((url, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-xs py-1 px-2 mr-1 rounded-sm bg-white hover:bg-neutral-200 transition-colors"
                      >
                        <LinkIcon className="h-3 w-3 mr-2 text-neutral-500 shrink-0" />
                        <span className="truncate flex-grow text-neutral-700">{url?.substring(0, 30)}</span>
                        <Button
                          type="button"
                          onClick={() => handleRemoveUrl(url)}
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-neutral-500 hover:bg-neutral-100"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {urls.length === 0 && (
                  <p className="text-xs text-gray-500 italic mt-1">No URLs added yet.</p>
                )}
              </div>
            </div>


            {/* Frequency Select and Active Switch (Side-by-Side) */}
            <div className="w-full center !justify-start gap-14">

              {/* Frequency Select */}
              <div className="grid grid-cols-[80px_1fr] items-center gap-16">
                <Label htmlFor="frequency" className="text-right text-xs font-semibold">
                  Frequency
                </Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="frequency" className="col-span-1 border-black/30 text-xs">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent className="bg-white text-black rounded-lg shadow-lg">
                    <SelectItem value="daily">
                      <div className="flex items-center gap-2">
                        <Repeat className="h-4 w-4 text-neutral-600" />
                        <span className={'text-xs'}>Daily</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="weekly">
                      <div className="flex items-center gap-2">
                        <Repeat className="h-4 w-4 text-neutral-600" />
                        <span className={'text-xs'}>Weekly (On Sundays)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="monthly">
                      <div className="flex items-center gap-2">
                        <Repeat className="h-4 w-4 text-neutral-600" />
                        <span className={'text-xs'}>Monthly (On the 1st)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Active Switch */}
              <div className="grid grid-cols-[80px_1fr] items-center gap-4">
                <Label htmlFor="is-active" className="text-right text-xs font-semibold">
                  Status
                </Label>
                <div className="col-span-1 flex items-center !text-xs space-x-2">
                  <Switch
                    id="is-active"
                    checked={isActive}
                    onCheckedChange={setIsActive}
                  />
                  <Label htmlFor="is-active" className="text-xs font-medium text-black/80">
                    {isActive ? "Enabled" : "Disabled"}
                  </Label>
                </div>
              </div>
            </div>


            {/* Run Slot Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time-slot" className="text-right text-xs font-semibold">
                Run Slot (UTC)
              </Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time-slot" className="col-span-3 border-black/30 text-xs">
                  <SelectValue placeholder="Select run time" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black rounded-lg shadow-lg">
                  {TIME_SLOTS.map((slot) => (
                    <SelectItem key={slot.slug} value={slot.slug}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-neutral-500" />
                        <span className={'text-xs'}>{slot.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-gray-100">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="border-black/30 text-xs shadow-sm">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-black text-white hover:bg-neutral-800 text-xs shadow-md"
            >
              {isSaving ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Schedule"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}