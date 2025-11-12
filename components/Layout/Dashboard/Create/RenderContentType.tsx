'use client'
import { cn } from "@/lib/utils";
import ContentCard from "@/components/Layout/Dashboard/Create/ContentCard";
import { FileText, MessageSquare, Newspaper } from "lucide-react";

const contentTypes = [
    {
        icon: FileText,
        title: "Document",
        type: "document",
        description: "Create a new document from scratch.",
    },
    {
        icon: MessageSquare,
        title: "Social Media Post",
        type: "social",
        description: "Generate a post for your social media accounts.",
    },
    {
        icon: Newspaper,
        title: "Blog Post",
        type: "blog",
        description: "Write a new blog post for your website.",
    },
];

export default function RenderContentType() {
    return (
        <div className={cn('container-full center flex-col !justify-start p-12')}>
            <div className={cn('container-full center flex-col !justify-start')}>
                <h1 className={cn('text-3xl font-bold')}>What would you like to create?</h1>
                <p className={cn('text-gray-500 mt-2')}>Select a content type to get started.</p>

                <div className={cn('container-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12')}>
                    {contentTypes.map((contentType, index) => (
                        <ContentCard
                            key={index}
                            icon={contentType.icon}
                            type={contentType.type}
                            title={contentType.title}
                            description={contentType.description}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
