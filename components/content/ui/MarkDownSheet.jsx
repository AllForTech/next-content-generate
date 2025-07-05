import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {cn} from "@/lib/utils";
import {ArrowLeftIcon, ArrowRightIcon} from "lucide-react";

export function UiSheet({children, className, title}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button type={'button'} className={cn(`text-[10px] h-[27px] text px-[7px] button-dark rounded-sm font-regular center flex-row gap-[4px]`)} >
                    {title}
                </button>
            </SheetTrigger>
            <SheetTitle>

            </SheetTitle>
            <SheetContent className={cn(className)}>
                <div className={'absolute top-[10px] z-[20] left-[10px]'}>
                    <SheetClose asChild>
                        <ArrowRightIcon size={18} className={'text'}/>
                    </SheetClose>
                </div>
                {children}
            </SheetContent>
        </Sheet>
    )
}
