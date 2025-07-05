import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export default function SkeletonCard({className}) {
    return (
        <div className={cn(`flex flex-col space-y-3 w-full`, className)}>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full dark:bg-zinc-800" />
                <Skeleton className="h-4 w-[46%] dark:bg-zinc-800" />
            </div>
            <Skeleton className="h-[125px] w-full rounded-xl dark:bg-zinc-800" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[66%] dark:bg-zinc-800" />
                {/*<Skeleton className="h-4 w-full" />*/}
            </div>
            <Skeleton className="h-[200px] w-full rounded-xl dark:bg-zinc-800" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[53%] dark:bg-zinc-800" />
                {/*<Skeleton className="h-4 w-full" />*/}
            </div>
            <Skeleton className="h-[130px] w-full rounded-xl dark:bg-zinc-800" />
        </div>
    )
}
