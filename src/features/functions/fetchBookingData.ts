import { z } from 'zod'

import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'
import { queryOptions } from '@tanstack/react-query'

import { createApiClient } from '../api-client'
import type { Driver } from '#/types/drivers.ts'

const fetchBookingData = createServerFn({
  method: 'GET',
})
  .validator(
    z.object({
      bookingId: z.uuid(),
    }),
  )
  .handler(async ({ data }) => {
    const cookie = getRequestHeader('cookie')

    return createApiClient<Driver>(`/api/bookings/${data.bookingId}`, {
      headers: cookie ? { cookie } : undefined,
    })
  })

export const bookingDataOptions = (bookingId: string) =>
  queryOptions({
    queryKey: ['bookings', 'detail', bookingId],
    queryFn: () => fetchBookingData({ data: { bookingId } }),
    staleTime: 5 * 60 * 1000,
  })
