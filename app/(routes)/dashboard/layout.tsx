"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
// import Navigator from "@/components/Navigator";
// import Sidebar from "@/components/Invoice/Sidebar";
import UserSidebar from "@/components/invoice/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    // <SidebarProvider>
    //   <div className="h-screen w-full grid grid-cols-[15rem_1fr] max-lg:grid-cols-[1fr] grid-rows-[auto_1fr] bg-muted">
    //     <Sidebar />


    //     <main className="flex flex-col w-full h-full bg-background overflow-y-auto">
    //       {/* Top bar with trigger */}
    //       <header className="h-16 flex items-center px-4 border-b bg-background sticky top-0 z-20">
    //         <SidebarTrigger />
    //         <h1 className="ml-4 text-lg font-semibold tracking-tight">
    //           Dashboard
    //         </h1>
    //       </header>

    //       {/* Page content */}
    //       <section className="flex-1 p-6">{children}</section>

    //       {/* Bottom navigator */}
    //       <Navigator />
    //     </main>
    //   </div>
    // </SidebarProvider>
    <SidebarProvider className="h-screen">
        <UserSidebar />
        <div className="h-screen w-screen">
            {/* <SidebarTrigger /> */}
            {children}
        </div>
    </SidebarProvider>
  );
}