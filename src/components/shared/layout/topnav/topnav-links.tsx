import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { memberDetails } from "@/lib/contexts/atoms";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { useAtom } from "jotai";
import React, { type ReactNode, useEffect, useMemo, useState } from "react";
import { getNavLinks } from "../common/utils";
import { useResourceAccess } from "@/lib/contexts/roles";
import type { IAppNavContext } from "@/lib/models/types";

const LinkItem = React.forwardRef<
  React.ComponentRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link
        to={href!}
        ref={ref}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&.active]:font-bold",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        {children && (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children as ReactNode}
          </p>
        )}
      </Link>
    </li>
  );
});
LinkItem.displayName = "LinkItem";

export default function NavLinks({ menuItems }: IAppNavContext) {
  const [member] = useAtom(memberDetails);
  const [value, setValue] = useState("");
  const router = useRouterState();
  const resourceAccess = useResourceAccess();

  useEffect(() => {
    setValue("");
  }, [router?.location?.pathname]);

  const userMenuItems = useMemo(() => {
    return getNavLinks(menuItems, member.availableRoles, resourceAccess);
  }, [menuItems, member.availableRoles, resourceAccess]);

  // Helper function to check if route is active
  const isRouteActive = (href: string) => {
    const currentPath = router.location.pathname;
    if (href === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(href);
  };

  return (
    <NavigationMenu value={value} onValueChange={setValue}>
      <NavigationMenuList>
        {userMenuItems.map((navItem, ix) =>
          (navItem.pageLinks || []).length > 0 ? (
            <NavigationMenuItem key={ix}>
              <NavigationMenuTrigger>{navItem.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {(navItem.pageLinks || []).map((component) => {
                    return (
                      <LinkItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                        className={cn(
                          router.matches.some(
                            (m) =>
                              component.resolvedPath &&
                              m.routeId === component.resolvedPath
                          ) && "active"
                        )}
                      >
                        {component.description}
                      </LinkItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={ix}>
              {navItem.href && (
                <Link
                  to={navItem.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isRouteActive(navItem.href) &&
                      "bg-accent text-accent-foreground font-semibold"
                  )}
                >
                  {navItem.title}
                </Link>
              )}
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
