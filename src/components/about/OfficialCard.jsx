import { Phone } from 'lucide-react'
import Avatar from '../common/Avatar'

// Displays an official's name, parish role, portrait and tap-to-call number.
function OfficialCard({ official }) {
  return <article className="official-card"><Avatar name={official.full_name} photo={official.photo} /><h3>{official.full_name}</h3><p>{official.role_title}</p><a href={`tel:${official.phone.replaceAll(' ', '')}`} aria-label={`Call ${official.full_name}`}><Phone size={14} />{official.phone}</a></article>
}
export default OfficialCard
