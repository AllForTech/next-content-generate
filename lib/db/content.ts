import { createClient } from "@/utils/supabase/client";
import { ContentGenerationResponse } from "@/lib/schema";

export async function saveGeneratedContent(content: ContentGenerationResponse) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("generated_content")
    .insert([
      {
        content_type: content.contentType,
        content_keyword: content.contentKeyword,
        tags: content.tags,
        main_content: content.mainContent,
      },
    ]);

  if (error) {
    console.error("Error saving generated content:", error);
    throw error;
  }

  return data;
}


const ITEMS_PER_PAGE = 6;

export async function getGeneratedContents(query: string, currentPage: number) {
  const supabase = createClient();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Base query to select content
  let queryBuilder = supabase
    .from("generated_content")
    .select("*", { count: "exact" });

  // Apply search filter if a query is provided
  if (query) {
    queryBuilder = queryBuilder.ilike("content_keyword", `%${query}%`);
  }

  // Apply pagination and ordering
  const { data, error, count } = await queryBuilder
    .order("created_at", { ascending: false })
    .range(offset, offset + ITEMS_PER_PAGE - 1);

  if (error) {
    console.error("Error fetching generated content:", error);
    throw error;
  }

  return { data, count };
}