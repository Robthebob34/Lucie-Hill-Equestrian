import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  Award, 
  Users, 
  Heart, 
  Star,
  CheckCircle,
  Calendar,
  Trophy,
  Sparkles
} from 'lucide-react'

/**
 * Home Page Component
 * Main landing page with hero, services preview, and testimonials
 */
function Home() {
  // Featured services data
  const services = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Classical Dressage',
      description: 'Expert dressage training from foundation to advanced levels, developing harmony between horse and rider.',
      link: '/dressage'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Riding Lessons',
      description: 'Comprehensive riding instruction for all ages and abilities, from beginners to experienced riders.',
      link: '/courses'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Horse Boarding',
      description: 'Premium care and accommodation for your horse in our modern, well-maintained facilities.',
      link: '/services'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Competition Prep',
      description: 'Specialised training programs to prepare you and your horse for dressage competitions.',
      link: '/services'
    }
  ]

  // Why choose us features
  const features = [
    {
      title: 'Qualified Instruction',
      description: 'Certified instructors with decades of combined experience'
    },
    {
      title: 'Personalised Programs',
      description: 'Tailored training plans to meet your individual goals'
    },
    {
      title: 'Beautiful Facilities',
      description: 'Well-maintained arenas and stabling in a scenic location'
    },
    {
      title: 'Horse Welfare First',
      description: 'Ethical, horse-centred approach to training and care'
    },
    {
      title: 'Flexible Scheduling',
      description: 'Convenient lesson times to fit your busy lifestyle'
    },
    {
      title: 'Supportive Community',
      description: 'A welcoming environment for riders of all levels'
    }
  ]

  // Preview testimonials
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Adult Rider',
      content: 'Lucie has transformed my riding. Her patient teaching style and deep knowledge of dressage have helped me achieve goals I never thought possible.',
      rating: 5
    },
    {
      name: 'James Thompson',
      role: 'Competition Rider',
      content: 'The training program here is exceptional. I\'ve seen remarkable improvement in my competition scores since starting at Lucie Hill Equestrian.',
      rating: 5
    },
    {
      name: 'Emma & Lily Parker',
      role: 'Parent & Junior Rider',
      content: 'My daughter Lily absolutely loves her lessons here. The instructors are wonderful with children and really build their confidence.',
      rating: 5
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/hero.png)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 via-forest-900/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-cream-300 text-sm font-medium tracking-wider uppercase mb-4">
              Mount Gambier, SA Australia
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Where Passion Meets 
              <span className="text-cream-300"> Excellence</span> in Dressage
            </h1>
            <p className="text-lg md:text-xl text-cream-100 mb-8 leading-relaxed">
              Discover the art of classical dressage at Lucie Hill Equestrian. 
              Expert instruction, exceptional care, and a nurturing environment 
              for both horse and rider.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking" className="btn-primary text-lg px-8 py-4">
                Book Your Lesson
                <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn-outline border-white text-white hover:bg-white hover:text-forest-800 text-lg px-8 py-4">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
                Welcome to Lucie Hill
              </span>
              <h2 className="section-title mt-2">
                A Tradition of Excellence in Equestrian Arts
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Nestled in the beautiful Hunter Valley, Lucie Hill Equestrian has been 
                nurturing riders and horses for over 15 years. Our philosophy centres on 
                building a harmonious partnership between horse and rider through classical 
                dressage principles.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you're taking your first steps in the saddle or preparing for 
                advanced competition, our experienced team provides personalised instruction 
                tailored to your unique goals and abilities.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-serif font-bold text-forest-700">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-serif font-bold text-forest-700">500+</div>
                  <div className="text-sm text-gray-600">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-serif font-bold text-forest-700">50+</div>
                  <div className="text-sm text-gray-600">Competition Wins</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/hors_and_babyhorse.png" 
                alt="Horses at Lucie Hill Equestrian" 
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-forest-600 text-white p-6 rounded-xl shadow-lg hidden md:block">
                <Sparkles className="w-8 h-8 mb-2" />
                <p className="font-semibold">Horse Welfare</p>
                <p className="text-sm text-forest-100">Always our priority</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              What We Offer
            </span>
            <h2 className="section-title mt-2">Our Services</h2>
            <p className="section-subtitle">
              Comprehensive equestrian services designed to help you achieve your riding dreams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link 
                key={index}
                to={service.link}
                className="card p-6 group"
              >
                <div className="text-forest-600 mb-4 group-hover:text-forest-700 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                <span className="text-forest-600 font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-secondary">
              View All Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section 
        className="py-24 bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: 'url(/banner.jpg)' }}
      >
        <div className="absolute inset-0 bg-forest-900/70" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-cream-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Book a trial lesson today and experience the difference at Lucie Hill Equestrian. 
            Your path to riding excellence begins here.
          </p>
          <Link to="/booking" className="btn-primary text-lg px-10 py-4">
            <Calendar size={20} />
            Book Your First Lesson
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              The Lucie Hill Difference
            </span>
            <h2 className="section-title mt-2">Why Choose Us</h2>
            <p className="section-subtitle">
              Experience the exceptional standard of care and instruction that sets us apart
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-forest-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              What Our Clients Say
            </span>
            <h2 className="section-title mt-2">Testimonials</h2>
            <p className="section-subtitle">
              Hear from our community of happy riders and horse owners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/testimonials" className="btn-outline">
              Read More Reviews
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-forest-800">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
              Begin Your Equestrian Journey Today
            </h2>
            <p className="text-forest-100 text-lg mb-8">
              Whether you're a complete beginner or an experienced rider looking to refine your skills, 
              we have the perfect program for you. Contact us today to schedule your first lesson.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking" className="btn-primary bg-white text-forest-800 hover:bg-cream-100">
                Book Online
                <Calendar size={18} />
              </Link>
              <a href="tel:+61413417915" className="btn-outline border-white text-white hover:bg-white hover:text-forest-800">
                Call Us: +61 413 417 915
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
