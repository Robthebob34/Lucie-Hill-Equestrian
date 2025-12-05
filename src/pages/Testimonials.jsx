import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Star,
  Quote,
  Calendar,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle
} from 'lucide-react'

/**
 * Testimonials Page Component
 * Displays client reviews and testimonial submission form
 */
function Testimonials() {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    rating: 5,
    testimonial: '',
    consent: false
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      service: 'Dressage Training',
      rating: 5,
      text: 'Lucie has transformed my riding completely. Her patient teaching style and deep knowledge of classical dressage have helped me achieve goals I never thought possible. My horse and I have developed a true partnership thanks to her guidance.',
      date: 'November 2023',
      image: null
    },
    {
      id: 2,
      name: 'James Thompson',
      service: 'Competition Preparation',
      rating: 5,
      text: 'The training program here is exceptional. I\'ve seen remarkable improvement in my competition scores since starting at Lucie Hill Equestrian. The attention to detail in preparation and the supportive environment on competition days has made all the difference.',
      date: 'October 2023',
      image: null
    },
    {
      id: 3,
      name: 'Emma Parker',
      service: 'Junior Lessons',
      rating: 5,
      text: 'My daughter Lily absolutely loves her lessons here. The instructors are wonderful with children – patient, encouraging, and safety-focused. Lily\'s confidence has grown enormously, both on and off the horse. Highly recommend for any parents considering riding for their kids.',
      date: 'September 2023',
      image: null
    },
    {
      id: 4,
      name: 'Michael Chen',
      service: 'Adult Beginner Lessons',
      rating: 5,
      text: 'I started riding at 45 as a complete beginner. The team at Lucie Hill made me feel welcome from day one. No question was too basic, and the progress I\'ve made in just six months is amazing. A wonderful place to learn.',
      date: 'August 2023',
      image: null
    },
    {
      id: 5,
      name: 'Rebecca Wilson',
      service: 'Horse Boarding',
      rating: 5,
      text: 'My horse has never been happier since moving to Lucie Hill. The care and attention he receives is outstanding. The facilities are well-maintained, and the staff truly love the horses. Peace of mind knowing he\'s in great hands.',
      date: 'July 2023',
      image: null
    },
    {
      id: 6,
      name: 'David & Karen Sullivan',
      service: 'Family Lessons',
      rating: 5,
      text: 'Our whole family rides here – from our 7-year-old to us parents. It\'s become our favourite weekend activity. The scheduling is flexible, the horses are well-suited to different abilities, and we\'ve all improved together. Wonderful family experience!',
      date: 'June 2023',
      image: null
    },
    {
      id: 7,
      name: 'Sophie Green',
      service: 'Dressage Training',
      rating: 5,
      text: 'After years of riding, I thought I knew the basics. Lucie showed me how much more there was to learn. Her classical approach has completely changed how I ride and how my horse responds. Truly transformative instruction.',
      date: 'May 2023',
      image: null
    },
    {
      id: 8,
      name: 'Tom Anderson',
      service: 'Horse Training',
      rating: 5,
      text: 'I sent my young horse to Lucie for his initial training and couldn\'t be happier with the result. He came back confident, well-mannered, and with excellent basics. The communication throughout the process was excellent.',
      date: 'April 2023',
      image: null
    }
  ]

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Handle rating selection
  const handleRating = (rating) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format'
    if (!formData.service) newErrors.service = 'Please select a service'
    if (!formData.testimonial.trim()) newErrors.testimonial = 'Please share your experience'
    if (!formData.consent) newErrors.consent = 'Please consent to share your testimonial'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // Save testimonial to localStorage
      const storedTestimonials = JSON.parse(localStorage.getItem('pendingTestimonials') || '[]')
      const newTestimonial = {
        ...formData,
        id: Date.now(),
        date: new Date().toLocaleDateString('en-AU', { month: 'long', year: 'numeric' }),
        status: 'pending'
      }
      storedTestimonials.push(newTestimonial)
      localStorage.setItem('pendingTestimonials', JSON.stringify(storedTestimonials))
      
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        service: '',
        rating: 5,
        testimonial: '',
        consent: false
      })
    }
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-forest-800 to-forest-600">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/hero.png" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-cream-300 font-medium tracking-wider uppercase text-sm">
              Client Stories
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mt-2 mb-6">
              Testimonials
            </h1>
            <p className="text-xl text-cream-100 leading-relaxed">
              Hear from our community of happy riders, horse owners, and families 
              who have experienced the Lucie Hill Equestrian difference.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-forest-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            <div>
              <p className="text-3xl font-bold">500+</p>
              <p className="text-forest-200 text-sm">Happy Students</p>
            </div>
            <div>
              <p className="text-3xl font-bold">4.9</p>
              <p className="text-forest-200 text-sm">Average Rating</p>
            </div>
            <div>
              <p className="text-3xl font-bold">15+</p>
              <p className="text-forest-200 text-sm">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold">98%</p>
              <p className="text-forest-200 text-sm">Recommend Us</p>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Reviews Placeholder */}
      <section className="py-12 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <MapPin className="w-10 h-10 text-forest-600" />
              <div>
                <h3 className="font-semibold text-gray-800">Find us on Google Maps</h3>
                <p className="text-gray-600 text-sm">See more reviews and get directions</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold text-gray-800">4.9</span>
              <span className="text-gray-500">(127 reviews)</span>
            </div>
            <a 
              href="https://maps.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2"
            >
              View on Google Maps
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              What People Say
            </span>
            <h2 className="section-title mt-2">Client Testimonials</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-cream-50 rounded-xl p-8 relative">
                <Quote className="absolute top-6 right-6 w-10 h-10 text-cream-300" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-forest-600">{testimonial.service}</p>
                  </div>
                  <p className="text-sm text-gray-400">{testimonial.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Testimonial Form */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
                Share Your Experience
              </span>
              <h2 className="section-title mt-2">Leave a Testimonial</h2>
              <p className="text-gray-600">
                We'd love to hear about your experience at Lucie Hill Equestrian
              </p>
            </div>

            {submitted ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-lg">
                <CheckCircle className="w-16 h-16 text-forest-600 mx-auto mb-4" />
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your testimonial has been submitted for review. We appreciate you taking 
                  the time to share your experience.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-outline"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-lg">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="label">Your Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                      placeholder="John Smith"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
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
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="service" className="label">Service Used *</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`input-field ${errors.service ? 'border-red-500' : ''}`}
                  >
                    <option value="">Select a service...</option>
                    <option value="Dressage Training">Dressage Training</option>
                    <option value="Private Lessons">Private Lessons</option>
                    <option value="Group Lessons">Group Lessons</option>
                    <option value="Junior Lessons">Junior Lessons</option>
                    <option value="Horse Boarding">Horse Boarding</option>
                    <option value="Competition Preparation">Competition Preparation</option>
                    <option value="Horse Training">Horse Training</option>
                    <option value="Clinics & Workshops">Clinics & Workshops</option>
                  </select>
                  {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                </div>

                <div className="mb-6">
                  <label className="label">Your Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRating(rating)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star 
                          className={`w-8 h-8 ${
                            rating <= formData.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="testimonial" className="label">Your Experience *</label>
                  <textarea
                    id="testimonial"
                    name="testimonial"
                    value={formData.testimonial}
                    onChange={handleChange}
                    rows={5}
                    className={`input-field resize-none ${errors.testimonial ? 'border-red-500' : ''}`}
                    placeholder="Tell us about your experience at Lucie Hill Equestrian..."
                  />
                  {errors.testimonial && <p className="text-red-500 text-sm mt-1">{errors.testimonial}</p>}
                </div>

                <div className="mb-8">
                  <label className={`flex items-start gap-3 cursor-pointer ${errors.consent ? 'text-red-500' : ''}`}>
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <span className="text-sm text-gray-600">
                      I consent to having my testimonial displayed on the Lucie Hill Equestrian website. 
                      I understand my name and general comments will be visible to others. *
                    </span>
                  </label>
                  {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
                </div>

                <button type="submit" className="btn-primary w-full">
                  <Send size={18} />
                  Submit Testimonial
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-forest-100 text-lg max-w-2xl mx-auto mb-8">
            Experience for yourself what our clients love about Lucie Hill Equestrian. 
            Book your first lesson today.
          </p>
          <Link to="/booking" className="btn-primary bg-white text-forest-800 hover:bg-cream-100 text-lg px-8 py-4">
            <Calendar size={20} />
            Book Your Lesson
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
