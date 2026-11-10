const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// Wraps fetch so future API calls handle JSON and errors consistently.
export async function apiFetch(path, options = {}) {
  const { headers = {}, ...requestOptions } = options
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...requestOptions,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
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

// Loads gallery categories from the configured API base URL.
export function getGalleryCategories({ signal } = {}) {
  return apiFetch('/gallery/categories/', { signal })
}

// Loads one page of gallery images, optionally filtered by category slug.
export function getGalleryImages({ category, page = 1, signal } = {}) {
  const params = new URLSearchParams({ page: String(page) })
  if (category) params.set('category', category)
  return apiFetch(`/gallery/images/?${params.toString()}`, { signal })
}
