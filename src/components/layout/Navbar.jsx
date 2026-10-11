import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, Search, X } from 'lucide-react'
import logo from '../../assets/images/Logo.png'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Mass & Sacraments', path: '/mass-sacraments' },
  { label: 'Parish News', path: '/parish-news' },
  { label: 'Societies', path: '/societies' },
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

// Shows the desktop nav and the mobile menu trigger.
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeMenu = () => setIsOpen(false)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link className="navbar__brand" to="/" onClick={closeMenu}>
          <img src={logo} alt="St. Joseph Catholic Church logo" />
          <span>St. Joseph Catholic Church</span>
        </Link>

        <nav className="navbar__links" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar__actions">
          <button className="navbar__icon-button" type="button" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="navbar__login" type="button">
            Member Login
          </button>
        </div>

        <button
          className="navbar__menu-button"
          type="button"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className={`navbar__mobile-menu${isOpen ? ' navbar__mobile-menu--open' : ''}`}>
        {navLinks.map((link) => (
          <NavLink key={link.path} to={link.path} onClick={closeMenu}>
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}

export default Navbar
