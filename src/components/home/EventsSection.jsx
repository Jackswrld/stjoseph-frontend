import { motion, useReducedMotion } from 'framer-motion'
import EventItem from '../common/EventItem'
import SectionHeader from '../common/SectionHeader'

// Displays upcoming parish events in a compact panel.
function EventsSection({ events }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.aside
      className="events-section"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      <SectionHeader title="Upcoming Events" actionLabel="View All" actionUrl="/events" />
      <div className="events-section__list">
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </div>
    </motion.aside>
  )
}

export default EventsSection
