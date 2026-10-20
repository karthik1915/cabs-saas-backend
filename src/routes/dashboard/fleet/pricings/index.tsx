import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/fleet/pricings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/fleet/pricings/"!</div>
}
