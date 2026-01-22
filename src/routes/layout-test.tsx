import { SidebarLayout } from '@/components/test/sidebar-layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/layout-test')({
  component: RouteComponent,
});

function RouteComponent() {
  return <SidebarLayout />;
}
