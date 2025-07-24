import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth } from '@/auth';
import LogoutButton from './LogoutButton';
import { cookies } from 'next/headers';
import BurgerMenu from './BurgerMenu';

const Navbar = async () => {
  const navLinks = [
    {name: "Home", redirectTo: "/"},
    {name: "Dashboard", redirectTo: "/dashboard"},
    {name: "Features", redirectTo: "#features"},
    // {name: "Contact", redirectTo: "/"},
  ];

  const session = await auth();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.name;

  return (
    <nav className='relative w-screen h-14 py-10 px-16 max-lg:px-5 flex items-center justify-between font-facultyGlyphic z-10 backdrop-blur-xs'>
        <Link href="/">
            <Image src="/Logo.svg" alt='InvoiceeAI' height={100} width={100} priority draggable={false} className='h-auto max-lg:w-40 w-60'/>
        </Link>
        <ul className="nav-options absolute left-1/2 transform -translate-x-1/2 flex gap-10 max-lg:hidden text-lg">
            {navLinks.map((item,index) => (
                <Link key={index} href={item.redirectTo} className='relative'>{item.name}</Link>
            ))}
        </ul>
        <div className="authentication-buttons flex gap-5 max-lg:hidden">
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
        <BurgerMenu session={session} token={token ?? ""}/>
    </nav>
  )
}

export default Navbar