"use client";

import React from 'react';
import { FaRegFileImage } from "react-icons/fa";
import { useInvoiceStore } from '@/store/invoiceStore';
import { FaRegLightbulb } from "react-icons/fa6";

type InvoiceData = {
  invoiceNumber: string,
  orderDate: string,
  dueDate: string | null,
  companyName: string,
  logo: File | null,
  address1: string,
  address2: string,
  address3: string,
  billToName: string,
  billToAddress1: string,
  billToAddress2: string,
  billToAddress3: string,
  notes: string,
  tnc: string,
};

const InvoiceInput = () => {

  const { data, isEditing, editingData, setField } = useInvoiceStore();

  const source = isEditing ? editingData : data;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, type, value, files } = e.target;
    const key = name as keyof InvoiceData;
    if (type === "file") {
      setField(key, files?.[0] || null);
    } else {
      setField(key, value);
    }
  };

  return (
    <div className="invoice-details w-2/6 bg-white mt-2 rounded-lg px-5 py-3 overflow-y-auto font-poppins">
      <h1 className='font-poppins text-3xl'>Invoice Details</h1>
      <form className="invoice-details w-full flex flex-col mt-5">
        {/* Primary Details */}
        <div className="primary-details flex flex-col">
          <h1 className='border border-gray-400 w-fit px-5 py-1 rounded-lg'>Primary Details</h1>
          <div className="invoice-number flex flex-col mt-5 gap-1">
            <label htmlFor="invoice-number">Invoice No</label>
            <input
              type="text"
              name='invoiceNumber'
              value={source.invoiceNumber}
              placeholder='123456'
              className='border p-2 w-full'
              onChange={handleChange}
            />
          </div>
          <div className="order-date flex flex-col mt-5 gap-1">
            <h1>Order Date</h1>
            <input
              type="date"
              name="orderDate"
              value={source.orderDate}
              className='border p-2 w-full'
              onChange={handleChange}
            />
          </div>
          <div className="due-date flex flex-col mt-5 gap-1">
            <h1>Due Date</h1>
            <input
              type="date"
              name="dueDate"
              value={source.dueDate ?? ""}
              className='border p-2 w-full'
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Company Details */}
        <div className="company-details flex flex-col mt-5">
          <h1 className='border border-gray-400 w-fit px-5 py-1 rounded-lg'>Company Details</h1>
          <div className="logo flex flex-col mt-5 gap-1">
            <h1 className='text-[15px]'>Logo</h1>
            <div className="logo-input flex">
              <label htmlFor="logo" className='border p-2 bg-black'>
                <FaRegFileImage className='h-6 w-6' color='white' />
              </label>
              <input
                type="file"
                name="logo"
                id="logo"
                className='border p-2 w-full'
                placeholder='Select Image'
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="company-name flex flex-col gap-1 mt-3">
            <label htmlFor="companyName" className='text-[15px]'>Company Name</label>
            <input
              type='text'
              name='companyName'
              value={source.companyName}
              placeholder='XYZ'
              className='border w-full p-2'
              onChange={handleChange}
            />
          </div>

          <div className="addresses flex flex-col gap-2 mt-3">
            <div className="address-1 flex flex-col gap-1">
              <label htmlFor="address1" className='text-[15px]'>Address 1</label>
              <input
                type="text"
                name='address1'
                value={source.address1}
                placeholder='Office No., Tower Name'
                className='border w-full p-2'
                onChange={handleChange}
              />
            </div>
            <div className="address-2 flex flex-col gap-1">
              <label htmlFor="address2" className='text-[15px]'>Address 2</label>
              <input
                type="text"
                name='address2'
                value={source.address2}
                placeholder='Area, Sector'
                className='border w-full p-2'
                onChange={handleChange}
              />
            </div>
            <div className="address-3 flex flex-col gap-1">
              <label htmlFor="address3" className='text-[15px]'>Address 3</label>
              <input
                type="text"
                name='address3'
                value={source.address3}
                placeholder='City - Pincode'
                className='border w-full p-2'
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Bill To Details */}
        <div className="bill-to-details flex flex-col">
          <h1 className='border border-gray-400 w-fit px-5 py-1 rounded-lg mt-8'>Bill To</h1>
          <div className="bill-to-company flex flex-col gap-1 mt-5">
            <label htmlFor="billToName" className='text-[15px]'>Company Name</label>
            <input
              type="text"
              name='billToName'
              value={source.billToName}
              placeholder='XYZ'
              className='border w-full p-2'
              onChange={handleChange}
            />
          </div>
          <div className="bill-to-addresses flex flex-col gap-2 mt-3">
            <div className="bill-address-1 flex flex-col gap-1">
              <label htmlFor="billToAddress1" className='text-[15px]'>Address 1</label>
              <input
                type="text"
                name='billToAddress1'
                value={source.billToAddress1}
                placeholder='Office No., Tower Name'
                className='border w-full p-2'
                onChange={handleChange}
              />
            </div>
            <div className="bill-address-2 flex flex-col gap-1">
              <label htmlFor="billToAddress2" className='text-[15px]'>Address 2</label>
              <input
                type="text"
                name='billToAddress2'
                value={source.billToAddress2}
                placeholder='Area, Sector'
                className='border w-full p-2'
                onChange={handleChange}
              />
            </div>
            <div className="bill-address-3 flex flex-col gap-1">
              <label htmlFor="billToAddress3" className='text-[15px]'>Address 3</label>
              <input
                type="text"
                name='billToAddress3'
                value={source.billToAddress3}
                placeholder='City - Pincode'
                className='border w-full p-2'
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        {/* Other Details */}
        <div className="other-details flex flex-col">
            <h1 className='border border-gray-400 w-fit px-5 py-1 rounded-lg mt-8'>Other Details</h1>
            <div className="notes-input flex flex-col gap-1 mt-5">
                <label htmlFor="notes" className="text-[15px]">Notes</label>
                <textarea name="notes" placeholder='If any notes write it here' rows={10} value={data.notes} onChange={handleChange} className='border p-2'></textarea>
            </div>
            <div className="tnc-input flex flex-col gap-1 mt-5">
                <label htmlFor="tnc" className="text-[15px]">Terms and Conditions</label>
                <textarea name="tnc" placeholder='Terms and Conditions' rows={20} value={data.tnc} onChange={handleChange} className='border p-2 whitespace-pre-wrap'></textarea>
            </div>
            <p className='user-info flex items-center gap-3 border mt-3 px-4 py-2 rounded-lg border-red-500'>
                    <FaRegLightbulb size={20} color='orange'/>
                    Avoid keeping too much spaces
            </p>
        </div>
      </form>
    </div>
  )
}
export default InvoiceInput;