import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(support)/tickets')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/(support)/tickets"!</div>
}
