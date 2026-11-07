import { bookingDataOptions } from '#/features/functions/fetchBookingData.ts'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/(operations)/bookings/$bookingId',
)({
  component: RouteComponent,

  loader: async ({ params, context }) => {
    const { bookingId } = params
    return context.queryClient.query(bookingDataOptions(bookingId))
  },
})

function RouteComponent() {
  const { bookingId } = Route.useParams()
  const { data } = useSuspenseQuery(bookingDataOptions(bookingId))

  return <div>{JSON.stringify(data, null, 2)}</div>
}
