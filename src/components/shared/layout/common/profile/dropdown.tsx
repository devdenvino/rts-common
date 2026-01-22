import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui';
import { Link } from '@tanstack/react-router';
import { BadgeInfo, LogOut, UserRound } from 'lucide-react';
import { useAuth } from 'react-oidc-context';
import { getAppConfig, getInitials } from '@/lib/helpers/functions';
import { ThemeColorToggle } from '@/components/shared/theme/themeColorToggle';
import { LayoutSwitcher } from '../switcher/layout-switcher';
import { IconStethoscope } from '@tabler/icons-react';
import { AnimatedThemeToggler } from '@/components/magicui';

export function ProfileDropdown(
  { isMobile }: { isMobile?: boolean } = { isMobile: false }
) {
  const { user, signoutRedirect } = useAuth();
  const initials = getInitials(user?.profile?.name || '');
  const appConfig = getAppConfig();

  return (
    <DropdownMenuContent
      className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
      side={isMobile ? 'bottom' : 'right'}
      align='end'
      sideOffset={4}
    >
      <DropdownMenuLabel className='p-0 font-normal'>
        <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
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
            <AvatarFallback className='rounded-lg'>{initials}</AvatarFallback>
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
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {appConfig?.profilePage && (
        <Link to={appConfig?.profilePage}>
          <DropdownMenuItem>
            <UserRound />
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuItem>
        </Link>
      )}
      {appConfig?.statusPage && (
        <Link to={appConfig?.statusPage}>
          <DropdownMenuItem>
            <IconStethoscope />
            <DropdownMenuItem>Status</DropdownMenuItem>
          </DropdownMenuItem>
        </Link>
      )}
      <Link to='/about'>
        <DropdownMenuItem>
          <BadgeInfo />
          <DropdownMenuItem>About</DropdownMenuItem>
        </DropdownMenuItem>
      </Link>
      <DropdownMenuSeparator />
      <div className='flex flex-row space-x-2'>
        <AnimatedThemeToggler />
        <ThemeColorToggle />
        <LayoutSwitcher />
      </div>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => signoutRedirect({ 
        post_logout_redirect_uri: window.location.origin 
      })}>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
