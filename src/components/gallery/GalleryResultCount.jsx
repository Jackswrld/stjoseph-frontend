// Shows the number of photos currently displayed and the API total.
function GalleryResultCount({ shown, count }) {
  const noun = count === 1 ? 'photo' : 'photos'

  return (
    <p className="gallery-result-count" aria-live="polite" aria-atomic="true">
      Showing {shown} of {count} {noun}
    </p>
  )
}

export default GalleryResultCount
