'use client'

import React, { useState } from 'react';
import { cn } from "@/lib/utils";
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
import { Clock, Plus, Repeat, Settings } from 'lucide-react';


export function ScheduleNewJobDialog() {
  // State for all form fields
  const [jobType, setJobType] = useState('content_generation');
  const [prompt, setPrompt] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState('09:00'); // Default to 9:00 AM
  const [isActive, setIsActive] = useState(true);

  const [isSaving, setIsSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);


  const saveNewJobToDatabase = async (jobData: any) => {
    console.log("Saving new job to database:", jobData);
    // Simulating an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, you would call:
    // const result = await saveNewScheduleAction(jobData);
    // if (result.error) { throw new Error(result.error); }
    return { success: true, id: Math.random().toString(36).substring(2, 9) };
  };

  /**
   * Converts user-friendly inputs into a standard cron string.
   */
  const generateCronString = (freq: string, timeStr: string): string => {
    const [hour, minute] = timeStr.split(':');

    switch (freq) {
      case 'daily':
        // Runs every day at the specified time (e.g., '30 09 * * *')
        return `${minute} ${hour} * * *`;
      case 'weekly':
        // Runs every Sunday at the specified time (e.g., '30 09 * * 0')
        return `${minute} ${hour} * * 0`;
      case 'monthly':
        // Runs on the 1st of every month at the specified time (e.g., '30 09 1 * *')
        return `${minute} ${hour} 1 * *`;
      default:
        return `${minute} ${hour} * * *`;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);

    const cronSchedule = generateCronString(frequency, time);

    const jobData = {
      jobType,
      prompt, // You'll need a column for this in your `user_schedules` table
      cronSchedule,
      isActive,
      // userId will be handled by the server action from auth()
    };

    const toastId = toast.loading("Saving new schedule...");

    try {
      await saveNewJobToDatabase(jobData);

      toast.success("New schedule created!", {
        id: toastId,
        description: `Job set to run ${frequency} at ${time}.`,
      });

      // Reset form and close dialog
      setIsOpen(false);
      setPrompt('');
      setTime('09:00');
      setFrequency('daily');

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
        <Button className="bg-black p-3 text-white hover:bg-neutral-800">
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Job
        </Button>
      </DialogTrigger>

      {/*
              Content uses bg-white (or bg-background which is white in light mode)
              and black text (or text-foreground which is black in light mode).
            */}
      <DialogContent className="bg-white text-black w-[300px] sm:w-[400px] md:w-[600px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-black">
            Configure New Automation
          </DialogTitle>
          <DialogDescription className="text-black/70">
            Set the prompt, type, and schedule for the AI to run automatically.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">

            {/* Job Type Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="job-type" className="text-right text-xs font-semibold">
                Job Type
              </Label>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger id="job-type" className="col-span-3 border-black/30">
                  <SelectValue className={'text-xs'} placeholder="Select a job type" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="content_generation">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className={'text-xs'}>Content Generation</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="image_generation" disabled>
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span className={'text-xs'}>Image Generation (Soon)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

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
                className="col-span-3 text-xs min-h-[100px] border-black/30"
                required
              />
            </div>

            {/* Frequency Select */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right font-semibold">
                Frequency
              </Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger id="frequency" className="col-span-3 border-black/30">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  <SelectItem value="daily">
                    <div className="flex items-center gap-2">
                      <Repeat className="h-4 w-4" />
                      <span className={'text-xs'}>Daily</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="weekly">
                    <div className="flex items-center gap-2">
                      <Repeat className="h-4 w-4" />
                      <span className={'text-xs'}>Weekly (On Sundays)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="monthly">
                    <div className="flex items-center gap-2">
                      <Repeat className="h-4 w-4" />
                      <span className={'text-xs'}>Monthly (On the 1st)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Input */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right text-xs font-semibold">
                Run At (UTC)
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="col-span-3 text-xs border-black/30"
                required
              />
            </div>

            {/* Active Switch */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="is-active" className="text-right text-xs font-semibold">
                Status
              </Label>
              <div className="col-span-3 flex items-center !text-xs space-x-2">
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

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" className="border-black/30">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-black text-white hover:bg-neutral-800"
            >
              {isSaving ? "Saving..." : "Save Schedule"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}