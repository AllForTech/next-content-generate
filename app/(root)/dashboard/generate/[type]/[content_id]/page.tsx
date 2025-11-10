import { GenerateContent } from '@/components/Layout/Dashboard/Generate/GenerateContent';

export default async function Generate({ params }: { params: { type: string, content_id: string } }) {
  const { type, content_id } = await params;

    return <GenerateContent contentType={type} contentId={content_id} />
}