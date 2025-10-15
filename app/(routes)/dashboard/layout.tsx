import Sidebar from "@/components/Invoice/Sidebar";
import Navigator from "@/components/Navigator";
import { ReactNode } from "react";

export default function DashboardLayout({ children } : Readonly<{ children: ReactNode; }>) {
    return (
        <>
            <div className="h-screen w-full grid grid-cols-[15rem_1fr] max-lg:grid-cols-[1fr] grid-rows-[6rem_1fr] bg-gray-100">
                <Sidebar/>
                {children}
            </div>
            <Navigator/>
        </>
    )
}