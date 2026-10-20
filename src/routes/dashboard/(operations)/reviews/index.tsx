import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(operations)/reviews/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/(operations)/reviews/"!</div>
}
