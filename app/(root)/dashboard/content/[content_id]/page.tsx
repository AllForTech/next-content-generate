'use client';

import { createClient } from '@/utils/supabase/client';
import { ContentGenerationResponse } from '@/lib/schema';
import { notFound } from 'next/navigation';
import { ContentRenderer } from '@/components/Layout/Dashboard/Generate/ContentRenderer';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateContent } from '@/lib/actions/content.actions';
import { toast } from 'sonner';

interface ContentPageProps {
    params: {
        content_id: string;
    };
}

export default function ContentPage({ params }: ContentPageProps) {
    const { content_id } = params;
    const [mainContent, setMainContent] = useState('');
    const [contentType, setContentType] = useState('');
    const [contentKeyword, setContentKeyword] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function fetchContent() {
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                notFound();
                return;
            }

            const { data, error } = await supabase
                .from('generated_content')
                .select('*')
                .eq('id', content_id)
                .eq('user_id', user.id)
                .single();

            if (error || !data) {
                console.error("Error fetching content:", error);
                notFound();
                return;
            }

            setMainContent(data.main_content);
            setContentType(data.content_type);
            setContentKeyword(data.content_keyword);
            setTags(data.tags);
            setIsLoading(false);
        }
        fetchContent();
    }, [content_id]);

    const handleSave = async () => {
        setIsSaving(true);
        const result = await updateContent(content_id, mainContent);
        setIsSaving(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success(result.success);
        }
    };

    if (isLoading) {
        return (
            <div className={cn('container-full center flex-col p-4')}>
                <p>Loading content...</p>
            </div>
        );
    }

    return (
        <div className={cn('container-full center flex-col p-4')}>
            <div className="w-full flex justify-end mb-4">
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
            <h1 className="text-3xl font-bold mb-4">{contentKeyword}</h1>
            <div className="text-sm text-gray-500 mb-4">
                Type: {contentType} | Tags: {tags.join(', ')}
            </div>
            <ContentRenderer content={mainContent} isLoading={false} onContentChange={setMainContent} />
        </div>
    );
}