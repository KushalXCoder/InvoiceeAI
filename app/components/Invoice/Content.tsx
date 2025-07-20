import React from 'react'
import InvoicePreview from './InvoicePreview'
import InvoiceInput from './InvoiceInput'

const Content = () => {
  return (
        <main className='row-start-2 col-start-2 dashboard-content flex overflow-y-hidden'>
          <InvoicePreview/>
          <InvoiceInput screen=""/>
        </main>
  )
}

export default Content