"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { usePathname } from 'next/navigation';
import LogoutButton from '../LogoutButton';

const Sidebar = () => {
  const sidebarLinks = [
    {name: "Home", icon: <IoHomeOutline className='h-6 w-6'/>, redirectTo: "/"},
    {name: "Invoice", icon: <TbFileInvoice className='h-6 w-6'/>, redirectTo: "/dashboard/invoice"},
    {name: "Dashboard", icon: <IoDocumentTextOutline className='h-6 w-6'/>, redirectTo: "/dashboard"},
    {name: "AI Invoice", icon: <IoDocumentTextOutline className='h-6 w-6'/>, redirectTo: "/dashboard/ai-invoice"},
    // {name: "Templates"}
  ];

  const pathname = usePathname();

  return (
    <aside className='row-span-2 col-start-1 w-full px-4 py-8 flex flex-col items-start bg-white'>
        <Link href="/" className='logo'>
            <Image src="/Logo.svg" alt='Logo' height={200} width={200} priority draggable={false}/>
        </Link>
        <ul className="sidebar-links flex flex-col gap-5 mt-15 w-full border-b pb-10">
            {sidebarLinks.map((item,index) => (
                <Link
                    key={index}
                    href={item.redirectTo}
                    className={`w-full flex items-center font-facultyGlyphic gap-3 text-lg border border-gray-400 px-3 py-2 rounded-lg ${pathname === item.redirectTo ? `bg-blue-700 text-white` : ``} hover:border-gray-700`}
                >
                        {item.icon}
                        {item.name}
                </Link>
            ))}
        </ul>
        <div className="log-out-button mt-5 w-full">
            <LogoutButton/>
        </div>
    </aside>
  )
}

export default Sidebar