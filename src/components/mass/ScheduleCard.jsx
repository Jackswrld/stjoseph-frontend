import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

// Shows one schedule group with collapsible rows on small screens.
function ScheduleCard({ title, rows, icon: Icon }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <article className="schedule-card">
      <button
        className="schedule-card__header"
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="schedule-card__icon">{Icon && <Icon size={24} />}</span>
        <span className="schedule-card__title">{title}</span>
        <ChevronDown className="schedule-card__chevron" size={22} />
      </button>

      <div className={`schedule-card__rows${isOpen ? ' schedule-card__rows--open' : ''}`}>
        {rows.map((row) => (
          <div className="schedule-card__row" key={`${row.label}-${row.time}`}>
            <span>{row.label}</span>
            <strong>{row.time}</strong>
          </div>
        ))}
      </div>
    </article>
  )
}

export default ScheduleCard
