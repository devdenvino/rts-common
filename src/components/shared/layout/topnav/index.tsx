import { SearchMenu } from "../common/search-menu";
import NavLinks from "./topnav-links";
import TitleSwitcher from "./topnav-app-switcher";
import Profile from "../common/profile/profile";
import { Notifications } from "../common/notifications";
import { RouterBreadcrumb } from "@/components/ui/custom/breadcrumb";
import type { Sidebar } from "@/components/ui/sidebar";
import type { IAppSwitcher } from "../sidenav/sidebar-app-switcher";
import type { NavMenu } from "@/lib/models/types";
import { useAppNav } from "@/lib/contexts/navigation-context";
import { prefixHrefs } from "@/lib/helpers/functions";

export interface TopNavBarProps
  extends React.ComponentProps<typeof Sidebar>,
    IAppSwitcher {
  /**
   * Main navigation items
   */
  navItems?: NavMenu[];
  endNavItems?: NavMenu[];
  showBreadcrumbs?: boolean;
}

export function AutheticatedHeader({
  apps,
  showBreadcrumbs = true,
}: // endNavItems = [],
TopNavBarProps) {
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
    <div className="flex flex-col">
      <header className="flex flex-row sticky h-14 top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 space-x-2">
        <div className="mr-4 hidden md:flex">
          <TitleSwitcher apps={apps} />
          <NavLinks menuItems={navItems} />
        </div>
        <>
          <div className="flex flex-grow"></div>
          {endNavItems.length > 0 && <NavLinks menuItems={endNavItems} />}
          <div className="w-full flex-1 ml-auto md:w-auto md:flex-none">
            <SearchMenu />
          </div>
          <Notifications />
          <Profile />
        </>
      </header>
      {showBreadcrumbs && (
        <div className="flex flex-row w-full p-4 md:p-4">
          <RouterBreadcrumb />
        </div>
      )}
    </div>
  );
}

export function AnonymousHeader({ apps }: TopNavBarProps) {
  return (
    <div className="flex flex-col">
      <header className="flex flex-row sticky h-14 top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-2 space-x-2">
        <div className="mr-4 hidden md:flex">
          <div className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold text-lg sm:inline-block">
              {apps?.[0]?.title}
            </span>
          </div>
        </div>
      </header>
    </div>
  );
}
