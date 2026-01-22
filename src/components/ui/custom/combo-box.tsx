import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import type { UseFormReturn } from 'react-hook-form';

export interface SelectOption {
  id: string;
  value: string;
}

interface IComboBoxProps {
  description?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  label: string;
  name: string;
  options: SelectOption[];
  onSelect?: (option: SelectOption) => void;
  onSearch?: (search: string) => void;
  disabled?: boolean;
}

export default function ComboBox({
  description,
  form,
  label,
  name,
  options,
  onSelect,
  onSearch,
  disabled,
}: IComboBoxProps) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn(
                    'w-full md:w-[350px] justify-between font-normal',
                    !field.value && 'text-muted-foreground'
                  )}
                  disabled={disabled ? true : false}
                >
                  {options.find((option) => option.id === field?.value)
                    ?.value || `Select ${label.toLowerCase()}`}
                  <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-full md:w-[350px] p-0'>
              <Command>
                <CommandInput
                  placeholder={`Search ${label}...`}
                  className='h-9'
                  onValueChange={(search: string) => {
                    if (onSearch) {
                      onSearch(search);
                    }
                  }}
                />
                <CommandList>
                  <CommandEmpty>{`No ${label.toLowerCase()} found.`}</CommandEmpty>
                  <CommandGroup className=' max-h-[200px] overflow-auto '>
                    {options.map((_option) => (
                      <CommandItem
                        value={_option.value}
                        key={_option.id}
                        onSelect={() => {
                          form.setValue(name, _option.id);
                          setOpen(false);
                          onSelect?.(_option);
                        }}
                      >
                        {_option.value}
                        <CheckIcon
                          className={cn(
                            'ml-auto h-4 w-4',
                            _option.id === field.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
