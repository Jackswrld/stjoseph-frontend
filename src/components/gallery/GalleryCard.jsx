import { CalendarDays, Camera } from 'lucide-react'
import { motion } from 'framer-motion'
import { buildImageProps, formatGalleryDate } from '../../utils/galleryHelpers'

// Shows one parish photo and its keyboard-accessible lightbox trigger.
function GalleryCard({ photo, index, reduceMotion, onOpen }) {
  const imageProps = buildImageProps(photo.image_url)
  return (
    <motion.figure
      className="gallery-card"
      onClick={() => onOpen(index)}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: reduceMotion ? 0 : (index % 8) * 0.035 }}
    >
      <img
        {...imageProps}
        alt={photo.alt_text || photo.title}
        loading={index < 4 ? 'eager' : 'lazy'}
        decoding="async"
      />
      <div className="gallery-card__overlay" aria-hidden="true" />
      <Camera className="gallery-card__camera" size={17} aria-hidden="true" />
      <figcaption className="gallery-card__caption">
        <h2>{photo.title}</h2>
        <p>
          <CalendarDays size={14} aria-hidden="true" />
          <time dateTime={photo.date_taken}>{formatGalleryDate(photo.date_taken)}</time>
        </p>
      </figcaption>
      <button
        className="gallery-card__open"
        type="button"
        aria-label={`View larger photo: ${photo.title}`}
        aria-haspopup="dialog"
      />
    </motion.figure>
  )
}

export default GalleryCard
