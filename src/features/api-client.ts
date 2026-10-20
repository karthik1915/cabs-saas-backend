const API_BASE_URL = process.env.PUBLIC_BETTER_AUTH_URL

interface ApiRequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown
}

export async function createApiClient<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error('PUBLIC_BETTER_AUTH_URL is not configured')
  }

  const headers = new Headers(options.headers)

  if (options.body !== undefined && !headers.has('content-type')) {
    headers.set('content-type', 'application/json')
  }

  const response = await fetch(
    `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`,
    {
      ...options,
      headers,
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: 'no-store',
    },
  )

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}
