"use client";

import React from "react";
import { useInvoiceStore } from "@/store/invoiceStore";
import Table from "../Table";
import { useItemsStore } from "@/store/itemsStore";
import dayjs from "dayjs";

declare module "jspdf" {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

const InvoicePreview = () => {
  const { data, editingData, isEditing } = useInvoiceStore();
  const { findTotal } = useItemsStore();

  const source = isEditing ? editingData : data;
  const details = { ...source };

  return (
    <div className="invoice-preview max-lg:w-full w-4/6 px-10 pt-8 max-lg:px-2 max-lg:pt-2 overflow-y-scroll">
      <div className="document w-full h-fit bg-[#ffffff] rounded-lg px-8 py-10 max-lg:px-2 max-lg:py-2 mb-5 border">
        <div className="top-section flex justify-between gap-2 w-full">
          <div className="company-details flex flex-col gap-2 w-2/4 max-lg:w-2/5 flex-wrap">
            {data.logo && (
              <img
                src={URL.createObjectURL(data.logo)}
                alt="Company Logo"
                width={200}
                height={200}
              />
            )}
            <p className="company-name font-poppins text-[19px] max-lg:text-[16px]">
              {details.companyName}
            </p>
            <div className="company-address flex flex-col *:text-[#6b7280] *:max-lg:text-[12px] font-poppins">
              <p>{details.address1}</p>
              <p>{details.address2}</p>
              <p>{details.address3}</p>
            </div>
          </div>
          <div className="invoice-details font-poppins flex flex-col gap-2 items-end text-[#374151] w-2/4">
            <h1 className="text-4xl max-lg:text-xl font-bold text-[#000000]">
              INVOICE
            </h1>
            <div className="details text-sm flex flex-col gap-0 items-end *:max-lg:text-[12px]">
              <p>
                Invoice No:{" "}
                <span className="text-[#000000]">{details.invoiceNumber}</span>
              </p>
              <p>
                Order Date:{" "}
                <span className="text-[#000000]">
                  {dayjs(details.orderDate).format("DD-MM-YYYY")}
                </span>
              </p>
              <p>
                Due Date:{" "}
                <span className="text-[#000000]">
                  {dayjs(details.dueDate).format("DD-MM-YYYY")}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="bill-to-details font-poppins mt-5 flex flex-col">
          <h1 className="text-[#4b5563] text-xl max-lg:text-[16px]">Bill To</h1>
          <h1 className="text-[19px] max-lg:text-[14px] mt-2">
            {details.billToName}
          </h1>
          <div className="flex flex-col mt-2 *:text-[#6b7280] max-lg:text-[14px]">
            <p>{details.billToAddress1}</p>
            <p>{details.billToAddress2}</p>
            <p>{details.billToAddress3}</p>
          </div>
        </div>
        <div className="items-entries mt-10 overflow-x-auto">
          <Table />
        </div>
        <div className="w-full flex max-lg:flex-col justify-between max-lg:items-end mt-8">
          <div className="cost-inputs flex max-lg:flex-col gap-8 max-lg:gap-4 max-lg:mb-5 max-lg:w-full">
            <div className="shipping-cost flex flex-col font-poppins">
              <label htmlFor="shipping" className="max-lg:text-[14px]">
                Shipping
              </label>
              <input
                type="number"
                name="shipping"
                value={useItemsStore.getState().shipping ?? 0}
                onChange={(e) =>
                  useItemsStore.setState({ shipping: Number(e.target.value) })
                }
                className="border rounded-lg px-3 py-1 mt-1 border-gray-300 max-lg:text-[14px]"
              />
            </div>
            <div className="discount flex flex-col font-poppins">
              <label htmlFor="discount" className="max-lg:text-[14px]">
                Discount
              </label>
              <input
                type="number"
                name="discount"
                value={useItemsStore.getState().discount ?? 0}
                onChange={(e) =>
                  useItemsStore.setState({ discount: Number(e.target.value) })
                }
                className="border rounded-lg px-3 py-1 mt-1 border-gray-300 max-lg:text-[14px]"
              />
            </div>
          </div>
          <div className="w-fit flex flex-col px-8 py-5 font-poppins text-[15px] max-lg:text-[12px] border border-[#9ca3af] bg-[#f3f4f6]">
            <div className="flex justify-between gap-10 mb-2">
              <span>Subtotal</span>
              <span>${findTotal("rate")}</span>
            </div>
            {/* <div className="flex justify-between gap-10 mb-2">
              <span>IGST</span>
              <span>${findTotal("igst")}</span>
            </div>
            <div className="flex justify-between gap-10 mb-2">
              <span>CGST</span>
              <span>${findTotal("cgst")}</span>
            </div>
            <div className="flex justify-between gap-10 mb-2">
              <span>SGST</span>
              <span>${findTotal("sgst")}</span>
            </div>
            <div className="flex justify-between gap-10 mb-2">
              <span>CESS</span>
              <span>${findTotal("cess")}</span>
            </div> */}
            <div className="flex justify-between gap-10 mb-2">
              <span>Tax</span>
              <span>
                $
                {findTotal("cgst") +
                  findTotal("igst") +
                  findTotal("sgst") +
                  findTotal("cess")}
              </span>
            </div>
            <div className="flex justify-between gap-10 mb-2">
              <span>Shipping</span>
              <span>${useItemsStore.getState().shipping}</span>
            </div>
            <div className="flex justify-between gap-10 mb-2">
              <span>Discount</span>
              <span>${useItemsStore.getState().discount}</span>
            </div>
            <div className="flex justify-between items-center font-bold border-t-2 pt-2">
              <span>TOTAL</span>
              <span>
                $
                {findTotal("amount") +
                  (useItemsStore.getState().shipping ?? 0) -
                  (useItemsStore.getState().discount ?? 0)}
              </span>
            </div>
          </div>
        </div>
        <div className="note font-poppins">
          <h1 className="text-[#6b7280] text-xl max-lg:text-[15px] mt-10">
            Notes
          </h1>
          <div className="w-full whitespace-pre-wrap break-words font-poppins text-sm py-3 leading-[1.4]">
            {details.notes}
          </div>
        </div>
        <div className="terms-and-conditions font-poppins">
          <h1 className="text-[#6b7280] text-xl max-lg:text-[15px] mt-5">
            Terms and Conditions
          </h1>
          <div className="w-full whitespace-pre-wrap break-words font-poppins text-sm py-3 leading-[1.4]">
            {details.tnc}
          </div>
        </div>
        <div className="bottom-details w-full flex justify-between mt-5">
          <div className="issues-by flex flex-col items-start font-facultyGlyphic text-[#9ca3af]">
            <h1>Issued By</h1>
            <h1 className="text-2xl max-lg:text-lg">{details.companyName}</h1>
          </div>
          <div className="powered-by flex flex-col items-end font-facultyGlyphic text-[#9ca3af]">
            <h1>Powered By</h1>
            <h1 className="text-2xl max-lg:text-lg">InvoiceeAI</h1>
          </div>
        </div>
      </div>
      <div className="user-note font-facultyGlyphic border border-red-500 rounded-lg p-3 mb-5">
        <h1 className="font-bold">Important</h1>
        <p className="mt-1">
          The above preview just helps in visualizing how the details would be
          in the invoice, this is not the final invoice. The final invoice
          epends on tempelate you choose on clicking download.
        </p>
      </div>
    </div>
  );
};

export default InvoicePreview;
