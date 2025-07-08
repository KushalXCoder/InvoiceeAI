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
    <button onClick={handleClick} className='new-invoice max-lg:h-fit max-lg:w-1/2 px-4 max-lg:py-2 py-3 max-lg:text-[12px] bg-blue-600 rounded-lg text-white cursor-pointer'>
        New
    </button>
  )
}

export default NewButton