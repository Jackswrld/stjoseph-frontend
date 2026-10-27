import { motion, useReducedMotion } from 'framer-motion'
import bibleImage from '../../assets/images/liturgical-bible.jpg'
import LiturgicalCalendar from './LiturgicalCalendar'
import ScriptureCycle from './ScriptureCycle'

// Combines the liturgical calendar, Bible image and Sunday reading cycle.
function LiturgicalSection({ banner, scriptureText }) {
  const reduceMotion = useReducedMotion()
  return <motion.section className="liturgical-section" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><div className="liturgical-section__intro" style={{ backgroundImage: `linear-gradient(90deg, rgba(15,35,71,.28), #0f2347 92%), url(${bibleImage})` }}><h2>{banner.heading}</h2><span /><p>{banner.text}</p></div><LiturgicalCalendar /><ScriptureCycle text={scriptureText} /></motion.section>
}
export default LiturgicalSection
