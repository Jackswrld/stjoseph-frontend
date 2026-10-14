import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import MobileTabBar from './MobileTabBar'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

// Wraps every page with shared navigation, footer, and route content.
function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenu = () => setIsMenuOpen((current) => !current)

  return (
    <>
      <ScrollToTop />
      <Navbar isOpen={isMenuOpen} onClose={closeMenu} onToggle={toggleMenu} />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
      <MobileTabBar isMenuOpen={isMenuOpen} onMoreClick={toggleMenu} />
    </>
  )
}

export default Layout
