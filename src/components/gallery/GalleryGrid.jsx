import { useReducedMotion } from 'framer-motion'
import GalleryCard from './GalleryCard'

// Renders the gallery photo list or its eight loading placeholders.
function GalleryGrid({ photos, loading, onOpen }) {
  const reduceMotion = useReducedMotion()

  if (loading) {
    return (
      <ul className="gallery-grid gallery-grid--loading" aria-label="Loading photos" aria-busy="true">
        {Array.from({ length: 8 }, (_, index) => (
          <li className="gallery-grid__skeleton" key={index} aria-hidden="true" />
        ))}
      </ul>
    )
  }

  return (
    <ul className="gallery-grid" aria-label="Parish photos">
      {photos.map((photo, index) => (
        <li key={photo.id} data-photo-id={photo.id}>
          <GalleryCard photo={photo} index={index} reduceMotion={reduceMotion} onOpen={onOpen} />
        </li>
      ))}
    </ul>
  )
}

export default GalleryGrid
