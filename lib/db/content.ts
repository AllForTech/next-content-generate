'use server'
import { createClient } from "@/utils/supabase/server";
import { db } from "@/db/index";
import { contents, userContents, userSchedules } from '@/drizzle/schema';
import { eq, desc, sql, and } from "drizzle-orm";
import { revalidatePath } from 'next/cache';
import { generateCronString } from '@/lib/utils';
import { auth } from 'google-auth-library';

interface ScheduledJob {
  jobType: string;
  prompt: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  time: string; // e.g., '09:30'
  isActive: boolean;
}

type ContentItem = typeof userContents.$inferSelect & {
  created_at: string;
};

const ITEMS_PER_PAGE = 6;

// --- 1. getGeneratedContents ---
// Fetches a paginated list of master content records for the current user.
export async function getGeneratedContents(currentPage: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('Error fetching content: User not authenticated.');
    return { data: [], count: 0 };
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const dataPromise = db.query.contents.findMany({
    where: eq(contents.authorId, user.id),
    orderBy: [desc(contents.createdAt)],
    limit: ITEMS_PER_PAGE,
    offset: offset,
  });

  const countPromise = db
    .select({ count: sql<number>`count(*)` })
    .from(contents)
    .where(eq(contents.authorId, user.id));

  try {
    const [data, countResult] = await Promise.all([dataPromise, countPromise]);
    const count = countResult[0]?.count || 0;
    return { data, count };
  } catch (error) {
    console.error("Error fetching generated content with Drizzle:", error);
    throw error;
  }
}

// --- 2. getSingleContent ---
// Fetches a single master content record by its ID.
export async function getSingleContent(contentId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        console.error('Error fetching content: User not authenticated.');
        return null;
    }

    try {
        const data = await db.query.contents.findFirst({
            where: and(eq(contents.contentId, contentId), eq(contents.authorId, user.id)),
        });
        return data ?? null;
    } catch (error) {
        console.error("Error fetching single content with Drizzle:", error);
        return null;
    }
}


// --- 3. getAllContentHistory ---
// Fetches all historical versions of a specific content piece for the logged-in user.
export async function getAllContentHistory(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('Error fetching content history: User not authenticated.');
    return null;
  }

  try {
    const data = await db.query.userContents.findMany({
      where: and(
        eq(userContents.contentId, id),
        eq(userContents.authorId, user.id)
      ),
      orderBy: [desc(userContents.createdAt)],
    });
    return data;
  } catch (error) {
    console.error("Error fetching all content history with Drizzle:", error);
    return null;
  }
}

// --- 4. getContentHistoryById ---
// Fetches a specific version of content by its session ID (and content ID for precision).
export async function getContentHistoryById(contentId: string) {
  const supabase = await createClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.error('Error fetching content history: User not authenticated.');
      return null;
    }

    const data = await db.query.userContents.findMany({
      where: and(
         eq(userContents.contentId, contentId),
        eq(userContents.authorId, user.id)
      ),
    });
    return data;
  } catch (error) {
    console.error("Error fetching content history by ID with Drizzle:", error);
    return null;
  }
}

// --- 5. saveContent (for historical versions) ---
// Saves a specific version of generated content to the user_contents table.
export async function saveContent(content: string, prompt: string, contentId: string, sessionId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('Error saving content: User not authenticated.');
    return;
  }

  const saveData = {
    content,
    prompt,
    sessionId,
    authorId: user.id,
    contentId,
  };

  try {
    await db.insert(userContents)
      .values(saveData)
      .onConflictDoUpdate({
        target: [userContents.sessionId, userContents.contentId, userContents.authorId],
        set: { content, prompt }
      });
  } catch (error) {
    console.error(`Error saving content version for ID ${contentId} with Drizzle:`, error);
  }
}

// --- 6. saveNewContent (for master record) ---
// Creates or updates the master content record in the 'contents' table.
export async function saveNewContent(contentId: string, content: string, prompt: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    console.error('Error saving new content: User not authenticated.');
    return;
  }

  const saveData = {
    contentId,
    authorId: user.id,
    content,
    prompt,
  };

  try {
    await db.insert(contents)
      .values(saveData)
      .onConflictDoUpdate({
        target: contents.contentId,
        set: {
          content: saveData.content,
          prompt: saveData.prompt,
        }
      });
    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/content/${contentId}`);
  } catch (error) {
    console.error(`Error saving new master content for ID ${contentId} with Drizzle:`, error);
  }
}

// --- Helper functions to save metadata to a content version ---

export async function saveContentImages(images: any[], content_id: string, session_id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
    await db.insert(userContents)
      .values({ contentId: content_id, sessionId: session_id, authorId: user.id, images })
      .onConflictDoUpdate({
        target: [userContents.sessionId, userContents.contentId, userContents.authorId],
        set: { images }
      });
  } catch (error) {
    console.error(`Error saving images for session ${session_id}:`, error);
  }
}

export async function saveContentGoogleSearches(results: any[], content_id: string, session_id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
    await db.insert(userContents)
      .values({ contentId: content_id, sessionId: session_id, authorId: user.id, searchResults: results })
      .onConflictDoUpdate({
        target: [userContents.sessionId, userContents.contentId, userContents.authorId],
        set: { searchResults: results }
      });
  } catch (error) {
    console.error(`Error saving search results for session ${session_id}:`, error);
  }
}

export async function saveContentScrapedData(results: any[], content_id: string, session_id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  try {
    await db.insert(userContents)
      .values({ contentId: content_id, sessionId: session_id, authorId: user.id, scrapedData: results })
      .onConflictDoUpdate({
        target: [userContents.sessionId, userContents.contentId, userContents.authorId],
        set: { scrapedData: results }
      });
  } catch (error) {
    console.error(`Error saving scraped data for session ${session_id}:`, error);
  }
}

// --- 7. getLatestContentHistory (NO CHANGE) ---
export async function getLatestContentHistory(historyArray: any[]) {
  if (!historyArray || historyArray.length === 0) {
    return null;
  }

  const sortedHistory = historyArray.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  return sortedHistory[0];
}

export async function saveNewSchedule(input: ScheduledJob) {
  const supabase = await createClient();

  // 2. Authentication and Authorization
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Authentication required to save a schedule.' };
  }

  try {
    // 3. Generate Cron Schedule and Prepare Data
    const cronSchedule = generateCronString(input.frequency, input.time);

    const newJobData = {
      user_id: user.id, // Supabase usually prefers snake_case for column names
      cron_schedule: cronSchedule,
      job_type: input.jobType,
      is_active: input.isActive,
      prompt: input.prompt,
    };

    // 4. Insert or Update the schedule using Supabase Client
    const { data: result, error } = await supabase
      .from('user_schedules')
      .upsert(newJobData, {
        // Define the columns that uniquely identify a record (the composite key)
        onConflict: 'user_id, job_type'
      })
      .select() // Select the inserted/updated row
      .single(); // Expect only one row

    if (error) {
      console.error('Supabase Error Saving Schedule:', error);
      return { error: error.message };
    }

    // 5. Revalidate and Return Success
    revalidatePath('/dashboard/schedule');

    // Note: Supabase returns 'data' as a single object if .single() is used
    return { success: true, schedule: result };

  } catch (error) {
    console.error('Unknown Error Saving Schedule:', error);
    return {
      error: 'Failed to save job to database. An unknown error occurred.',
    };
  }
}

export async function getScheduledJobs(): Promise<ScheduledJob[]> {
  // 1. Initialize Supabase Client
  const supabase = await createClient();

  // 2. Authentication
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    // Return an empty array if no user is authenticated
    return [];
  }

  try {
    // 3. Query the 'user_schedules' table
    const { data, error } = await supabase
      .from('user_schedules')
      .select('*') // Selects all columns defined in the table
      .eq('user_id', user.id); // Filter only for the current user's jobs

    if (error) {
      console.error('Supabase Error Fetching Schedules:', error);
      // Return an empty array on database error
      return [];
    }

    // 4. Return the data
    return (data as ScheduledJob[]) || [];

  } catch (e) {
    console.error('Unknown Error in getScheduledJobs:', e);
    return [];
  }
}


export async function deleteScheduledJobAction(userId: string, jobType: string) {
  const supabase = await createClient();

  // 1. Double-Check Authentication (Safety Measure)
  const { data: { user } } = await supabase.auth.getUser();

  // Ensure the request is coming from an authenticated user AND that the user ID in the request
  // matches the ID of the job's owner.
  if (!user || user.id !== userId) {
    return { error: 'Authorization error: Cannot delete job.' };
  }

  try {
    // 2. Perform the deletion
    // We use the composite key (user_id AND job_type) to target the specific row.
    const { error } = await supabase
      .from('user_schedules')
      .delete()
      .eq('user_id', userId)
      .eq('job_type', jobType); // Ensure this matches the column name in your database

    if (error) {
      console.error('Supabase Delete Error:', error);
      return { error: error.message };
    }

    // 3. Revalidate the path to update the list instantly
    revalidatePath('/dashboard/schedule');

    return { success: true };

  } catch (e) {
    console.error('Unknown deletion error:', e);
    return { error: 'An unexpected error occurred during deletion.' };
  }
}