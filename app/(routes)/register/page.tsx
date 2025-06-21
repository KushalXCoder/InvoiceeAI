import GoogleButton from '@/app/components/GoogleButton'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

const SignInPage = () => {
  return (
    <div className="sign-in-page h-screen w-screen flex justify-center items-center bg-blue-950">
        <div className="sign-in-box h-2/3 w-1/4 rounded-lg shadow-2xl backdrop-blur-2xl flex flex-col items-center py-5 gap-5 bg-white mt-10">
            <div className="heading flex flex-col items-center">
                <h1 className='font-facultyGlyphic text-lg'>Sign Up to InvoiceeAI</h1>
                <p className='text-gray-500 font-poppins text-sm'>Looks like its your first time, fill details to continue</p>
            </div>
            <GoogleButton/>
            <div className="or flex justify-center items-center w-full gap-4">
                <div className="line h-[1px] w-1/3 bg-black"></div>
                <p className='font-facultyGlyphic'>or</p>
                <div className="line h-[1px] w-1/3 bg-black"></div>
            </div>
            <form className='w-4/5 flex flex-col gap-5'>
                <div className="email font-poppins flex flex-col gap-2">
                    <label htmlFor="email" className='text-gray-500 text-[16px]'>Email address</label>
                    <input type='email' name='email' placeholder='johndoe@gmail.com' className='border w-full rounded-lg px-2 py-2 font-facultyGlyphic text-[15px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-0' required/>
                </div>
                <div className="passowrd font-poppins flex flex-col gap-2">
                    <label htmlFor="password" className='text-gray-500 text-[16px]'>Password</label>
                    <input type='password' name='password' placeholder='********' className='border w-full rounded-lg px-2 py-2 font-facultyGlyphic text-[15px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-0' required/>
                </div>
                <div className="button flex justify-center font-poppins">
                    <button type='submit' className='flex justify-center items-center gap-3 border w-3/4 rounded-lg py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer'>
                        Continue
                        <FaArrowRight/>
                    </button>
                </div>
            </form>
            <p className='font-facultyGlyphic'>Already have an account ? 
                <Link href="/register" className='underline hover:text-blue-600 transition-colors'> Sign In </Link>
            </p>
            <p className='font-facultyGlyphic border px-5 py-1 bg-blue-950 text-white rounded-lg'>Powered by InvoiceeAI</p>
        </div>
    </div>
  )
}

export default SignInPage