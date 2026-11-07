import { z } from 'zod'

import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import { queryOptions } from '@tanstack/react-query'

import { createApiClient } from '../api-client'
import type { Driver } from '#/types/drivers.ts'

const fetchDriverData = createServerFn({
  method: 'GET',
})
  .validator(
    z.object({
      driverId: z.uuid(),
    }),
  )
  .handler(async ({ data }) => {
    const cookie = getRequestHeader('cookie')

    return createApiClient<Driver>(`/api/drivers/${data.driverId}`, {
      headers: cookie ? { cookie } : undefined,
    })
  })

export const driverDataOptions = (driverId: string) =>
  queryOptions({
    queryKey: ['drivers', 'detail', driverId],
    queryFn: () => fetchDriverData({ data: { driverId } }),
    staleTime: 5 * 60 * 1000,
  })
