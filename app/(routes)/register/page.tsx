import Form from '@/app/components/Form';
import GoogleButton from '@/app/components/GoogleButton';
import Link from 'next/link';
import React from 'react';

const SignInPage = () => {

  return (
    <div className="sign-in-page h-screen w-screen flex justify-center items-center bg-blue-950 max-lg:p-5">
        <div className="sign-in-box h-fit w-fit rounded-lg shadow-2xl backdrop-blur-2xl flex flex-col items-center px-5 py-5 gap-5 bg-white max-sm:px-2">
            <div className="heading flex flex-col items-center">
                <h1 className='font-facultyGlyphic text-lg'>Sign Up to InvoiceeAI</h1>
                <p className='text-gray-500 font-poppins text-sm text-center w-3/4 max-sm:w-full max-sm:mt-2'>Looks like its your first time, fill details to continue</p>
            </div>
            <GoogleButton/>
            <div className="or flex justify-center items-center w-full gap-4">
                <div className="line h-[1px] w-1/3 bg-black"></div>
                <p className='font-facultyGlyphic'>or</p>
                <div className="line h-[1px] w-1/3 bg-black"></div>
            </div>
            <Form type="Signup"/>
            <p className='font-facultyGlyphic max-sm:text-[15px]'>Already have an account ? 
                <Link href="/login" className='underline hover:text-blue-600 transition-colors'> Sign In </Link>
            </p>
            <p className='font-facultyGlyphic border px-5 py-1 bg-blue-950 text-white rounded-lg'>Powered by InvoiceeAI</p>
        </div>
    </div>
  )
}

export default SignInPage