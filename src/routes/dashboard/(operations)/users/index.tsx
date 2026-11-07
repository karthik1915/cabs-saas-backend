import { UserPlus } from 'lucide-react'

import { Button } from '#/components/ui/button.tsx'
import { createFileRoute } from '@tanstack/react-router'
import { UsersTable } from '#/components/dashboard/users/table.tsx'

export const Route = createFileRoute('/dashboard/(operations)/users/')({
  component: RouteComponent,
  loader: async () => {},
})

const data = [
  {
    id: '1',
  },
]

function RouteComponent() {
  return (
    <div>
      <section
        id="page-header"
        className="w-full flex justify-between items-start"
      >
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
      </section>
      <section className="mt-4">
        <UsersTable data={data} />
      </section>
    </div>
  )
}
