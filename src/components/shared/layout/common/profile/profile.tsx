import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials } from '@/lib/helpers/functions';
import { useAuth } from 'react-oidc-context';
import { ProfileDropdown } from './dropdown';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ChevronsUpDown } from 'lucide-react';

export default function ClassicProfile() {
  const { user, isAuthenticated } = useAuth();
  const initials = getInitials(user?.profile?.name || '');

  return isAuthenticated ? (
    <div className='flex space-x-2'>
      <DropdownMenu>
        <DropdownMenuTrigger>
          {(user?.profile?.picture || initials) && (
            <Avatar className='h-8 w-8 cursor-pointer'>
              <AvatarImage
                src={
                  user?.profile?.picture?.startsWith('http') ||
                  user?.profile?.picture?.startsWith('data:image')
                    ? user?.profile?.picture
                    : 'data:image/png;base64, ' + user?.profile?.picture
                }
                alt={user?.profile?.given_name || ''}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <ProfileDropdown />
      </DropdownMenu>
    </div>
  ) : null;
}

export function ModernProfile() {
  const { user, isAuthenticated } = useAuth();
  const initials = getInitials(user?.profile?.name || '');
  const { isMobile } = useSidebar();

  return isAuthenticated && user ? (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={
                    user?.profile?.picture?.startsWith('http') ||
                    user?.profile?.picture?.startsWith('data:image')
                      ? user?.profile?.picture
                      : 'data:image/png;base64, ' + user?.profile?.picture
                  }
                  alt={user?.profile?.given_name || ''}
                />
                <AvatarFallback className='rounded-lg'>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>
                  {user?.profile?.given_name ||
                    '' ||
                    (user?.profile?.name || '')?.split(' ')[0]}
                </span>
                <span className='truncate text-xs'>
                  {user?.profile?.email || ''}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <ProfileDropdown isMobile={isMobile} />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  ) : null;
}
