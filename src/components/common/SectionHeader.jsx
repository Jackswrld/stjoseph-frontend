import { Link } from 'react-router-dom'

// Displays a section title with an optional action link.
function SectionHeader({ eyebrow, title, actionLabel, actionUrl }) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {actionLabel && actionUrl && (
        <Link to={actionUrl} className="section-header__link">
          {actionLabel}
        </Link>
      )}
    </div>
  )
}

export default SectionHeader
