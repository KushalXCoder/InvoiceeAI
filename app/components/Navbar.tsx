import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth } from '@/auth';
import LogoutButton from './LogoutButton';
import { cookies } from 'next/headers';

const Navbar = async () => {
  const navLinks = [
    {name: "Home", redirectTo: "/"},
    {name: "Dashboard", redirectTo: "/dashboard"},
    {name: "Features", redirectTo: "#features"},
    {name: "Contact", redirectTo: "/"},
  ];

  const session = await auth();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.name;

  return (
    <nav className='w-screen h-14 absolute top-0 py-10 px-16 flex items-center justify-between font-facultyGlyphic bg-white z-10'>
        <Link href="/">
            <Image src="/Logo.svg" alt='InvoiceeAI' height={200} width={200} priority draggable={false}/>
        </Link>
        <ul className="nav-options flex gap-10">
            {navLinks.map((item,index) => (
                <Link key={index} href={item.redirectTo} className='relative'>{item.name}</Link>
            ))}
        </ul>
        <div className="authentication-buttons flex gap-5">
            {session?.user || token ? (
                <LogoutButton/>
            ) : (
                <>
                    <Link href="/login" className='border-2 px-5 py-1.5 rounded-lg border-blue-300 hover:border-blue-700 cursor-pointer hover:shadow-xl'>
                        Log In
                    </Link>
                    <Link href="/register" className='px-5 py-1.5 rounded-lg bg-blue-600 text-white cursor-pointer hover:shadow-xl'>
                        Sign Up
                    </Link>
                </>
            )}
        </div>
    </nav>
  )
}

export default Navbar