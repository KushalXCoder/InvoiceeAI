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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

interface MailDialogProps {
  invoiceId: string;
  sendMail: boolean;
  setSendMail: (val: boolean) => void;
}

const MailDialog = ({ invoiceId, sendMail, setSendMail }: MailDialogProps) => {
  const [sending, setSending] = useState<boolean>(false);
  const [mailData, setMailData] = useState<string>("");

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setSending(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/send-email`, {
        method: "POST",
        body: JSON.stringify({ email: mailData, id: invoiceId }),
      });

      setSending(false);
      setSendMail(false);
      setMailData("");

      toast(
        res.status === 200 ? "Email sent successfully!" : "Failed to send email"
      );
    } catch (error) {
        console.log(error);
        setSending(false);
        setSendMail(false);
        toast("Error");
    }
  };

  return (
    <Dialog open={sendMail} onOpenChange={setSendMail}>
      <DialogContent className="sm:max-w-md font-poppins">
        <DialogHeader>
          <DialogTitle>Share Invoice</DialogTitle>
          <DialogDescription>
            Write the email address you want to share the invoice with.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue="johndoe@example.com"
              value={mailData}
              onChange={(e) => setMailData(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            className="bg-gray-300 cursor-pointer hover:bg-green-400 transition-colors"
            onClick={(e) => handleShare(e)}
          >
            {sending && <Spinner />}
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MailDialog;
