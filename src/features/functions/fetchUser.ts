import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'

import { createApiClient } from '../api-client'

import type { UserData } from '#/types/user.ts'
import { queryOptions } from '@tanstack/react-query'

const fetchUser = createServerFn({
  method: 'GET',
}).handler(async () => {
  const cookie = getRequestHeader('cookie')

  return createApiClient<UserData>('/api/me/dashboard', {
    headers: cookie ? { cookie } : undefined,
  })
})

export const userQueryOptions = queryOptions({
  queryKey: ['user', 'me'],
  queryFn: () => fetchUser(),
  staleTime: 5 * 60 * 1000,
})
