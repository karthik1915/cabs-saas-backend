import { UserPlus } from 'lucide-react'

import { Button } from '#/components/ui/button.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/(operations)/users/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl">Users</h1>
          <p className="text-muted-foreground text-sm">
            Manage your organization Users.
          </p>
        </div>
        <div>
          <Button>
            <UserPlus /> Add User
          </Button>
        </div>
      </div>
    </div>
  )
}
