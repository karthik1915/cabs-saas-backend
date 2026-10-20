import { toast } from '#/components/ui/toast.tsx'
import { redirect } from '@tanstack/react-router'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  baseURL: import.meta.env.PUBLIC_BETTER_AUTH_URL,
})

export async function signOut() {
  await authClient.signOut()
  toast.add({
    type: 'success',
    description: 'Successfully logged out!',
  })
  redirect({ to: '/auth/login' })
}
