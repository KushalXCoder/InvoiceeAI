"use client";

import React from 'react';
import { useInvoiceStore } from '@/store/invoiceStore';
import { RxCross2 } from "react-icons/rx";

const CurrentMode = () => {
  const { isEditing, setEdit } = useInvoiceStore(); 
  console.log(isEditing); 

  const handleCross = () => {
      setEdit(false);
  }

  return (
    <div className="current-mode font-facultyGlyphic">
        {isEditing && (
            <p className='flex items-center text-black gap-3 py-2'>
                <RxCross2 className='hover:text-red-500' onClick={handleCross}/>
                Editing Mode
            </p>
        )}
    </div>
  )
}

export default CurrentMode