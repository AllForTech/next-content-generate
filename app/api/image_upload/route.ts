import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { randomUUID } from 'crypto';

export async function POST(req: Request) {
  const supabase = await createClient();
  const formData = await req.formData();
  const file = formData.get('image') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No image file uploaded.' }, { status: 400 });
  }

  // Convert File to Buffer/ArrayBuffer for storage
  const buffer = await file.arrayBuffer();
  const fileExtension = file.name.split('.').pop();
  const fileName = `${randomUUID()}.${fileExtension}`;

  try {
    // 1. Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('your-storage-bucket-name') // Change to your actual bucket name
      .upload(fileName, buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (error) {
      throw error;
    }

    // 2. Get the public URL
    const { data: publicUrlData } = await supabase.storage
      .from('your-storage-bucket-name')
      .getPublicUrl(fileName);

    return NextResponse.json({ publicUrl: publicUrlData.publicUrl }, { status: 200 });
  } catch (error) {
    console.error('Supabase upload error:', error);
    return NextResponse.json({ error: 'Failed to upload image to storage.' }, { status: 500 });
  }
}
