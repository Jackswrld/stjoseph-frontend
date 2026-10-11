import { motion, useReducedMotion } from 'framer-motion'
import SectionHeader from '../common/SectionHeader'
import SocietyCard from '../common/SocietyCard'

// Highlights parish societies and community groups.
function SocietiesSection({ societies }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className="societies-section"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      <SectionHeader
        eyebrow="Communities"
        title="Our Societies & Communities"
        actionLabel="View All Societies"
        actionUrl="/societies"
      />
      <div className="societies-section__grid">
        {societies.map((society) => (
          <SocietyCard key={society.id} society={society} />
        ))}
      </div>
    </motion.section>
  )
}

export default SocietiesSection
