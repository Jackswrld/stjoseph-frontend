import { Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/Logo.png'
import { churchInfo } from '../../data/mockData'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Mass & Sacraments', path: '/mass-sacraments' },
  { label: 'News', path: '/parish-news' },
  { label: 'Contact', path: '/contact' },
]

const ministryLinks = [
  { label: 'Societies', path: '/societies' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Parish Calendar', path: '/events' },
]

// Displays shared parish identity, links, and contact details.
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src={logo} alt="St. Joseph Catholic Church logo" />
          <h2>{churchInfo.name}</h2>
          <p>{churchInfo.tagline}</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          {quickLinks.map((link) => (
            <Link to={link.path} key={link.path}>
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          <h3>Our Ministries</h3>
          {ministryLinks.map((link) => (
            <Link to={link.path} key={`${link.label}-${link.path}`}>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="footer__contact">
          <h3>Contact Us</h3>
          <p>
            <MapPin size={17} />
            {churchInfo.address}
          </p>
          <p>
            <Phone size={17} />
            {churchInfo.phone}
          </p>
          <p>
            <Mail size={17} />
            {churchInfo.email}
          </p>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {year} St. Joseph Catholic Church. All rights reserved.</p>
        <p>Privacy Policy | Terms & Conditions</p>
      </div>
    </footer>
  )
}

export default Footer
