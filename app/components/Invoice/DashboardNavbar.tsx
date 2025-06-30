import React from 'react';
import InvoiceDownload from './InvoiceDownload';
import NewButton from './NewButton';
import CurrentMode from './CurrentMode';

const DashboardNavbar = () => {
  return (
        <nav className='row-start-1 col-start-2 bg-white font-poppins flex justify-between items-center px-5 ms-1'>
          <h1 className='text-4xl font-facultyGlyphic'>Invoice Document</h1>
          <div className="buttons-group flex gap-5">
            <CurrentMode/>
            <NewButton/>
            <InvoiceDownload/>
          </div>
        </nav>
  )
}

export default DashboardNavbar