import { motion, useReducedMotion } from 'framer-motion'
import SacramentCard from './SacramentCard'

// Lists sacramental schedules and parish services.
function SacramentsSection({ sacraments }) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="sacraments-section" id="sacraments" aria-labelledby="sacraments-title">
      <motion.div
        className="sacraments-section__header"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <div className="sacraments-section__title-row">
          <h2 id="sacraments-title">Sacraments & Parish Services</h2>
          <span aria-hidden="true" />
        </div>
        <p>
          The Church offers many sacraments and services to help you grow in faith and live as a disciple of Christ.
        </p>
      </motion.div>

      <motion.div
        className="sacraments-section__grid"
        initial={reduceMotion ? false : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {sacraments.map((sacrament) => (
          <motion.div
            key={sacrament.id}
            variants={reduceMotion ? {} : { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
          >
            <SacramentCard sacrament={sacrament} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default SacramentsSection
