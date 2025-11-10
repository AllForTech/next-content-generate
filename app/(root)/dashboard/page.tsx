'use client'
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useGlobalState } from '@/context/GlobalStateContext';
import { NewContentDialog } from '@/components/Layout/Dashboard/NewContentDialog';

export default function Dashboard() {
  const { setCreateContentDialogOpen } = useGlobalState();

  return (
        <div className={cn('container-full center flex-col gap-4')}>
            <h1 className="text-4xl font-bold">Welcome to AI Content Generator</h1>
            <p className="text-lg text-muted-foreground">Get started by generating some content.</p>
            <div>
                <Button
                  onClick={() => setCreateContentDialogOpen((prev: boolean) => !prev)}
                >Go to Generator</Button>
            </div>
          <NewContentDialog/>
        </div>
    );
}