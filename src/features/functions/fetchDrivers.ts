import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'

import { createApiClient } from '../api-client'
import type { DriversList } from '#/types/drivers.ts'

import { queryOptions } from '@tanstack/react-query'

const fetchDrivers = createServerFn({
  method: 'GET',
}).handler(async () => {
  const cookie = getRequestHeader('cookie')

  return createApiClient<DriversList>('/api/drivers/list', {
    headers: cookie ? { cookie } : undefined,
  })
})

export const driversQueryOptions = queryOptions({
  queryKey: ['drivers', 'me'],
  queryFn: () => fetchDrivers(),
  staleTime: 5 * 60 * 1000,
})
