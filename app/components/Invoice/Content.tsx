import React from 'react'

const Content = () => {
  return (
        <main className='row-start-2 col-start-2 dashboard-content ms-1 flex'>  
          <div className="invoice-preview w-4/6 bg-gray-100 px-10 pt-8 overflow-y-scroll">
            <div className="document w-full h-full bg-white rounded-lg">

            </div>
          </div>
          <div className="invoice-details w-2/6 bg-white mt-2 rounded-lg px-5 py-3 overflow-y-scroll">
            <h1 className='font-poppins text-3xl'>Invoice Details</h1>
          </div>
        </main>
  )
}

export default Content