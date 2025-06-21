import React from 'react';
import { signIn } from '@/auth';
import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  const handleAction = async() => {
    "use server";
    await signIn("google", { redirectTo: "/" });
  }  

  return (
    <form action={handleAction}>
        <button type='submit' className='flex items-center font-poppins gap-3 border px-5 py-1 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer'>
            <FcGoogle className='h-7 w-7'/>
            Continue with Google
        </button>
    </form>
  )
}

export default GoogleButton