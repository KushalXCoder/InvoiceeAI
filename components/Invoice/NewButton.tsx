"use client";

import { useInvoiceStore } from '@/store/invoiceStore';
import { useItemsStore } from '@/store/itemsStore';
import React from 'react';
import { Button } from '../ui/button';

const NewButton = () => {  
  const { reset, setEdit } = useInvoiceStore();
  const { resetItems }  = useItemsStore();

  const handleClick = () => {
    reset();
    setEdit(false);
    resetItems();
  }

  return (
    <Button onClick={handleClick} className='new-invoice h-10 w-20 max-lg:h-fit max-lg:w-1/2 px-4 max-lg:py-2 max-lg:text-[12px] rounded-lg text-white cursor-pointer'>
        New
    </Button>
  )
}

export default NewButton