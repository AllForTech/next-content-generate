'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteContent(contentId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'User not authenticated' };
  }

  const { data: content, error: fetchError } = await supabase
    .from('generated_content')
    .select('user_id')
    .eq('id', contentId)
    .single();

  if (fetchError || !content) {
    return { error: 'Content not found.' };
  }

  // if (content.user_id !== user.id) {
  //   return { error: 'You are not authorized to delete this content.' };
  // }

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

export async function updateContent(contentId: string, newContent: string) {
  const supabase =  await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'User not authenticated' };
  }

  const { data: content, error: fetchError } = await supabase
    .from('generated_content')
    .select('user_id')
    .eq('id', contentId)
    .single();

  if (fetchError || !content) {
    return { error: 'Content not found.' };
  }

  if (content.user_id !== user.id) {
    return { error: 'You are not authorized to update this content.' };
  }

  const { error } = await supabase
    .from('generated_content')
    .update({ main_content: newContent })
    .eq('id', contentId);

  if (error) {
    console.error('Error updating content:', error);
    return { error: 'Failed to update content.' };
  }

  revalidatePath(`/dashboard/content/${contentId}`);
  revalidatePath('/dashboard');

  return { success: 'Content updated successfully.' };
}