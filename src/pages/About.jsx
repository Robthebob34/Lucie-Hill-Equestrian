import { Link } from 'react-router-dom'
import { 
  Award, 
  Heart,
  Users,
  Target,
  BookOpen,
  Shield,
  Star,
  Calendar
} from 'lucide-react'

/**
 * About Page Component
 * Company history, team, philosophy, and values
 */
function About() {
  // Certifications and qualifications
  const qualifications = [
    'Equestrian Australia Level 2 Coach',
    'Certificate IV in Equine Studies',
    'EA Dressage Judge (C Panel)',
    'First Aid Certificate',
    'Working with Children Check',
    'FEI Dressage Steward',
    'Member of Dressage NSW',
    'Insurance current'
  ]

  // Core values
  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Horse Welfare',
      description: 'The wellbeing of our horses is paramount. We practice ethical, horse-centred training methods.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community',
      description: 'We foster a supportive, inclusive environment where riders of all backgrounds feel welcome.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from instruction to facility maintenance.'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Education',
      description: 'Continuous learning for both riders and horses is at the heart of our philosophy.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Safety',
      description: 'Safety protocols and proper procedures are non-negotiable in all our activities.'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Integrity',
      description: 'We conduct our business with honesty, transparency, and respect for all.'
    }
  ]

  // Timeline milestones
  const timeline = [
    { year: '2008', event: 'Lucie Hill Equestrian established in the Hunter Valley' },
    { year: '2010', event: 'Expanded facilities with covered arena' },
    { year: '2012', event: 'First students achieve competition success at state level' },
    { year: '2015', event: 'Introduced youth development program' },
    { year: '2018', event: 'Celebrated 10 years with 300+ students trained' },
    { year: '2021', event: 'Facility upgrade with new stabling complex' },
    { year: '2023', event: 'Reached 500+ student milestone' }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-forest-800 to-forest-600">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/hors_and_babyhorse.png" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-cream-300 font-medium tracking-wider uppercase text-sm">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mt-2 mb-6">
              About Lucie Hill Equestrian
            </h1>
            <p className="text-xl text-cream-100 leading-relaxed">
              A passion for horses and dedication to excellence have driven us for over 15 years.
              Learn about our journey and the values that guide everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="/hero.png" 
                alt="Lucie Hill" 
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
                Meet the Founder
              </span>
              <h2 className="section-title mt-2">Lucie Hill</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Lucie's love affair with horses began at the age of five when she first sat on a pony 
                at her grandmother's property. That moment sparked a lifelong passion that has taken 
                her from competitive rider to respected coach and trainer.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                After competing successfully through the levels in dressage and spending several years 
                training in Europe with some of the sport's most respected names, Lucie returned to 
                Australia with a vision: to establish a centre of excellence in classical dressage 
                that would be accessible to riders of all levels.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Located in Mount Gambier, South Australia, Lucie Hill Equestrian has been the realisation of that dream. With over 15 years of 
                teaching experience and hundreds of students ranging from enthusiastic beginners to 
                successful competitors, Lucie continues to share her knowledge and passion with 
                every rider who comes through the gates.
              </p>
              <blockquote className="border-l-4 border-forest-500 pl-4 italic text-gray-700">
                "My goal is simple: to help every rider discover the joy of true partnership with 
                their horse. When horse and rider work together in harmony, magic happens."
              </blockquote>
              <p className="text-forest-700 font-medium mt-2">— Lucie Hill</p>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
                Credentials
              </span>
              <h2 className="section-title mt-2">Qualifications & Certifications</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Professional standards and ongoing education ensure you receive the highest 
                quality instruction. Our team maintains current certifications and regularly 
                attends professional development.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {qualifications.map((qual, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                    <Award className="w-5 h-5 text-forest-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{qual}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="/banner.jpg" 
                alt="Training at Lucie Hill Equestrian" 
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-forest-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-forest-300 font-medium tracking-wider uppercase text-sm">
              Our Approach
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mt-2 mb-6">
              Teaching Philosophy
            </h2>
            <p className="text-forest-100 text-lg leading-relaxed">
              We believe that successful riding is built on a foundation of trust, understanding, 
              and communication between horse and rider. Our teaching philosophy centres on three 
              key principles:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Feel Before Technique</h3>
              <p className="text-forest-200 text-sm">
                Understanding what the horse is doing beneath you is the foundation of effective riding.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Progressive Development</h3>
              <p className="text-forest-200 text-sm">
                Building skills systematically ensures lasting progress without gaps in understanding.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-forest-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Positive Partnership</h3>
              <p className="text-forest-200 text-sm">
                Horses thrive when treated with kindness and respect. This shapes all our training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              What We Stand For
            </span>
            <h2 className="section-title mt-2">Our Values</h2>
            <p className="section-subtitle">
              These core values guide everything we do at Lucie Hill Equestrian
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-forest-100 rounded-lg flex items-center justify-center text-forest-600">
                  {value.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              Our Journey
            </span>
            <h2 className="section-title mt-2">Timeline</h2>
          </div>

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-forest-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.year}
                  </div>
                  {index !== timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-forest-200 mt-2" />
                  )}
                </div>
                <div className="flex-grow pb-8">
                  <p className="text-gray-700 font-medium">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              Where We Train
            </span>
            <h2 className="section-title mt-2">Our Facilities</h2>
            <p className="section-subtitle">
              Modern amenities in a beautiful Mount Gambier, South Australia setting
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <img 
              src="/hero.png" 
              alt="Dressage Arena" 
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
            <img 
              src="/banner.jpg" 
              alt="Stables" 
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
            <img 
              src="/hors_and_babyhorse.png" 
              alt="Paddocks" 
              className="rounded-xl shadow-lg w-full h-64 object-cover"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { label: '60x20m', desc: 'Covered Arena' },
              { label: '20', desc: 'Stables' },
              { label: '50', desc: 'Acres of Paddocks' },
              { label: '2', desc: 'Round Yards' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl font-serif font-bold text-forest-700">{stat.label}</p>
                <p className="text-gray-600">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-saddle-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Come Visit Us
          </h2>
          <p className="text-saddle-100 text-lg max-w-2xl mx-auto mb-8">
            We'd love to show you around our facilities and discuss how we can help you 
            achieve your riding goals. Book a visit today!
          </p>
          <Link to="/booking" className="btn-primary bg-white text-saddle-800 hover:bg-cream-100 text-lg px-8 py-4">
            <Calendar size={20} />
            Schedule a Visit
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About
