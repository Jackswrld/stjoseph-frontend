import { motion, useReducedMotion } from 'framer-motion'
import SectionHeader from '../common/SectionHeader'
import ClergyCard from './ClergyCard'
import ParishGlance from './ParishGlance'

// Introduces parish clergy alongside a summary of parish facts.
function ClergySection({ clergy, intro, glance, address }) {
  const reduceMotion = useReducedMotion()
  return <section className="about-clergy" id="clergy"><SectionHeader title="The Shepherd of Our Church" /><p className="about-clergy__intro">{intro.split('who shepherd us')[0]}<strong>who shepherd us</strong>{intro.split('who shepherd us')[1]}</p>
    <div className="about-clergy__layout"><div className="about-clergy__grid">{clergy.map((member, index) => <motion.div key={member.id} initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: index * 0.05 }}><ClergyCard clergy={member} /></motion.div>)}</div><ParishGlance glance={glance} address={address} /></div>
  </section>
}
export default ClergySection
