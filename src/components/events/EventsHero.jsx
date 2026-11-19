import { motion, useReducedMotion } from 'framer-motion'
import heroImage from '../../assets/images/events-hero.png'

// Introduces the Events page with its parish photography and heading.
function EventsHero({ eyebrow, title, subtitle }) {
  const reduceMotion = useReducedMotion()
  const variants = reduceMotion ? {} : {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, staggerChildren: 0.08 } },
  }
  return (
    <section className="events-hero" aria-labelledby="events-title">
      <img className="events-hero__image" src={heroImage} alt="" />
      <div className="events-hero__overlay" />
      <motion.div className="events-hero__content" initial={reduceMotion ? false : 'hidden'} animate="visible" variants={variants}>
        <motion.p variants={variants}>{eyebrow}</motion.p>
        <motion.h1 id="events-title" variants={variants}>{title}</motion.h1>
        <motion.p className="events-hero__subtitle" variants={variants}>{subtitle}</motion.p>
      </motion.div>
    </section>
  )
}

export default EventsHero
