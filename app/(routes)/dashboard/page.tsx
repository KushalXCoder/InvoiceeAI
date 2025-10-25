import React from "react";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import verifyToken from "@/lib/helper/verifyToken";
import { JwtPayload } from "jsonwebtoken";
import { InvoiceTable } from "@/components/dashboard/table";
import { columns, InvoiceTableData } from "@/components/dashboard/columns";
import dayjs from "dayjs";

const fetchData = async (email: string): Promise<InvoiceData[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/get-data`, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      cache: "no-cache",
      credentials: "include",
    });
    const resData = await res.json();
    return resData.invoices || [];
  } catch (error) {
    console.error("Error fetching data", error);
    return [];
  }
};

const DashboardPage = async () => {
  // Defining email, cause to get email either from session or from token, and store it as variable used inside an if cant be used outside it
  let email: string | undefined;

  // Get email from session
  const session = await auth();
  email = session?.user?.email ?? "";

  // --------------- or ------------------

  // Get email from cookie
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;
  if (token) {
    const payload: JwtPayload = (await verifyToken(token ?? "")).payload ?? {};
    email = payload?.email;
  }

  // /Fetch invoices
  const data = await fetchData(email ?? "");
  if (data.length === 0) return (
    <div>
      <h1 className="text-2xl font-poppins">No invoices found.</h1>
    </div>
  )

  const formatedData : InvoiceTableData[] = data.map((invoice : InvoiceData) => ({
    invoiceNumber: invoice.invoiceInfo.invoiceId,
    status: invoice.status as "recieved" | "pending" | "overdue",
    companyName: invoice.invoiceInfo.companyName ?? '-',
    sentTo: invoice.invoiceInfo.billToName ?? '-',
    amount: invoice.finalAmount,
    createdAt: dayjs(invoice.invoiceInfo.orderDate).format("DD/MM/YYYY"),
    dueDate: dayjs(invoice.invoiceInfo.dueDate).format("DD/MM/YYYY"),
  }));

  return (
    <div className="dashboard-screen h-full w-full bg-gray-200 p-5 overflow-y-auto">
      <div className="invoices-table h-full w-full bg-white rounded-lg p-5">
        <h1 className="font-poppins text-3xl max-sm:text-2xl flex items-center gap-1">
          Invoices
          <span className="font-semibold text-[16px] mt-1.5 text-blue-700">({formatedData.length})</span>
        </h1>
        <div className="py-3">
          <InvoiceTable columns={columns} data={formatedData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
