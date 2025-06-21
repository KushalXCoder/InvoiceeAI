import { signOut } from '@/auth';
import React from 'react';

const LogoutButton = () => {
  const handleAction = async() => {
    "use server";
    await signOut({redirectTo: "/"});
  }  

  return (
    <form action={handleAction}>
        <button className='px-5 py-1.5 rounded-lg bg-blue-600 text-white cursor-pointer hover:shadow-xl'>
            Logout
        </button>
    </form>
  )
}

export default LogoutButton