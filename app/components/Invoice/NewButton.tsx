"use client";

import { useInvoiceStore } from '@/store/invoiceStore';
import { useItemsStore } from '@/store/itemsStore';
import React from 'react';

const NewButton = () => {  
  const { reset, setEdit } = useInvoiceStore();
  const { resetItems }  = useItemsStore();

  const handleClick = () => {
    reset();
    setEdit(false);
    resetItems();
  }

  return (
    <button onClick={handleClick} className='new-invoice px-4 py-2 bg-blue-600 rounded-lg text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer'>
        New Invoice
    </button>
  )
}

export default NewButton