import { Building, CalendarDays, Clock } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import ScheduleCard from './ScheduleCard'

// Groups the Mass and parish office schedules near the hero.
function ScheduleOverview({ schedule }) {
  const reduceMotion = useReducedMotion()
  const cards = [
    { title: 'Sunday Masses', rows: schedule.sunday_masses, icon: CalendarDays },
    { title: 'Weekday Masses', rows: schedule.weekday_masses, icon: Clock },
    { title: 'Office Hours', rows: [{ label: schedule.office_hours.days, time: schedule.office_hours.time }], icon: Building },
  ]

  return (
    <section className="schedule-overview" id="mass-schedule" aria-labelledby="mass-schedule-title">
      <h2 className="sr-only" id="mass-schedule-title">
        Mass Schedule
      </h2>
      <motion.div
        className="schedule-overview__panel"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        {cards.map((card) => (
          <ScheduleCard key={card.title} {...card} />
        ))}
      </motion.div>
    </section>
  )
}

export default ScheduleOverview
