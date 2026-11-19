import { getEventIcon } from './eventIcons'

// Renders the event highlight tiles when highlights are available.
function EventHighlights({ highlights = [] }) {
  if (!highlights.length) return null
  return (
    <section className="event-modal__section event-highlights" aria-labelledby="event-highlights-title">
      <h3 id="event-highlights-title">What to Expect</h3>
      <ul className="event-highlights__list">
        {highlights.map((item, index) => {
          const Icon = getEventIcon(item.icon)
          return <li className="event-highlights__tile" key={`${item.label}-${index}`}><Icon size={24} aria-hidden="true" /><span>{item.label}</span></li>
        })}
      </ul>
    </section>
  )
}

export default EventHighlights
