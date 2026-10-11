import { ArrowRight, CalendarDays } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import heroImage from '../../assets/images/home banner.png'

// Renders the full-width home hero with the church image and primary actions.
function Hero() {
  const reduceMotion = useReducedMotion()
  const item = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0 },
      }

  return (
    <section className="hero">
      <img src={heroImage} alt="St. Joseph Catholic Church building" />
      <div className="hero__overlay" />
      <motion.div
        className="hero__content"
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        transition={{ staggerChildren: 0.12 }}
      >
        <motion.p className="hero__label" variants={item}>
          Welcome to
        </motion.p>
        <motion.h1 variants={item}>St. Joseph Catholic Church</motion.h1>
        <motion.p className="hero__subtitle" variants={item}>
          St.Joseph, One Big And Happy Family .
        </motion.p>
        <motion.div className="hero__actions" variants={item}>
          <Link className="button button--gold" to="/mass-sacraments">
            <CalendarDays size={18} />
            View Mass Times
          </Link>
          <Link className="button button--outline-light" to="/about">
            Explore Our Church
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </motion.div>
      <blockquote className="hero__quote">
        "May St. Joseph, our patron, always guide us."
        <cite>- St. Joseph Catholic Church</cite>
      </blockquote>
    </section>
  )
}

export default Hero
