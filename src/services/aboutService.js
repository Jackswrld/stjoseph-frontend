import { apiFetch } from './api'
import { normalizePerson } from '../utils/people'

// Loads the complete people list and reports when the backend has hidden pages.
export async function fetchPeople({ signal } = {}) {
  const data = await apiFetch('/about/people/', { signal })

  if (data.next !== null) {
    throw new Error('People list is paginated; raise the page size on the backend.')
  }

  return data.results.map(normalizePerson)
}
