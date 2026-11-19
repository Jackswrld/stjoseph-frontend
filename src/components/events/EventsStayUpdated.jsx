import { CalendarDays } from 'lucide-react'

// Shares a static reminder to follow parish event updates.
function EventsStayUpdated() {
  return (
    <aside className="events-stay-updated">
      <span className="events-stay-updated__icon"><CalendarDays size={25} aria-hidden="true" /></span>
      <div><h2>Stay Updated</h2><p>Don't miss out on upcoming events in our parish.</p></div>
    </aside>
  )
}

export default EventsStayUpdated
