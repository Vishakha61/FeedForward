import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PlusCircle, Package, CheckCircle2, TrendingUp, Users, MapPin, Calendar, ArrowRight, Leaf, BarChart3, Award, Flame, Trophy, Download } from 'lucide-react';

const mockDonations = [
  { _id: '1', foodType: 'Rice & Curry', quantity: '25 kg', status: 'available', servings: 50, city: 'Mumbai', createdAt: '2025-01-15', category: 'cooked' },
  { _id: '2', foodType: 'Bread & Pastries', quantity: '15 kg', status: 'collected', servings: 30, city: 'Mumbai', createdAt: '2025-01-14', category: 'bakery' },
  { _id: '3', foodType: 'Vegetables', quantity: '10 kg', status: 'reserved', servings: 20, city: 'Mumbai', createdAt: '2025-01-13', category: 'produce' },
  { _id: '4', foodType: 'Packaged Snacks', quantity: '50 packets', status: 'available', servings: 100, city: 'Mumbai', createdAt: '2025-01-12', category: 'packaged' },
];

const stats = [
  { icon: Package, label: 'Total Donations', value: '24', color: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-50' },
  { icon: CheckCircle2, label: 'Collected', value: '18', color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50' },
  { icon: Users, label: 'People Fed', value: '1,200+', color: 'from-amber-400 to-amber-600', bg: 'bg-amber-50' },
  { icon: TrendingUp, label: 'Impact Score', value: '94%', color: 'from-purple-400 to-purple-600', bg: 'bg-purple-50' },
];

export default function DonorDashboard() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');

  const filteredDonations = filter === 'all'
    ? mockDonations
    : mockDonations.filter((d) => d.status === filter);

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      available: 'bg-emerald-100 text-emerald-700',
      reserved: 'bg-amber-100 text-amber-700',
      collected: 'bg-blue-100 text-blue-700',
      expired: 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome back, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-slate-500 mt-1">Here's your donation overview and impact.</p>
          </div>
          <Link
            to="/donor/donate"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200"
          >
            <PlusCircle className="w-5 h-5" />
            New Donation
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donations List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {['all', 'available', 'reserved', 'collected'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                    filter === f
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Donations */}
            <div className="space-y-4">
              {filteredDonations.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                  <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No donations found.</p>
                </div>
              ) : (
                filteredDonations.map((donation) => (
                  <div
                    key={donation._id}
                    className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                          <Leaf className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{donation.foodType}</h3>
                          <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Package className="w-3.5 h-3.5" /> {donation.quantity}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3.5 h-3.5" /> {donation.servings} servings
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {donation.city}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {donation.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize shrink-0 ${statusBadge(donation.status)}`}>
                        {donation.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  to="/donor/donate"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm font-medium text-slate-700 hover:text-emerald-700"
                >
                  <PlusCircle className="w-4 h-4" />
                  Create New Donation
                </Link>
                <Link
                  to="/browse"
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm font-medium text-slate-700 hover:text-emerald-700"
                >
                  <ArrowRight className="w-4 h-4" />
                  Browse All Donations
                </Link>
              </div>
            </div>

            {/* Achievements Preview */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                Your Achievements
              </h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="flex flex-col items-center p-2 bg-amber-50 rounded-xl">
                  <span className="text-lg">🏅</span>
                  <span className="text-[9px] font-semibold text-amber-800 mt-1 text-center leading-tight">First Step</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-yellow-50 rounded-xl">
                  <span className="text-lg">⭐</span>
                  <span className="text-[9px] font-semibold text-yellow-800 mt-1 text-center leading-tight">Generous Soul</span>
                </div>
                <div className="flex flex-col items-center p-2 bg-orange-50 rounded-xl">
                  <span className="text-lg">🔥</span>
                  <span className="text-[9px] font-semibold text-orange-800 mt-1 text-center leading-tight">Weekly Streak</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs bg-slate-50 rounded-xl p-3 mb-3">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Flame className="w-3.5 h-3.5 text-orange-500" />
                  Current Streak
                </div>
                <span className="font-bold text-orange-600">22 Days 🔥</span>
              </div>
              <Link
                to="/profile"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 text-yellow-800 text-xs font-bold rounded-xl hover:from-yellow-100 hover:to-amber-100 transition-all"
              >
                <Award className="w-3.5 h-3.5" />
                View All Badges & Certificate
              </Link>
            </div>

            {/* Download Certificate Quick */}
            <Link
              to="/profile"
              className="block bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-200 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Download className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-purple-900">Impact Certificate</p>
                  <p className="text-[10px] text-purple-600 mt-0.5">Download your personalized PDF →</p>
                </div>
              </div>
            </Link>

            {/* Impact Summary */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Leaf className="w-4 h-4" />
                Your Impact
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-emerald-200">People Fed</div>
                  <div className="text-2xl font-bold">1,200+</div>
                </div>
                <div>
                  <div className="text-sm text-emerald-200">Food Saved (kg)</div>
                  <div className="text-2xl font-bold">480 kg</div>
                </div>
                <div>
                  <div className="text-sm text-emerald-200">CO₂ Emissions Prevented</div>
                  <div className="text-2xl font-bold">1,200 kg</div>
                </div>
              </div>
            </div>

            {/* Profile */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Profile</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Name</span>
                  <span className="font-medium text-slate-700">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Email</span>
                  <span className="font-medium text-slate-700">{user?.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Role</span>
                  <span className="font-medium text-slate-700 capitalize">{user?.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location</span>
                  <span className="font-medium text-slate-700">{user?.city || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
