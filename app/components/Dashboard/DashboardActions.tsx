"use client";

import React, { useState } from 'react';
import { GrView } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { generatePdf } from '@/lib/helper/generatePdf';
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useInvoiceStore } from '@/store/invoiceStore';
import { useItemsStore } from '@/store/itemsStore';

const DashboardActions = ({id} : {id : string}) => {

  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { currentInvoiceId, reset } = useInvoiceStore();
  const { resetItems } = useItemsStore();

  const handleView = () => {
    console.log("Viewing");
  }  

  const handleEdit = () => {
    console.log("Editing");
  }

  const handleDownload = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/get-invoice`, {
        method: "POST",
        body: JSON.stringify({id: id}),
      });
      const data = await res.json();
      console.log(data);
      generatePdf(data.invoice, data.invoice.itemsData);
    } catch (error) {
      console.error(error); 
    }
  }

  const handleDelete = async () => {
    console.log("Deleted");
    setIsDeleting(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/delete`, {
      method: "DELETE",
      body: JSON.stringify({id: id}),
    });
    if (res.ok) {
      if(currentInvoiceId === id) {
        reset();
        resetItems();
      }
      router.replace(window.location.pathname);
    }
  }

  const actions = [
    {name: "view", action: handleView, icon: <GrView size={18} color='white' />},
    {name: "edit", action: handleEdit, icon: <MdEdit size={18} color='white' />},
    {name: "download", action: handleDownload, icon: <FaDownload size={18} color='white' />},
    {name: "delete", action: handleDelete, icon: <MdDelete size={18} color='white' />}
  ];

  return (
    <>
      <td className="px-2 py-3 space-x-4">
          {actions.map((item) => (
              <button key={item.name} onClick={item.action} className='bg-black p-2 rounded-lg hover:shadow-[3px_3px_0px_0px_rgba(10,10,10,0.5)] cursor-pointer'>
                {item.icon}
              </button>
          ))}
      </td>
      {isDeleting && (
        <p className='font-poppins text-2xl absolute top-1/2 left-1/2'>Deleting...</p>
      )}
    </>
  )
}

export default DashboardActions