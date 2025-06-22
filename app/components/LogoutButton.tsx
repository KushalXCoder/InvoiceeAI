"use client";

import { signOut } from "next-auth/react";
import React from 'react';

const LogoutButton = () => {
  
  const handleClick = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_URI}/api/auth/logout`);
    signOut({redirectTo: "/"});
  }

  return (
    <button className='w-full px-5 py-1.5 rounded-lg bg-blue-600 text-white cursor-pointer hover:shadow-xl' onClick={handleClick}>
        Logout
    </button>
  )
}

export default LogoutButton