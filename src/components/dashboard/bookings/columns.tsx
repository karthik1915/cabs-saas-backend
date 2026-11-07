import { format } from 'date-fns'

import type { BookingList } from '#/types/bookings'
import { createColumnHelper } from '@tanstack/react-table'

import type { DataTableFeatures } from '#/components/data-table/features'
import { useNavigate } from '@tanstack/react-router'
import { Button } from '#/components/ui/button.tsx'

const columnHelper = createColumnHelper<DataTableFeatures, BookingList>()

export const bookingColumns = columnHelper.columns([
  columnHelper.display({
    id: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.bookingReference}</span>
        <span className="text-muted-foreground text-sm">
          {format(
            new Date(row.original.bookingDate.replace(' ', 'T')),
            'dd MMM yyyy · HH:mm',
          )}
        </span>
      </div>
    ),
  }),

  columnHelper.display({
    id: 'customerDetails',
    header: 'Details',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span>{row.original.customerName}</span>
        <span className="text-muted-foreground text-sm">
          {row.original.customerPhone}
        </span>
      </div>
    ),
  }),

  columnHelper.accessor('bookingStatus', {
    header: 'Status',
  }),

  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (info) => {
      const navigate = useNavigate()
      return (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigate({
              to: '/dashboard/bookings/$bookingId',
              params: {
                bookingId: info.row.original.id,
              },
            })
          }}
        >
          View
        </Button>
      )
    },
  }),
])
