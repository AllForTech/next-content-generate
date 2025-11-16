import { GenerateContent } from '@/components/Layout/Dashboard/Generate/GenerateContent';
import { getContentById, getContentHistoryById } from '@/lib/db/content';

export default async function Generate({ params }: { params: { type: string, content_id: string } }) {
  const { type, content_id } = await params;

  const content = await getContentById(content_id);
  const history = await getContentHistoryById(content_id);

    return <GenerateContent contentType={type} contentId={content_id} history={history}  content={content}/>
}