import * as React from "react";

import type { AppDetail } from "@/lib/models/types";
import {
  Avatar,
  AvatarFallback,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui";
import { getInitials } from "@/lib/helpers/functions";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import type { IAppSwitcher } from "../sidenav/sidebar-app-switcher";
import { useAppNav } from "@/lib/contexts/navigation-context";

export default function TopNavAppSwitcher({ apps }: IAppSwitcher) {
  const [activeApp, setActiveApp] = React.useState<AppDetail | undefined>(
    apps?.[0]
  );

  const { setNavItems, setEndNavItems } = useAppNav();

  React.useEffect(() => {
    if (!apps || apps.length === 0) {
      return;
    }

    const activeApp = apps.find(
      (app) => app.href && window.location.pathname.startsWith(app.href)
    );
    if (activeApp) {
      setActiveApp(activeApp);
    } else {
      setActiveApp(apps[0]);
    }
  }, [apps, window.location.pathname]);

  if (!activeApp || apps?.length === 0) {
    return null;
  }

  if (apps?.length === 1) {
    return (
      <Link className='mr-6 flex items-center space-x-2' to={activeApp.href}>
        <div>{getMenuBarButton()}</div>
      </Link>
    );
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-lg font-semibold">
            {getMenuBarButton()}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-125 gap-3 p-4 md:w-150 md:grid-cols-2 lg:w-150">
              {(apps || []).slice(0, 4).map((app) => {
                const { title, description, image, href } = app;
                return (
                  <Link
                    to={href}
                    key={title}
                    target={href?.startsWith("http") ? "_blank" : "_self"}
                    onClick={() => {
                      setNavItems({ menuItems: [] });
                      setEndNavItems({ menuItems: [] });
                      setActiveApp(app);
                    }}
                  >
                    <div className=" flex items-center space-x-4 rounded-md border p-4 h-20">
                      {image ? (
                        <div className="h-16 w-16 relative">
                          <img
                            src={image}
                            alt={title && getInitials(title)}
                            width={250}
                            height={250}
                            className="object-cover h-16 w-24 rounded-tl-[1.5rem] rounded-tr-md rounded-bl-md rounded-br-md group-hover:scale-95"
                          />
                        </div>
                      ) : (
                        <Avatar className="rounded-none w-16 h-16">
                          <AvatarFallback className="rounded-none w-16 h-16 font-semibold text-xl">
                            {title && getInitials(title)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {title}
                        </p>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </ul>
            <div className="flex justify-end">
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link
                  to={"/apps" as any}
                  className="flex items-center justify-center"
                >
                  See All Apps
                </Link>
              </NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );

  function getMenuBarButton() {
    return (
      <div className="flex items-center space-x-2.5">
        {activeApp && (
          <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <activeApp.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{activeApp.title}</span>
            </div>
          </>
        )}
      </div>
    );
  }
}

const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
