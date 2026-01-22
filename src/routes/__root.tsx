import { Outlet, createRootRouteWithContext, useRouterState } from '@tanstack/react-router';
import * as LucideIcons from 'lucide-react';
import AppBase from '../components/shared/app/app-base';
import type { AppDetail, NavMenu } from '../lib/models/types';
import { AppNavProvider, useAppNav } from '@/lib/contexts/navigation-context';
import { useEffect } from 'react';
import {
  IconHome,
} from '@tabler/icons-react';


export interface RouterContext {
  isRemote?: boolean;
  mfeId?: string;
  baseUrl?: string;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

const APPS_NAV_ITEMS: NavMenu[] = [
  {
    title: 'Home',
    href: '/',
    icon: IconHome,
  },
];

const APPS_END_NAV_ITEMS = [
  {
    title: 'About',
    href: '/about',
    icon: LucideIcons.Info,
  },
];

const sidebarConfig = {
  apps: [
    {
      title: 'Apps Store',
      logo: LucideIcons.Sailboat,
      description: 'View all apps',
    },
  ],
};

const App = () => {
  const { setNavItems, setEndNavItems } = useAppNav();
  const { mfeId } = Route.useRouteContext();

  useEffect(() => {
    const basePath = mfeId ? `/${mfeId}` : '';
    // Set nav items from centralized configuration
    setNavItems({
      menuItems: APPS_NAV_ITEMS,
      basePath,
    });
    setEndNavItems({
      menuItems: APPS_END_NAV_ITEMS,
      basePath,
    });

    // Cleanup on unmount
    return () => {
      setNavItems({ menuItems: [] });
      setEndNavItems({ menuItems: [] });
    };
  }, [setNavItems, setEndNavItems, mfeId]);

  return <Outlet />;
};

function RootComponent() {

  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // If path contains 'layout-test', return simple layout
  if (currentPath.includes('layout-test')) {
    return (
      <AppNavProvider>
        <App />
      </AppNavProvider>
    );
  }

  // Otherwise return AppBase layout
  return (
    <AppBase
      sidebarProps={{
        ...sidebarConfig,
        appClicked: (app: AppDetail) => {
          // Handle app click - implement navigation or custom logic
        },
      }}
    >
      <App />
    </AppBase>
  );
}
