import { RouterBreadcrumb } from "@/components/ui/custom/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAtom } from "jotai";
import { appLayout } from "@/lib/contexts/atoms";
import { LAYOUT_MODES } from "@/lib/constants";

import { AppSidebar } from ".";
import type { AppLayoutProps } from "../app-layout";

export default function SidebarLayout({
  children,
  showBreadcrumbs = true,
  showSidebarTrigger = true,
  className,
  headerClassName,
  sidebarProps,
}: AppLayoutProps) {
  const [layout, setLayout] = useAtom(appLayout);

  const handleOpenChange = (open: boolean) => {
    const newMode = open
      ? LAYOUT_MODES.SIDEBAR_OPEN
      : LAYOUT_MODES.SIDEBAR_COLLAPSED;
    if (layout !== newMode) {
      setLayout(newMode);
    }
  };

  return (
    <SidebarProvider
      open={layout !== LAYOUT_MODES.SIDEBAR_COLLAPSED}
      onOpenChange={handleOpenChange}
    >
      <AppSidebar {...sidebarProps} />
      <SidebarInset className="h-screen">
        <header
          className={`flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b ${
            headerClassName || ""
          }`}
        >
          <div className="flex items-center gap-2 px-4">
            {showSidebarTrigger && <SidebarTrigger className="-ml-1" />}
            {showSidebarTrigger && showBreadcrumbs && (
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
            )}
            {showBreadcrumbs && <RouterBreadcrumb />}
          </div>
        </header>
        <div className={`flex-1 h-0 overflow-y-auto p-4 ${className || ""}`}>
          <div className="flex flex-col gap-4 w-full">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
