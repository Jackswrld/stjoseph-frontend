import { CalendarDays, Church, Home, Info, UsersRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const tabs = [
  { label: 'Home', path: '/', icon: Home },
  { label: 'About', path: '/about', icon: Info },
  { label: 'Mass', path: '/mass-sacraments', icon: Church },
  { label: 'Societies', path: '/societies', icon: UsersRound },
  { label: 'Events', path: '/events', icon: CalendarDays },
]

// Gives mobile users fixed access to the most important pages.
function MobileTabBar() {
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
    </nav>
  )
}

export default MobileTabBar
