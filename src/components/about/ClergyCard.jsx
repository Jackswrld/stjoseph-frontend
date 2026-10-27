import { ArrowRight, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Avatar from '../common/Avatar'

// Displays one clergy bio with desktop and compact mobile expansion controls.
function ClergyCard({ clergy }) {
  const [open, setOpen] = useState(false)
  return <article className={`clergy-card clergy-card--${clergy.role_type}`}>
    <div className="clergy-card__photo"><Avatar name={clergy.full_name} photo={clergy.photo} /><span className="clergy-card__badge">{clergy.badge_label}</span></div>
    <div className="clergy-card__details"><h3>{clergy.full_name}</h3><p className="clergy-card__role">{clergy.role_title}</p>
      <p className={`clergy-card__bio${open ? ' clergy-card__bio--open' : ''}`}>{clergy.bio}</p>
      <button className="clergy-card__desktop-toggle" type="button" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? 'Show Less' : 'Read More'} <ArrowRight size={16} /></button>
    </div>
    <button className="clergy-card__mobile-toggle" type="button" aria-expanded={open} onClick={() => setOpen(!open)}><span><span className="clergy-card__mobile-name">{clergy.full_name}</span><span className="clergy-card__role">{clergy.role_title}</span></span><ChevronDown size={20} /></button>
    <div className={`clergy-card__mobile-bio${open ? ' clergy-card__mobile-bio--open' : ''}`}><p>{clergy.bio}</p></div>
  </article>
}
export default ClergyCard
