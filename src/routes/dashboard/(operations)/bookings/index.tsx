import { BookPlus } from 'lucide-react'
import { Button } from '#/components/ui/button.tsx'

import { createFileRoute } from '@tanstack/react-router'
import { BookingTable } from '#/components/dashboard/bookings/table.tsx'
import { bookingsQueryOptions } from '#/features/functions/fetchBookings.ts'
import { useSuspenseQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/dashboard/(operations)/bookings/')({
  component: BookingsPage,

  loader: async ({ context }) => {
    await context.queryClient.query(bookingsQueryOptions)
  },
})

function BookingsPage() {
  const { data } = useSuspenseQuery(bookingsQueryOptions)

  return (
    <div>
      <section
        id="page-header"
        className="w-full flex justify-between items-start"
      >
        <div>
          <h1 className="text-2xl">Bookings</h1>
          <p className="text-muted-foreground text-sm">
            Manage your organization Cab Bookings.
          </p>
        </div>
        <div>
          <Button>
            <BookPlus /> Add Booking
          </Button>
        </div>
      </section>
      <section className="mt-4">
        <BookingTable data={data} />
      </section>
    </div>
  )
}
