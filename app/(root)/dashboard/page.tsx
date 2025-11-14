import { cn } from "@/lib/utils";

import { getGeneratedContents } from "@/lib/db/content";

import ContentCard from "@/components/Layout/Dashboard/ContentCard";

import { NewContentDialog } from "@/components/Layout/Dashboard/NewContentDialog";

import { GoToGeneratorButton } from './GoToGeneratorButton';

import Search from "@/components/Layout/Dashboard/Search";

import Pagination from "@/components/Layout/Dashboard/Pagination";
import { ScrollArea } from '@/components/ui/scroll-area';

// Assuming Framer Motion's motion wrapper is available for these server components
// import { motion } from 'framer-motion';


const ITEMS_PER_PAGE = 6;


export default async function Dashboard({
                                          searchParams,
                                        }: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = await searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // MAINTAINED: Original async data fetching logic
  const { data: contents, count } = await getGeneratedContents(query, currentPage);
  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);

  const hasContent = contents && contents.length > 0;

  return (
    // Outer container for centering the floating card
    <div className="flex justify-center container-full pb-16 bg-gray-50/50">

      {/* The Floating Dashboard Card */}
      <div
        // Animation for a clean entrance
        // initial={{ opacity: 0, y: 30 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className={cn(
          "w-full h-full max-w-7xl mx-4 lg:mx-auto px-8 py-2.5 md:px-12",
          "bg-white/95 backdrop-blur-xl border border-gray-100",
          "shadow-2xl shadow-indigo-500/10 rounded-[2rem]" // Creative shadow and rounded corners
        )}
      >
        <div className={cn("flex flex-col container-full gap-3")}>

          {/* Header Section (Enhanced Typography) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-4xl font-extrabold text-black tracking-tighter mb-4 md:mb-0">
              Your Contents
            </h1>
            {/* MAINTAINED: GoToGeneratorButton */}
            <GoToGeneratorButton />
          </div>

          {/* Search Area */}
          <div className="mb-4">
            {/* MAINTAINED: Search Component */}
            <Search placeholder="Search content by keyword or type..." />
          </div>

          {/* Content Grid Area */}
          {hasContent ? (
            /* MAINTAINED: ScrollArea logic and ContentCard mapping */
            <ScrollArea className={cn('w-full h-[62dvh]')}>
              <div className="grid grid-cols-1 overflow-hidden md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contents.map((content) => (
                  <ContentCard
                    key={content.id}
                    id={content.id}
                    title={content.content_keyword}
                    createdAt={content.created_at}
                    type={content.content_type}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="text-center p-16 bg-indigo-50 rounded-xl border border-indigo-200">
              <p className="text-2xl font-bold text-indigo-700 mb-2">
                No content found.
              </p>
              <p className="text-md text-indigo-600">
                Start a new search or create your first piece of content!
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {/* MAINTAINED: Pagination logic */}
            {totalPages > 1 && <Pagination totalPages={totalPages} />}
          </div>

          {/* MAINTAINED: NewContentDialog */}
          <NewContentDialog />
        </div>
      </div>
    </div>
  );
}