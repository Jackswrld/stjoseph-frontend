import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import MobileTabBar from './MobileTabBar'
import Navbar from './Navbar'
import ScrollToTop from './ScrollToTop'

// Wraps every page with shared navigation, footer, and route content.
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
      <MobileTabBar />
    </>
  )
}

export default Layout
