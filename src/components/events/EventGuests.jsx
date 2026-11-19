import { User } from 'lucide-react'

// Displays guest names and optional photos, with a silhouette for missing photos.
function EventGuests({ guests = [] }) {
  if (!guests.length) return null
  return (
    <section className="event-modal__section event-guests" aria-labelledby="event-guests-title">
      <h3 id="event-guests-title">Special Guests</h3>
      <ul className="event-guests__list">
        {guests.map((guest, index) => <li className="event-guests__card" key={`${guest.name}-${index}`}>
          {guest.photo ? <img src={guest.photo} alt="" /> : <span className="event-guests__placeholder"><User size={30} aria-hidden="true" /></span>}
          <div><h4>{guest.name}</h4>{guest.subtitle && <p>{guest.subtitle}</p>}</div>
        </li>)}
      </ul>
    </section>
  )
}

export default EventGuests
