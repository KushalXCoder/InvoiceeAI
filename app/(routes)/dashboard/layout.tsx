import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getToken } from "@/lib/helper/getToken";
import verifyToken from "@/lib/helper/verifyToken";
import { UserSidebar } from "@/components/Invoice/InvoiceSidebar";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Get token
  const token = await getToken();

  if(!token.found) {
    return redirect('/');
  }

  const sessionData = await verifyToken(token.token ?? "");
  console.log("Session Data in Layout:", sessionData);

  return (
    <SidebarProvider className="h-screen">
        <UserSidebar sessionData={sessionData} />
        <div className="h-screen w-screen">
            {children}
        </div>
    </SidebarProvider>
  );
}