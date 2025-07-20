import React from 'react';
import { IoHomeOutline } from "react-icons/io5";
import { TbFileInvoice } from "react-icons/tb";
import { IoDocumentTextOutline } from "react-icons/io5";
import { RiRobot3Fill } from "react-icons/ri";
import Link from 'next/link';

const Navigator = () => {
  const sidebarLinks = [
    {name: "Home", icon: <IoHomeOutline className='h-6 w-6'/>, redirectTo: "/"},
    {name: "Invoice", icon: <TbFileInvoice className='h-6 w-6'/>, redirectTo: "/dashboard/invoice"},
    {name: "Dashboard", icon: <IoDocumentTextOutline className='h-6 w-6'/>, redirectTo: "/dashboard"},
    {name: "AI Invoice", icon: <RiRobot3Fill className='h-6 w-6'/>, redirectTo: "/dashboard/ai-invoice"},
  ];
  return (
    <nav className='mobile-sidebar max-lg:flex max-lg:justify-around hidden w-screen bg-blue-100 fixed bottom-0 border-t px-4 py-2'>
        {sidebarLinks.map((item,index) => (
            <Link key={index} href={item.redirectTo} className='flex flex-col items-center'>
                {item.icon}
                <p className='font-facultyGlyphic text-[12px]'>{item.name}</p>
            </Link>
        ))}
    </nav>
  )
}

export default Navigator