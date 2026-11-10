import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { buildLightboxImageProps, formatGalleryDate } from '../../utils/galleryHelpers'

// Opens a native modal dialog for viewing and navigating loaded gallery photos.
function GalleryLightbox({ images, index, onClose, onIndexChange }) {
  const dialogRef = useRef(null)
  const currentPhotoRef = useRef(images[index])
  const openerRef = useRef(null)
  const [failedPhotoId, setFailedPhotoId] = useState(null)
  const photo = images[index]

  const changeIndex = useCallback((nextIndex) => {
    const nextPhoto = images[nextIndex]
    if (nextPhoto) currentPhotoRef.current = nextPhoto
    onIndexChange(nextIndex)
  }, [images, onIndexChange])

  useEffect(() => {
    currentPhotoRef.current = photo
  }, [photo])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    openerRef.current = document.activeElement
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    if (!dialog.open) {
      dialog.showModal()
    } else {
      dialog.querySelector('.gallery-lightbox__close')?.focus()
    }

    const previousOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'

    return () => {
      dialog.removeEventListener('close', handleClose)
      document.documentElement.style.overflow = previousOverflow

      const currentPhoto = currentPhotoRef.current
      const card = currentPhoto
        ? Array.from(document.querySelectorAll('[data-photo-id]')).find(
            (element) => element.getAttribute('data-photo-id') === String(currentPhoto.id),
          )
        : null
      const cardButton = card?.querySelector('button')
      const returnTarget = cardButton || openerRef.current
      if (returnTarget instanceof HTMLElement && returnTarget.isConnected) returnTarget.focus()
    }
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined

    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.altKey || event.metaKey) return
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        if (index > 0) changeIndex(index - 1)
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        if (index < images.length - 1) changeIndex(index + 1)
      }
    }

    dialog.addEventListener('keydown', handleKeyDown)
    return () => dialog.removeEventListener('keydown', handleKeyDown)
  }, [images.length, index, changeIndex])

  if (!photo) return null

  const imageProps = buildLightboxImageProps(photo.image_url)

  return (
    <dialog
      className="gallery-lightbox"
      ref={dialogRef}
      aria-label="Photo viewer"
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close()
      }}
    >
      <div className="gallery-lightbox__content">
        <button
          className="gallery-lightbox__icon-button gallery-lightbox__close"
          type="button"
          aria-label="Close photo viewer"
          onClick={() => dialogRef.current?.close()}
        >
          <X size={22} aria-hidden="true" />
        </button>
        <div className="gallery-lightbox__image-area">
          {failedPhotoId === photo.id ? (
            <p className="gallery-lightbox__failure">This photo could not be loaded.</p>
          ) : (
            <img
              {...imageProps}
              src={imageProps.src}
              alt={photo.alt_text || photo.title}
              onError={() => setFailedPhotoId(photo.id)}
            />
          )}
          <button
            className="gallery-lightbox__icon-button gallery-lightbox__previous"
            type="button"
            aria-label="Previous photo"
            aria-disabled={index === 0}
            onClick={() => index > 0 && changeIndex(index - 1)}
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>
          <button
            className="gallery-lightbox__icon-button gallery-lightbox__next"
            type="button"
            aria-label="Next photo"
            aria-disabled={index === images.length - 1}
            onClick={() => index < images.length - 1 && changeIndex(index + 1)}
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>
        <div className="gallery-lightbox__caption" aria-live="polite">
          <h2>{photo.title}</h2>
          <p>
            <time dateTime={photo.date_taken}>{formatGalleryDate(photo.date_taken)}</time>
            {photo.category?.name && <span>{photo.category.name}</span>}
          </p>
        </div>
      </div>
    </dialog>
  )
}

export default GalleryLightbox
