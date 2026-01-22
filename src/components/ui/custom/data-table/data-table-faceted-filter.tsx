import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { Icons } from '@/components/ui/custom/icons';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { type Column } from '@tanstack/react-table';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { type ReactElement } from 'react';

export interface DataTableFacetedFilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{
    className?: string;
  }>;
}

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: DataTableFacetedFilterOption[];
  icon: ReactElement;
  tableId?: string; // Optional namespace for search params
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  icon,
  tableId,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as { [key: string]: string };
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  
  // Helper to create namespaced param key
  const getParamKey = (key: string) => tableId ? `${tableId}_${key}` : key;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          {icon}
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedValues.size}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedValues.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-sm px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[325px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined
                      );
                      if (title) {
                        const paramKey = getParamKey(title);
                        const updatedParams = { ...searchParams };
                        if (filterValues.length === 0) {
                          delete updatedParams[paramKey];
                        } else {
                          updatedParams[paramKey] = filterValues.toString();
                        }
                        navigate({
                          search: updatedParams as any,
                          replace: true,
                        });
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      {isSelected && (
                        <Icons.checkIcon className={cn('h-4 w-4')} />
                      )}
                    </div>
                    {option.icon && (
                      <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className='ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs'>
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      column?.setFilterValue(undefined);
                      if (title) {
                        const paramKey = getParamKey(title);
                        if (searchParams[paramKey]) {
                          const updatedParams = { ...searchParams };
                          delete updatedParams[paramKey];
                          navigate({
                            search: updatedParams as any,
                            replace: true,
                          });
                        }
                      }
                    }}
                    className='justify-center text-center'
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
