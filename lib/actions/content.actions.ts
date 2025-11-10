
'use server';

import { createClient } from '@/utils/supabase/client';
import { revalidatePath } from 'next/cache';

export async function deleteContent(contentId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('generated_content')
    .delete()
    .eq('id', contentId);

  if (error) {
    console.error('Error deleting content:', error);
    return { error: 'Failed to delete content.' };
  }

  revalidatePath('/dashboard');

  return { success: 'Content deleted successfully.' };
}
