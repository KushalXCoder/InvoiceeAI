import InvoiceInput from '@/components/Invoice/InvoiceInput'
import InvoicePreview from '@/components/Invoice/InvoicePreview'
import React from 'react'

const InvoicePage = () => {
  return (
      <main className='dashboard-content h-full w-full bg-gray-200 flex overflow-y-hidden'>
        <InvoicePreview />
        <InvoiceInput screen=""/>
      </main>
  )
}

export default InvoicePage