"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar';
import { ChevronUp, FileText, Home, Inbox, Settings, User2, Zap } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { AppLogo } from '../logo';
import Link from 'next/link';

const UserSidebar = () => {
  const pathname = usePathname();

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    {
      title: "Create",
      url: "/dashboard/invoice",
      icon: FileText
    },
    {
      title: "AI Invoice",
      url: "/dashboard/ai-invoice",
      icon: Zap,
    },
    {
      title: "Invoices",
      url: "/dashboard/",
      icon: Inbox,
    },
    {
      title: "Settings",
      url: "/",
      icon: Settings,
    },
  ]

  return (
    <Sidebar className='flex flex-col h-full font-poppins bg-gray-200 border-none relative'>
      <SidebarContent className='py-6 flex-1 overflow-y-auto'>
        <SidebarGroup>
          <SidebarGroupLabel>
            <AppLogo />
          </SidebarGroupLabel>
          <SidebarGroupContent className='mt-8 px-1'>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className={`${pathname === item.url ? 'bg-gray-300 text-blue-700' : ''} hover:bg-gray-300 rounded-lg py-1 hover:text-blue-700 transition-colors`}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon style={{ width: '20px', height: '20px' }} className='me-1' />
                      <span className='text-[17px] mt-0.5'>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='pb-6'>
        <SidebarMenu className='bg-gray-300 hover:bg-gray-300 rounded-lg py-1.5 outline-none'>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className='outline-none'>
                  <div className='flex items-center gap-2'>
                    <User2 />
                    <p className='mt-1'>Username</p>
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
                <DropdownMenuItem>
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

export default UserSidebar