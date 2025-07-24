"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from 'next/navigation';
import LogoutButton from './LogoutButton';
import { Session } from 'next-auth';
import { AnimatePresence, motion } from "motion/react"

interface Props {
    session: Session | null,
    token: string,
};

const BurgerMenu = ({session, token}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const navLinks = [
    {name: "Home", redirectTo: "/"},
    {name: "Dashboard", redirectTo: "/dashboard"},
    {name: "Features", redirectTo: "#features"},
    {name: "Contact", redirectTo: "/"},
  ];
  const pathname = usePathname();

  useEffect(() => {
    if(open) {
        document.body.style.overflow = "hidden";
    }
    else {
        document.body.style.overflow = "scroll";
    }
  }, [open]);

  return (
    <div className="burger-menu max-lg:block hidden">
        <RxHamburgerMenu size={22} onClick={() => setOpen(true)}/>
        <AnimatePresence>
            {open && (
                <motion.div initial={{x: "100%", opacity: 0}} animate={{x: "0%", opacity: 1, transition: {duration: 0.4, ease: "easeOut"}}} exit={{x: "100%", opacity: 0, transition: {duration: 0.4, ease: "easeOut"}}} className="sidebar h-screen w-50 bg-black fixed top-0 right-0">
                    <div className="cross absolute top-3 right-3">
                        <RxCross2 size={22} color='white' onClick={() => setOpen(false)}/>
                    </div>
                    <ul className="sidebar-links flex flex-col gap-5 mt-15 w-full border-b px-5">
                        {navLinks.map((item,index) => (
                            <Link
                                key={index}
                                href={item.redirectTo}
                                className={`w-full flex items-center font-facultyGlyphic gap-3 text-[16px] border border-gray-400 px-3 py-2 rounded-lg text-gray-400 ${pathname === item.redirectTo ? `bg-blue-700 text-white` : ``} hover:border-gray-700`}
                            >
                                    {/* {item.icon} */}
                                    {item.name}
                            </Link>
                        ))}
                    </ul>
                    <div className="authentication-buttons flex gap-5 px-5 mt-5 absolute bottom-5 w-full">
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
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default BurgerMenu