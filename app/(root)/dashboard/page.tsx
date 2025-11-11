


import { cn } from "@/lib/utils";

import { getGeneratedContents } from "@/lib/db/content";

import ContentCard from "@/components/Layout/Dashboard/ContentCard";

import { NewContentDialog } from "@/components/Layout/Dashboard/NewContentDialog";

import { GoToGeneratorButton } from './GoToGeneratorButton';

import Search from "@/components/Layout/Dashboard/Search";

import Pagination from "@/components/Layout/Dashboard/Pagination";
import { ScrollArea } from '@/components/ui/scroll-area';



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



  const { data: contents, count } = await getGeneratedContents(query, currentPage);

  const totalPages = Math.ceil((count || 0) / ITEMS_PER_PAGE);



  return (

    <div className={cn("container-full flex-col gap-4 p-4")}>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">Your Content</h1>

        <GoToGeneratorButton />

      </div>



      <div className="mb-8">

        <Search placeholder="Search by keyword..." />

      </div>



      {contents && contents.length > 0 ? (
        <ScrollArea className={cn('container-full center')}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

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

        <div className="text-center">

          <p className="text-lg text-muted-foreground">

            No content found.

          </p>

        </div>

      )}



      <div className="mt-8 flex justify-center">

        {totalPages > 1 && <Pagination totalPages={totalPages} />}

      </div>



      <NewContentDialog />

    </div>

  );

}
