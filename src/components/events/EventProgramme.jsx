import { formatTime } from '../../utils/eventFormat'

// Renders the API-sorted event programme as a vertical timeline.
function EventProgramme({ programme = [] }) {
  if (!programme.length) return null
  return (
    <section className="event-modal__section event-programme" aria-labelledby="event-programme-title">
      <h3 id="event-programme-title">Programme of Activities</h3>
      <ol className="event-programme__list">
        {programme.map((item, index) => <li className="event-programme__item" key={`${item.time}-${index}`}><time>{formatTime(item.time)}</time><span aria-hidden="true"> — </span><span>{item.title}</span></li>)}
      </ol>
    </section>
  )
}

export default EventProgramme
