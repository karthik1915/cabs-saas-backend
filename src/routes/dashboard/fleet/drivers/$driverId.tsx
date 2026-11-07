import { driverDataOptions } from '#/features/functions/fetchDriverData'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/fleet/drivers/$driverId')({
  component: RouteComponent,

  loader: async ({ params, context }) => {
    const { driverId } = params
    return context.queryClient.query(driverDataOptions(driverId))
  },
})

function RouteComponent() {
  const { driverId } = Route.useParams()
  const driver = useSuspenseQuery(driverDataOptions(driverId)).data

  return (
    <div>
      <p>{JSON.stringify(driver, null, 2)}</p>
    </div>
  )
}
