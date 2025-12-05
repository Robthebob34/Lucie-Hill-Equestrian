import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Layout Component
 * Wraps all public pages with navigation and footer
 */
function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
