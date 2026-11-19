import { ArrowRight, CalendarDays, Clock3, MapPin, Share2 } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { getDateBadge, formatTimeRange } from '../../utils/eventFormat'
import useShareEvent from '../../hooks/useShareEvent'
import EventReactions from './EventReactions'

// Presents an event's date, image, schedule, location, and details action.
function EventCard({ event, onViewDetails, showReactions, reactionCounts, onToggleReaction, index = 0 }) {
  const reduceMotion = useReducedMotion()
  const dateBadge = getDateBadge(event.date)
  const { share, status } = useShareEvent(event)
  return (
    <motion.article className="event-card" initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.2) }}>
      <div className="event-card__media">
        {event.image ? <img src={event.image} alt="" loading="lazy" /> : <div className="event-card__placeholder"><CalendarDays size={36} aria-hidden="true" /></div>}
        <time className="event-card__date" dateTime={event.date}><span>{dateBadge.month}</span><strong>{dateBadge.day}</strong></time>
      </div>
      <div className="event-card__body">
        <h2>{event.title}</h2>
        <p className="event-card__meta"><Clock3 size={16} aria-hidden="true" /><span>{formatTimeRange(event.start_time, event.end_time, event.is_all_day)}</span></p>
        <p className="event-card__meta"><MapPin size={16} aria-hidden="true" /><span>{event.location}</span></p>
        <p className="event-card__summary">{event.summary}</p>
        <div className={`event-card__actions${showReactions ? ' event-card__actions--with-reactions' : ''}`}>
          <div className="event-card__action-row event-card__action-row--details">
            <button className="event-card__details" type="button" onClick={() => onViewDetails(event.slug)}>View Details <ArrowRight size={17} aria-hidden="true" /></button>
            {!showReactions && <ShareButton share={share} status={status} />}
          </div>
          {showReactions && <>
            <div className="event-card__divider" />
            <div className="event-card__action-row event-card__action-row--reactions">
              <EventReactions counts={reactionCounts} activeKinds={[]} onToggle={onToggleReaction} />
              <ShareButton share={share} status={status} />
            </div>
          </>}
        </div>
      </div>
    </motion.article>
  )
}

// Renders the round share control and its live result message.
function ShareButton({ share, status }) {
  return (
    <div className="event-card__share-wrap">
      <button className="event-card__share" type="button" aria-label="Share event" onClick={share}><Share2 size={17} aria-hidden="true" /></button>
      {status !== 'idle' && <span className="event-card__share-status" aria-live="polite">{status === 'copied' ? 'Link copied' : status === 'failed' ? "Couldn't copy the link" : 'Shared'}</span>}
    </div>
  )
}

export default EventCard
