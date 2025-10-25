"use client";

import { ChevronUp, User2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { AppLogo } from '../logo';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { UserLogout } from '@/services/auth.service';
import { toast } from 'sonner';
import { SidebarItems } from './SidebarItems';

// Handle Logout function
const handleLogout = async () => {
  const res = await UserLogout();
  console.log("Logout Response:", res);

  if (res.status === 'success') {
    window.location.href = '/';
    toast("Logged out successfully");
  } else {
    toast(res.error || "Error logging out");
  }
}

interface UserSidebarProps {
  sessionData: VerifyTokenResult;
}
export const UserSidebar = ({ sessionData }: UserSidebarProps) => {
  return (
    <Sidebar className='flex flex-col h-full pe-1 font-poppins bg-gray-200 border-r border-gray-300 relative'>
      <SidebarContent className='pt-2.5 flex-1 overflow-y-auto'>
        <SidebarGroup>
          <AppLogo />
        </SidebarGroup>
        <SidebarItems />
      </SidebarContent>
      <SidebarFooter className='pb-6'>
        <SidebarMenu className='bg-gray-300 hover:bg-gray-300 rounded-lg py-1.5 outline-none'>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className='outline-none'>
                  <div className='flex items-center gap-2'>
                    <User2 />
                    <p className='mt-1'>{sessionData.payload?.name ?? "Guest"}</p>
                  </div>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-50 bg-gray-300 border-gray-500 font-poppins *:hover:bg-gray-400/50 *:cursor-pointer"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}