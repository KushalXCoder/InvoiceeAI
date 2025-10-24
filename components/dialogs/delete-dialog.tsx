import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { useInvoiceStore } from "@/store/invoiceStore";
import { useRouter } from "next/navigation";
import { useItemsStore } from "@/store/itemsStore";
import { toast } from "sonner";

interface DeleteDialogProps {
  invoiceId: string;
  deletePermission: boolean;
  setDeletePermission: (val: boolean) => void;
}

const DeleteDialog = ({
  invoiceId,
  deletePermission,
  setDeletePermission,
}: DeleteDialogProps) => {
  const router = useRouter();

  const currentInvoiceId = useInvoiceStore.getState().currentInvoiceId;
  const reset = useInvoiceStore.getState().reset;
  const { resetItems } = useItemsStore.getState();

  const [deleting, setDeleting] = useState<boolean>(false);
  const [inputData, setInputData] = useState<string>("");

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (inputData === "DELETE") {
      setDeleting(true);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/delete`, {
          method: "DELETE",
          body: JSON.stringify({ id: invoiceId }),
        });

        toast(
          res.status !== 200
            ? "Failed to delete invoice"
            : "Invoice deleted successfully!"
        );

        setDeleting(false);
        setDeletePermission(false);
        setInputData("");

        if (res.ok) {
          console.log(currentInvoiceId);
          console.log(invoiceId);

          // Reset states if the deleted invoice is the one which is currently opened in the editor
          if (currentInvoiceId === invoiceId) {
            reset();
            resetItems();
            console.log("Done");
          }

          router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
        toast("Error deleting invoice");
      }
    } else {
        setDeleting(false);
        setDeletePermission(false);
        setInputData("");
    
        toast("Type DELETE in uppercase to confirm deletion");
    }
  };

  return (
    <Dialog open={deletePermission} onOpenChange={setDeletePermission}>
      <DialogContent className="sm:max-w-md font-poppins">
        <DialogHeader>
          <DialogTitle className="text-red-500">Delete Invoice</DialogTitle>
          <DialogDescription>
            If you want to delete this invoice, please type &quot;DELETE&quot;
            in the input box below.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="delete"
              defaultValue="johndoe@example.com"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            className="bg-gray-300 cursor-pointer hover:bg-green-400 transition-colors"
            onClick={(e) => handleDelete(e)}
          >
            {deleting && <Spinner />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
