"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import UserSidebar from "@/components/invoice/InvoiceSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider className="h-screen">
        <UserSidebar />
        <div className="h-screen w-screen">
            {children}
        </div>
    </SidebarProvider>
  );
}