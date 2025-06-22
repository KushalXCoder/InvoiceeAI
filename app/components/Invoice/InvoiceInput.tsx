import React from 'react';
import { FaRegFileImage } from "react-icons/fa";

const InvoiceInput = () => {
  return (
    <div className="invoice-details w-2/6 bg-white mt-2 rounded-lg px-5 py-3 overflow-y-auto font-poppins">
        <h1 className='font-poppins text-3xl'>Invoice Details</h1>
        <form className="invoice-details w-full flex flex-col mt-5">
            <div className="company-details flex flex-col">
                <h1 className='border border-gray-400 w-fit px-5 py-1 rounded-lg'>Company Details</h1>
                <div className="logo flex flex-col mt-5 gap-1">
                    <h1 className='text-[15px]'>Logo</h1>
                    <div className="logo-input flex">
                        <label htmlFor="logo" className='border p-2 bg-black'>
                            <FaRegFileImage className='h-6 w-6' color='white'/>
                        </label>
                        <input type="file" name="logo" id="logo" className='border p-2 w-full' placeholder='Select Image'/>
                    </div>
                </div>
                <div className="company-name flex flex-col gap-1 mt-3">
                    <label htmlFor="name" className='text-[15px]'>Company Name</label>
                    <input type='text' placeholder='XYZ' className='border w-full p-2'/>
                </div>
                <div className="addresses flex flex-col gap-2 mt-3">
                    <div className="address-1 flex flex-col gap-1">
                        <label htmlFor="address-1 text-[15px]">Address 1</label>
                        <input type="text" name='address-1' placeholder='Office No., Tower Name' className='border w-full p-2'/>
                    </div>
                    <div className="address-2 flex flex-col gap-1">
                        <label htmlFor="address-2 text-[15px]">Address 2</label>
                        <input type="text" name='address-2' placeholder='Area, Sector' className='border w-full p-2'/>
                    </div>
                    <div className="address-3 flex flex-col gap-1">
                        <label htmlFor="address-3 text-[15px]">Address 3</label>
                        <input type="text" name='address-3' placeholder='City - Pincode' className='border w-full p-2'/>
                    </div>
                </div>
            </div>
            <div className="bill-to-details flex flex-col">
                <h1 className='border border-gray-400 w-fit px-5 py-1 rounded-lg mt-8'>Bill To</h1>
                <div className="bill-to-company flex flex-col gap-1 mt-5">
                    <label htmlFor="bill-company text-[15px]">Company Name</label>
                    <input type="text" placeholder='XYZ' className='border w-full p-2'/>
                </div>
                <div className="bill-to-addresses flex flex-col gap-2 mt-3">
                    <div className="bill-address-1 flex flex-col gap-1">
                        <label htmlFor="bill-address-1 text-[15px]">Address 1</label>
                        <input type="text" name='bill-address-1' placeholder='Office No., Tower Name' className='border w-full p-2'/>
                    </div>
                    <div className="bill-address-2 flex flex-col gap-1">
                        <label htmlFor="bill-address-2 text-[15px]">Address 2</label>
                        <input type="text" name='bill-address-2' placeholder='Area, Sector' className='border w-full p-2'/>
                    </div>
                    <div className="bill-address-3 flex flex-col gap-1">
                        <label htmlFor="bill-address-3 text-[15px]">Address 3</label>
                        <input type="text" name='bill-address-3' placeholder='City - Pincode' className='border w-full p-2'/>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default InvoiceInput