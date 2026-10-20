import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(operations)/livemap/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/livemap/"!</div>
}
