import { UserPlus } from 'lucide-react'
import { Button } from '#/components/ui/button.tsx'
import { createFileRoute } from '@tanstack/react-router'

import { DriversTable } from '#/components/dashboard/drivers/table.tsx'
import { driversQueryOptions } from '#/features/functions/fetchDrivers.ts'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/dashboard/fleet/drivers/')({
  component: RouteComponent,

  loader: async ({ context }) => {
    await context.queryClient.query(driversQueryOptions)
  },
})

function RouteComponent() {
  const { data: driversData } = useSuspenseQuery(driversQueryOptions)

  return (
    <div>
      <section
        id="page-header"
        className="w-full flex justify-between items-start"
      >
        <div>
          <h1 className="text-2xl">Drivers</h1>
          <p className="text-muted-foreground text-sm">
            Manage your organization Drivers.
          </p>
        </div>
        <div>
          <Button>
            <UserPlus /> Add Driver
          </Button>
        </div>
      </section>
      <section className="mt-4">
        <DriversTable data={driversData} />
      </section>
    </div>
  )
}
