import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  // SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { useAtom } from "jotai";
import { memberDetails } from "@/lib/contexts/atoms";
import { getNavLinks } from "../common/utils";
import { useResourceAccess } from "@/lib/contexts/roles";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import type { IAppNavContext, NavMenu } from "@/lib/models/types";

export function SidebarNavItems({ menuItems }: IAppNavContext) {
  const [, setValue] = useState("");

  const router = useRouterState();
  const [member] = useAtom(memberDetails);

  const resourceAccess = useResourceAccess();

  useEffect(() => {
    setValue("");
  }, [router?.location?.pathname]);

  // Use useMemo instead of useState to avoid infinite loops
  // This will recompute when dependencies change but won't cause re-renders
  const userMenuItems = useMemo(() => {
    return getNavLinks(menuItems, member.availableRoles, resourceAccess);
  }, [menuItems, member.availableRoles, resourceAccess]);

  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Platform</SidebarGroupLabel> */}
      <SidebarMenu>
        {userMenuItems.map((item) => (
          <NavMenuItem key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function NavMenuItem({ item }: { item: NavMenu }) {
  const { open, isMobile } = useSidebar();
  const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);

  if ((item.pageLinks || []).length > 0) {
    return (
      <Collapsible
        key={item.title}
        asChild
        defaultOpen={item.isActive}
        className="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={!subMenuOpen ? item.title : undefined}>
              {!open ? (
                <DropdownMenu
                  onOpenChange={(open) => {
                    setSubMenuOpen(open);
                  }}
                  open={subMenuOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <div className="flex h-8 w-8 items-center justify-center">
                      {item.icon && <item.icon />}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                    side={isMobile ? "bottom" : "right"}
                    align="end"
                    sideOffset={4}
                  >
                    {item.pageLinks?.map((navItem, ix) => (
                      <DropdownMenuItem key={ix} asChild>
                        <Link to={navItem.href} key={ix}>
                          {navItem.icon && <navItem.icon />}
                          <span>{navItem.title}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                item.icon && <item.icon />
              )}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.pageLinks?.map((navItem) => (
                <SidebarMenuSubItem key={navItem.title}>
                  <SidebarMenuSubButton asChild>
                    <Link to={navItem.href}>
                      {navItem.icon && <navItem.icon />}
                      <span>{navItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuButton asChild tooltip={item.title} key={item.title}>
      <Link to={item.href}>
        {item.icon && <item.icon />}
        <span>{item.title}</span>
      </Link>
    </SidebarMenuButton>
  );
}
