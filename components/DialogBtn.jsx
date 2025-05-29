import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


const DialogBtn = () => {
    return (
        <Dialog className={`!border-none !outline-none !ring-none`}>
            <DialogTrigger>

            </DialogTrigger>
            <DialogContent className={`!border-none !outline-none !ring-none`}>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription className={`border-none outline-none ring-none text-black/80 bg-white`}>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>


    )
}
export default DialogBtn
