import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import EventCard from '../components/events/EventCard'
import EventModal from '../components/events/EventModal'
import EventsHero from '../components/events/EventsHero'
import EventsStayUpdated from '../components/events/EventsStayUpdated'
import { getEvents } from '../services/api'
import { mockReactionCounts } from '../data/mockData'

// Loads upcoming parish events and renders their cards with retry and pagination states.
function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const openerRef = useRef(null)
  const [events, setEvents] = useState([])
  const [next, setNext] = useState(null)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState(false)
  const [moreError, setMoreError] = useState(false)
  const showReactions = import.meta.env.VITE_SHOW_REACTIONS === 'true'
  const eventSlug = searchParams.get('event')
  const listItem = events.find((event) => event.slug === eventSlug)

  const loadFirstPage = useCallback(async (signal) => {
    setLoading(true)
    setError(false)
    try {
      const response = await getEvents({ page: 1, signal })
      setEvents(response.results)
      setNext(response.next)
      setCount(response.count)
      setPage(1)
    } catch (requestError) {
      if (requestError.name !== 'AbortError') setError(true)
    } finally {
      if (!signal?.aborted) setLoading(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadFirstPage(controller.signal)
    return () => controller.abort()
  }, [loadFirstPage])

  async function loadMore() {
    const nextPage = page + 1
    setLoadingMore(true)
    setMoreError(false)
    try {
      const response = await getEvents({ page: nextPage })
      setEvents((current) => [...current, ...response.results])
      setNext(response.next)
      setCount(response.count)
      setPage(nextPage)
    } catch {
      setMoreError(true)
    } finally {
      setLoadingMore(false)
    }
  }

  const onViewDetails = useCallback((slug) => {
    openerRef.current = document.activeElement
    setSearchParams((current) => {
      const updated = new URLSearchParams(current)
      updated.set('event', slug)
      return updated
    })
  }, [setSearchParams])
  const closeEvent = useCallback(() => {
    setSearchParams((current) => {
      const updated = new URLSearchParams(current)
      updated.delete('event')
      return updated
    })
  }, [setSearchParams])
  const onToggleReaction = () => {}

  return (
    <main className="events-page">
      <EventsHero eyebrow="OUR EVENTS" title="Events" subtitle="Be part of our church activities, programs and special celebrations." />
      <AnimatePresence><EventModal slug={eventSlug} listItem={listItem} onClose={closeEvent} openerRef={openerRef} /></AnimatePresence>
      <section className="events-page__content" aria-labelledby="events-list-title">
        <div className="events-page__heading"><p>GATHER, CELEBRATE, SERVE</p><h2 id="events-list-title">Upcoming Events</h2></div>
        {loading ? <div className="events-page__grid" aria-busy="true" aria-label="Loading events">{Array.from({ length: 6 }, (_, index) => <div className="event-card-skeleton" key={index} />)}</div> : null}
        {!loading && error && <div className="events-page__message" role="alert"><p>We couldn't load events. Please try again.</p><button type="button" onClick={() => loadFirstPage()}>Try again</button></div>}
        {!loading && !error && count === 0 && <p className="events-page__empty">No upcoming events right now. Please check back soon.</p>}
        {!loading && !error && events.length > 0 && <>
          <div className="events-page__grid">
            {events.map((event, index) => <EventCard key={event.id} event={event} index={index} reactionCounts={mockReactionCounts} onToggleReaction={onToggleReaction} onViewDetails={onViewDetails} showReactions={showReactions} />)}
          </div>
          {moreError && <p className="events-page__inline-error" role="alert">We couldn't load more events. Please try again.</p>}
          {next && <button className="events-page__load-more" type="button" onClick={loadMore} disabled={loadingMore}>{loadingMore ? 'Loading…' : 'Load more events'}</button>}
        </>}
        <EventsStayUpdated />
      </section>
    </main>
  )
}

export default EventsPage
