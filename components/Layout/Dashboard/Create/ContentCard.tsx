import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useContent } from '@/context/GenerationContext';
import { useGlobalState } from '@/context/GlobalStateContext';

interface ContentCardProps {
  icon: LucideIcon;
  title: string;
  type: string;
  description: string;
}

export default function ContentCard({ icon: Icon, type, title, description }: ContentCardProps) {
  const { handleSelection } = useContent();
  const { setCreateContentDialogOpen } = useGlobalState();

  const handleClick = () => {
    handleSelection(type);
    setCreateContentDialogOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        'transition-300 flex cursor-pointer flex-col items-center rounded-lg bg-stone-100 p-6 text-center shadow-md hover:scale-102 hover:shadow-xl',
      )}
    >
      <Icon className={cn('h-12 w-12 text-indigo-500')} />
      <h3 className={cn('mt-4 text-lg font-bold')}>{title}</h3>
      <p className={cn('mt-2 text-gray-500')}>{description}</p>
    </div>
  );
}
