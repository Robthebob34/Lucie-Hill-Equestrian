import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Calendar,
  Users,
  Clock,
  TrendingUp,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Download,
  LogOut,
  Menu,
  X,
  ChevronDown,
  RefreshCw,
  Bell,
  Settings,
  BarChart3,
  CalendarDays,
  DollarSign
} from 'lucide-react'

/**
 * Admin Dashboard Component
 * Full booking management system with statistics and filtering
 */
function AdminDashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('bookings')
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('adminAuth') || '{}')
    if (!auth.authenticated) {
      navigate('/admin')
    }
  }, [navigate])

  // Load bookings from localStorage
  useEffect(() => {
    loadBookings()
  }, [])

  const loadBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    // Add some demo bookings if none exist
    if (storedBookings.length === 0) {
      const demoBookings = generateDemoBookings()
      localStorage.setItem('bookings', JSON.stringify(demoBookings))
      setBookings(demoBookings)
    } else {
      setBookings(storedBookings)
    }
  }

  // Generate demo bookings
  const generateDemoBookings = () => {
    const services = ['dressage', 'private', 'semi-private', 'group', 'assessment']
    const levels = ['beginner', 'novice', 'intermediate', 'advanced']
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled']
    const names = [
      { first: 'Sarah', last: 'Mitchell' },
      { first: 'James', last: 'Thompson' },
      { first: 'Emma', last: 'Parker' },
      { first: 'Michael', last: 'Chen' },
      { first: 'Rebecca', last: 'Wilson' },
      { first: 'David', last: 'Sullivan' },
      { first: 'Sophie', last: 'Green' },
      { first: 'Tom', last: 'Anderson' }
    ]

    const demoData = []
    const today = new Date()

    for (let i = 0; i < 15; i++) {
      const randomDate = new Date(today)
      randomDate.setDate(today.getDate() + Math.floor(Math.random() * 30) - 10)
      const name = names[Math.floor(Math.random() * names.length)]
      
      demoData.push({
        id: `LHE-${(Date.now() + i).toString(36).toUpperCase()}`,
        serviceType: services[Math.floor(Math.random() * services.length)],
        duration: ['30', '45', '60'][Math.floor(Math.random() * 3)],
        riderLevel: levels[Math.floor(Math.random() * levels.length)],
        firstName: name.first,
        lastName: name.last,
        email: `${name.first.toLowerCase()}@example.com`,
        phone: `04${Math.floor(10000000 + Math.random() * 90000000)}`,
        hasOwnHorse: Math.random() > 0.5 ? 'yes' : 'no',
        horseName: Math.random() > 0.5 ? 'Thunder' : '',
        specialRequests: '',
        date: randomDate.toISOString().split('T')[0],
        time: ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'][Math.floor(Math.random() * 4)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        createdAt: new Date(today.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        price: ['$50', '$75', '$95'][Math.floor(Math.random() * 3)]
      })
    }

    return demoData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  // Filter bookings
  useEffect(() => {
    let filtered = [...bookings]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(b => 
        `${b.firstName} ${b.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter)
    }

    // Service filter
    if (serviceFilter !== 'all') {
      filtered = filtered.filter(b => b.serviceType === serviceFilter)
    }

    // Date filter
    if (dateFilter) {
      filtered = filtered.filter(b => b.date === dateFilter)
    }

    setFilteredBookings(filtered)
  }, [bookings, searchTerm, statusFilter, serviceFilter, dateFilter])

  // Calculate statistics
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    thisMonth: bookings.filter(b => {
      const bookingDate = new Date(b.date)
      const now = new Date()
      return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear()
    }).length,
    revenue: bookings
      .filter(b => b.status === 'completed' || b.status === 'confirmed')
      .reduce((sum, b) => sum + parseInt(b.price?.replace('$', '') || 0), 0)
  }

  // Service type counts
  const serviceCounts = bookings.reduce((acc, b) => {
    acc[b.serviceType] = (acc[b.serviceType] || 0) + 1
    return acc
  }, {})

  // Update booking status
  const updateStatus = (bookingId, newStatus) => {
    const updatedBookings = bookings.map(b => 
      b.id === bookingId ? { ...b, status: newStatus } : b
    )
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    setShowModal(false)
    setSelectedBooking(null)
  }

  // Delete booking
  const deleteBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      const updatedBookings = bookings.filter(b => b.id !== bookingId)
      setBookings(updatedBookings)
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
      setShowModal(false)
      setSelectedBooking(null)
    }
  }

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Date', 'Time', 'Duration', 'Level', 'Status', 'Price']
    const csvData = filteredBookings.map(b => [
      b.id,
      `${b.firstName} ${b.lastName}`,
      b.email,
      b.phone,
      b.serviceType,
      b.date,
      b.time,
      `${b.duration} min`,
      b.riderLevel,
      b.status,
      b.price
    ])

    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    navigate('/admin')
  }

  // Service type labels
  const serviceLabels = {
    'dressage': 'Dressage Training',
    'private': 'Private Lesson',
    'semi-private': 'Semi-Private',
    'group': 'Group Lesson',
    'assessment': 'Assessment'
  }

  // Status badge component
  const StatusBadge = ({ status }) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-green-100 text-green-700',
      completed: 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700'
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  // Format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-forest-900 text-white transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Logo" 
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h1 className="font-serif font-bold">Lucie Hill</h1>
              <p className="text-xs text-forest-300">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'bookings' ? 'bg-forest-800 text-white' : 'text-forest-200 hover:bg-forest-800'
            }`}
          >
            <Calendar size={20} />
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('statistics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'statistics' ? 'bg-forest-800 text-white' : 'text-forest-200 hover:bg-forest-800'
            }`}
          >
            <BarChart3 size={20} />
            Statistics
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-forest-200 hover:text-white hover:bg-forest-800 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'bookings' ? 'Manage Bookings' : 'Statistics'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={loadBookings}
              className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
              title="Refresh"
            >
              <RefreshCw size={20} />
            </button>
            <div className="w-10 h-10 bg-forest-100 rounded-full flex items-center justify-center text-forest-700 font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'bookings' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="text-yellow-600" size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
                      <p className="text-sm text-gray-500">Pending</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{stats.confirmed}</p>
                      <p className="text-sm text-gray-500">Confirmed</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <CalendarDays className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{stats.thisMonth}</p>
                      <p className="text-sm text-gray-500">This Month</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-forest-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="text-forest-600" size={20} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">${stats.revenue}</p>
                      <p className="text-sm text-gray-500">Revenue</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search by name, email, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <select
                    value={serviceFilter}
                    onChange={(e) => setServiceFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-500"
                  >
                    <option value="all">All Services</option>
                    <option value="dressage">Dressage</option>
                    <option value="private">Private Lesson</option>
                    <option value="semi-private">Semi-Private</option>
                    <option value="group">Group Lesson</option>
                    <option value="assessment">Assessment</option>
                  </select>
                  <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-forest-500"
                  />
                  <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
                  >
                    <Download size={18} />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Bookings Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Client</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Service</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date & Time</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Price</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredBookings.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                            No bookings found matching your criteria
                          </td>
                        </tr>
                      ) : (
                        filteredBookings.map(booking => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-mono text-gray-600">
                              {booking.id}
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="font-medium text-gray-800">
                                  {booking.firstName} {booking.lastName}
                                </p>
                                <p className="text-sm text-gray-500">{booking.email}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">
                              {serviceLabels[booking.serviceType]}
                            </td>
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-sm font-medium text-gray-800">
                                  {formatDate(booking.date)}
                                </p>
                                <p className="text-sm text-gray-500">{booking.time}</p>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <StatusBadge status={booking.status} />
                            </td>
                            <td className="px-4 py-3 font-medium text-gray-800">
                              {booking.price}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    setSelectedBooking(booking)
                                    setShowModal(true)
                                  }}
                                  className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                                  title="View Details"
                                >
                                  <Eye size={18} />
                                </button>
                                {booking.status === 'pending' && (
                                  <button
                                    onClick={() => updateStatus(booking.id, 'confirmed')}
                                    className="p-2 hover:bg-green-100 rounded-lg text-green-600"
                                    title="Confirm"
                                  >
                                    <CheckCircle size={18} />
                                  </button>
                                )}
                                {booking.status !== 'cancelled' && (
                                  <button
                                    onClick={() => updateStatus(booking.id, 'cancelled')}
                                    className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                                    title="Cancel"
                                  >
                                    <XCircle size={18} />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'statistics' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Overview Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Bookings</span>
                    <span className="font-bold text-gray-800">{stats.total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-bold text-yellow-600">{stats.pending}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Confirmed</span>
                    <span className="font-bold text-green-600">{stats.confirmed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-bold text-blue-600">{stats.completed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Cancelled</span>
                    <span className="font-bold text-red-600">{stats.cancelled}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">This Month</span>
                    <span className="font-bold text-forest-600">{stats.thisMonth}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Estimated Revenue</span>
                    <span className="font-bold text-forest-600">${stats.revenue}</span>
                  </div>
                </div>
              </div>

              {/* Service Breakdown */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Services</h3>
                <div className="space-y-4">
                  {Object.entries(serviceCounts).sort((a, b) => b[1] - a[1]).map(([service, count]) => (
                    <div key={service}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">{serviceLabels[service]}</span>
                        <span className="font-medium text-gray-800">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-forest-600 rounded-full h-2" 
                          style={{ width: `${(count / stats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversion Rate */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Rates</h3>
                <div className="text-center py-8">
                  <p className="text-5xl font-bold text-forest-600 mb-2">
                    {stats.total > 0 ? Math.round(((stats.confirmed + stats.completed) / stats.total) * 100) : 0}%
                  </p>
                  <p className="text-gray-600">Confirmation Rate</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">
                      {stats.total > 0 ? Math.round((stats.cancelled / stats.total) * 100) : 0}%
                    </p>
                    <p className="text-sm text-gray-500">Cancellation Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-800">
                      ${stats.total > 0 ? Math.round(stats.revenue / (stats.confirmed + stats.completed || 1)) : 0}
                    </p>
                    <p className="text-sm text-gray-500">Avg. Booking Value</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="w-full flex items-center gap-3 p-4 bg-forest-50 rounded-lg hover:bg-forest-100 transition-colors"
                  >
                    <Calendar className="text-forest-600" size={20} />
                    <span className="font-medium text-forest-700">View All Bookings</span>
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="w-full flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Download className="text-blue-600" size={20} />
                    <span className="font-medium text-blue-700">Export Report</span>
                  </button>
                  <Link
                    to="/"
                    className="w-full flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Eye className="text-gray-600" size={20} />
                    <span className="font-medium text-gray-700">View Website</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Booking Detail Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">Booking Details</h3>
              <button 
                onClick={() => {
                  setShowModal(false)
                  setSelectedBooking(null)
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-mono text-lg">{selectedBooking.id}</span>
                <StatusBadge status={selectedBooking.status} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Client Name</p>
                  <p className="font-medium">{selectedBooking.firstName} {selectedBooking.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedBooking.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedBooking.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service</p>
                  <p className="font-medium">{serviceLabels[selectedBooking.serviceType]}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{formatDate(selectedBooking.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{selectedBooking.time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{selectedBooking.duration} minutes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Level</p>
                  <p className="font-medium capitalize">{selectedBooking.riderLevel}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Own Horse</p>
                  <p className="font-medium">
                    {selectedBooking.hasOwnHorse === 'yes' ? `Yes - ${selectedBooking.horseName}` : 'No - School horse'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-bold text-forest-700">{selectedBooking.price}</p>
                </div>
              </div>

              {selectedBooking.specialRequests && (
                <div>
                  <p className="text-sm text-gray-500">Special Requests</p>
                  <p className="font-medium">{selectedBooking.specialRequests}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500">Booked On</p>
                <p className="font-medium">{new Date(selectedBooking.createdAt).toLocaleString('en-AU')}</p>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex flex-wrap gap-3">
              {selectedBooking.status === 'pending' && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <CheckCircle size={18} />
                  Confirm Booking
                </button>
              )}
              {selectedBooking.status === 'confirmed' && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, 'completed')}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <CheckCircle size={18} />
                  Mark Completed
                </button>
              )}
              {selectedBooking.status !== 'cancelled' && (
                <button
                  onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <XCircle size={18} />
                  Cancel Booking
                </button>
              )}
              <button
                onClick={() => deleteBooking(selectedBooking.id)}
                className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
