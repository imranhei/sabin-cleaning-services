import { ChevronRight, Home, Inbox, Settings, NotebookPen } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Quotes",
    url: "#",
    icon: Inbox,
    subMenus: [
      {
        title: "Inbox",
        url: "/admin/inbox",
      },
      {
        title: "Accepted",
        url: "/admin/accepted",
      },
      {
        title: "Trash",
        url: "/admin/trash",
      },
    ],
  },
  {
    title: "Blogs",
    url: "/admin/blogs",
    icon: NotebookPen,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const AdminSidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Sidebar>
      <SidebarHeader className="font-semibold flex-col border-b p-4">
        <div className="flex gap-2">
          <img src="/Sabin_Clean_Sky_blue.png" alt="" className="w-6 h-6" />
          Sabin Cleaning Services
        </div>
        <span className="text-sm text-center text-muted-foreground">
          {" "}
          Welcome, {user?.name}
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) =>
              item.subMenus?.length ? (
                <Collapsible
                  key={item.title}
                  asChild
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.subMenus.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link to={item.url}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
