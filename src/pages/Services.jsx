import { Link } from 'react-router-dom'
import { 
  Trophy,
  Users,
  Home,
  Target,
  Calendar,
  Briefcase,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'

/**
 * Services Page Component
 * Overview of all services offered
 */
function Services() {
  // All services
  const services = [
    {
      icon: <Trophy className="w-10 h-10" />,
      title: 'Classical Dressage Training',
      description: 'Expert training in classical dressage methods for all levels, from foundation work to Grand Prix movements.',
      features: [
        'Foundation to Grand Prix training',
        'Classical methods based on German training scale',
        'Individual programs tailored to horse and rider',
        'Video analysis and feedback',
        'Competition preparation'
      ],
      link: '/dressage',
      cta: 'Learn About Dressage'
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: 'Riding Lessons',
      description: 'Comprehensive riding instruction for all ages and abilities, including private, semi-private, and group options.',
      features: [
        'Private, semi-private, and group lessons',
        'Lessons for children through adults',
        'Beginner to advanced levels',
        'Flexible scheduling',
        'School horses available'
      ],
      link: '/courses',
      cta: 'View Lesson Options'
    },
    {
      icon: <Home className="w-10 h-10" />,
      title: 'Horse Boarding',
      description: 'Premium care and accommodation for your horse in our modern, well-maintained facilities.',
      features: [
        'Full-service and self-care options',
        'Daily turnout in safe paddocks',
        'Quality feed programs',
        'Rugging and blanketing service',
        'Veterinary coordination'
      ],
      link: null,
      cta: 'Contact for Rates'
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: 'Competition Preparation',
      description: 'Specialised training programs to prepare you and your horse for dressage competitions at all levels.',
      features: [
        'Test practice and refinement',
        'Ring craft and show preparation',
        'Warm-up strategies',
        'Mental preparation coaching',
        'Competition day support'
      ],
      link: null,
      cta: 'Enquire Now'
    },
    {
      icon: <Calendar className="w-10 h-10" />,
      title: 'Clinics & Workshops',
      description: 'Regular clinics and workshops with visiting instructors and specialists to broaden your equestrian education.',
      features: [
        'Guest clinician visits',
        'Specific topic workshops',
        'Unmounted theory sessions',
        'Rider fitness programs',
        'Youth development camps'
      ],
      link: null,
      cta: 'See Upcoming Events'
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: 'Horse Training',
      description: 'Professional training services for your horse, whether starting young horses or retraining experienced ones.',
      features: [
        'Young horse starting',
        'Problem horse rehabilitation',
        'Competition horse training',
        'Regular progress updates',
        'Owner involvement encouraged'
      ],
      link: null,
      cta: 'Discuss Training Options'
    }
  ]

  // Additional services
  const additionalServices = [
    'Horse sales and purchase assistance',
    'Saddle fitting consultations',
    'Equine nutrition advice',
    'Transport arrangements',
    'Photography sessions',
    'Corporate team building events'
  ]

  // Pricing summary
  const pricingSummary = [
    { service: 'Private Lesson (45 min)', price: '$95' },
    { service: 'Semi-Private Lesson (60 min)', price: '$75 each' },
    { service: 'Group Lesson (60 min)', price: '$55' },
    { service: 'Dressage Training - Foundation', price: '$85/session' },
    { service: 'Dressage Training - Advanced', price: '$150/session' },
    { service: 'Horse Training (per week)', price: 'From $450' },
    { service: 'Full Board (per week)', price: 'From $350' },
    { service: 'Competition Support (per day)', price: '$200' }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-saddle-700 to-saddle-500">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/banner.jpg" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-cream-300 font-medium tracking-wider uppercase text-sm">
              What We Offer
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mt-2 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-cream-100 leading-relaxed">
              Comprehensive equestrian services to meet every need, from first-time riders to 
              competition professionals. Discover how we can support your equestrian journey.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card p-8 flex flex-col">
                <div className="text-forest-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.link ? (
                  <Link 
                    to={service.link}
                    className="btn-outline w-full justify-center"
                  >
                    {service.cta}
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <Link 
                    to="/booking"
                    className="btn-outline w-full justify-center"
                  >
                    {service.cta}
                    <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
                And More
              </span>
              <h2 className="section-title mt-2">Additional Services</h2>
              <p className="text-gray-600 mb-8">
                Beyond our core offerings, we provide a range of additional services to support 
                all aspects of your equestrian life.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <Star className="w-4 h-4 text-saddle-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="/hors_and_babyhorse.png" 
                alt="Additional Services" 
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              Investment
            </span>
            <h2 className="section-title mt-2">Pricing Guide</h2>
            <p className="section-subtitle">
              Transparent pricing with no hidden fees. Packages available for regular clients.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-cream-50 rounded-2xl overflow-hidden">
              <div className="bg-forest-600 text-white px-6 py-4">
                <h3 className="font-semibold text-lg">Service Price Summary</h3>
              </div>
              <div className="divide-y divide-cream-200">
                {pricingSummary.map((item, index) => (
                  <div key={index} className="flex justify-between items-center px-6 py-4">
                    <span className="text-gray-700">{item.service}</span>
                    <span className="font-semibold text-forest-700">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm mb-4">
                All prices are in AUD. Terms and conditions apply.
                Contact us for custom packages and corporate rates.
              </p>
              <Link to="/booking" className="btn-primary">
                Get a Quote
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-forest-800 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-300 font-medium tracking-wider uppercase text-sm">
              Getting Started
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2 mb-4">
              How It Works
            </h2>
            <p className="text-forest-100 text-lg max-w-2xl mx-auto">
              Begin your journey with Lucie Hill Equestrian in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Get in Touch', desc: 'Contact us via phone, email, or online booking to discuss your needs.' },
              { step: '2', title: 'Initial Assessment', desc: 'We\'ll assess your current level and discuss your goals.' },
              { step: '3', title: 'Custom Plan', desc: 'Receive a personalised program tailored to your objectives.' },
              { step: '4', title: 'Start Learning', desc: 'Begin your lessons and enjoy the journey!' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-forest-200 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              Common Questions
            </span>
            <h2 className="section-title mt-2">Frequently Asked</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              { q: 'Do I need my own horse?', a: 'No, we have well-trained school horses available for lessons. However, you\'re welcome to bring your own horse for lessons or training.' },
              { q: 'What age can children start lessons?', a: 'We accept children from age 5 for our Little Riders program, with age-appropriate activities focused on safety and confidence.' },
              { q: 'What should I wear to lessons?', a: 'Long pants, boots with a small heel, and an approved riding helmet (we can loan helmets). Jodhpurs are ideal but not essential for beginners.' },
              { q: 'How do I pay for lessons?', a: 'We accept cash, bank transfer, and credit card. Packages are payable in advance. Casual lessons can be paid per session.' }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-saddle-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-saddle-100 text-lg max-w-2xl mx-auto mb-8">
            Whatever your equestrian goals, we have a service to match. 
            Contact us today to discuss how we can help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="btn-primary bg-white text-saddle-800 hover:bg-cream-100 text-lg px-8 py-4">
              <Calendar size={20} />
              Book Online
            </Link>
            <a href="tel:+61413417915" className="btn-outline border-white text-white hover:bg-white hover:text-saddle-700 text-lg px-8 py-4">
              Call +61 413 417 915
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services
