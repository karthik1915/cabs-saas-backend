import { createColumnHelper } from '@tanstack/react-table'
import type { DataTableFeatures } from '#/components/data-table/features.tsx'
import type { Booking } from '#/types/bookings.ts'

const columnHelper = createColumnHelper<DataTableFeatures, Booking>()

export const bookingColumns = columnHelper.columns([
  columnHelper.accessor('id', {
    header: 'Id',
  }),
])
