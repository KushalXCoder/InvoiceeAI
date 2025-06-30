"use client";

import React from 'react';
import { FaRegFilePdf } from "react-icons/fa6";
import { useInvoiceStore } from '@/store/invoiceStore';
import { generatePdf } from '@/lib/helper/generatePdf';
import { useItemsStore } from '@/store/itemsStore';

const InvoiceDownload = () => {
  const { data, isEditing, setField, setInvoiceId, isInvoiceChanged } = useInvoiceStore();
  const { itemsData, findTotal, isItemsChanged } = useItemsStore();

  const handleDownload = async () => {
    // Doing this to get the updated data
    const finalData = isEditing ? useInvoiceStore.getState().editingData : useInvoiceStore.getState().data;
    const finalItemsData = isEditing ? useItemsStore.getState().editingItemsData : useItemsStore.getState().itemsData;

    // Generating pdf using required things
    generatePdf(finalData, finalItemsData);

    // Finding total amount, as to store it in database
    const totalAmount = findTotal("amount");

    // Fetch request to generate invoice
    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/generate-invoice`, {
      method: "POST",
      body: JSON.stringify({data: finalData, itemsData: finalItemsData, totalAmount, isInvoiceChanged, isItemsChanged}),
    })

    if(res.status != 200) {
      console.log("Error", res);
    }

    const ans = await res.json();
    if(data.invoiceId === "") {
      setField("invoiceId",ans.invoice.invoiceInfo.invoiceId);
      setInvoiceId(ans.invoice.invoiceInfo.invoiceId);
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