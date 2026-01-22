import { ChevronsUpDown, Plus } from 'lucide-react';
import * as React from 'react';

import type { AppDetail } from '@/lib/models/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link, useNavigate } from '@tanstack/react-router';

export interface IAppSwitcher {
  apps?: AppDetail[];
  appClicked?: (app: AppDetail) => void;
}

const TitleButton = ({
  app,
  showIcon = true,
}: {
  app: AppDetail;
  showIcon?: boolean;
}) => (
  <SidebarMenuButton
    size='lg'
    className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
  >
    <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
      <app.logo className='size-4' />
    </div>
    <div className='grid flex-1 text-left text-sm leading-tight'>
      <span className='truncate font-semibold'>{app.title}</span>
      <span className='truncate text-xs'>{app.description}</span>
    </div>
    {showIcon && <ChevronsUpDown className='ml-auto' />}
  </SidebarMenuButton>
);
export function SidebarAppSwitcher({ apps, appClicked }: IAppSwitcher) {
  const { isMobile } = useSidebar();
  const [activeApp, setActiveApp] = React.useState(
    apps?.find((app) =>
      window.location.pathname.startsWith(app.href || 'UNKNOWN')
    ) || apps?.[0]
  );
  const navigate = useNavigate();

  if (!activeApp) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {apps?.length === 1 ? (
          <Link to={activeApp.href || ''}>
            <TitleButton app={activeApp} showIcon={false} />
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <activeApp.logo className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>
                    {activeApp.title}
                  </span>
                  <span className='truncate text-xs'>
                    {activeApp.description}
                  </span>
                </div>
                <ChevronsUpDown className='ml-auto' />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              align='start'
              side={isMobile ? 'bottom' : 'right'}
              sideOffset={4}
            >
              <DropdownMenuLabel className='text-xs text-muted-foreground'>
                Switch App
              </DropdownMenuLabel>
              {(apps || []).map((app, index) => (
                <DropdownMenuItem
                  key={app.title}
                  onClick={() => {
                    setActiveApp(app);
                    appClicked?.(app);
                    navigate({ to: app.href || '/' });
                  }}
                  className='gap-2 p-2'
                >
                  <div className='flex size-6 items-center justify-center rounded-sm border'>
                    <app.logo className='size-4 shrink-0' />
                  </div>
                  {app.title}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className='gap-2 p-2'>
                <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                  <Plus className='size-4' />
                </div>
                <div className='font-medium text-muted-foreground'>
                  See all Apps
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
