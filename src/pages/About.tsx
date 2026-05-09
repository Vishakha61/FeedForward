import { Heart, Target, Eye, Shield, Users, Leaf } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Compassion', desc: 'We believe in the power of kindness and community support to transform lives.' },
  { icon: Target, title: 'Impact', desc: 'Every meal donated is a step toward eliminating hunger in our communities.' },
  { icon: Shield, title: 'Trust', desc: 'We build trust through transparency, verification, and accountability.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Reducing food waste while feeding the hungry creates a sustainable future for all.' },
];

const team = [
  { name: 'Your Name', role: 'Project Lead', bio: 'Final year student passionate about using technology for social good.' },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-16 h-16 text-emerald-300 mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">About FeedForward</h1>
          <p className="text-emerald-100 text-lg max-w-3xl mx-auto leading-relaxed">
            A platform built to bridge the gap between food surplus and food scarcity. 
            We connect generous donors with NGOs and individuals who need it most.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100">
              <Eye className="w-10 h-10 text-emerald-600 mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                A world where no one goes hungry and surplus food never goes to waste. We envision communities 
                connected through a seamless network of food sharing, where every excess meal finds its way to 
                someone in need.
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <Target className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To create a reliable, efficient platform that connects food donors directly with verified NGOs 
                and recipients. We aim to reduce food waste by 40% in our partner communities while ensuring 
                timely distribution of nutritious meals to those facing food insecurity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Started */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Users className="w-12 h-12 text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-6">How FeedForward Started</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              FeedForward was born as a final year engineering project with a simple yet powerful mission: 
              to leverage technology for solving the dual problems of food waste and hunger. Every day, 
              millions of tons of edible food are discarded while millions of people go to bed hungry.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              We realized that the gap wasn't in the availability of food or the willingness to help — 
              it was in the connection. FeedForward bridges this gap by providing a user-friendly platform 
              where donors can instantly list surplus food, and verified NGOs and recipients can easily 
              find and claim these donations.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Built with the MERN stack (MongoDB, Express.js, React, Node.js), FeedForward represents 
              the perfect blend of modern technology and social impact — proving that code can indeed 
              change lives.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Meet the Team</h2>
          <div className="flex justify-center">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 max-w-sm">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                <p className="text-emerald-600 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-sm text-slate-500">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
