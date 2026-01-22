import { type AppSidebarProps } from "@/components/shared/layout/sidenav";
import SidebarLayout from "./sidenav/sidebar-layout";
import { appLayout } from "@/lib/contexts/atoms";
import { useAtomValue } from "jotai";
import { Toaster } from "@/components/ui";
import TopNavLayout from "./topnav/topnav-layout";

export interface AppLayoutProps {
  children: React.ReactNode;
  /**
   * Whether to show the breadcrumb navigation (default: true)
   */
  showBreadcrumbs?: boolean;
  /**
   * Whether to show the sidebar trigger button (default: true)
   */
  showSidebarTrigger?: boolean;
  /**
   * Additional class name for the main content area
   */
  className?: string;
  /**
   * Additional class name for the header
   */
  headerClassName?: string;
  /**
   * Whether is remote app
   */
  isRemote?: boolean;
  /**
   * Sidebar configuration props - pass navigation items from your app
   */
  sidebarProps?: Omit<AppSidebarProps, "children">;
}

export function AppLayout({
  children,
  isRemote,
  sidebarProps,
  ...props
}: AppLayoutProps) {
  const appLayoutValue = useAtomValue(appLayout);

  if (isRemote === true) {
    return children;
  }

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            toast: "group bg-background text-foreground dark:text-white",
            title: "font-medium dark:text-white",
            description: "text-foreground dark:text-zinc-300",
          },
        }}
      />
      {appLayoutValue.startsWith("sidebar") ? (
        <SidebarLayout sidebarProps={sidebarProps} {...props}>{children}</SidebarLayout>
      ) : (
        <TopNavLayout sidebarProps={sidebarProps} {...props}>{children}</TopNavLayout>
      )}
    </>
  );
}
