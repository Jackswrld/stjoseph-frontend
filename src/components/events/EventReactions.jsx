import { Heart, ThumbsUp } from 'lucide-react'
import { formatCount } from '../../utils/eventFormat'

// Shows the placeholder reaction controls for event cards.
function EventReactions({ counts, activeKinds = [], onToggle }) {
  // TODO(reactions): wire to the API after Member Login exists.
  const reactions = [
    { kind: 'like', label: 'Like', Icon: ThumbsUp },
    { kind: 'love', label: 'Love', Icon: Heart },
    { kind: 'pray', label: 'Pray', emoji: '🙏' },
  ]
  return (
    <div className="event-reactions" aria-label="Event reactions">
      {reactions.map(({ kind, label, Icon, emoji }) => (
        <button key={kind} className={`event-reactions__button event-reactions__button--${kind}`} type="button"
          aria-label={`${label}, ${counts[kind]} reactions`} aria-pressed={activeKinds.includes(kind)} onClick={() => onToggle(kind)}>
          {Icon ? <Icon size={17} aria-hidden="true" /> : <span aria-hidden="true">{emoji}</span>}
          <span>{formatCount(counts[kind])}</span>
        </button>
      ))}
    </div>
  )
}

export default EventReactions
