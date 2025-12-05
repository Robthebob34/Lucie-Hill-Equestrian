import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle, 
  Award,
  Target,
  TrendingUp,
  Calendar
} from 'lucide-react'

/**
 * Dressage Page Component
 * Detailed information about dressage training services
 */
function Dressage() {
  // Dressage levels offered
  const levels = [
    {
      name: 'Foundation',
      subtitle: 'For beginners',
      description: 'Build a solid foundation in classical dressage. Learn the basics of balance, rhythm, and connection with your horse.',
      skills: [
        'Basic seat and position',
        'Understanding aids',
        'Walk, trot, canter basics',
        'Simple transitions',
        'Basic arena figures'
      ],
      duration: '10-session program',
      price: '$85'
    },
    {
      name: 'Developing',
      subtitle: 'Preliminary to Novice',
      description: 'Advance your skills with more complex movements and improved accuracy. Suitable for riders with basic experience.',
      skills: [
        'Lengthening and shortening strides',
        'Leg yielding',
        'Counter canter introduction',
        'Medium gaits',
        'Test preparation'
      ],
      duration: '12-session program',
      price: '$95'
    },
    {
      name: 'Intermediate',
      subtitle: 'Elementary to Medium',
      description: 'Refine your technique with lateral work and collection. For experienced riders seeking competition success.',
      skills: [
        'Shoulder-in and haunches-in',
        'Half-pass at trot',
        'Simple changes',
        'Collection development',
        'Advanced test riding'
      ],
      duration: '12-session program',
      price: '$110'
    },
    {
      name: 'Advanced',
      subtitle: 'Advanced to Grand Prix',
      description: 'Master the highest levels of dressage with piaffe, passage, and flying changes. For dedicated competitive riders.',
      skills: [
        'Flying changes (single to tempis)',
        'Piaffe and passage',
        'Pirouettes',
        'Grand Prix movements',
        'International competition prep'
      ],
      duration: 'Customised program',
      price: '$150'
    }
  ]

  // Training methodology points
  const methodology = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Classical Principles',
      description: 'We follow the principles of classical dressage as outlined by the German training scale, ensuring systematic and horse-friendly training.'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Progressive Training',
      description: 'Each session builds upon the last, with clear goals and measurable progress. We never rush development at the expense of correctness.'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Competition Success',
      description: 'Our structured approach produces confident, well-trained combinations ready to excel in the competition arena.'
    }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-forest-900 to-forest-700">
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
              Our Specialty
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mt-2 mb-6">
              Classical Dressage Training
            </h1>
            <p className="text-xl text-cream-100 leading-relaxed">
              Experience the art of dressage through expert instruction rooted in classical 
              principles. We develop harmonious partnerships between horse and rider at every level.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">The Art of Dressage</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Dressage, often called "horse ballet," is the highest expression of horse training. 
                At Lucie Hill Equestrian, we are passionate about preserving and teaching the 
                classical methods that develop a horse's natural athletic ability while creating 
                a willing partnership with the rider.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our dressage program is suitable for all levels, from those taking their first 
                steps in the discipline to advanced riders preparing for Grand Prix competition. 
                We focus on correct, systematic training that benefits both horse and rider.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/booking" className="btn-primary">
                  Start Training
                  <ArrowRight size={18} />
                </Link>
                <Link to="/about" className="btn-outline">
                  Meet Our Team
                </Link>
              </div>
            </div>
            <div>
              <img 
                src="/hero.png" 
                alt="Dressage Training" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              Our Approach
            </span>
            <h2 className="section-title mt-2">Training Methodology</h2>
            <p className="section-subtitle">
              Systematic, horse-friendly training based on classical principles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {methodology.map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-forest-100 text-forest-600 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-serif font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* German Training Scale */}
          <div className="mt-16 bg-forest-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-serif font-bold text-forest-800 text-center mb-8">
              The German Training Scale
            </h3>
            <div className="grid md:grid-cols-6 gap-4">
              {['Rhythm', 'Suppleness', 'Contact', 'Impulsion', 'Straightness', 'Collection'].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-forest-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-2">
                    {index + 1}
                  </div>
                  <p className="text-sm font-medium text-forest-800">{step}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-8 max-w-2xl mx-auto">
              Our training follows the proven German training scale, building each quality 
              systematically to develop a well-rounded, happy, and athletic horse.
            </p>
          </div>
        </div>
      </section>

      {/* Training Levels & Pricing */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              Programs & Pricing
            </span>
            <h2 className="section-title mt-2">Training Levels</h2>
            <p className="section-subtitle">
              Structured programs tailored to your current level and goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {levels.map((level, index) => (
              <div key={index} className="card p-6 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-serif font-bold text-forest-800">
                    {level.name}
                  </h3>
                  <p className="text-sm text-saddle-600">{level.subtitle}</p>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {level.description}
                </p>
                <ul className="space-y-2 mb-6 flex-grow">
                  {level.skills.map((skill, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                      {skill}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">{level.duration}</p>
                  <p className="text-2xl font-bold text-forest-700">
                    {level.price}
                    <span className="text-sm font-normal text-gray-500">/session</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            All prices are in AUD and include arena hire. Packages available for multiple bookings.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              In Action
            </span>
            <h2 className="section-title mt-2">Dressage Gallery</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2 md:row-span-2">
              <img 
                src="/hero.png" 
                alt="Dressage Training" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <img 
                src="/banner.jpg" 
                alt="Dressage Arena" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <img 
                src="/hors_and_babyhorse.png" 
                alt="Our Horses" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Begin Your Dressage Journey
          </h2>
          <p className="text-forest-100 text-lg max-w-2xl mx-auto mb-8">
            Whether you're a complete beginner or looking to advance your skills, 
            we have the right program for you. Book your assessment lesson today.
          </p>
          <Link to="/booking" className="btn-primary bg-white text-forest-800 hover:bg-cream-100 text-lg px-8 py-4">
            <Calendar size={20} />
            Book Your Assessment
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Dressage
