// Displays a compact empty or error message with an optional recovery action.
function GalleryMessage({ message, actionLabel, onAction }) {
  return (
    <div className="gallery-message" role="status">
      <p>{message}</p>
      {actionLabel && onAction && (
        <button className="gallery-message__button" type="button" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default GalleryMessage
