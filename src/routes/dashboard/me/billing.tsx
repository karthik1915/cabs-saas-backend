import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/me/billing')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/me/billing"!</div>
}
