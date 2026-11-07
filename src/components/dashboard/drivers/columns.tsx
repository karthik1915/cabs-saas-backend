import { createColumnHelper } from '@tanstack/react-table'
import type { DataTableFeatures } from '#/components/data-table/features.tsx'

import { Button } from '#/components/ui/button.tsx'
import { Avatar } from '#/components/ui/avatar.tsx'
import type { DriversList } from '#/types/drivers.ts'

import { useNavigate } from '@tanstack/react-router'

const columnHelper = createColumnHelper<DataTableFeatures, DriversList[0]>()

export const driversColumn = columnHelper.columns([
  columnHelper.accessor('driverName', {
    header: 'Driver',
    cell: (info) => (
      <div className="flex items-center gap-2 justify-start">
        <Avatar></Avatar>
        <div>
          <p className="font-medium">{info.getValue()}</p>
          <p className="text-muted-foreground text-[12px]">
            {info.row.original.driverCode}
          </p>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('driverPhone', {
    header: 'Contact',
  }),
  columnHelper.accessor('licenseNumber', {
    header: 'License Expiry',
  }),
  columnHelper.accessor('status', {
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
              to: '/dashboard/fleet/drivers/$driverId',
              params: {
                driverId: info.row.original.id,
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
