import { Link } from 'react-router-dom';
import { Heart, Leaf, Users, ArrowRight, ShieldCheck, Clock, MapPin, ChevronRight, Star } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const stats = [
  { value: '50,000+', label: 'Meals Donated', icon: Heart },
  { value: '2,500+', label: 'Active Donors', icon: Users },
  { value: '500+', label: 'NGO Partners', icon: ShieldCheck },
  { value: '100+', label: 'Cities Covered', icon: MapPin },
];

const features = [
  {
    icon: Clock,
    title: 'Real-Time Donations',
    description: 'List your surplus food in seconds and get it to those who need it within hours.',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
  },
  {
    icon: MapPin,
    title: 'Location-Based Matching',
    description: 'Our smart system connects donors with nearby NGOs and recipients for quick pickup.',
    color: 'from-emerald-400 to-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: ShieldCheck,
    title: 'Verified NGOs',
    description: 'All recipient organizations are verified to ensure your donations reach genuine causes.',
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Leaf,
    title: 'Reduce Food Waste',
    description: 'Join the movement to reduce food waste while feeding the hungry in your community.',
    color: 'from-green-400 to-green-600',
    bg: 'bg-green-50',
  },
];

const howItWorks = [
  { step: '01', title: 'Register', desc: 'Create your account as a donor, NGO, or recipient in under 2 minutes.' },
  { step: '02', title: 'List or Browse', desc: 'Donors list surplus food. NGOs and recipients browse available donations nearby.' },
  { step: '03', title: 'Connect & Collect', desc: 'Coordinate pickup and ensure food reaches those who need it most.' },
];

const testimonials = [
  {
    name: 'Anita Deshmukh',
    role: 'NGO Coordinator, Mumbai',
    text: 'FeedForward has transformed how we receive food donations. We now get fresh meals daily for our shelter.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Restaurant Owner, Delhi',
    text: 'Instead of throwing away excess food, I now donate it through FeedForward. It feels great to help others.',
    rating: 5,
  },
  {
    name: 'Meera Joshi',
    role: 'Community Worker, Bangalore',
    text: 'The platform is incredibly easy to use. We\'ve fed thousands of people thanks to FeedForward\'s network.',
    rating: 5,
  },
];

export default function Landing() {
  const { isAuthenticated, user } = useAuth();

  const getStartedLink = () => {
    if (isAuthenticated && user) {
      return user.role === 'donor' ? '/donor/dashboard' : '/recipient/dashboard';
    }
    return '/register';
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.08),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                <Leaf className="w-4 h-4" />
                Fighting Hunger, Reducing Waste
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight tracking-tight">
                Share Food,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-700">
                  Spread Hope
                </span>
              </h1>
              <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                FeedForward connects food donors with NGOs and people in need. Together, we can eliminate hunger and reduce food waste — one meal at a time.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to={getStartedLink()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-300"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/browse"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:text-emerald-600 transition-all"
                >
                  Browse Donations
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-slate-900 group">
                <img 
                  src="/images/hero-food.jpg" 
                  alt="Volunteers donating food" 
                  className="w-full h-72 sm:h-80 object-cover object-center opacity-85 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white font-medium text-xs">
                      Live Network
                    </span>
                    <span className="text-emerald-300 text-xs font-medium">• Active Pickup</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">Make a Difference Today</h2>
                  <p className="text-slate-300 text-sm mb-6 max-w-md">Join thousands of donors making a concrete impact in reducing daily food waste.</p>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.slice(0, 2).map((stat) => (
                      <div key={stat.label} className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                        <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-emerald-300 font-medium">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-amber-400 rounded-full opacity-20 blur-2xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-400 rounded-full opacity-20 blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 mb-3">
                  <stat.icon className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">How FeedForward Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Our platform makes it simple to donate surplus food or find donations near you.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {howItWorks.map((item, idx) => (
              <div key={item.step} className="relative text-center">
                {idx < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-emerald-200 to-transparent" />
                )}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-lg shadow-emerald-200">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-100 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 bg-gradient-to-br ${feature.color} bg-clip-text text-transparent`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">What People Say</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Hear from our community of donors, NGOs, and recipients.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-emerald-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Join FeedForward today and be part of the solution to hunger and food waste.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl hover:bg-emerald-50 transition-all shadow-lg"
            >
              Join as Donor
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-emerald-500 text-white font-semibold rounded-xl border-2 border-emerald-400 hover:bg-emerald-400 transition-all"
            >
              Register as NGO
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
