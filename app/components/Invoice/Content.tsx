import React from 'react'
import InvoicePreview from './InvoicePreview'
import InvoiceInput from './InvoiceInput'

const Content = () => {
  return (
        <main className='row-start-2 col-start-2 dashboard-content ms-1 flex overflow-hidden'>
          <InvoicePreview/>
          <InvoiceInput/>
        </main>
  )
}

export default Content