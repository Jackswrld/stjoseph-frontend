import { ArrowRight, CalendarDays } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

const icons = {
  calendar: CalendarDays,
  arrow: ArrowRight,
}

function handleAnchorClick(event, target) {
  if (!target?.startsWith('#')) return

  event.preventDefault()
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Renders a reusable image hero for inner pages with optional actions and quote.
function PageHero({ image, eyebrow, title, subtitle, buttons = [], quote, showQuoteOnMobile = false }) {
  const reduceMotion = useReducedMotion()
  const item = reduceMotion
    ? {}
    : {
        hidden: { opacity: 0, y: 18 },
        visible: { opacity: 1, y: 0 },
      }

  return (
    <section className="page-hero">
      <img src={image} alt="" aria-hidden="true" />
      <div className="page-hero__overlay" />
      <div className={`page-hero__inner${showQuoteOnMobile ? ' page-hero__inner--quote-mobile' : ''}`}>
        <motion.div
          className="page-hero__content"
          initial={reduceMotion ? false : 'hidden'}
          animate="visible"
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.p className="page-hero__eyebrow" variants={item}>
            {eyebrow}
          </motion.p>
          <motion.h1 variants={item}>{title}</motion.h1>
          <motion.p className="page-hero__subtitle" variants={item}>
            {subtitle}
          </motion.p>
          <motion.div className="page-hero__actions" variants={item}>
            {buttons.map((button) => {
              const LeadingIcon = button.icon ? icons[button.icon] : null
              const className = `button button--${button.variant || 'gold'}`
              const content = (
                <>
                  {LeadingIcon && <LeadingIcon size={18} />}
                  {button.label}
                  <ArrowRight size={18} />
                </>
              )

              if (button.href) {
                return (
                  <a
                    className={className}
                    href={button.href}
                    key={button.label}
                    onClick={(event) => handleAnchorClick(event, button.href)}
                  >
                    {content}
                  </a>
                )
              }

              return (
                <Link className={className} to={button.to} key={button.label}>
                  {content}
                </Link>
              )
            })}
          </motion.div>
        </motion.div>

        {quote && (
          <blockquote className="page-hero__quote">
            "{quote.text}"
            <cite>{quote.source}</cite>
          </blockquote>
        )}
      </div>
    </section>
  )
}

export default PageHero
