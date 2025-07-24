/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";
import { generatePdf } from '@/lib/helper/generatePdf';
import { MdDelete } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useRouter } from 'next/navigation';
import { useInvoiceStore } from '@/store/invoiceStore';
import { useItemsStore } from '@/store/itemsStore';
import { motion } from 'motion/react';

type hoverState = {
  flag: boolean,
  itemName: string,
}

const DashboardActions = ({id} : {id : string}) => {

  const router = useRouter(); 

  // All options hover
  const [isHover, setIsHover] = useState<hoverState>({
    flag: false,
    itemName: "",
  });

  const handleMouseEnter = (itemName: string) => {
    setIsHover({
      flag: true,
      itemName: itemName,
    });
  }

  const handleMouseLeave = () => {
    setIsHover({
      flag: false,
      itemName: "",
    })
  }

  // For handle delete
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deletePermission, setDeletePermission] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    answer: "",
  });

  // for handle edit and handle download
  const { currentInvoiceId, setEdit, setEditingData, reset } = useInvoiceStore();
  const { setEditingItemsData, resetItems } = useItemsStore();

  const handleEdit = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/get-invoice`, {
      method: "POST",
      body: JSON.stringify({id: id}),
    });
    if(res.status === 200) {
      const resData = await res.json();
      setEdit(true);
      setEditingData(resData.invoice.invoiceInfo);
      setEditingItemsData(resData.invoice.itemsData);
      console.log(useItemsStore.getState().editingItemsData);
      router.push("/dashboard/invoice");
    }
  }

  const handleDownload = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/get-invoice`, {
        method: "POST",
        body: JSON.stringify({id: id}),
      });
      const data = await res.json();
      console.log(data);
      generatePdf(data.invoice, data.invoice.itemsData, "save");
    } catch (error) {
      console.error(error); 
    }
  }

  // handle delete
  const handleDelete = () => {
    setDeletePermission(true);
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formData.answer === "YES") {
      setIsDeleting(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/delete`, {
        method: "DELETE",
        body: JSON.stringify({id: id}),
      });
      if (res.ok) {
        console.log(currentInvoiceId);
        console.log(id);
        if(currentInvoiceId === id) {
          reset();
          resetItems();
          console.log("Done");
        }
        router.push("/dashboard");
      }
    }
  }

  // handle status
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const status = [
    {name: "Recieved"},
    {name: "Pending"},
    {name: "Overdue"},
  ];

  const handleStatusChange = async (statusName: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/change-state`, {
      method: "PATCH",
      body: JSON.stringify({statusName: statusName, id: id}),
    });
    if(res.status === 200) {
      router.push("/dashboard");
    }
  }

  // handle mail
  const [sendMail, setSendMail] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [mailFormData, setMailFormData] = useState({
    mail: "",
  });

  const handleMail = () => {
    setSendMail(true);
  }

  const handleMailSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSending(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/send-email`, {
        method: "POST",
        body: JSON.stringify({email: mailFormData.mail, id: id}),
      });
      setSending(false);
      setSendMail(false);
      setMailFormData({mail: ''});
      const data = await res.json();
      if(res.status != 200) {
        console.log("Error sending mail", data.message);
      }
    } catch (error) {
      console.log("Network or fetch error:", error);
    }
  }

  // actions
  const actions = [
    {name: "status", icon: <BsThreeDots size={18} color='white' />},
    {name: "edit", action: handleEdit, icon: <MdEdit size={18} color='white' />},
    {name: "download", action: handleDownload, icon: <FaDownload size={18} color='white' />},
    {name: "mail", action: handleMail, icon: <IoMdMail size={18} color='white' />},
    {name: "delete", action: handleDelete, icon: <MdDelete size={18} color='white' />}
  ];

  // Handle Actions Mobile
  const [handleAction, setHandleAction] = useState<boolean>(false);

  return (
    <>
      <td className="hidden max-lg:table-cell align-middle text-center">
        <div className="flex justify-center items-center h-full min-h-[2rem] relative">
          <BsThreeDots size={28} color='white' className='border p-1 rounded-lg bg-black shadow-[3px_3px_0px_0px_rgba(10,10,10,0.5)]' onClick={() => setHandleAction(!handleAction)}/>
          {handleAction && (
            <div className='flex flex-col absolute top-10 right-0 bg-gray-300 p-2 rounded-lg z-10'>
              {actions.map((item,index) => (
                item.name === "status" ? "" : (
                  <p key={index} onClick={item.action} className='capitalize border-b w-full text-start mb-1'>{item.name}</p>
                )
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-center items-center h-full min-h-[2rem] relative">
          <MdOutlinePublishedWithChanges size={28} color='white' className='border p-1 rounded-lg bg-black shadow-[3px_3px_0px_0px_rgba(10,10,10,0.5)]' onClick={() => setIsOpen(!isOpen)}/>
          {isOpen && (
            <div className='absolute top-10 right-0 w-fit flex flex-col bg-blue-950 text-white font-poppins border rounded-sm *:px-3 *:py-1 *:hover:bg-gray-500 *:border-b z-10'>
              {status.map((s, index) => (
                <p key={index} onClick={() => handleStatusChange(s.name)} className='capitalize cursor-pointer'>{s.name}</p>
              ))}
            </div>
          )}
        </div>
      </td>
      <td className="px-2 py-3 max-lg:hidden">
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {actions.map((item) => (
            item.name === "status" ? (
              <div key={item.name} className="relative">
                <button
                  className='bg-black p-2 rounded-lg hover:shadow-[3px_3px_0px_0px_rgba(10,10,10,0.5)]'
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {item.icon}
                </button>
                {isOpen && (
                  <div className='absolute top-10 right-0 w-fit flex flex-col bg-blue-950 text-white font-poppins border rounded-sm *:px-3 *:py-1 *:hover:bg-gray-500 *:border-b z-10'>
                    {status.map((s, index) => (
                      <p key={index} onClick={() => handleStatusChange(s.name)} className='capitalize cursor-pointer'>{s.name}</p>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div key={item.name} className="relative">
                <button
                  onClick={item.action}
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  className='bg-black p-2 rounded-lg hover:shadow-[3px_3px_0px_0px_rgba(10,10,10,0.5)]'
                >
                  {item.icon}
                </button>
                {(isHover.flag && isHover.itemName === item.name) && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-600 text-white text-sm rounded-md shadow-lg z-20 whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </td>
      {isDeleting && (
        <p className='font-poppins text-2xl absolute top-1/2 left-1/2'>Deleting...</p>
      )}
      {deletePermission && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.7, ease: "easeIn"}}} className="delete-permission-box h-fit w-[600px] p-5 bg-white flex flex-col rounded-lg absolute top-10 left-[38%] backdrop-blur-lg font-poppins border">
          <h1 className='font-facultyGlyphic font-bold text-blue-500 text-xl'>InvoiceeAI</h1>
          <p className='mt-2 text-gray-700'>Are you sure you want to delete ? If, yes please type "YES" in the box below</p>
          <form onSubmit={handleSubmit}>
            <input type="text" value={formData.answer ?? ""} placeholder='Enter text here' onChange={(e) => setFormData({answer: e.target.value})} className='px-4 py-2 outline-0 rounded-lg w-full border mt-2'/>
            <div className="button-group flex mt-5 gap-3">
              <button type='submit' className='bg-red-500 hover:bg-red-600 rounded-lg w-1/4 px-4 py-2 text-white'>Delete</button>
              <button onClick={() => setDeletePermission(false)} className='border rounded-lg text-black px-4 py-2'>Cancel</button>
            </div>
          </form>
        </motion.div>
      )}
      {sendMail && (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 0.7, ease: "easeIn"}}} className="send-email-box h-fit w-[600px] max-sm:w-fit p-5 max-sm:py-3 bg-white flex flex-col rounded-lg absolute top-10 left-[38%] max-sm:top-5 max-sm:left-3 max-sm:right-3 backdrop-blur-lg font-poppins border z-50">
          <h1 className='font-facultyGlyphic font-bold text-blue-500 text-xl'>InvoiceeAI</h1>
          <p className='mt-2 text-gray-700 max-sm:text-sm'>Whom you want to send this email to ? Enter one email at a time</p>
          <form onSubmit={handleMailSubmit}>
            <input type="email" value={mailFormData.mail ?? ""} placeholder='Enter email here' onChange={(e) => setMailFormData({mail: e.target.value})} className='px-4 py-2 outline-0 rounded-lg w-full border mt-2 max-sm:text-sm' required/>
            <div className="button-group flex mt-5 gap-3 items-center *:max-sm:text-sm max-sm:mt-3">
              <button type='submit' className='bg-blue-500 hover:bg-blue-600 rounded-lg w-1/4 px-4 py-2 text-white'>Send</button>
              <button onClick={() => setSendMail(false)} className='border rounded-lg text-black px-4 py-2'>Cancel</button>
              {sending && (
                <div className='h-5 w-5 border-t-2 border-blue-700 rounded-full animate-spin absolute right-5'></div>
              )}
            </div>
          </form>
        </motion.div>
      )}
    </>
  )
}

export default DashboardActions