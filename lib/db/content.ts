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