import * as React from "react";

import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="flex flex-row">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">Teste</span>
          <span className="truncate text-xs">teste@email.com</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Confin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild /*isActive={}*/>
                  <a href="">Dashboard</a>
                </SidebarMenuButton>
                <SidebarMenuButton asChild /*isActive={}*/>
                  <a href="">Receitas</a>
                </SidebarMenuButton>
                <SidebarMenuButton asChild /*isActive={}*/>
                  <a href="">Despesas</a>
                </SidebarMenuButton>
                <SidebarMenuButton asChild /*isActive={}*/>
                  <a href="">Extrato</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
