import { Church, Home, Info, Menu, Newspaper } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'About', path: '/about', icon: Info },
  { label: 'Mass', path: '/mass-sacraments', icon: Church },
  { label: 'News', path: '/parish-news', icon: Newspaper },
]

// Gives mobile users fixed access to the most important pages.
function MobileTabBar({ isMenuOpen, onMoreClick }) {
  return (
    <nav className="mobile-tab-bar" aria-label="Mobile quick navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon
        return (
          <NavLink key={tab.path} to={tab.path} end={tab.path === '/'}>
            <Icon size={20} />
            <span>{tab.label}</span>
          </NavLink>
        )
      })}
      <button
        className={isMenuOpen ? 'active' : ''}
        type="button"
        aria-label="Open more menu"
        aria-expanded={isMenuOpen}
        onClick={onMoreClick}
      >
        <Menu size={20} />
        <span>More</span>
      </button>
    </nav>
  )
}

export default MobileTabBar
