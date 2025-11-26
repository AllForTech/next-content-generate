import { GenerateContent } from '@/components/Layout/Dashboard/Generate/GenerateContent';
import { getContentHistoryById, getLatestContentHistory } from '@/lib/db/content';

export default async function Generate({ params }: { params: { content_id: string } }) {
  const { content_id } = await params;

  const allHistory = await getContentHistoryById(content_id);
  const history = await getLatestContentHistory(allHistory);

  return <GenerateContent contentId={content_id} allHistory={allHistory} history={history} />;
}
