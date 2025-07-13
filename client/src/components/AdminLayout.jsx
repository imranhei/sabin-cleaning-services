import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      {/* <div className="flex h-screen overflow-hidden"> */}
        <AdminSidebar />
        <SidebarInset className="flex flex-col w-full overflow-hidden">
          <header className="flex justify-between h-[57px] shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <LogOut className="size-8 p-2 bg-gray-100 rounded" />
          </header>

          {/* This part ensures scrollable content without horizontal overflow */}
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            <Outlet />
          </main>
        </SidebarInset>
      {/* </div> */}
    </SidebarProvider>
  );
};

export default AdminLayout;
