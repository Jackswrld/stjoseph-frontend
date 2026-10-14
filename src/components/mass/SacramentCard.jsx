import {
  Baby,
  BookOpen,
  BookText,
  Church,
  Cross,
  HandHeart,
  HeartHandshake,
  Library,
  MessageCircleHeart,
  UsersRound,
} from 'lucide-react'

const icons = {
  adoration: Church,
  'communion-sick': HandHeart,
  confession: MessageCircleHeart,
  catechism: BookOpen,
  rica: UsersRound,
  'infant-baptism': Baby,
  baptism: Cross,
  'bible-study': BookText,
  'marriage-classes': HeartHandshake,
  library: Library,
}

// Presents one sacrament or parish service with its schedule.
function SacramentCard({ sacrament }) {
  const Icon = icons[sacrament.slug] || Church

  return (
    <article className="sacrament-card">
      <span className="sacrament-card__icon">
        <Icon size={22} />
      </span>
      <div className="sacrament-card__content">
        <h3>{sacrament.name}</h3>
        <div className="sacrament-card__schedule">
          {sacrament.schedule.map((item) => (
            <p key={`${sacrament.slug}-${item.label || item.text}`}>
              {item.label && <strong>{item.label}</strong>}
              <span>{item.text}</span>
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}

export default SacramentCard
