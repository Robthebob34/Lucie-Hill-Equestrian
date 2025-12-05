import { Link } from 'react-router-dom'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Instagram, 
  Youtube,
  ChevronRight
} from 'lucide-react'

/**
 * Footer Component
 * Contains contact information, links, and social media
 */
function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dressage', path: '/dressage' },
    { name: 'Riding Lessons', path: '/courses' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Book Now', path: '/booking' },
  ]

  const services = [
    'Classical Dressage Training',
    'Private Riding Lessons',
    'Group Lessons',
    'Horse Boarding',
    'Competition Preparation',
    'Clinics & Workshops',
  ]

  return (
    <footer className="bg-forest-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.jpg" 
                alt="Lucie Hill Equestrian" 
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-serif text-lg font-bold">Lucie Hill</h3>
                <p className="text-xs text-forest-300 tracking-wider uppercase">Equestrian</p>
              </div>
            </div>
            <p className="text-forest-200 text-sm leading-relaxed mb-6">
              Dedicated to excellence in classical dressage and riding education. 
              We nurture the bond between horse and rider through patient, 
              professional instruction in a welcoming environment.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-forest-800 p-2 rounded-full hover:bg-forest-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-forest-800 p-2 rounded-full hover:bg-forest-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-forest-800 p-2 rounded-full hover:bg-forest-700 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-forest-200 hover:text-white flex items-center gap-2 transition-colors text-sm"
                  >
                    <ChevronRight size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-forest-200 flex items-center gap-2 text-sm">
                    <ChevronRight size={14} />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-forest-200 hover:text-white transition-colors"
              >
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span className="text-sm">
                  152 Bay Rd<br />
                  Mount Gambier, SA 5290<br />
                  Australia
                </span>
              </a>
              <a 
                href="tel:+61413417915"
                className="flex items-center gap-3 text-forest-200 hover:text-white transition-colors"
              >
                <Phone size={18} />
                <span className="text-sm">+61 413 417 915</span>
              </a>
              <a 
                href="mailto:hill.lucie@gmail.com"
                className="flex items-center gap-3 text-forest-200 hover:text-white transition-colors"
              >
                <Mail size={18} />
                <span className="text-sm">hill.lucie@gmail.com</span>
              </a>
              <div className="flex items-start gap-3 text-forest-200">
                <Clock size={18} className="flex-shrink-0 mt-1" />
                <div className="text-sm">
                  <p>Monday - Friday: 7:00 AM - 6:00 PM</p>
                  <p>Saturday: 8:00 AM - 4:00 PM</p>
                  <p>Sunday: By appointment only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-forest-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-forest-300 text-sm">
              © {currentYear} Lucie Hill Equestrian. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-forest-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-forest-300 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-forest-300 hover:text-white transition-colors">
                Cancellation Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
