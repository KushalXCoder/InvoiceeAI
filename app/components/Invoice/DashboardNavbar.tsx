import React from 'react';
import InvoiceDownload from './InvoiceDownload';
import NewButton from './NewButton';
import CurrentMode from './CurrentMode';
import NavbarBurger from './NavbarBurger';

const DashboardNavbar = () => {
  return (
        <nav className='row-start-1 col-start-2 bg-white max-lg:h-20 font-poppins flex justify-between items-center  max-lg:px-4 px-5 ms-1'>
          <h1 className='text-4xl max-lg:text-lg font-facultyGlyphic'>Invoice Document</h1>
          <div className="group flex items-center gap-5 max-lg:gap-2">
            <CurrentMode/>
            <div className="navbar-buttons flex items-center gap-2 max-lg:hidden">
              <NewButton/>
              <InvoiceDownload/>
            </div>
            <NavbarBurger/>
          </div>
        </nav>
  )
}

export default DashboardNavbar