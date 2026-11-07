import { createServerFn } from '@tanstack/react-start'
import { getRequestHeader } from '@tanstack/react-start/server'

import { createApiClient } from '../api-client'

import { queryOptions } from '@tanstack/react-query'
import type { BookingList } from '#/types/bookings.ts'

const fetchBookings = createServerFn({
  method: 'GET',
}).handler(async () => {
  const cookie = getRequestHeader('cookie')

  return createApiClient<BookingList>('/api/bookings/list', {
    headers: cookie ? { cookie } : undefined,
  })
})

export const bookingsQueryOptions = queryOptions({
  queryKey: ['bookings'],
  queryFn: () => fetchBookings(),
  staleTime: 5 * 60 * 1000,
})
