import RegisterForm from '@/components/forms/register/register-form';
import GoogleButton from '@/components/GoogleButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const RegisterPage = () => {

  return (
    <div className="h-screen w-full flex justify-between items-center">
        <div className="flex h-full w-2/4 border-r-2 justify-center items-center bg-white">
            <div className="flex flex-col w-3/6">
                <h1 className='font-facultyGlyphic text-2xl'>Register to InvoiceeAI</h1>
                <p className='text-gray-600 font-poppins text-md w-5/6 max-sm:w-full max-sm:mt-2'>Welcome to InvoiceeAI. Please fill in the details below to create an account.</p>
                <RegisterForm />
                <p className="font-poppins text-md my-3">Already have an account ?
                    <Link href="/login" className="text-blue-500 underline"> Login</Link>
                </p>
                <div className="w-full flex justify-center items-center gap-3 mb-5">
                    <div className="h-0.5 w-2/5 bg-gray-500"></div>
                    <p>or</p>
                    <div className="h-0.5 w-2/5 bg-gray-500"></div>
                </div>
                <GoogleButton className="w-full py-3 justify-center border-gray-400 hover:border-gray-700 transition-all" />
                <div className="flex flex-col font-poppins text-gray-700 text-sm mt-5">
                    <p>We don&apos;t share your personal information with anyone.</p>
                    <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
            </div>
        </div>
        <div className="h-full w-2/4 overflow-hidden relative">
            <Image src="/login.jpg" alt='Login Image' fill className="object-cover" priority draggable={false} />
        </div>
    </div>
  )
}

export default RegisterPage