import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

const InfoDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <InfoIcon className="h-6 w-6 mr-2 hover:text-blue-700 cursor-pointer" /> */}
        <button className="flex items-center font-poppins rounded-lg border px-4 py-1.5 cursor-pointer text-blue-700">
            KNOW MORE
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md font-poppins p-6">
        <DialogHeader className='flex flex-col gap-3'>
          {/* <DialogTitle>Note</DialogTitle> */}
          <DialogDescription className='font-semibold'>
            Currently, you can only filter invoices by sentTo company name, i.e. to whom the invoice was sent. For, more changes, stay tuned 😄!
          </DialogDescription>
        </DialogHeader>
        {/* <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="https://ui.shadcn.com/docs/installation"
              readOnly
            />
          </div>
        </div> */}
        {/* <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

export default InfoDialog