import { ChevronRight, MapPin } from 'lucide-react'

// Displays a compact event row with date, time, location, and chevron.
function EventItem({ event }) {
  return (
    <article className="event-item">
      <div className="event-item__date" aria-label={`${event.month} ${event.day}`}>
        <span>{event.month}</span>
        <strong>{event.day}</strong>
      </div>
      <div className="event-item__content">
        <h3>{event.title}</h3>
        <p>
          {event.start_time} - {event.end_time}
        </p>
        <span>
          <MapPin size={14} />
          {event.location}
        </span>
      </div>
      <ChevronRight className="event-item__chevron" size={20} />
    </article>
  )
}

export default EventItem
