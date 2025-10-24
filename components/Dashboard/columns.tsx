"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Actions from "./actions";

export type InvoiceTableData = {
  invoiceNumber: string;
  status: "recieved" | "pending" | "overdue";
  companyName?: string;
  sentTo?: string;
  amount: number;
  createdAt: string;
  dueDate: string;
};

export const columns: ColumnDef<InvoiceTableData>[] = [
  {
    accessorKey: "invoiceNumber",
    header: "Invoice #",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
  },
  {
    accessorKey: "sentTo",
    header: "Sent To",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors w-fit"
        >
          <span>AMOUNT</span>
          <ArrowUpDown className="h-4 w-4 mb-0.5" />
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <Actions row={row} />
      );
    },
  },
];
