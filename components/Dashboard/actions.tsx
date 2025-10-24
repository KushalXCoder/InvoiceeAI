"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteIcon, DownloadIcon, EditIcon, MailIcon, MoreHorizontal } from "lucide-react";
import { generateInvoiceBlob } from "@/lib/helper/generatePdf";
import { Row } from "@tanstack/react-table";
import { InvoiceTableData } from "./columns";
import MailDialog from "../dialogs/mail-dialog";
import { useItemsStore } from "@/store/itemsStore";
import { useInvoiceStore } from "@/store/invoiceStore";
import { useRouter } from "next/navigation";
import DeleteDialog from "../dialogs/delete-dialog";

interface ActionsProps {
  row: Row<InvoiceTableData>;
}

const Actions = ({ row }: ActionsProps) => {
  const router = useRouter();

  const invoiceId = row.original.invoiceNumber;
  const [sendMail, setSendMail] = useState(false);
  const [deletePermission, setDeletePermission] = useState<boolean>(false);

  const { setEdit, setEditingData } = useInvoiceStore();
  const { setEditingItemsData } = useItemsStore();
  
  const handleEdit = async (id: string) => {
    console.log(id);

    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/get-invoice`, {
      method: "POST",
      body: JSON.stringify({id: id}),
    });

    if(res.status === 200) {
      const resData = await res.json();

      console.log(resData);

      setEdit(true);
      setEditingData(resData.invoice.invoiceInfo);
      setEditingItemsData(resData.invoice.itemsData);

      console.log(useItemsStore.getState().editingItemsData);
      router.push("/dashboard/invoice");
    }
  }

  const handleMail = () => {
    setSendMail(true);
  };

  const handleDownload = async (id: string) => {
    console.log(`Downloading invoice ${id}`);
    try {
      // Fetch invoice data
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URI}/api/get-invoice`,
        {
          method: "POST",
          body: JSON.stringify({ id: id }),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch invoice");

      const data = await res.json();
      const { invoice } = data;

      // Generate PDF blob
      const pdfBlob = await generateInvoiceBlob(invoice, invoice.itemsData);

      // Create download link and trigger download
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `Invoice-${id}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      console.log("Invoice downloaded successfully");
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download invoice. Please try again.");
    }
  };

  const handleDelete = () => {
    setDeletePermission(true);
  }

  const actions = [
    { name: "Edit", icon: EditIcon, clickEvent: handleEdit },
    { name: "Mail", icon: MailIcon, clickEvent: handleMail },
    { name: "Download", icon: DownloadIcon, clickEvent: handleDownload },
    { name: "Delete", icon: DeleteIcon, clickEvent: handleDelete },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="hover:bg-gray-200 transition-colors cursor-pointer">
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="font-poppins bg-black text-white"
        >
          <DropdownMenuLabel className="font-bold">Actions</DropdownMenuLabel>
          {actions.map((action) => (
            <DropdownMenuItem
              key={invoiceId}
              className={`${action.name === "Delete" ? "hover:bg-red-500" : "hover:bg-gray-700"} cursor-pointer flex items-center gap-2`}
              onClick={() => action.clickEvent(invoiceId)}
            >
              <action.icon />
              <p className="mt-0.5">{action.name}</p>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {sendMail && <MailDialog invoiceId={invoiceId} sendMail={sendMail} setSendMail={setSendMail} />}
      {deletePermission && <DeleteDialog invoiceId={invoiceId} deletePermission={deletePermission} setDeletePermission={setDeletePermission} />}
    </>
  );
};

export default Actions;
