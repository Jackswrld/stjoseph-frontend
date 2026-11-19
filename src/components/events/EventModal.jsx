import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { CalendarDays, Clock3, Info, MapPin, Share2, X } from 'lucide-react'
import { downloadIcs } from '../../utils/eventCalendar'
import { formatLongDate, formatTimeRange } from '../../utils/eventFormat'
import { getEventDetail } from '../../services/api'
import useShareEvent from '../../hooks/useShareEvent'
import EventHighlights from './EventHighlights'
import EventProgramme from './EventProgramme'
import EventTeam from './EventTeam'
import EventGuests from './EventGuests'
import './_event-modal.scss'

// Loads and presents full event details in an accessible, URL-driven dialog.
function EventModal({ slug, listItem, onClose, openerRef }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [detail, setDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const reduceMotion = useReducedMotion()
  const event = useMemo(() => ({ ...(listItem || {}), ...(detail || {}) }), [listItem, detail])
  const shareTarget = event.slug ? event : { slug, title: '', tagline: '' }
  const { share, status } = useShareEvent(shareTarget)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const updateViewport = () => setIsMobile(media.matches)
    media.addEventListener('change', updateViewport)
    return () => media.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    setDetail(null)
    if (!slug) {
      setLoading(false)
      setError(false)
      return () => controller.abort()
    }
    setLoading(true)
    setError(false)
    getEventDetail(slug, { signal: controller.signal })
      .then(setDetail)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [slug, attempt])

  useEffect(() => {
    if (!slug) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function onKeyDown(eventKey) {
      if (eventKey.key === 'Escape') {
        eventKey.preventDefault()
        onClose()
      }
      if (eventKey.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (eventKey.shiftKey && document.activeElement === first) {
        eventKey.preventDefault()
        last.focus()
      } else if (!eventKey.shiftKey && document.activeElement === last) {
        eventKey.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (openerRef.current?.isConnected) openerRef.current.focus()
    }
  }, [onClose, openerRef])

  const backdropVariants = reduceMotion ? { initial: {}, animate: {}, exit: {} } : {
    initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.2 } }, exit: { opacity: 0, transition: { duration: 0.18 } },
  }
  const dialogVariants = reduceMotion ? { initial: {}, animate: {}, exit: {} } : isMobile ? {
    initial: { opacity: 0, y: '100%' }, animate: { opacity: 1, y: 0, transition: { duration: 0.22 } }, exit: { opacity: 0, y: '100%', transition: { duration: 0.18 } },
  } : {
    initial: { opacity: 0, scale: 0.97, y: 10 }, animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.22 } }, exit: { opacity: 0, scale: 0.98, y: 5, transition: { duration: 0.18 } },
  }

  return createPortal(
    <AnimatePresence>
      {slug && <motion.div key="event-modal" className="event-modal__backdrop" variants={backdropVariants} initial="initial" animate="animate" exit="exit" onMouseDown={(eventClick) => { if (eventClick.target === eventClick.currentTarget) onClose() }}>
        <motion.section className="event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title" ref={dialogRef} variants={dialogVariants} initial="initial" animate="animate" exit="exit">
          <button ref={closeRef} className="event-modal__close" type="button" aria-label="Close event details" onClick={onClose}><X size={21} aria-hidden="true" /></button>
          <div className="event-modal__scroll">
            <header className="event-modal__hero" style={event.banner_image || event.image ? { backgroundImage: `linear-gradient(90deg, rgba(15,35,71,.9), rgba(15,35,71,.35)), url("${event.banner_image || event.image}")` } : undefined}>
              {event.title ? <div className="event-modal__hero-content">
                {event.badge && <span className="event-modal__badge">{event.badge}</span>}
                <h2 id="event-modal-title">{event.title}</h2>
                {event.tagline && <p>{event.tagline}</p>}
              </div> : <><h2 className="sr-only" id="event-modal-title">Loading event details</h2><div className="event-modal__hero-skeleton" aria-hidden="true" /></>}
            </header>
            {event.title && <div className="event-modal__info-bar">
              {event.date && <div className="event-modal__info"><CalendarDays size={18} aria-hidden="true" /><span>{formatLongDate(event.date)}</span></div>}
              {(event.is_all_day || event.start_time || event.end_time) && <div className="event-modal__info"><Clock3 size={18} aria-hidden="true" /><span>{formatTimeRange(event.start_time, event.end_time, event.is_all_day)}</span></div>}
              {event.location && <div className="event-modal__info"><MapPin size={18} aria-hidden="true" /><span>{event.location}</span></div>}
              <div className="event-modal__info-actions">
                {/* TODO(interested): "I'm Interested" is added after Member Login exists. */}
                <button className="event-modal__calendar" type="button" onClick={() => downloadIcs(event)}><CalendarDays size={17} aria-hidden="true" />Add to Calendar</button>
                <button className="event-modal__share-icon" type="button" aria-label="Share event" onClick={share}><Share2 size={18} aria-hidden="true" /></button>
                <ShareStatus status={status} />
              </div>
            </div>}
          <div className="event-modal__body" aria-busy={loading}>
            {loading && <div className="event-modal__skeleton" aria-label="Loading event details">{[1, 2, 3, 4, 5].map((row) => <span key={row} />)}</div>}
            {!loading && error && <div className="event-modal__error" role="alert"><p>We couldn't load the full details.</p><button type="button" onClick={() => setAttempt((value) => value + 1)}>Try again</button></div>}
            {!loading && !error && <div className="event-modal__columns">
              <div className="event-modal__left">
                {event.description && <section className="event-modal__section"><h3>About This Event</h3><p className="event-modal__copy">{event.description}</p></section>}
                <EventHighlights highlights={event.highlights} />
                <EventProgramme programme={event.programme} />
              </div>
              <div className="event-modal__right">
                <EventTeam team={event.team} />
                <EventGuests guests={event.guests} />
                {event.important_info && <section className="event-modal__section event-modal__important"><h3><Info size={19} aria-hidden="true" />Important Information</h3><p>{event.important_info}</p></section>}
              </div>
            </div>}
          </div>
          </div>
        </motion.section>
      </motion.div>}
    </AnimatePresence>,
    document.body,
  )
}

// Announces the latest share or copy result to assistive technology.
function ShareStatus({ status }) {
  if (status === 'idle' || status === 'shared') return <span className="event-modal__share-status" aria-live="polite">{status === 'shared' ? 'Shared' : ''}</span>
  return <span className="event-modal__share-status" aria-live="polite">{status === 'copied' ? 'Link copied' : "Couldn't copy the link"}</span>
}

export default EventModal
