
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { useContent } from '@/context/GenerationContext';

interface ContentCardProps {
    icon: LucideIcon;
    title: string;
    type: string;
    description: string;
}

export default function ContentCard({ icon: Icon, type, title, description }: ContentCardProps) {
    const { handleSelection } = useContent();

    return (
        <div 
            onClick={() => handleSelection(type)}
            className={cn('bg-stone-100 rounded-lg shadow-md p-6 flex flex-col items-center hover:scale-102 text-center cursor-pointer hover:shadow-xl transition-300')}
        >
            <Icon className={cn('w-12 h-12 text-indigo-500')} />
            <h3 className={cn('text-lg font-bold mt-4')}>{title}</h3>
            <p className={cn('text-gray-500 mt-2')}>{description}</p>
        </div>
    )
}
