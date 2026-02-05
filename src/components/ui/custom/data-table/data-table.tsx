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

import { useEffect, useState, useRef } from 'react';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar, type IDataTableToolBarProps } from './data-table-toolbar';
import { useNavigate, useSearch } from '@tanstack/react-router';

interface IDataTableProps<TData, TValue> extends IDataTableToolBarProps {
  /**
   * Definition of columns to display in the table
   */
  columns: ColumnDef<TData, TValue>[];
  /**
   * The data to be rendered in the table
   */
  data: TData[];
  /**
   * Columns to hide by default
   */
  defaultHiddenColumns?: string[];
  /**
   * Initial sorting state
   */
  sortingState?: SortingState;
  /**
   * Whether to hide the pagination controls
   * @default false
   */
  hidePagination?: boolean;
  /**
   * Optional namespace for search params when multiple tables exist on the same page.
   * This prefixes all filtering/sorting URL parameters with the ID.
   */
  /**
   * Optional control for server-side pagination.
   * If true, the table will not paginate automatically and will expect data to be pre-paginated.
   */
  manualPagination?: boolean;
  /**
   * Optional control for server-side sorting.
   * If true, the table will not sort automatically and will expect data to be pre-sorted.
   */
  manualSorting?: boolean;
  /**
   * Optional control for server-side filtering.
   * If true, the table will not filter automatically and will expect data to be pre-filtered.
   */
  manualFiltering?: boolean;
  /**
   * Total number of rows in the dataset (for server-side pagination).
   */
  rowCount?: number;
  /**
   * Total number of pages (alternative to rowCount for server-side pagination).
   */
  pageCount?: number;
}

/**
 * A powerful, data-driven table component built on top of TanStack Table.
 * Supports filtering, sorting, pagination, and URL state synchronization.
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={users}
 *   columns={columns}
 *   tableId="users-table"
 * />
 * ```
 */
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
  manualPagination,
  manualSorting,
  manualFiltering,
  rowCount,
  pageCount,
}: IDataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  // We use strict: false to allow accessing arbitrary search params for filtering
  const searchParams = useSearch({ strict: false }) as Record<string, unknown>;

  // Helper functions to namespace search params when tableId is provided
  const getParamKey = (key: string) => tableId ? `${tableId}_${key}` : key;
  const getFilterFromUrl = (key: string) => searchParams?.[getParamKey(key)] as string | undefined;

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Track the last state we explicitly set from a user action to avoid race conditions with URL sync
  const lastLocalUpdateRef = useRef<string>('');

  // Initialize column filters from URL with case-insensitivity
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    const initialFilters: ColumnFiltersState = [];
    facetedFilterColumns?.forEach((filterColumn) => {
      const targetKey = getParamKey(filterColumn.colName);
      const actualKey = Object.keys(searchParams || {}).find(
        (k) => k.toLowerCase() === targetKey.toLowerCase()
      );
      const colValue = actualKey ? searchParams[actualKey] : undefined;

      if (colValue && typeof colValue === 'string') {
        initialFilters.push({
          id: filterColumn.colName,
          value: colValue.split(','),
        });
      }
    });
    return initialFilters;
  });

  const [globalFilter, setGlobalFilter] = useState<string>(getFilterFromUrl('globalFilter') || '');
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
    manualPagination,
    manualSorting,
    manualFiltering,
    rowCount,
    pageCount,
    onExpandedChange: setExpanded,
    enableRowSelection: true,
    enableGlobalFilter: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
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
      const value = newFilterValue || '';
      setGlobalFilter(value);

      const paramKey = getParamKey('globalFilter');
      const updatedParams = { ...searchParams };
      if (value) {
        updatedParams[paramKey] = value;
      } else {
        delete updatedParams[paramKey];
      }
      navigate({ search: updatedParams as any, replace: true });
    },
    onColumnFiltersChange: (updater) => {
      const next = typeof updater === 'function' ? updater(columnFilters) : updater;

      // Mark this update as local so the useEffect doesn't immediately revert it
      lastLocalUpdateRef.current = JSON.stringify(next);
      setColumnFilters(next);

      // Sync to URL - create a clean copy and handle case-insensitivity
      const updatedParams = { ...searchParams };

      facetedFilterColumns?.forEach((filterCol) => {
        const targetKey = getParamKey(filterCol.colName);

        // Find and remove any existing keys that match case-insensitively to avoid duplicates
        Object.keys(updatedParams).forEach(key => {
          if (key.toLowerCase() === targetKey.toLowerCase()) {
            delete updatedParams[key];
          }
        });

        const filter = next.find((f) => f.id === filterCol.colName);
        if (filter?.value) {
          updatedParams[targetKey] = (filter.value as string[]).join(',');
        }
      });

      navigate({ search: updatedParams as any, replace: true });
    },
  });

  // Synchronize from URL when searchParams change (from back/forward or direct URL edits)
  useEffect(() => {
    const filtersFromUrl: ColumnFiltersState = [];
    facetedFilterColumns?.forEach((filterColumn) => {
      const targetKey = getParamKey(filterColumn.colName);
      // Case-insensitive lookup from searchParams
      const actualKey = Object.keys(searchParams || {}).find(
        (key) => key.toLowerCase() === targetKey.toLowerCase()
      );
      const colValue = actualKey ? searchParams[actualKey] : undefined;

      if (colValue && typeof colValue === 'string') {
        filtersFromUrl.push({
          id: filterColumn.colName,
          value: colValue.split(','),
        });
      }
    });

    // Only update if URL actually differs from current state AND it's not the update we just made
    setColumnFilters((prev) => {
      const currentFiltersJson = JSON.stringify(filtersFromUrl);
      const prevJson = JSON.stringify(prev);

      if (currentFiltersJson === prevJson) return prev;

      // If the URL matches what we just manually set, we can clear the ref and skip the sync
      if (lastLocalUpdateRef.current !== '' && currentFiltersJson === lastLocalUpdateRef.current) {
        lastLocalUpdateRef.current = '';
        return prev;
      }

      // If we have a pending local update that hasn't reflected in the URL yet,
      // skip synchronization to avoid reverting to stale URL state.
      if (lastLocalUpdateRef.current !== '') {
        return prev;
      }

      return filtersFromUrl;
    });

    const globalFilterTargetKey = getParamKey('globalFilter');
    const globalFilterActualKey = Object.keys(searchParams || {}).find(
      (key) => key.toLowerCase() === globalFilterTargetKey.toLowerCase()
    );
    const globalFilterValue = (globalFilterActualKey ? searchParams[globalFilterActualKey] : '') || '';

    if (globalFilterValue !== globalFilter && typeof globalFilterValue === 'string') {
      setGlobalFilter(globalFilterValue);
    }
  }, [searchParams, facetedFilterColumns, tableId]); // globalFilter removed from deps intentionally

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
