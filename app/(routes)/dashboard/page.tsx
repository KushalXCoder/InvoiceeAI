import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { auth } from '@/auth';
import Image from 'next/image';
import { SiGoogledocs } from "react-icons/si";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";
import { FaExclamationCircle } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { FaDownload } from "react-icons/fa6";

const page = async () => {
  const session = await auth();

  const details = [
    {name: "Total Invoices", icon: <SiGoogledocs size={28} color='blue'/>},
    {name: "Paid", icon: <SiTicktick size={28} color="green"/>},
    {name: "Pending", icon: <GiCancel size={28} color='orange'/>},
    {name: "Overdue", icon: <FaExclamationCircle size={28} color='red'/>},
  ];

  const actions = [
    {name: "view", action: "handleView", icon: <GrView size={18} />},
    {name: "edit", action: "handleEdit", icon: <MdEdit size={18} />},
    {name: "download", action: "handleDownload", icon: <FaDownload size={18} />},
  ]

  return (
    <div className="dashboard-screen h-screen w-full bg-gray-200 p-5">
      <div className="dashboard-top h-25 w-full bg-white rounded-lg flex justify-between items-center px-12 shadow-lg">
        <div className="left flex flex-col font-facultyGlyphic">
          <h1 className='text-3xl font-bold text-blue-500'>Invoice Dashboard</h1>
          <p>Manage your invoices properly</p>
        </div>
        <div className="right">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt='User Image'
              height={45}
              width={45}
              priority
              draggable={false}
              className='rounded-full'
            />
            ) : <FaUserCircle size={40}/>
          }
        </div>
      </div>
      <div className="invoices-details w-full flex justify-between gap-10 mt-8">
        {details.map((item,index) => (
          <div className="box bg-blue-950 w-1/4 flex justify-between items-center text-white rounded-lg p-5" key={index}>
            <div className="box-left flex flex-col gap-1">
              <h1 className='font-facultyGlyphic'>{item.name}</h1>
              <p className='font-bold text-xl font-poppins'>Value</p>
            </div>
            <div className="box-right">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="invoices-table w-full mt-10 bg-white rounded-lg p-5">
        <div className="top">
          <h1 className='font-poppins text-3xl'>Recent Invoices</h1>
          <table className="mt-5 table-auto w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Invoice #</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b font-facultyGlyphic hover:bg-gray-50">
                <td className="px-4 py-3 text-blue-600 font-semibold">#INV-001</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium">Pro Tech Limited</span>
                    <span className="text-gray-500 text-xs">kushal@gmail.com</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold">$499</td>
                <td className="px-4 py-3">
                  <span className="bg-yellow-100 text-yellow-700 text-[15px] font-semibold px-4 py-2 rounded-full">
                    Pending
                  </span>
                </td>
                <td className="px-4 py-3">25/07/2025</td>
                <td className="px-2 py-3 space-x-4">
                  {actions.map((item) => (
                    <button key={item.name} className='bg-blue-400 p-2 rounded-lg'>
                      {item.icon}
                    </button>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default page