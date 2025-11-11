import { GenerateContent } from '@/components/Layout/Dashboard/Generate/GenerateContent';
import { getContentById } from '@/lib/db/content';

export default async function Generate({ params }: { params: { type: string, content_id: string } }) {
  const { type, content_id } = await params;

  const content = await getContentById(content_id);

    return <GenerateContent contentType={type} contentId={content_id}  content={content}/>
}