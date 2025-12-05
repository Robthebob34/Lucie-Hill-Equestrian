import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

/**
 * Booking Page Component
 * Complete booking system with calendar, form, and confirmation
 */
function Booking() {
  // Current date info
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  
  // Form state
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [formData, setFormData] = useState({
    serviceType: '',
    lessonType: '',
    duration: '',
    riderLevel: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hasOwnHorse: 'no',
    horseName: '',
    specialRequests: ''
  })
  const [errors, setErrors] = useState({})
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)

  // Service options
  const serviceTypes = [
    { value: 'dressage', label: 'Dressage Training' },
    { value: 'private', label: 'Private Riding Lesson' },
    { value: 'semi-private', label: 'Semi-Private Lesson' },
    { value: 'group', label: 'Group Lesson' },
    { value: 'assessment', label: 'Assessment/Trial Lesson' }
  ]

  const durations = [
    { value: '30', label: '30 minutes', price: '$50' },
    { value: '45', label: '45 minutes', price: '$75' },
    { value: '60', label: '60 minutes', price: '$95' }
  ]

  const riderLevels = [
    { value: 'beginner', label: 'Beginner - No/little experience' },
    { value: 'novice', label: 'Novice - Can walk, trot and canter' },
    { value: 'intermediate', label: 'Intermediate - Confident at all paces' },
    { value: 'advanced', label: 'Advanced - Competition experience' }
  ]

  // Available times
  const availableTimes = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  // Get existing bookings from localStorage
  const getExistingBookings = () => {
    return JSON.parse(localStorage.getItem('bookings') || '[]')
  }

  // Check if a time slot is already booked
  const isTimeBooked = (date, time) => {
    const bookings = getExistingBookings()
    return bookings.some(
      booking => booking.date === date && booking.time === time && booking.status !== 'cancelled'
    )
  }

  // Get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay()
  }

  // Navigate months
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Check if date is selectable (not in past, not Sunday)
  const isDateSelectable = (day) => {
    const date = new Date(currentYear, currentMonth, day)
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const isSunday = date.getDay() === 0
    return !isPast && !isSunday
  }

  // Format date for display
  const formatDate = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-AU', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Handle date selection
  const handleDateSelect = (day) => {
    if (isDateSelectable(day)) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      setSelectedDate(dateStr)
      setSelectedTime(null)
    }
  }

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Validate step 1
  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service'
    if (!formData.duration) newErrors.duration = 'Please select duration'
    if (!formData.riderLevel) newErrors.riderLevel = 'Please select your level'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate step 2
  const validateStep2 = () => {
    const newErrors = {}
    if (!selectedDate) newErrors.date = 'Please select a date'
    if (!selectedTime) newErrors.time = 'Please select a time'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Validate step 3
  const validateStep3 = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (formData.hasOwnHorse === 'yes' && !formData.horseName.trim()) {
      newErrors.horseName = 'Please enter your horse\'s name'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle step navigation
  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    } else if (step === 3 && validateStep3()) {
      setStep(4)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  // Submit booking
  const handleSubmit = async () => {
    const bookingId = `LHE-${Date.now().toString(36).toUpperCase()}`
    const booking = {
      id: bookingId,
      ...formData,
      date: selectedDate,
      time: selectedTime,
      status: 'pending',
      createdAt: new Date().toISOString(),
      price: durations.find(d => d.value === formData.duration)?.price || '$0'
    }

    // Save to localStorage
    const bookings = getExistingBookings()
    bookings.push(booking)
    localStorage.setItem('bookings', JSON.stringify(bookings))

    // Send confirmation emails (non-blocking)
    try {
      await fetch('/.netlify/functions/send-booking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      })
      console.log('Confirmation emails sent')
    } catch (error) {
      console.error('Failed to send confirmation emails:', error)
      // Don't block the booking if email fails
    }

    setBookingDetails(booking)
    setBookingComplete(true)
  }

  // Render calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const days = []
    
    // Empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const isSelected = selectedDate === dateStr
      const isSelectable = isDateSelectable(day)
      const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          disabled={!isSelectable}
          className={`p-2 rounded-lg text-center transition-all ${
            isSelected
              ? 'bg-forest-600 text-white font-bold'
              : isSelectable
                ? 'hover:bg-forest-100 text-gray-700'
                : 'text-gray-300 cursor-not-allowed'
          } ${isToday ? 'ring-2 ring-forest-400' : ''}`}
        >
          {day}
        </button>
      )
    }

    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="font-semibold text-lg">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          <Info size={14} className="inline mr-1" />
          Sunday closed. Select an available date.
        </p>
      </div>
    )
  }

  // Render time slots
  const renderTimeSlots = () => {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="font-semibold text-lg mb-4">Available Times</h3>
        {selectedDate ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availableTimes.map(time => {
              const isBooked = isTimeBooked(selectedDate, time)
              const isSelected = selectedTime === time
              return (
                <button
                  key={time}
                  onClick={() => !isBooked && setSelectedTime(time)}
                  disabled={isBooked}
                  className={`py-3 px-4 rounded-lg text-center transition-all ${
                    isSelected
                      ? 'bg-forest-600 text-white font-bold'
                      : isBooked
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed line-through'
                        : 'bg-cream-50 hover:bg-forest-100 text-gray-700'
                  }`}
                >
                  {time}
                </button>
              )
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Please select a date first
          </p>
        )}
      </div>
    )
  }

  // Booking complete view
  if (bookingComplete && bookingDetails) {
    return (
      <div className="min-h-screen bg-cream-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
            <CheckCircle className="w-20 h-20 text-forest-600 mx-auto mb-6" />
            <h1 className="text-3xl font-serif font-bold text-gray-800 mb-4">
              Booking Request Submitted!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for your booking request. We will review it and contact you 
              shortly to confirm your appointment.
            </p>

            <div className="bg-cream-50 rounded-xl p-6 text-left mb-8">
              <h3 className="font-semibold text-lg mb-4 text-center">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Reference:</span>
                  <span className="font-mono font-bold text-forest-700">{bookingDetails.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{serviceTypes.find(s => s.value === bookingDetails.serviceType)?.label}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{formatDate(bookingDetails.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{bookingDetails.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{bookingDetails.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-forest-700">{bookingDetails.price}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{bookingDetails.firstName} {bookingDetails.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{bookingDetails.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                    Pending Confirmation
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="btn-outline">
                Back to Home
              </Link>
              <button 
                onClick={() => {
                  setBookingComplete(false)
                  setStep(1)
                  setSelectedDate(null)
                  setSelectedTime(null)
                  setFormData({
                    serviceType: '',
                    lessonType: '',
                    duration: '',
                    riderLevel: '',
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    hasOwnHorse: 'no',
                    horseName: '',
                    specialRequests: ''
                  })
                }}
                className="btn-primary"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-forest-800 to-forest-600">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Book Your Lesson
            </h1>
            <p className="text-xl text-cream-100">
              Choose your preferred service, date, and time to begin your equestrian journey
            </p>
          </div>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-4 md:gap-8">
            {[
              { num: 1, label: 'Service' },
              { num: 2, label: 'Date & Time' },
              { num: 3, label: 'Details' },
              { num: 4, label: 'Confirm' }
            ].map((s, index) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                  step >= s.num ? 'bg-forest-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s.num ? <CheckCircle size={16} /> : s.num}
                </div>
                <span className={`ml-2 text-sm hidden sm:block ${
                  step >= s.num ? 'text-forest-700 font-medium' : 'text-gray-400'
                }`}>
                  {s.label}
                </span>
                {index < 3 && (
                  <div className={`w-8 md:w-16 h-0.5 mx-2 ${
                    step > s.num ? 'bg-forest-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-12 bg-cream-50 min-h-[60vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Step 1: Service Selection */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                  Select Your Service
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="label">Type of Service *</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {serviceTypes.map(type => (
                        <label
                          key={type.value}
                          className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.serviceType === type.value
                              ? 'border-forest-600 bg-forest-50'
                              : 'border-gray-200 hover:border-forest-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="serviceType"
                            value={type.value}
                            checked={formData.serviceType === type.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                            formData.serviceType === type.value
                              ? 'border-forest-600'
                              : 'border-gray-400'
                          }`}>
                            {formData.serviceType === type.value && (
                              <span className="w-2 h-2 rounded-full bg-forest-600" />
                            )}
                          </span>
                          {type.label}
                        </label>
                      ))}
                    </div>
                    {errors.serviceType && (
                      <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Lesson Duration *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {durations.map(d => (
                        <label
                          key={d.value}
                          className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.duration === d.value
                              ? 'border-forest-600 bg-forest-50'
                              : 'border-gray-200 hover:border-forest-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="duration"
                            value={d.value}
                            checked={formData.duration === d.value}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <Clock size={20} className={formData.duration === d.value ? 'text-forest-600' : 'text-gray-400'} />
                          <span className="font-medium mt-1">{d.label}</span>
                          <span className="text-sm text-forest-600">{d.price}</span>
                        </label>
                      ))}
                    </div>
                    {errors.duration && (
                      <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                    )}
                  </div>

                  <div>
                    <label className="label">Your Riding Level *</label>
                    <select
                      name="riderLevel"
                      value={formData.riderLevel}
                      onChange={handleChange}
                      className={`input-field ${errors.riderLevel ? 'border-red-500' : ''}`}
                    >
                      <option value="">Select your level...</option>
                      {riderLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                    {errors.riderLevel && (
                      <p className="text-red-500 text-sm mt-1">{errors.riderLevel}</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button onClick={handleNext} className="btn-primary">
                    Continue
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                  Choose Date & Time
                </h2>

                <div className="grid lg:grid-cols-2 gap-6">
                  {renderCalendar()}
                  {renderTimeSlots()}
                </div>

                {selectedDate && selectedTime && (
                  <div className="bg-forest-50 rounded-xl p-4 mt-6 flex items-center gap-4">
                    <CheckCircle className="text-forest-600" size={24} />
                    <div>
                      <p className="font-medium text-forest-800">Selected Appointment</p>
                      <p className="text-forest-600">{formatDate(selectedDate)} at {selectedTime}</p>
                    </div>
                  </div>
                )}

                {(errors.date || errors.time) && (
                  <div className="bg-red-50 rounded-xl p-4 mt-6 flex items-center gap-4">
                    <AlertCircle className="text-red-500" size={24} />
                    <p className="text-red-600">{errors.date || errors.time}</p>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="btn-outline">
                    <ChevronLeft size={18} />
                    Back
                  </button>
                  <button onClick={handleNext} className="btn-primary">
                    Continue
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Personal Details */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                  Your Details
                </h2>

                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="label">First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`input-field ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="lastName" className="label">Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`input-field ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Smith"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="label">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="label">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="0412 345 678"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="label">Do you have your own horse?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasOwnHorse"
                          value="yes"
                          checked={formData.hasOwnHorse === 'yes'}
                          onChange={handleChange}
                          className="w-4 h-4 text-forest-600"
                        />
                        <span>Yes, I have my own horse</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasOwnHorse"
                          value="no"
                          checked={formData.hasOwnHorse === 'no'}
                          onChange={handleChange}
                          className="w-4 h-4 text-forest-600"
                        />
                        <span>No, I need a school horse</span>
                      </label>
                    </div>
                  </div>

                  {formData.hasOwnHorse === 'yes' && (
                    <div>
                      <label htmlFor="horseName" className="label">Horse's Name *</label>
                      <input
                        type="text"
                        id="horseName"
                        name="horseName"
                        value={formData.horseName}
                        onChange={handleChange}
                        className={`input-field ${errors.horseName ? 'border-red-500' : ''}`}
                        placeholder="Enter your horse's name"
                      />
                      {errors.horseName && (
                        <p className="text-red-500 text-sm mt-1">{errors.horseName}</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label htmlFor="specialRequests" className="label">Special Requests or Notes</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows={3}
                      className="input-field resize-none"
                      placeholder="Any special requirements, injuries, or things we should know..."
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button onClick={handleBack} className="btn-outline">
                    <ChevronLeft size={18} />
                    Back
                  </button>
                  <button onClick={handleNext} className="btn-primary">
                    Continue
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                  Confirm Your Booking
                </h2>

                <div className="bg-cream-50 rounded-xl p-6 mb-8">
                  <h3 className="font-semibold text-lg mb-4">Booking Summary</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Service</p>
                      <p className="font-medium">{serviceTypes.find(s => s.value === formData.serviceType)?.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{durations.find(d => d.value === formData.duration)?.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(selectedDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{selectedTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Rider Level</p>
                      <p className="font-medium">{riderLevels.find(l => l.value === formData.riderLevel)?.label}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Horse</p>
                      <p className="font-medium">{formData.hasOwnHorse === 'yes' ? formData.horseName : 'School horse required'}</p>
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-bold text-forest-700 text-xl">
                        {durations.find(d => d.value === formData.duration)?.price}
                      </p>
                    </div>
                  </div>

                  {formData.specialRequests && (
                    <>
                      <hr className="my-4" />
                      <div>
                        <p className="text-sm text-gray-500">Special Requests</p>
                        <p className="font-medium">{formData.specialRequests}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Info className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">Cancellation Policy</p>
                      <p className="text-yellow-700">
                        Cancellations made more than 24 hours in advance receive a full refund. 
                        Cancellations within 24 hours may incur a 50% fee. No-shows are charged in full.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button onClick={handleBack} className="btn-outline">
                    <ChevronLeft size={18} />
                    Back
                  </button>
                  <button onClick={handleSubmit} className="btn-primary text-lg px-8">
                    <CheckCircle size={20} />
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </div>
  )
}

export default Booking
