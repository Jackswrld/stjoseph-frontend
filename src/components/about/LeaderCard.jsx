import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Avatar from '../common/Avatar'

// Shows one society leader or a link to browse every society.
function LeaderCard({ leader, more = false }) {
  if (more) return <Link className="leader-card leader-card--more" to="/societies"><span className="leader-card__more-icon">＋</span><strong>More Societies</strong><span>View All <ArrowRight size={14} /></span></Link>
  return <article className="leader-card"><Avatar name={leader.full_name} photo={leader.photo} className="leader-card__avatar" />{!leader.photo && <span className="leader-card__short">{leader.short_name}</span>}<p>{leader.full_name}</p><strong>{leader.leader_name}</strong><span>{leader.leader_role}</span></article>
}
export default LeaderCard
