import {
  type ColumnDef,
  type ColumnFiltersState,
  type ExpandedState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useEffect, useState } from 'react';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar, type IDataTableToolBarProps } from './data-table-toolbar';
import { useNavigate, useSearch } from '@tanstack/react-router';

interface IDataTableProps<TData, TValue> extends IDataTableToolBarProps {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultHiddenColumns?: string[];
  sortingState?: SortingState;
  hidePagination?: boolean;
  tableId?: string; // Optional namespace for search params when multiple tables on same page
}

export function DataTable<TData, TValue>({
  columns,
  data,
  facetedFilterColumns,
  defaultHiddenColumns,
  globalFilterPlaceHolder,
  globalActions,
  sortingState,
  hidePagination = false,
  tableId,
}: IDataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as any;
  
  // Helper functions to namespace search params when tableId is provided
  const getParamKey = (key: string) => tableId ? `${tableId}_${key}` : key;
  const getFilterValue = (key: string) => searchParams?.[getParamKey(key)];
  
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>(getFilterValue('globalFilter') || '');
  const [sorting, setSorting] = useState<SortingState>(sortingState || []);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      expanded,
      globalFilter,
    },
    onExpandedChange: setExpanded,
    enableRowSelection: true,
    enableGlobalFilter: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getExpandedRowModel: getExpandedRowModel(),
    onGlobalFilterChange: (updater) => {
      const newFilterValue = typeof updater === 'function' ? updater(globalFilter) : updater;
      setGlobalFilter(newFilterValue || '');
      
      // Update URL search params with namespaced key
      const paramKey = getParamKey('globalFilter');
      if (newFilterValue) {
        navigate({
          search: { ...searchParams, [paramKey]: newFilterValue } as any,
          replace: true,
        });
      } else {
        const { [paramKey]: _, ...rest } = searchParams;
        navigate({
          search: rest as any,
          replace: true,
        });
      }
    },
  });

  useEffect(() => {
    if (table) {
      facetedFilterColumns?.forEach((filterColumn) => {
        const paramKey = getParamKey(filterColumn.colName);
        const colValue = searchParams?.[paramKey];
        if (colValue) {
          table
            .getColumn(filterColumn.colName)
            ?.setFilterValue(colValue.split(',') as string[]);
        } else {
          table.getColumn(filterColumn.colName)?.setFilterValue(undefined);
        }
      });
      
      const globalFilterValue = getFilterValue('globalFilter');
      if (globalFilterValue && globalFilterValue !== globalFilter) {
        setGlobalFilter(globalFilterValue);
      } else if (!globalFilterValue && globalFilter) {
        setGlobalFilter('');
      }
    }
  }, [searchParams, table, facetedFilterColumns, tableId]);

  useEffect(() => {
    if (table) {
      defaultHiddenColumns?.forEach((col) =>
        table.getColumn(col)?.toggleVisibility(false)
      );
    }
  }, [table, defaultHiddenColumns]);

  return (
    <div className='space-y-4'>
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        facetedFilterColumns={facetedFilterColumns}
        globalFilterPlaceHolder={globalFilterPlaceHolder}
        globalActions={globalActions}
        tableId={tableId}
      />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {!hidePagination && <DataTablePagination table={table} />}
    </div>
  );
}
