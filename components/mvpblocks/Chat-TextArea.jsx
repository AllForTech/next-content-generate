"use client";
import {generateContent} from "@/lib/general/actions";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { ImageIcon, FileUp, Figma, MonitorIcon, ArrowUpIcon, Paperclip, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";

export function ChatUi() {
  const [value, setValue] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });
  const router = useRouter()

  const blogTypes = [
    { value: 'informative', label: 'Informative', icon: 'BookOpen' },
    { value: 'persuasive', label: 'Persuasive', icon: 'Megaphone' },
    { value: 'how-to', label: 'How-To', icon: 'Hammer' },
    { value: 'listicle', label: 'Listicle', icon: 'List' },
    { value: 'opinion', label: 'Opinion', icon: 'Quote' },
    { value: 'news', label: 'News Recap', icon: 'Newspaper' },
  ];

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      console.log(value)
      const req = await generateContent(value)
      if(req.success){
        console.log(req.content)
        router.push(`/dashboard/blog/${req.content[0].blog_id}`)
      }else {
        console.log(req)
      }
      if (value.trim()) {
        setValue("");
        adjustHeight(true);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const req = await generateContent(value)
    if(req.success){
      console.log(req.content)
    }else {
      console.log(req)
    }
  }

  return (
    <div
      className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-4 p-4 py-24 sm:space-y-8">
      <h1 className="text-center text-2xl font-bold text-foreground">
        What can I help you ship?
      </h1>
      <div className="w-full">
        <div className="relative rounded-xl border border-border bg-secondary/20">
          <div className="overflow-y-auto">
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter a prompt..."
              className={cn(
                "w-full px-4 py-3",
                "resize-none",
                "bg-transparent",
                "border-none",
                "text-sm",
                "focus:outline-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:text-sm",
                "min-h-[60px]"
              )}
              style={{
                overflow: "hidden",
              }} />
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="group flex items-center gap-1 rounded-lg p-2 hover:bg-secondary/50">
                <Paperclip className="h-4 w-4" />
                <span className="hidden text-xs transition-opacity group-hover:inline">
                  Attach
                </span>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="flex items-center justify-between gap-1 rounded-lg border border-dashed border-border px-2 py-1 text-sm transition-colors">
                <PlusIcon className="h-4 w-4" />
                Project
              </Button>
              <button
                type="button"
                className={cn(
                  "flex items-center justify-between gap-1 rounded-lg border border-border px-1.5 py-1.5 text-sm transition-colors",
                  value.trim() ? "bg-white text-black" : "text-zinc-400"
                )}
              onClick={handleSubmit}>
                <ArrowUpIcon className={cn("h-4 w-4", value.trim() ? "text-black" : "text-zinc-400")} />
                <span className="sr-only">Send</span>
              </button>
            </div>
          </div>
        </div>

        <div className="-mx-4 mt-4 px-4 sm:mx-0 sm:px-0">
          <div
            className="flex flex-col flex-wrap items-start gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:overflow-x-auto sm:pb-2">
            <ActionButton icon={<ImageIcon className="h-4 w-4" />} label="Clone a Screenshot" />
            <ActionButton icon={<Figma className="h-4 w-4" />} label="Import from Figma" />
            <ActionButton icon={<FileUp className="h-4 w-4" />} label="Upload a Project" />
            <ActionButton icon={<MonitorIcon className="h-4 w-4" />} label="Landing Page" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label
}) {
  return (
    <Button
      type="button"
      variant="secondary"
      className="flex w-full flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-secondary/20 px-3 py-2 transition-colors sm:w-auto sm:px-4">
      {icon}
      <span className="text-xs">{label}</span>
    </Button>
  );
}

export default ChatUi;
