import {cn} from "@/lib/utils";
import { GenerateContent } from '@/components/Layout/Dashboard/Generate/GenerateContent';

export default function Generate({ params }: { params: { type: string, content_id: string } }) {

    return <GenerateContent contentType={params.type} contentId={params.content_id} />
}