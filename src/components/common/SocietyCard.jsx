import { ChevronRight, HeartHandshake, Shield, Sparkles, UsersRound } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const icons = {
  heart: HeartHandshake,
  shield: Shield,
  star: Sparkles,
  users: UsersRound,
}

// Presents a society with icon, tags, meeting time, and affordance.
function SocietyCard({ society }) {
  const reduceMotion = useReducedMotion()
  const Icon = icons[society.icon] || UsersRound

  return (
    <motion.article
      className="society-card"
      whileHover={reduceMotion ? undefined : { y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="society-card__icon">
        <Icon size={24} />
      </div>
      <div className="society-card__content">
        <h3>{society.name}</h3>
        <p>{society.tags.join(' • ')}</p>
        <span>{society.meeting_day_time}</span>
      </div>
      <ChevronRight size={20} />
    </motion.article>
  )
}

export default SocietyCard
