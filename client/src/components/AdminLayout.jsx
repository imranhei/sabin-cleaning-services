import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./Sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { resetTokenAndCredentials } from "../redux/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(resetTokenAndCredentials());
    toast.success("Logout successful");
  };

  return (
    <SidebarProvider>
      {/* <div className="flex h-screen overflow-hidden"> */}
      <AdminSidebar />
      <SidebarInset className="flex flex-col w-full overflow-hidden">
        <header className="flex justify-between h-[57px] shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex items-center gap-2">
            <LogOut
              className="size-8 p-2 bg-gray-100 rounded"
              onClick={handleLogout}
            />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
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
