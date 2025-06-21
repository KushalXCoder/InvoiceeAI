import React from 'react';
import { FaRegFilePdf } from "react-icons/fa6";

const DashboardNavbar = () => {
  return (
        <nav className='row-start-1 col-start-2 bg-white font-poppins flex justify-between items-center px-5 ms-1'>
          <h1 className='text-4xl font-facultyGlyphic'>Invoice Document</h1>
          <button className='flex items-center gap-3 bg-blue-600 px-4 py-2 text-white rounded-lg cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
            <FaRegFilePdf size={22}/>
            Save as PDF
          </button>
        </nav>
  )
}

export default DashboardNavbar