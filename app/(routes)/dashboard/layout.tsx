import Sidebar from "@/app/components/Invoice/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children } : Readonly<{ children: ReactNode; }>) {
    return (
        <div className="h-screen w-screen grid grid-cols-[15rem_1fr] max-lg:grid-cols-[1fr] grid-rows-[6rem_1fr] bg-gray-100">
            <Sidebar/>
            {children}
        </div>
    )
}