import * as React from "react";

import {
  SidebarAppSwitcher,
  type IAppSwitcher,
} from "@/components/shared/layout/sidenav/sidebar-app-switcher";
import { SidebarNavItems } from "@/components/shared/layout/sidenav/sidebar-nav-items";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { ModernProfile } from "@/components/shared/layout/common/profile/profile";
import type { NavMenu } from "@/lib/models/types";
import { useAppNav } from "@/lib/contexts/navigation-context";
import { prefixHrefs } from "@/lib/helpers/functions";
import { SearchMenu } from "../common/search-menu";
import { Notifications } from "../common/notifications";

export interface AppSidebarProps
  extends React.ComponentProps<typeof Sidebar>, IAppSwitcher {
  /**
   * Main navigation items
   */
  navItems?: NavMenu[];
  endNavItems?: NavMenu[];
  // /**
  //  * User information to display in the sidebar footer
  //  */
  // user?: {
  //   name: string;
  //   email: string;
  //   avatar: string;
  // };
  // navItems?: Array<{
  //   title: string;
  //   url: string;
  //   icon?: LucideIcon;
  //   isActive?: boolean;
  //   items?: Array<{
  //     title: string;
  //     url: string;
  //   }>;
  // }>;
  /**
   * Project navigation items
   */
  // projects?: Array<{
  //   name: string;
  //   url: string;
  //   icon: LucideIcon;
  // }>;
  /**
   * Whether to show the team switcher (default: true)
   */
  // showTeamSwitcher?: boolean;
  /**
   * Whether to show the projects section (default: true)
   */
  // showProjects?: boolean;
  /**
   * Whether to show the user section (default: true)
   */
  // showUser?: boolean;
}

export function AppSidebar({
  apps,
  appClicked,
  // showTeamSwitcher = true,
  // showProjects: showEnvNavItems = true,
  // showUser = true,
  ...props
}: AppSidebarProps) {
  const {} = useSidebar();

  const { navItems: contextNavItems, endNavItems: contextEndNavItems } =
    useAppNav();

  // Use context items if available, otherwise use defaults
  const navItems =
    (contextNavItems?.menuItems || []).length > 0
      ? prefixHrefs(contextNavItems)
      : [];
  const endNavItems =
    (contextEndNavItems?.menuItems || []).length > 0
      ? prefixHrefs(contextEndNavItems)
      : [];

  return (
    <Sidebar collapsible="icon" {...props}>
      {apps && apps.length > 0 && (
        <SidebarHeader>
          <SidebarAppSwitcher apps={apps} appClicked={appClicked} />
        </SidebarHeader>
      )}
      <SidebarContent>
        {navItems.length > 0 && <SidebarNavItems menuItems={navItems} />}
      </SidebarContent>
      <SidebarContent>
        <div className="mt-auto">
          <div className="pb-0">
            {endNavItems.length > 0 && (
              <SidebarNavItems menuItems={endNavItems} />
            )}
            <SearchMenu />
            <Notifications />
          </div>
        </div>
      </SidebarContent>
      <SidebarFooter>
        <ModernProfile />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
