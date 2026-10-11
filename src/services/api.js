const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Wraps fetch so future API calls handle JSON and errors consistently.
export async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message =
      typeof data === 'object' && data?.detail
        ? data.detail
        : `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return data
}
