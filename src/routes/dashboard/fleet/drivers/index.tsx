import { Button } from '#/components/ui/button.tsx'
import { createFileRoute } from '@tanstack/react-router'
import { UserPlus } from 'lucide-react'

export const Route = createFileRoute('/dashboard/fleet/drivers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl">Drivers</h1>
          <p className="text-muted-foreground text-sm">
            Manage your organization Drivers.
          </p>
        </div>
        <div>
          <Button>
            <UserPlus /> Add Driver
          </Button>
        </div>
      </div>
    </div>
  )
}
