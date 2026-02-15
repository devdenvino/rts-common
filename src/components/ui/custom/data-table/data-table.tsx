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
  type Row,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useEffect, useState, useRef } from "react";
import { DataTablePagination } from "./data-table-pagination";
import {
  DataTableToolbar,
  type IDataTableToolBarProps,
} from "./data-table-toolbar";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useVirtualizer } from "@tanstack/react-virtual";

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
  /**
   * Status of table density.
   * @default 'normal'
   */
  density?: "normal" | "medium" | "compact";
  /**
   * Enable virtual scrolling for large datasets.
   * Requires a defined height for the scroll container via `scrollAreaProps.className` or explicit `maxHeight`.
   * @default false
   */
  enableVirtualization?: boolean;
  /**
   * Props to pass to the scroll container when virtualization is enabled.
   * Use this to set the height of the scroll area.
   */
  scrollAreaProps?: React.HTMLAttributes<HTMLDivElement>;
}

const DENSITY_CONFIG = {
  normal: {
    rowHeight: 52,
    cellPadding: "p-4",
    headerHeight: "h-12",
    headerPadding: "px-4",
    fontSize: "text-sm",
  },
  medium: {
    rowHeight: 40,
    cellPadding: "p-2",
    headerHeight: "h-9",
    headerPadding: "px-3",
    fontSize: "text-sm",
  },
  compact: {
    rowHeight: 28,
    cellPadding: "p-0 px-1",
    headerHeight: "h-7",
    headerPadding: "px-1",
    fontSize: "text-xs",
  },
} as const;

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
  density = "medium",
  enableVirtualization = false,
  scrollAreaProps,
}: IDataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  // We use strict: false to allow accessing arbitrary search params for filtering
  const searchParams = useSearch({ strict: false }) as Record<string, unknown>;

  // Helper functions to namespace search params when tableId is provided
  const getParamKey = (key: string) => (tableId ? `${tableId}_${key}` : key);
  const getFilterFromUrl = (key: string) =>
    searchParams?.[getParamKey(key)] as string | undefined;

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Track the last state we explicitly set from a user action to avoid race conditions with URL sync
  const lastLocalUpdateRef = useRef<string>("");

  // Initialize column filters from URL with case-insensitivity
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(() => {
    const initialFilters: ColumnFiltersState = [];
    facetedFilterColumns?.forEach((filterColumn) => {
      const targetKey = getParamKey(filterColumn.colName);
      const actualKey = Object.keys(searchParams || {}).find(
        (k) => k.toLowerCase() === targetKey.toLowerCase(),
      );
      const colValue = actualKey ? searchParams[actualKey] : undefined;

      if (colValue && typeof colValue === "string") {
        initialFilters.push({
          id: filterColumn.colName,
          value: colValue.split(","),
        });
      }
    });
    return initialFilters;
  });

  const [globalFilter, setGlobalFilter] = useState<string>(
    getFilterFromUrl("globalFilter") || "",
  );
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
      const newFilterValue =
        typeof updater === "function" ? updater(globalFilter) : updater;
      const value = newFilterValue || "";
      setGlobalFilter(value);

      const paramKey = getParamKey("globalFilter");
      const updatedParams = { ...searchParams };
      if (value) {
        updatedParams[paramKey] = value;
      } else {
        delete updatedParams[paramKey];
      }
      navigate({ search: updatedParams as any, replace: true });
    },
    onColumnFiltersChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(columnFilters) : updater;

      // Mark this update as local so the useEffect doesn't immediately revert it
      lastLocalUpdateRef.current = JSON.stringify(next);
      setColumnFilters(next);

      // Sync to URL - create a clean copy and handle case-insensitivity
      const updatedParams = { ...searchParams };

      facetedFilterColumns?.forEach((filterCol) => {
        const targetKey = getParamKey(filterCol.colName);

        // Find and remove any existing keys that match case-insensitively to avoid duplicates
        Object.keys(updatedParams).forEach((key) => {
          if (key.toLowerCase() === targetKey.toLowerCase()) {
            delete updatedParams[key];
          }
        });

        const filter = next.find((f) => f.id === filterCol.colName);
        if (filter?.value) {
          updatedParams[targetKey] = (filter.value as string[]).join(",");
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
        (key) => key.toLowerCase() === targetKey.toLowerCase(),
      );
      const colValue = actualKey ? searchParams[actualKey] : undefined;

      if (colValue && typeof colValue === "string") {
        filtersFromUrl.push({
          id: filterColumn.colName,
          value: colValue.split(","),
        });
      }
    });

    // Only update if URL actually differs from current state AND it's not the update we just made
    setColumnFilters((prev) => {
      const currentFiltersJson = JSON.stringify(filtersFromUrl);
      const prevJson = JSON.stringify(prev);

      if (currentFiltersJson === prevJson) return prev;

      // If the URL matches what we just manually set, we can clear the ref and skip the sync
      if (
        lastLocalUpdateRef.current !== "" &&
        currentFiltersJson === lastLocalUpdateRef.current
      ) {
        lastLocalUpdateRef.current = "";
        return prev;
      }

      // If we have a pending local update that hasn't reflected in the URL yet,
      // skip synchronization to avoid reverting to stale URL state.
      if (lastLocalUpdateRef.current !== "") {
        return prev;
      }

      return filtersFromUrl;
    });

    const globalFilterTargetKey = getParamKey("globalFilter");
    const globalFilterActualKey = Object.keys(searchParams || {}).find(
      (key) => key.toLowerCase() === globalFilterTargetKey.toLowerCase(),
    );
    const globalFilterValue =
      (globalFilterActualKey ? searchParams[globalFilterActualKey] : "") || "";

    if (
      globalFilterValue !== globalFilter &&
      typeof globalFilterValue === "string"
    ) {
      setGlobalFilter(globalFilterValue);
    }
  }, [searchParams, facetedFilterColumns, tableId]); // globalFilter removed from deps intentionally

  useEffect(() => {
    if (table) {
      defaultHiddenColumns?.forEach((col) =>
        table.getColumn(col)?.toggleVisibility(false),
      );
    }
  }, [table, defaultHiddenColumns]);

  // Virtualization
  const parentRef = useRef<HTMLDivElement>(null);
  const { rows } = enableVirtualization
    ? table.getPrePaginationRowModel()
    : table.getRowModel();

  const currentDensity = DENSITY_CONFIG[density];

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => currentDensity.rowHeight,
    overscan: 10,
    enabled: enableVirtualization,
  });

  const defaultVirtualStyle: React.CSSProperties = enableVirtualization
    ? { height: "800px", overflow: "auto", position: "relative" }
    : {};

  const finalStyle: React.CSSProperties = {
    ...defaultVirtualStyle,
    ...scrollAreaProps?.style,
  };

  if (
    enableVirtualization &&
    !finalStyle.height &&
    !scrollAreaProps?.className?.includes("h-")
  ) {
    finalStyle.height = "800px";
  }

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        facetedFilterColumns={facetedFilterColumns}
        globalFilterPlaceHolder={globalFilterPlaceHolder}
        globalActions={globalActions}
        tableId={tableId}
      />
      <div
        ref={parentRef}
        className={cn(
          "rounded-md border",
          enableVirtualization ? "overflow-auto" : "overflow-hidden",
          scrollAreaProps?.className,
        )}
        {...scrollAreaProps}
        style={finalStyle}
      >
        {enableVirtualization ? (
          <table className="w-full caption-bottom text-sm">
            <TableHeader className="sticky top-0 z-10 bg-background">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn(
                          currentDensity.headerHeight,
                          currentDensity.headerPadding,
                          currentDensity.fontSize,
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {virtualizer.getVirtualItems().length > 0 && (
                <tr
                  style={{
                    height: `${virtualizer.getVirtualItems()[0].start}px`,
                  }}
                >
                  <td colSpan={columns.length} />
                </tr>
              )}
              {virtualizer.getVirtualItems().map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          currentDensity.cellPadding,
                          currentDensity.fontSize,
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {virtualizer.getVirtualItems().length > 0 && (
                <tr
                  style={{
                    height: `${
                      virtualizer.getTotalSize() -
                      virtualizer.getVirtualItems()[
                        virtualizer.getVirtualItems().length - 1
                      ].end
                    }px`,
                  }}
                >
                  <td colSpan={columns.length} />
                </tr>
              )}
            </TableBody>
          </table>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        className={cn(
                          currentDensity.headerHeight,
                          currentDensity.headerPadding,
                          currentDensity.fontSize,
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
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
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={cn(
                            currentDensity.cellPadding,
                            currentDensity.fontSize,
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
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
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {!hidePagination && !enableVirtualization && (
        <DataTablePagination table={table} />
      )}
      {enableVirtualization && (
        <div className="text-muted-foreground text-xs p-2">
          Showing {rows.length} rows (Virtualized)
        </div>
      )}
    </div>
  );
}
