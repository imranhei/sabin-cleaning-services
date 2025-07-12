import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './Sidebar'
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <Outlet />
    </SidebarProvider>
  )
}

export default AdminLayout
