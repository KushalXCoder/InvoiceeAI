import React from 'react';
import { FaUserCircle } from "react-icons/fa";
import { auth } from '@/auth';
import Image from 'next/image';
import { SiGoogledocs } from "react-icons/si";
import { SiTicktick } from "react-icons/si";
import { GiCancel } from "react-icons/gi";
import { FaExclamationCircle } from "react-icons/fa";
import dayjs from 'dayjs';
import DashboardActions from '@/app/components/Dashboard/DashboardActions';
import { calculateValue } from '@/lib/helper/calculateValue';
import { cookies } from 'next/headers';
import verifyToken from '@/lib/helper/verifyToken';

type ItemsData = {
    itemsDescription: string,
    qty: number | null,
    rate: number | null,
    igst: number | null,
    cgst: number | null,
    sgst: number | null,
    cess: number | null,
    amount: number | null,
}

type InvoiceData = {
  invoiceId: string,
  invoiceNumber: string,
  orderDate: string,
  dueDate: string,
  companyName: string,
  address1: string,
  address2: string,
  address3: string,
  billToName: string,
  billToAddress1: string,
  billToAddress2: string,
  billToAddress3: string,
  notes: string,
  tnc: string,
}

type dataType = {
  _id: string,
  user: string,
  invoiceInfo: InvoiceData,
  itemsData: ItemsData[],
  finalAmount: number,
  status: string,
}

const DashboardPage = async () => {
  // Defining email, cause to get email either from session or from token, and store it as variable used inside an if cant be used outside it
  let email;

  // Get email fro session
  const session = await auth();
  email = session?.user?.email;

  // --------------- or ------------------

  // Get email from cookie
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if(token) {
    const payload = (await verifyToken(token ?? "")).payload;
    email = payload?.email;
  }

  // Defining data, so that it can be used below
  let data;

  // Fetch request to get user invoices
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/get-data`, {
      method: "POST",
      body: JSON.stringify({email: email}),
      cache:"no-cache",
      credentials: "include",
    });
    data = await res.json();
  } catch (error) {
    console.error("Error fetching data", error);
  }

  console.log(data.invoices);

  const details = [
    {name: "Total Invoices", value: data.invoices.length, icon: <SiGoogledocs size={28} color='blue'/>},
    {name: "Recieved", value: calculateValue(data.invoices,"recieved"), icon: <SiTicktick size={28} color="green"/>},
    {name: "Pending", value: calculateValue(data.invoices,"pending"), icon: <GiCancel size={28} color='orange'/>},
    {name: "Overdue", value: calculateValue(data.invoices,"overdue"), icon: <FaExclamationCircle size={28} color='red'/>},
  ];

  return (
    <div className="dashboard-screen col-start-2 row-span-2 w-full bg-gray-200 p-5 overflow-y-auto">
      <div className="dashboard-top h-[15vh] max-lg:h-[10vh] w-full bg-white rounded-lg flex justify-between items-center px-12 max-lg:px-5 shadow-lg">
        <div className="left flex flex-col font-facultyGlyphic">
          <h1 className='text-3xl max-lg:text-lg font-bold text-blue-500'>Invoice Dashboard</h1>
          <p className='max-lg:text-[12px]'>Manage your invoices properly</p>
        </div>
        <div className="right">
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt='User Image'
              height={45}
              width={45}
              priority
              draggable={false}
              className='rounded-full max-lg:h-8 max-lg:w-8'
            />
            ) : <FaUserCircle size={40}/>
          }
        </div>
      </div>
      <div className="invoices-details w-full flex max-lg:flex-wrap max-lg:justify-center gap-10 max-lg:gap-5 mt-8">
        {details.map((item,index) => (
          <div className="box bg-blue-950 w-1/4 max-lg:w-2/5 flex justify-between items-center text-white rounded-lg p-5 max-lg:p-3" key={index}>
            <div className="box-left flex flex-col gap-1 max-lg:w-full">
              <h1 className='font-facultyGlyphic max-lg:text-sm'>{item.name}</h1>
              <p className='font-bold text-xl max-lg:text-sm font-poppins'>{item.value ?? 0}</p>
            </div>
            <div className="box-right max-lg:hidden">
              {item.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="invoices-table w-full mt-10 bg-white rounded-lg p-5">
        <h1 className='font-poppins text-3xl'>Recent Invoices</h1>
        <div className="table-container">
          <table className="mt-5 table-auto w-full">
            <thead>
              <tr className="bg-gray-100 text-left font-poppins *:text-[14px]">
                <th className="px-4 py-2">Invoice #</th>
                <th className="px-4 py-2">Client</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                data.invoices.map((item: dataType,index: number) => (
                    <tr key={index} className="border-b font-facultyGlyphic hover:bg-gray-50">
                      <td className="px-4 py-3 text-blue-600 font-semibold">{item.invoiceInfo.invoiceId}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.invoiceInfo.companyName}</span>
                          <span className="text-gray-500 text-xs">kushal@gmail.com</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold">${item.finalAmount}</td>
                      <td className="px-2 py-3">
                        <span className="bg-yellow-100 text-yellow-700 text-[15px] font-semibold px-4 py-2 rounded-full">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{dayjs(item.invoiceInfo.dueDate).format("DD-MM-YYYY")}</td>
                      <DashboardActions id={item.invoiceInfo.invoiceId}/>
                    </tr>
                  )
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage