"use client";

import React from 'react';
import { FaRegFilePdf } from "react-icons/fa6";
import { useInvoiceStore } from '@/store/invoiceStore';
import { generatePdf } from '@/lib/helper/generatePdf';
import { useItemsStore } from '@/store/itemsStore';

const InvoiceDownload = () => {
  const { data, generateInvoiceId } = useInvoiceStore();
  const { itemsData } = useItemsStore();

  const handleDownload = async () => {
    if(!data.invoiceId) generateInvoiceId();

    // Doing this to get the updated data, with the invoice id
    const finalData = useInvoiceStore.getState().data;
    generatePdf(finalData, itemsData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/generate-invoice`, {
      method: "POST",
      body: JSON.stringify({data: finalData, itemsData}),
    })

    if(res.status != 200) {
      console.log("Error", res);
    }
  };

  return (
    <button onClick={handleDownload} className='flex items-center gap-3 bg-blue-600 px-4 py-2 text-white rounded-lg cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
        <FaRegFilePdf size={22}/>
        Save as PDF
    </button>
  )
}

export default InvoiceDownload