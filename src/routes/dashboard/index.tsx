import { createFileRoute } from '@tanstack/react-router'

import { useSuspenseQuery } from '@tanstack/react-query'
import { userQueryOptions } from '#/features/functions/fetchUser.ts'

export const Route = createFileRoute('/dashboard/')({
  component: Dashboard,
})

function Dashboard() {
  const { data: userData } = useSuspenseQuery(userQueryOptions)

  return (
    <div>
      <h1>Welcome, {userData.userName}!</h1>
    </div>
  )
}
