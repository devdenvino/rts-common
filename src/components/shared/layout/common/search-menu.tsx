import { useTheme } from '@/components/shared/theme/provider';
import { Button } from '@/components/ui/button';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { appLayout, memberDetails, menuItems } from '@/lib/contexts/atoms';
import type { SearchProps, SearchResult } from '@/lib/models/common';
import { cn } from '@/lib/utils';
import { type AlertDialogProps } from '@radix-ui/react-alert-dialog';
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
  ViewHorizontalIcon,
  ViewVerticalIcon,
} from '@radix-ui/react-icons';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { getNavLinks } from './utils';
import { useResourceAccess } from '@/lib/contexts/roles';
import type { NavMenu } from '@/lib/models/types';
import { useSearchContext, useHasSearchHandlers } from '@/lib/contexts/search-context';

export function SearchMenu(props: AlertDialogProps & SearchProps) {
  const router = useRouter();
  const [member] = useAtom(memberDetails);
  const [navMenuItems] = useAtom(menuItems);
  const [layout, setLayout] = useAtom(appLayout);

  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [filterNavMenuItems, setFilterNavMenuItems] = useState<NavMenu[]>([]);
  const { executeSearch } = useSearchContext();
  const resourceAccess = useResourceAccess();
  const searchEnabled = useHasSearchHandlers();

  useEffect(() => {
    const menuItems = getNavLinks(
      navMenuItems,
      member.availableRoles,
      resourceAccess
    );
    setFilterNavMenuItems(menuItems);
  }, [member.availableRoles, navMenuItems, resourceAccess, router.state.location.pathname]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  useEffect(() => {
    if (!open) {
      setSearchResults([]);
    }
  }, [open]);

  // Don't render search if no handlers are registered
  if (!searchEnabled) {
    return null;
  }

  return (
    <>
      {layout.startsWith('sidebar') ? (
        <SidebarGroup className='pt-1 pb-1'>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip='Search'
                  onClick={() => setOpen(true)}
                  className='cursor-pointer'
                  {...props}
                >
                  <IconSearch />
                  <span>Search</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ) : (
        <Button
          variant='outline'
          className={cn(
            'relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64   cursor-pointer'
          )}
          onClick={() => setOpen(true)}
          {...props}
        >
          <span>Search...</span>
          <kbd className='pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
            <span className='text-xs'>Ctrl + K</span>
          </kbd>
        </Button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder='Type a command or search...'
          onValueChange={async (searchVal: string) => {
            if (!searchVal || searchVal.trim() === '') {
              setSearchResults([]);
              return;
            }
            try {
              // Get results from registered search handlers
              const handlerResults = await executeSearch(searchVal);
              
              // Filter navigation items
              const query = searchVal.toLowerCase();
              const navResults: SearchResult[] = filterNavMenuItems
                .filter(item => 
                  item.title?.toLowerCase().includes(query) ||
                  item.description?.toLowerCase().includes(query)
                )
                .map(item => ({
                  href: item.href || item.resolvedPath || '/',
                  title: item.title || '',
                  icon: item.icon ? <item.icon className="mr-2 h-4 w-4" /> : undefined,
                  namespace: 'navigation',
                  priority: 5, // Lower priority than MFE-specific searches
                }));
              
              // Also include sub-items (pageLinks) if they exist
              const subNavResults: SearchResult[] = filterNavMenuItems
                .flatMap(item => item.pageLinks || [])
                .filter(subItem => 
                  subItem.title?.toLowerCase().includes(query) ||
                  subItem.description?.toLowerCase().includes(query)
                )
                .map(subItem => ({
                  href: subItem.href || subItem.resolvedPath || '/',
                  title: subItem.title || '',
                  icon: subItem.icon ? <subItem.icon className="mr-2 h-4 w-4" /> : undefined,
                  namespace: 'navigation',
                  priority: 5,
                }));
              
              // Merge and sort all results by priority
              const allResults = [...handlerResults, ...navResults, ...subNavResults];
              const sortedResults = allResults.sort((a, b) => 
                ((b as any).priority || 0) - ((a as any).priority || 0)
              );
              
              setSearchResults(sortedResults);
            } catch (ex) {
              if (import.meta.env.DEV) {
                console.error('Error: Searching; ', ex);
              }
              setSearchResults([]);
            }
          }}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchResults.length > 0 && (
            <CommandGroup heading='Search Results'>
              {searchResults.map((navItem, ix) => (
                <CommandItem
                  key={navItem.href + navItem.title + ix.toString()}
                  value={navItem.href + navItem.title + ix.toString()}
                  onSelect={() => {
                    runCommand(() => {
                      setSearchResults([]);
                      router.navigate({ to: navItem.href as string });
                    });
                  }}
                >
                  {navItem.element ? (
                    navItem.element
                  ) : (
                    <>
                      {navItem.icon}
                      {navItem.title}
                    </>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          <CommandSeparator />
          {filterNavMenuItems
            .filter((group) => !group.pageLinks)
            .map((group, ix) => (
              <CommandGroup key={'general' + ix} heading={'General'}>
                <CommandItem
                  key={group.href}
                  value={group.title}
                  onSelect={() => {
                    runCommand(() =>
                      router.navigate({ to: group.href as string })
                    );
                  }}
                >
                  {group.icon ? (
                    <group.icon />
                  ) : (
                    <FileIcon className='mr-2 h-4 w-4' />
                  )}
                  {group.title}
                </CommandItem>
              </CommandGroup>
            ))}
          <CommandSeparator />
          {filterNavMenuItems
            .filter((group) => (group.pageLinks?.length || 0) > 0)
            .map((group, ix) => (
              <CommandGroup key={group.title + ix} heading={group.title}>
                {group.pageLinks?.map((navItem: any, ix: number) => (
                  <CommandItem
                    key={navItem.href + ix}
                    value={navItem.title}
                    onSelect={() => {
                      runCommand(() =>
                        router.navigate({ to: navItem.href as string })
                      );
                    }}
                  >
                    <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                      {navItem.icon ? (
                        <navItem.icon />
                      ) : (
                        <CircleIcon className='h-3 w-3' />
                      )}
                    </div>
                    {navItem.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <SunIcon className='mr-2 h-4 w-4' />
              Light
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <MoonIcon className='mr-2 h-4 w-4' />
              Dark
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <LaptopIcon className='mr-2 h-4 w-4' />
              System
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Layout'>
            <CommandItem
              onSelect={() => runCommand(() => setLayout('sidebar-open'))}
            >
              <ViewVerticalIcon className='mr-2 h-4 w-4' />
              Modern
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => setLayout('classic'))}
            >
              <ViewHorizontalIcon className='mr-2 h-4 w-4' />
              Classic
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
