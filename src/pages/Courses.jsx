import { Link } from 'react-router-dom'
import { 
  ArrowRight, 
  CheckCircle, 
  Users,
  User,
  Clock,
  Calendar,
  Baby,
  Briefcase
} from 'lucide-react'

/**
 * Courses Page Component
 * Information about riding lessons and lesson types
 */
function Courses() {
  // Types of lessons offered
  const lessonTypes = [
    {
      icon: <User className="w-8 h-8" />,
      title: 'Private Lessons',
      description: 'One-on-one instruction tailored to your specific goals and learning pace.',
      duration: '45 minutes',
      price: '$95',
      features: [
        'Personalised attention',
        'Flexible scheduling',
        'Customised curriculum',
        'Detailed progress tracking',
        'Video analysis included'
      ],
      best: 'Fastest progress'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Semi-Private Lessons',
      description: 'Lessons for 2 riders of similar ability. A perfect balance of attention and social learning.',
      duration: '60 minutes',
      price: '$75',
      features: [
        'Maximum 2 riders',
        'Similar skill levels',
        'Interactive learning',
        'Cost-effective option',
        'Peer motivation'
      ],
      best: 'Great value'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Group Lessons',
      description: 'Small group lessons perfect for learning in a social, supportive environment.',
      duration: '60 minutes',
      price: '$55',
      features: [
        'Maximum 4 riders',
        'Social atmosphere',
        'Learn from others',
        'Most affordable',
        'Fun and engaging'
      ],
      best: 'Most social'
    }
  ]

  // Age-specific programs
  const agePrograms = [
    {
      icon: <Baby className="w-6 h-6" />,
      title: 'Little Riders (5-8 years)',
      description: 'Gentle introduction to horses and riding for our youngest riders.',
      details: [
        'Horse safety and care basics',
        'Balance and confidence building',
        'Lead rein and early independent riding',
        'Fun games on horseback',
        'Small ponies matched to size'
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Junior Riders (9-16 years)',
      description: 'Structured programs for developing riders with competition pathway options.',
      details: [
        'Progressive skill development',
        'Introduction to dressage and jumping',
        'Horse care responsibility',
        'Pony Club preparation',
        'Competition opportunities'
      ]
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Adult Riders (17+ years)',
      description: 'Programs for adults of all abilities, from first-timers to returning riders.',
      details: [
        'Beginner-friendly environment',
        'Flexible scheduling for busy adults',
        'Fitness-appropriate approach',
        'No previous experience required',
        'Stress-relieving recreation'
      ]
    }
  ]

  // Weekly schedule
  const schedule = [
    { day: 'Monday', times: ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'] },
    { day: 'Tuesday', times: ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'] },
    { day: 'Wednesday', times: ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'] },
    { day: 'Thursday', times: ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM', '6:00 PM'] },
    { day: 'Friday', times: ['8:00 AM', '10:00 AM', '2:00 PM', '4:00 PM'] },
    { day: 'Saturday', times: ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
    { day: 'Sunday', times: ['By appointment'] }
  ]

  // Required equipment
  const equipment = [
    { item: 'Approved riding helmet', note: 'Available for loan' },
    { item: 'Boots with small heel', note: 'Jodhpur boots or similar' },
    { item: 'Long pants', note: 'Jodhpurs preferred' },
    { item: 'Gloves', note: 'Optional but recommended' }
  ]

  // Packages
  const packages = [
    { lessons: 5, discount: '5%', price: '$451', type: 'Private' },
    { lessons: 10, discount: '10%', price: '$855', type: 'Private' },
    { lessons: 5, discount: '5%', price: '$356', type: 'Semi-Private' },
    { lessons: 10, discount: '10%', price: '$675', type: 'Semi-Private' }
  ]

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-saddle-800 to-saddle-600">
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
              Learn to Ride
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mt-2 mb-6">
              Riding Lessons for All Ages & Abilities
            </h1>
            <p className="text-xl text-cream-100 leading-relaxed">
              From first-time riders to experienced equestrians, our comprehensive lesson 
              programs help you achieve your riding goals in a safe, supportive environment.
            </p>
          </div>
        </div>
      </section>

      {/* Lesson Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              Lesson Options
            </span>
            <h2 className="section-title mt-2">Choose Your Lesson Type</h2>
            <p className="section-subtitle">
              Flexible options to suit your learning style and budget
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {lessonTypes.map((type, index) => (
              <div key={index} className="card p-8 flex flex-col relative">
                {type.best && (
                  <span className="absolute top-4 right-4 bg-forest-100 text-forest-700 text-xs font-medium px-3 py-1 rounded-full">
                    {type.best}
                  </span>
                )}
                <div className="text-forest-600 mb-4">
                  {type.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {type.duration}
                  </span>
                </div>
                <ul className="space-y-2 mb-6 flex-grow">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-100">
                  <p className="text-3xl font-bold text-forest-700">
                    {type.price}
                    <span className="text-sm font-normal text-gray-500">/lesson</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Programs */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              Age-Appropriate Programs
            </span>
            <h2 className="section-title mt-2">Lessons for Every Stage</h2>
            <p className="section-subtitle">
              Tailored instruction that respects each rider's unique needs and abilities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {agePrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-saddle-100 text-saddle-600 rounded-full mb-4">
                  {program.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {program.description}
                </p>
                <ul className="space-y-2">
                  {program.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-saddle-600 flex-shrink-0 mt-0.5" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Schedule */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
              When We Ride
            </span>
            <h2 className="section-title mt-2">Weekly Schedule</h2>
            <p className="section-subtitle">
              Convenient lesson times to fit your busy lifestyle
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-forest-50">
                  <th className="px-4 py-3 text-left font-semibold text-forest-800">Day</th>
                  <th className="px-4 py-3 text-left font-semibold text-forest-800">Available Times</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((day, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-gray-800">{day.day}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <div className="flex flex-wrap gap-2">
                        {day.times.map((time, i) => (
                          <span key={i} className="bg-cream-100 px-3 py-1 rounded-full text-sm">
                            {time}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Additional times may be available. Please contact us for specific requirements.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-forest-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-forest-300 font-medium tracking-wider uppercase text-sm">
              Save More
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mt-2 mb-4">
              Lesson Packages
            </h2>
            <p className="text-forest-100 text-lg max-w-2xl mx-auto">
              Commit to your riding journey and save with our discounted packages
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center">
                <p className="text-sm text-gray-500 mb-1">{pkg.type}</p>
                <p className="text-4xl font-bold text-forest-700 mb-2">{pkg.lessons}</p>
                <p className="text-sm text-gray-600 mb-4">Lesson Package</p>
                <p className="text-lg font-semibold text-gray-800">{pkg.price}</p>
                <p className="text-sm text-forest-600 font-medium">Save {pkg.discount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-forest-600 font-medium tracking-wider uppercase text-sm">
                What to Bring
              </span>
              <h2 className="section-title mt-2">Required Equipment</h2>
              <p className="text-gray-600 mb-8">
                Safety is our priority. Please ensure you have the following equipment for your lessons. 
                Don't worry if you're just starting out – we have helmets available to loan.
              </p>
              
              <div className="space-y-4">
                {equipment.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm">
                    <CheckCircle className="w-5 h-5 text-forest-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">{item.item}</p>
                      <p className="text-sm text-gray-500">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img 
                src="/banner.jpg" 
                alt="Riding Equipment" 
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-saddle-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to Start Riding?
          </h2>
          <p className="text-saddle-100 text-lg max-w-2xl mx-auto mb-8">
            Book your first lesson today and begin your equestrian journey. 
            No experience necessary – just a love of horses!
          </p>
          <Link to="/booking" className="btn-primary bg-white text-saddle-800 hover:bg-cream-100 text-lg px-8 py-4">
            <Calendar size={20} />
            Book Your Lesson
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Courses
