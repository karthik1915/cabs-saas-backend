import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(operations)/finance/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/(operations)/finance/"!</div>
}
