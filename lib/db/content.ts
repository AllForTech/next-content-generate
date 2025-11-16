import { createClient } from "@/utils/supabase/server";
import { ContentGenerationResponse } from "@/lib/schema";

export async function saveGeneratedContent(content: ContentGenerationResponse) {
  const supabase = await createClient();
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
  const supabase = await createClient();
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

export async function getContentById(id: any){

  const supabase = await createClient();
  const { data, error } = await supabase.from("generated_content").select().eq('id', id);
  if (error) {
    console.log("Error fetching content:", error);
  }
  return data;
}

export async function getContentHistoryById(id: any){

  const supabase = await createClient();
  const { data, error } = await supabase.from("user_contents").select().eq('content_id', id);
  if (error) {
    console.log("Error fetching content:", error);
  }
  return data;
}

export async function saveContentImages(images: any[], content_id: string){
  const supabase = await createClient();
  // 1. Fetch user data safely
  const { data: userData, error: userError } = await supabase.auth.getUser();

  // 2. Critical: Check for authentication and exit if not authenticated
  if (userError || !userData?.user){
    console.log('Error saving images');
    console.error('Error: User not authenticated or data retrieval failed.', userError);
    return;
  }

  const user = userData.user;

  // 3. Define the data payload
  const imageDataPayload = {
    content_id: content_id,
    // RECOMMENDATION: Use the User UUID for robust foreign key linking
    author_id: user.id,
    // Save the entire array of image metadata as a JSONB object
    images: images,
  };

  // 4. Use upsert with onConflict on content_id
  // This assumes 'content_images' table has a unique/primary key on 'content_id'
  const { error } = await supabase.from("content_images")
    .upsert(imageDataPayload, {
      onConflict: 'content_id'
    });

  if (error) {
    console.error(`Error saving content_images for ID ${content_id}:`, error);
  }
}

export async function saveContentGoogleSearches(results: any[], content_id: string){
  // 1. Ensure the client is created correctly
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  // 2. Critical: Check for authentication BEFORE proceeding
  if ( !userData || !userData.user){
    console.log('Error saving content_google_searches');
    console.error('Error: User not authenticated or user data retrieval failed.', userError);
    // Exit the function gracefully
    return;
  }

  const user = userData.user;

  // 3. Define the data payload
  const searchData = {
    content_id: content_id,
    // RECOMMENDATION: Use the user's UUID for linking
    author_id: user.id,
    // Save the entire array of results as a JSONB object
    results: results,
  };

  // 4. Use upsert with onConflict for reliable insertion or update
  const { error } = await supabase.from("search_results")
    .upsert(searchData, {
      // If a record with this content_id already exists, update it.
      onConflict: 'content_id'
    });

  if (error) {
    console.error(`Error saving content_images for ID ${content_id}:`, error);
  }
}

export async function saveContentScrapedData(results: any[], content_id: string){
  // 1. Ensure the client is created correctly
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  // 2. Critical: Check for authentication BEFORE proceeding
  if ( !userData || !userData.user){
    console.log('Error saving scraped data.');
    console.error('Error: User not authenticated or user data retrieval failed.', userError);
    // Exit the function gracefully
    return;
  }

  const user = userData.user;

  // 3. Define the data payload
  const searchData = {
    content_id: content_id,
    // RECOMMENDATION: Use the user's UUID for linking
    author_id: user.id,
    // Save the entire array of results as a JSONB object
    scrapedData: results,
  };

  // 4. Use upsert with onConflict for reliable insertion or update
  const { error } = await supabase.from("scraped_data")
    .upsert(searchData, {
      // If a record with this content_id already exists, update it.
      onConflict: 'content_id'
    });

  if (error) {
    console.error(`Error saving scraped_data for ID ${content_id}:`, error);
  }
}

export async function saveContent(content: string, prompt: string, contentId: string){
  const supabase = await createClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();

  // 2. Critical: Check for authentication BEFORE proceeding
  if ( !userData || !userData.user){
    console.log('Error saving content.');
    console.error('Error: User not authenticated or user data retrieval failed.', userError);
    // Exit the function gracefully
    return;
  }

  const user = userData.user;

  const saveData = {
    content,
    prompt,
    author_id: user.id,
    content_id: contentId,
  }

  const { error } = await supabase.from("user_contents").insert(saveData);

  if (error) {
    console.error(`Error saving content for ID ${contentId}:`, error);
  }
}