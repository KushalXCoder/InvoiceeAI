import React from 'react';
import { signIn } from '@/auth';
import { FcGoogle } from "react-icons/fc";

interface GoogleButtonProps {
    className: string;
}

const GoogleButton = ({ className } : GoogleButtonProps) => {
  const handleAction = async() => {
    "use server";
    await signIn("google", { redirectTo: "/" });
  }  

  return (
    <form action={handleAction}>
        <button type='submit' className={`${className} flex items-center border font-poppins gap-3 px-5 py-1 cursor-pointer`}>
            <FcGoogle className='h-7 w-7'/>
            Continue with Google
        </button>
    </form>
  )
}

export default GoogleButton