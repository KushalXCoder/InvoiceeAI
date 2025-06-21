import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => {
  return (
    <div className="w-full pt-25 flex flex-col items-center">
      <div className="slogan-outer border border-blue-200 rounded-4xl p-1.5 mt-10 mb-5">
        <div className="slogan-inner border border-blue-400 rounded-4xl p-1.5">
          <div className="slogan font-facultyGlyphic border rounded-4xl w-fit px-5 py-1 border-blue-700 text-gray-700">
            Let AI make it for you
          </div>
        </div>
      </div>
      <div className="hero-heading *:text-5xl flex flex-col gap-1 text-blue-950">
        <h1>Making your Invoice journey easier :</h1>
        <h1 className='text-center'>Using Invoicee AI !</h1>
      </div>
      <p className='text-gray-500 my-5'>Generate Invoice in seconds, either manually or using our AI maker</p>
      <Link href="/" className='flex items-center gap-3 bg-blue-500 px-5 py-1 rounded-lg text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative'>
        Get Started
        <FaArrowRightLong color='white' className='h-10'/>
        <div className="free-image absolute top-10 left-[90%] w-full flex items-center gap-0">
          <Image src="/Arrow.png" alt='Arrow' height={50} width={50} priority draggable={false}/>
          <p className='text-white border inline-block px-3 py-1 rounded-lg rotate-12 bg-gray-500 shadow-[2px_2px_0px_0px_rgba(0,0,255,0.5)] font-facultyGlyphic'>Its free</p>
        </div>
      </Link>
    </div>
  )
}

export default Hero