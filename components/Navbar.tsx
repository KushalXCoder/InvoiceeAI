import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { auth } from '@/auth';
import LogoutButton from './LogoutButton';
import { cookies } from 'next/headers';
import BurgerMenu from './BurgerMenu';
import { Button } from '@radix-ui/themes';

const Navbar = async () => {
  const session = await auth();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.name;

  return (
    <nav className='relative w-full flex justify-center pt-8 pb-6 px-4 font-facultyGlyphic z-10'>
      <div className='max-w-5xl w-full px-8 py-4 rounded-full bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg flex items-center justify-between max-lg:rounded-2xl'>
        <Link href="/" className='flex-shrink-0'>
          <Image 
            src="/Logo.svg" 
            alt='InvoiceeAI' 
            height={100} 
            width={100} 
            priority 
            draggable={false} 
            className='h-auto max-lg:w-32 w-44'
          />
        </Link>
        
        <div className="authentication-buttons flex gap-3 max-lg:hidden">
          {session?.user || token ? (
            <LogoutButton/>
          ) : (
            <div className="flex items-center gap-3 font-facultyGlyphic">
              <Link href="/login">
                <Button 
                  variant="ghost"
                  size="3"
                  className='px-8 py-2.5 rounded-full text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 cursor-pointer font-medium'
                >
                  Log In
                </Button>
              </Link>
              <Link href="/register">
                <Button 
                  size="3"
                  className='px-8 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300'
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
        
        <BurgerMenu session={session} token={token ?? ""}/>
      </div>
    </nav>
  )
}

export default Navbar