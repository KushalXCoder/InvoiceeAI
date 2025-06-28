"use client";

import React from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import Table from '../Table';
import { useItemsStore } from '@/store/itemsStore';

declare module 'jspdf' {
  interface jsPDF {
    lastAutoTable: {
      finalY: number;
    };
  }
}

const InvoicePreview = () => {
  const { data } = useInvoiceStore();
  const { findTotal } = useItemsStore();

  return (
    <div className="invoice-preview w-4/6 px-10 pt-8 overflow-y-scroll">
      <div className="document w-full h-fit bg-[#ffffff] rounded-lg px-8 py-10 mb-5">
        <div className="top-section flex justify-between">
          <div className="company-details flex flex-col gap-2">
            {data.logo && (
              <img src={URL.createObjectURL(data.logo)} alt="Company Logo" width={200} height={200} />
            )}
            <p className='company-name font-poppins text-[19px]'>{data.companyName}</p>
            <div className="company-address flex flex-col *:text-[#6b7280] font-poppins">
              <p>{data.address1}</p>
              <p>{data.address2}</p>
              <p>{data.address3}</p>
            </div>
          </div>
          <div className="invoice-details font-poppins flex flex-col gap-2 items-end text-[#374151]">
            <h1 className='text-4xl font-bold text-[#000000]'>INVOICE</h1>
            <div className="details text-sm flex flex-col gap-0 items-end">
              <p>Invoice No: <span className='text-[#000000]'>123432</span></p>
              <p>Order Date: <span className='text-[#000000]'>22/06/2025</span></p>
              <p>Delivery Date: <span className='text-[#000000]'>22/07/2025</span></p>
            </div>
          </div>
        </div>
        <div className="bill-to-details font-poppins mt-5 flex flex-col">
          <h1 className='text-[#4b5563] text-xl'>Bill To</h1>
          <h1 className='text-[19px] mt-2'>{data.billToName}</h1>
          <div className="flex flex-col mt-2 *:text-[#6b7280]">
            <p>{data.billToAddress1}</p>
            <p>{data.billToAddress2}</p>
            <p>{data.billToAddress3}</p>
          </div>
        </div>
        <div className="items-entries mt-10">
          <Table/>
        </div>
        <div className="w-full flex justify-end mt-5">
          <div className="w-fit flex flex-col px-8 py-5 font-poppins text-[15px] border border-[#9ca3af] bg-[#f3f4f6]">
            <div className="flex justify-between gap-10 mb-2">
              <span>Subtotal</span>
              <span>${findTotal("rate")}</span>
            </div>
            <div className="flex justify-between gap-10 mb-2">
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
            </div>
            <div className="flex justify-between items-center font-bold border-t-2 pt-2">
              <span>TOTAL</span>
              <span>${findTotal("amount")}</span>
            </div>
          </div>
        </div>
        <div className="note font-poppins">
          <h1 className='text-[#6b7280] text-xl mt-10'>Notes</h1>
          <div className="w-full whitespace-pre-wrap break-words font-poppins text-sm py-3 leading-[1.4]">
            {data.notes}
          </div>
        </div>
        <div className="terms-and-conditions font-poppins">
          <h1 className='text-[#6b7280] text-xl mt-5'>Terms and Conditions</h1>
          <div className="w-full whitespace-pre-wrap break-words font-poppins text-sm py-3 leading-[1.4]">
            {data.tnc}
          </div>
        </div>
        <div className="bottom-details w-full flex justify-between mt-5">
          <div className="issues-by flex flex-col items-start font-facultyGlyphic text-[#9ca3af]">
            <h1>Issued By</h1>
            <h1 className='text-2xl'>{data.companyName}</h1>
          </div>
          <div className="powered-by flex flex-col items-end font-facultyGlyphic text-[#9ca3af]">
            <h1>Powered By</h1>
            <h1 className='text-2xl'>InvoiceeAI</h1>
          </div>
        </div>
      </div>
      <p className='user-note font-facultyGlyphic border border-red-500 rounded-lg p-3 mb-5'>
        <h1 className='font-bold'>Important</h1>
        <p className='mt-1'>The above preview just helps in visualizing how the details would be in the invoice, this is not the final invoice. The final invoice epends on tempelate you choose on clicking download.</p>
      </p>
    </div>
  );
};

export default InvoicePreview;