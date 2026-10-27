import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '../common/SectionHeader'
import LeaderCard from './LeaderCard'

// Introduces current leaders of the parish societies.
function SocietyLeadersSection({ leaders }) {
  return <section className="leaders-panel"><div className="leaders-panel__heading"><SectionHeader title="Current Leaders of Our Societies" /><Link to="/societies">View All Societies <ArrowRight size={16} /></Link></div><p className="leaders-panel__intro">Our societies are the heartbeat of our parish, working together in service, fellowship and evangelization.</p><div className="leaders-panel__grid">{leaders.map((leader) => <LeaderCard key={leader.id} leader={leader} />)}<LeaderCard more /></div></section>
}
export default SocietyLeadersSection
