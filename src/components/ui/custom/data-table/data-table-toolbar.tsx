import { Cross2Icon } from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { type ReactElement, useEffect, useState } from 'react';
import {
  DataTableFacetedFilter,
  type DataTableFacetedFilterOption,
} from './data-table-faceted-filter';
import { DataTableViewOptions } from './data-table-view-options';
import { useNavigate, useSearch } from '@tanstack/react-router';

export interface IDataTableFacetedFilterColumns {
  title: string;
  colName: string;
  options?: DataTableFacetedFilterOption[];
  icon: ReactElement;
  singleSelect?: boolean;
}

export interface IDataTableToolBarProps {
  facetedFilterColumns?: IDataTableFacetedFilterColumns[];
  globalFilterPlaceHolder?: string;
  globalActions?: <TData>(table: Table<TData>) => Array<ReactElement | null>;
  tableId?: string; // Optional namespace for search params
}

interface DataTableToolbarProps<TData> extends IDataTableToolBarProps {
  table: Table<TData>;
  globalFilter: string;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  facetedFilterColumns,
  globalFilterPlaceHolder,
  globalActions,
  tableId,
}: DataTableToolbarProps<TData>) {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as Record<string, unknown>;
  const isFiltered = table.getState().columnFilters.length > 0 || globalFilter;

  const handleReset = () => {
    table.resetColumnFilters();
    table.resetGlobalFilter();

    // Clear only this table's filter params if tableId is provided
    if (tableId) {
      const updatedParams = { ...searchParams };
      // Remove all params starting with tableId prefix
      Object.keys(updatedParams).forEach(key => {
        if (key.startsWith(`${tableId}_`)) {
          delete updatedParams[key];
        }
      });
      navigate({
        search: updatedParams as any,
        replace: true
      });
    } else {
      // Clear all filter-related search params
      navigate({
        search: {} as any,
        replace: true
      });
    }
  };

  /* Debounce logic for global filter */
  const [searchValue, setSearchValue] = useState(globalFilter ?? '');

  useEffect(() => {
    setSearchValue(globalFilter ?? '');
  }, [globalFilter]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue !== globalFilter) {
        table.setGlobalFilter(searchValue);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchValue, table, globalFilter]);

  return (
    <div className='flex items-center justify-between p-1'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder={globalFilterPlaceHolder ?? 'Search...'}
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {facetedFilterColumns?.map((filterCol, ix) => {
          return (
            table.getColumn(filterCol.colName) &&
            filterCol.options && (
              <DataTableFacetedFilter
                key={ix}
                column={table.getColumn(filterCol.colName)}
                title={filterCol.title}
                options={filterCol.options}
                icon={filterCol.icon}
                tableId={tableId}
                singleSelect={filterCol.singleSelect}
              />
            )
          );
        })}
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={handleReset}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      {globalActions?.(table).map(
        (action, ix) =>
          action && (
            <div className='mr-2' key={ix}>
              {action}
            </div>
          )
      )}
      <DataTableViewOptions table={table} />
    </div>
  );
}
