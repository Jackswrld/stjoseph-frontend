import { galleryPreview } from '../data/mockData'

// TODO: when the gallery endpoint exists, replace the body with a fetch through src/services/api.js (VITE_API_BASE_URL), using AbortController, and keep the same return shape.
// Provides the current gallery preview data and an API-ready retry shape.
function useGalleryPreview() {
  return { photos: galleryPreview, loading: false, error: null, retry: () => {} }
}

export default useGalleryPreview
