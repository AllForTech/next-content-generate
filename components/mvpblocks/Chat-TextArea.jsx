"use client";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";
import { ImageIcon, FileUp, Figma, MonitorIcon, ArrowUpIcon, Paperclip, PlusIcon, LoaderCircle} from "lucide-react";
import { Button } from "@/components/ui/button";
import {toast} from "sonner";

export function ChatUi({setContent, content, isLoading, setIsLoading, setImages}) {
  const [values, setValues] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 60,
    maxHeight: 200,
  });

  // const blogTypes = [
  //   { value: 'informative', label: 'Informative', icon: 'BookOpen' },
  //   { value: 'persuasive', label: 'Persuasive', icon: 'Megaphone' },
  //   { value: 'how-to', label: 'How-To', icon: 'Hammer' },
  //   { value: 'listicle', label: 'Listicle', icon: 'List' },
  //   { value: 'opinion', label: 'Opinion', icon: 'Quote' },
  //   { value: 'news', label: 'News Recap', icon: 'Newspaper' },
  // ];

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const url = process.env.API_ENDPOINT;

      try {
        setContent("");
        setIsLoading(true);

        toast.message("Searching the web...");
        // Step 1: Research
        const response1 = await  fetch(`http://localhost:3000/api/research`, {
          method: 'POST',
          body: JSON.stringify(values)
        })
        const research = await response1.json()
        console.log(research);

        // Step 2: Keywords
        toast.message("Generating keywords.");
       const response2 = await fetch(`http://localhost:3000/api/keywords`,{
         method: "POST",
         body: JSON.stringify(research)
       })
        const keywords = await response2.json()
        // Step 3: Images
        toast.message("Generating images.");
        const response3 = await fetch(`http://localhost:3000/api/unsplash`,{
          method: "POST",
          body: JSON.stringify(keywords)
        })
        const results = await response3.json()

          if(results){
              setImages(results)
          }
          console.log(results)

        // Step 4: Gemini Streaming
        toast.message("Generating blog...");
       const response4 = await fetch(`http://localhost:3000/api/generate`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           // formatedUrls,
           research
         })
       })

        if (!response4.body) console.log("No response body");

        const reader = response4.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let result = "";

          while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              const chunk = decoder.decode(value);
              result += chunk;

              setContent((prev) => prev + chunk);
          }

      } catch (e) {
        console.error(e);
        setErrorMessage("❗ Sorry, an error occurred.");
        setTimeout(() => setErrorMessage(""), 4000);
      } finally {
        setIsLoading(false);
      }

      if (values.trim()) {
        setValues("");
        adjustHeight(true);
      }
    }
  };


  return (
    <div
      className={cn(`mx-auto fixed w-[300px] group hover:lg:w-[600px] hover:md:w-[500px] h-fit transition-500 pb-[0%] bottom-0 hover:pb-[30px] right-[50%] translate-x-[50%] flex flex-col items-center space-y-4 sm:space-y-8`,
          values.trim() ? 'lg:w-[600px]' : 'lg:w-[300px]',
          values.trim() ? 'pb-[30px]' : 'pb-[30px]')}>
      {errorMessage && (
          <h1 className="text-center text-xs p-[10px] bg-white rounded-md text-red-600 font-bold shadow">
            {errorMessage}
          </h1>
      )}
      <div className="w-full">
        <div className={cn(`relative rounded-lg shadow border h-[110px] lg:h-[50px] group-hover:h-[110px] overflow-hidden transition-500 border-border border-zinc-400 backdrop-blur-lg !bg-white/30 bg-dark-theme`,
            values.trim() ? 'lg:h-[110px]' : 'lg:h-[50px]',
            )}>
          <div className={cn(`max-h-[60px] w-full`)}>
            <Textarea
              ref={textareaRef}
              value={values}
              onChange={(e) => {
                setValues(e.target.value);
                adjustHeight();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter a prompt..."
              className={cn(
                "w-full px-4 py-3",
                "resize-none",
                'overflow-y-auto',
                "bg-transparent",
                "!font-regular",
                "border-none",
                'lg:hidden',
                "!text-sm",
                "text-black dark:text-white",
                "focus:outline-none",
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                "placeholder:!text-sm",
                  "placeholder:text",
                "max-h-[40px]",
                  'block',
                  values.trim() ? 'lg:block' : 'lg:hidden',
                  'group-hover:lg:block'
              )}
            />
          </div>
          <div className="flex items-center !h-fit justify-between mt-[5px] groun-hover:mt-[0px] groun-hover:mb-[15px] px-[10px]">
            <Button
                type="button"
                size="sm"
                variant="outline"
                className="flex items-center gap-1 group-hover:mb-[15px] size-[30px] rounded-lg p-1.5 py-0 bg-zinc-900 dark:bg-white">
              <Paperclip className="h-4 w-4 text" />
              <span className="hidden text-xs text transition-opacity ">
                   Attach
                 </span>
            </Button>
            {/* <div className="flex items-center gap-2"> */}
            {/* <Button */}
            {/* // type="button" */}
            {/* // size="sm" */}
            {/* // variant="secondary" */}
            {/* // className="flex items-center justify-between gap-1 rounded-lg border border-dashed border-border px-2 py-1 text-sm transition-colors"> */}
            {/* <PlusIcon className="h-4 w-4" /> */}
            {/* Project */}
            {/* </Button> */}
            <button
                type="button"
                className={cn(
                    "flex items-center justify-between gap-1 group-hover:mb-[15px] rounded-lg border border-border px-1.5 py-1.5 text-sm transition-colors",
                    values.trim() ? "bg-zinc-900 dark:bg-white text" : "text-zinc-400"
                )}
                onClick={handleKeyDown}>
              { isLoading ? (
                  <LoaderCircle className={cn("h-4 w-4 animate-spin", values.trim() ? "text-white" : "text-zinc-400")} />
              ) : (
                  <>
                    <ArrowUpIcon className={cn("h-4 w-4", values.trim() ? "text" : "text-zinc-400")} />
                    <span className="sr-only text">Send</span>
                  </>
              )}
            </button>
          </div>

          {/* // </div> */}
        </div>

        {/* <div className="-mx-4 mt-4 px-4 sm:mx-0 sm:px-0"> */}
          {/* <div */}
            {/* className="flex flex-col flex-wrap items-start gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:overflow-x-auto sm:pb-2"> */}
            {/* <ActionButton icon={<ImageIcon className="h-4 w-4" />} label="Clone a Screenshot" /> */}
            {/* <ActionButton icon={<Figma className="h-4 w-4" />} label="Import from Figma" /> */}
            {/* <ActionButton icon={<FileUp className="h-4 w-4" />} label="Upload a Project" /> */}
            {/* <ActionButton icon={<MonitorIcon className="h-4 w-4" />} label="Landing Page" /> */}
          {/* </div> */}
        {/* </div> */}
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
