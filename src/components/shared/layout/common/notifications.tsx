import { useTheme } from '@/components/shared/theme/provider';
import { Button } from '@/components/ui/button';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useEffect, useState } from 'react';
import { Bell, BellDot } from 'lucide-react';
import { Inbox, InboxContent, useCounts } from '@novu/react';
import { dark } from '@novu/react/themes';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui';
import { BellIcon } from '@radix-ui/react-icons';
import { getAppConfig } from '@/lib/helpers/functions';
import { useAtomValue } from 'jotai';
import { appLayout } from '@/lib/contexts/atoms';
import { useAuth } from '@/hooks/use-auth';

function NotificationInbox({ setOpen }: { setOpen: (open: boolean) => void }) {
  const { counts } = useCounts({ filters: [{ read: false }] });
  const layout = useAtomValue(appLayout);
  const unreadCount = counts?.[0].count ?? 0;
  const unreadCountMessage = unreadCount > 9 ? '9+' : unreadCount;

  return (
    <>
      {layout.startsWith('sidebar') ? (
        <SidebarGroup className='pt-1 pb-1'>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SheetTrigger asChild>
                  <SidebarMenuButton
                    tooltip={`${
                      unreadCount > 0 ? `${unreadCountMessage} ` : ''
                    }Notifications`}
                    onClick={() => setOpen(true)}
                    className='cursor-pointer'
                  >
                    {unreadCount > 0 ? <BellDot /> : <Bell />}
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <Badge
                        className='ml-auto h-5 min-w-5 rounded-full px-1 font-mono tabular-nums'
                        variant='destructive'
                      >
                        {unreadCountMessage}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SheetTrigger>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ) : (
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setOpen(true)}
          className='relative cursor-pointer'
        >
          <BellIcon className='h-4 w-4' />
          {unreadCount > 0 && (
            <Badge
              variant='destructive'
              className='absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full text-xs'
            >
              {unreadCountMessage}
            </Badge>
          )}
        </Button>
      )}
      <SheetContent>
        <InboxContent />
      </SheetContent>
    </>
  );
}

export function Notifications() {
  const appConfig = getAppConfig('');
  const [open, setOpen] = useState(false);
  const { themeName } = useTheme();
  const { user } = useAuth();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'q' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!appConfig?.novu || !user?.profile?.sub) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Inbox
        applicationIdentifier={appConfig.novu.applicationIdentifier}
        subscriberId={user.profile.sub}
        backendUrl={appConfig.novu.backendUrl}
        socketUrl={appConfig.novu.socketUrl}
        appearance={{ baseTheme: themeName === 'dark' ? dark : undefined }}
      >
        <NotificationInbox setOpen={setOpen} />
      </Inbox>
    </Sheet>
  );
}
