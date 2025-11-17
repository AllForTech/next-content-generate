import { GenerateContent } from '@/components/Layout/Dashboard/Generate/GenerateContent';
import { getContentById, getContentHistoryById } from '@/lib/db/content';

export default async function Generate({ params }: { params: { content_id: string } }) {
  const { content_id } = await params;

  const content = await getContentById(content_id);
  const history = await getContentHistoryById(content_id);

    return <GenerateContent contentId={content_id} history={history}  content={content}/>
}