// Shows loading, error or empty feedback before rendering a section's content.
function DataState({ loading, error, retry, empty, children }) {
  if (loading) {
    return <div className="data-state data-state--loading" aria-live="polite" aria-label="Loading">
      <span /><span /><span />
    </div>
  }

  if (error) {
    return <div className="data-state data-state--error" role="alert">
      <p>We couldn’t load this information. {error.message}</p>
      <button type="button" onClick={retry}>Try again</button>
    </div>
  }

  if (empty) return <p className="data-state data-state--empty">Nothing to show yet.</p>
  return children
}

export default DataState
