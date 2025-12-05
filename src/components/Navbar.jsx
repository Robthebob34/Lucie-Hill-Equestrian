import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react'

/**
 * Navigation Component
 * Responsive navigation with mobile menu and sticky header
 */
function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dressage', path: '/dressage' },
    { name: 'Riding Lessons', path: '/courses' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Top bar with contact info */}
      <div className="bg-forest-800 text-white py-2 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+61413417915" className="flex items-center gap-2 hover:text-cream-200 transition-colors">
              <Phone size={14} />
              <span>+61 413 417 915</span>
            </a>
            <a href="mailto:hill.lucie@gmail.com" className="flex items-center gap-2 hover:text-cream-200 transition-colors">
              <Mail size={14} />
              <span>hill.lucie@gmail.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span>Mon - Sat: 7:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="/logo.jpg" 
                alt="Lucie Hill Equestrian" 
                className="h-14 w-14 rounded-full object-cover shadow-md"
              />
              <div className="hidden sm:block">
                <h1 className="font-serif text-xl font-bold text-forest-800">Lucie Hill</h1>
                <p className="text-xs text-saddle-600 tracking-wider uppercase">Equestrian</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-forest-700 bg-forest-50'
                      : 'text-gray-700 hover:text-forest-700 hover:bg-forest-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Book Now Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/booking"
                className="btn-primary"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-forest-700 bg-forest-50'
                      : 'text-gray-700 hover:text-forest-700 hover:bg-forest-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/booking"
                className="btn-primary mt-4"
              >
                Book Now
              </Link>
              
              {/* Mobile Contact Info */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <a href="tel:+61413417915" className="flex items-center gap-2 text-gray-600 py-2">
                  <Phone size={16} />
                  <span>+61 413 417 915</span>
                </a>
                <a href="mailto:hill.lucie@gmail.com" className="flex items-center gap-2 text-gray-600 py-2">
                  <Mail size={16} />
                  <span>hill.lucie@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
