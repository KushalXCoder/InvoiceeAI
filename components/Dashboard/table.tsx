"use client";

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { FilterDropdownMenu } from "./filter-options";

interface InvoiceTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const InvoiceTable = <TData, TValue>({
  columns,
  data,
}: InvoiceTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filter, setFilter] = useState<string>("sentTo");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "recieved":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "overdue":
        return "bg-red-100 text-red-700 border border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-2">
      <div className="flex items-center gap-2 py-1">
        <Input
          placeholder="Filter invoices..."
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn(filter)?.setFilterValue(e.target.value)
          }
          className="max-w-sm focus:outline-none font-poppins"
        />
        <FilterDropdownMenu filter={filter} setFilter={setFilter} />
      </div>
      <Table className="w-full flex-1 overflow-x-scroll">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gradient-to-r from-blue-50 via-blue-50 to-indigo-50 hover:bg-blue-50 border-b border-gray-200"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-poppins font-semibold text-slate-700 px-6 py-4 text-sm uppercase tracking-wide"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="font-poppins border-b border-gray-100 hover:bg-blue-50/50 transition-colors duration-200 group"
                >
                  {row.getVisibleCells().map((cell) => {
                    const value = cell.getValue();
                    const isStatus = cell.column.id === "status";
                    const isAmount = cell.column.id === "amount";
                    const isInvoiceNumber = cell.column.id === "invoiceNumber";

                    return (
                      <TableCell
                        key={cell.id}
                        className="px-6 py-4 text-sm text-slate-600 group-hover:text-slate-900"
                      >
                        {isStatus ? (
                          <span
                            className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${getStatusColor(
                              value as string
                            )}`}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        ) : isAmount ? (
                          <span className="font-semibold text-slate-900 text-base">
                            $
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        ) : isInvoiceNumber ? (
                          <span className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer transition-colors">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        ) : (
                          <span className="text-slate-600">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </span>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-slate-400 font-poppins"
                >
                  <p className="text-blue-500 font-semibold">
                    Oops, no results found 😄.
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
      </Table>
      <div className="flex items-center justify-between font-poppins px-2">
        <div className="text-sm text-slate-600">
          Page{" "}
          <span className="font-semibold text-slate-900">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-900">
            {table.getPageCount()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="gap-2 rounded-lg border-gray-300 hover:bg-blue-50 hover:text-blue-600 transition-all"
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="gap-2 rounded-lg border-gray-300 hover:bg-blue-50 hover:text-blue-600 transition-all"
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
