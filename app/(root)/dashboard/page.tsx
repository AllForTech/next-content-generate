import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {

    return (
        <div className={cn('container-full center flex-col gap-4')}>
            <h1 className="text-4xl font-bold">Welcome to AI Content Generator</h1>
            <p className="text-lg text-muted-foreground">Get started by generating some content.</p>
            <Link href="/generate">
                <Button>Go to Generator</Button>
            </Link>
        </div>
    );
}