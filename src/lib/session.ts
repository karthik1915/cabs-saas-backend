import type { AuthSession } from '#/types/auth.ts'
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'

export const getCurrentSession = createServerFn({
  method: 'GET',
}).handler(async () => {
  const cookie = getRequestHeader('cookie')

  if (!cookie) return null

  // Fetch the session from the BetterAuth API in Backend
  const response = await fetch(
    `${process.env.PUBLIC_BETTER_AUTH_URL}/api/auth/get-session`,
    {
      headers: { cookie },
      cache: 'no-store',
    },
  )

  // If the response is not ok, return null
  if (!response.ok) return null

  // Result is of type AuthSession
  const result: AuthSession = await response.json()

  // Return the result if it exists, otherwise return null
  return result ? result : null
})
