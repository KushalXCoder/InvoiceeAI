"use client";

import React from 'react';
import { FaRegFilePdf } from "react-icons/fa6";
import { useInvoiceStore } from '@/store/invoiceStore';
import { generatePdf } from '@/lib/helper/generatePdf';
import { useItemsStore } from '@/store/itemsStore';

const InvoiceDownload = () => {
  const { data, isEditing, setField, setInvoiceId, isInvoiceChanged } = useInvoiceStore();
  const { findTotal, isItemsChanged } = useItemsStore();

  const handleDownload = async () => {
    // Doing this to get the updated data
    const finalData = isEditing ? useInvoiceStore.getState().editingData : useInvoiceStore.getState().data;
    const finalItemsData = isEditing ? useItemsStore.getState().editingItemsData : useItemsStore.getState().itemsData;

    // Generating pdf using required things
    generatePdf(finalData, finalItemsData, "save");

    // Finding total amount, as to store it in database
    const totalAmount = findTotal("amount");

    // Fetch request to generate invoice
    console.log(finalItemsData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/generate-invoice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data: finalData, itemsData: finalItemsData, totalAmount, isInvoiceChanged, isItemsChanged}),
    })

    if(res.status != 200) {
      console.log("Error", res);
    }

    const ans = await res.json();
    console.log(data.invoiceId);
    if(data.invoiceId === "") {
      setField("invoiceId",ans.invoice.invoiceInfo.invoiceId);
      console.log(ans.invoice.invoiceInfo.invoiceId);
      setInvoiceId(ans.invoice.invoiceInfo.invoiceId);
      console.log(useInvoiceStore.getState().currentInvoiceId);
    }
  };

  return (
    <button onClick={handleDownload} className='flex justify-center items-center max-lg:h-fit max-lg:w-1/2 gap-3 bg-blue-600 px-4 max-lg:py-2 py-3 max-lg:text-[12px] text-white rounded-lg cursor-pointer'>
        <FaRegFilePdf size={22} className='max-lg:hidden'/>
        Save
    </button>
  )
}

export default InvoiceDownload