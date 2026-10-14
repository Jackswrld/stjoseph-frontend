import { CalendarDays, Clock, MapPin, Phone, Radio } from 'lucide-react'
import { Link } from 'react-router-dom'

const icons = {
  calendar: CalendarDays,
  map: MapPin,
  clock: Clock,
  phone: Phone,
}

// Shows desktop contact highlights and the mobile Mass summary.
function InfoBar({ items, mass, schedule }) {
  return (
    <section className="info-bar" aria-label="Parish information">
      <div className="info-bar__mobile-card">
        <div>
          <p>Today's Mass</p>
          <h2>{mass.time}</h2>
          <span>{mass.date_label}</span>
        </div>
        <div>
          <span className="info-bar__live">
            <Radio size={13} />
            {mass.status}
          </span>
          <p>{mass.location}</p>
        </div>
      </div>

      <div className="info-bar__mobile-strip">
        <span>Church Opens 6:00 AM</span>
        <span>Daily Mass {schedule.weekday_masses[0].time}</span>
        <span>Office Hours {schedule.office_hours.time}</span>
      </div>

      <div className="info-bar__desktop">
        {items.map((item) => {
          const Icon = icons[item.icon] || CalendarDays
          return (
            <article className="info-bar__item" key={item.id}>
              <div className="info-bar__icon">
                <Icon size={24} />
              </div>
              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <Link to={item.link_url}>{item.link_label}</Link>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default InfoBar
