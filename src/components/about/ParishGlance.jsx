import { ArrowRight, CalendarDays, Church, MapPin, Shield } from 'lucide-react'
import { Link } from 'react-router-dom'
import historyPhoto from '../../assets/images/history banner.png'

// Summarizes parish facts and links to the short parish history page.
function ParishGlance({ glance, address }) {
  const rows = [[CalendarDays, 'Founded', glance.founded_year], [Church, 'Patron Saint', glance.patron_saint], [MapPin, 'Location', address], [Shield, 'Archdiocese', glance.archdiocese]]
  return <aside className="parish-glance"><img className="parish-glance__photo" src={historyPhoto} alt="St. Joseph Catholic Church" /><div className="parish-glance__content"><h3>Our Parish at a Glance</h3><div className="parish-glance__rows">{rows.map(([Icon, label, value]) => <p key={label}><Icon size={17} aria-hidden="true" /><span>{label}<strong>{value}</strong></span></p>)}</div><Link to="/about/history" className="parish-glance__history">Our History <ArrowRight size={17} /></Link></div></aside>
}
export default ParishGlance
