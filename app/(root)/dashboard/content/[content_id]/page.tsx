import { createClient } from '@/utils/supabase/client';
import { ContentGenerationResponse } from '@/lib/schema';
import { notFound } from 'next/navigation';
import { ContentRenderer } from '@/components/Layout/Dashboard/Generate/ContentRenderer';
import { cn } from '@/lib/utils';

interface ContentPageProps {
    params: {
        content_id: string;
    };
}

export default async function ContentPage({ params }: ContentPageProps) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('generated_content')
        .select('*')
        .eq('id', params.content_id)
        .single();

    if (error || !data) {
        console.error("Error fetching content:", error);
        notFound();
    }

    const content: ContentGenerationResponse = {
        contentType: data.content_type,
        contentKeyword: data.content_keyword,
        tags: data.tags,
        mainContent: data.main_content,
    };

    return (
        <div className={cn('container-full center flex-col p-4')}>
            <h1 className="text-3xl font-bold mb-4">{content.contentKeyword}</h1>
            <div className="text-sm text-gray-500 mb-4">
                Type: {content.contentType} | Tags: {content.tags.join(', ')}
            </div>
            <ContentRenderer content={content.mainContent} isLoading={false} />
        </div>
    );
}