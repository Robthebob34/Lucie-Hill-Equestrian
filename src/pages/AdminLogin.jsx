import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react'

/**
 * Admin Login Page
 * Simple authentication for admin dashboard access
 */
function AdminLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Admin credentials (in production, this would be handled server-side)
  const ADMIN_EMAIL = 'admin@luciehillequestrian.com.au'
  const ADMIN_PASSWORD = 'LucieHill2024!'

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate authentication delay
    setTimeout(() => {
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        // Store auth token in localStorage
        localStorage.setItem('adminAuth', JSON.stringify({
          authenticated: true,
          timestamp: Date.now(),
          email: formData.email
        }))
        navigate('/admin/dashboard')
      } else {
        setError('Invalid email or password. Please try again.')
      }
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-900 to-forest-700 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Lucie Hill Equestrian" 
              className="h-16 w-16 rounded-full object-cover shadow-lg"
            />
            <div className="text-left">
              <h1 className="font-serif text-2xl font-bold text-white">Lucie Hill</h1>
              <p className="text-sm text-forest-200 tracking-wider uppercase">Equestrian</p>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-800 text-center mb-2">
            Admin Login
          </h2>
          <p className="text-gray-500 text-center mb-8">
            Enter your credentials to access the dashboard
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="label">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="admin@luciehillequestrian.com.au"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Login to Dashboard'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center mb-4">
              Demo Credentials:
            </p>
            <div className="bg-cream-50 rounded-lg p-4 text-sm">
              <p><strong>Email:</strong> admin@luciehillequestrian.com.au</p>
              <p><strong>Password:</strong> LucieHill2024!</p>
            </div>
          </div>
        </div>

        {/* Back to website link */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-forest-200 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Website
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
