import type { ReactNode } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import {
  FlexRender,
  useTable,
  type ColumnDef,
  type RowData,
} from '@tanstack/react-table'
import { DataTablePagination } from './pagination'
import { features, type DataTableFeatures } from './features'

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  formatters: ReactNode
}

export function DataTable<TData extends RowData>({
  formatters,
  columns,
  data,
}: DataTableProps<TData>) {
  const table = useTable({
    features,
    columns,
    data,
  })

  return (
    <div>
      <div className="bg-card rounded-t-xl p-4 border-b">{formatters}</div>
      <Table className="bg-card rounded-b-xl ">
        <TableHeader>
          {table.getHeaderGroups().map((headergrp) => (
            <TableRow key={headergrp.id}>
              {headergrp.headers.map((header) => (
                <TableHead id={header.id} className="text-muted-foreground">
                  {header.isPlaceholder ? null : <FlexRender header={header} />}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <DataTablePagination table={table} />
        </TableFooter>
      </Table>
    </div>
  )
}
