import { Button } from '#/components/ui/button.tsx'
import { ListPlusIcon } from '@phosphor-icons/react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/fleet/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl">Fleet</h1>
          <p className="text-muted-foreground text-sm">
            Manage vehicles in the fleet.
          </p>
        </div>
        <div>
          <Button>
            <ListPlusIcon /> Add Cabs
          </Button>
        </div>
      </div>
    </div>
  )
}
