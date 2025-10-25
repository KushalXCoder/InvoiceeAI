"use client";

import Link from "next/link";
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { FileText, Home, Inbox, Settings, Zap } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { name: "applicationItems", label: "Application" },
  { name: "createItems", label: "Create" },
  { name: "manageItems", label: "Manage" },
];

const applicationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/",
    icon: Settings,
  },
];

const createItems = [
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
];

const manageItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Inbox,
  },
];

const allItems = { applicationItems, createItems, manageItems };

const handleSettings = () => {
  console.log("Settings clicked");
}

export const SidebarItems = () => {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => (
        <SidebarGroup key={item.name}>
          <SidebarGroupLabel className='text-gray-500 text-sm'>
            {item.label}
          </SidebarGroupLabel>
          <SidebarGroupContent className='px-1'>
            <SidebarMenu>
              {allItems[item.name as keyof typeof allItems].map((subItem) => (
                <SidebarMenuItem key={subItem.title} className={`${pathname.toLowerCase() === subItem.url.toLowerCase() ? 'bg-gray-300 text-blue-700' : ''} hover:bg-gray-300 rounded-lg py-1 hover:text-blue-700 transition-colors`}>
                  <SidebarMenuButton asChild>
                    {subItem.title === "Settings" ? (
                      <div onClick={handleSettings} className="flex items-center cursor-pointer">
                        <subItem.icon style={{ width: '20px', height: '20px' }} className='me-1' />
                        <h1 className="text-[17px] mt-1">Settings</h1>  
                      </div>
                    ) : (
                      <Link href={subItem.url}>
                        <subItem.icon style={{ width: '20px', height: '20px' }} className='me-1' />
                        <span className='text-[17px] mt-0.5'>{subItem.title}</span>
                      </Link>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}