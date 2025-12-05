import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dressage from './pages/Dressage'
import Courses from './pages/Courses'
import About from './pages/About'
import Services from './pages/Services'
import Testimonials from './pages/Testimonials'
import Booking from './pages/Booking'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'

/**
 * Main App Component
 * Handles routing for all pages of Lucie Hill Equestrian website
 */
function App() {
  return (
    <Routes>
      {/* Public routes with layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="dressage" element={<Dressage />} />
        <Route path="courses" element={<Courses />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="booking" element={<Booking />} />
      </Route>
      
      {/* Admin routes without main layout */}
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  )
}

export default App
