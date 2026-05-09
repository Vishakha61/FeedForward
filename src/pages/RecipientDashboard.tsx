import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Search, MapPin, Calendar, Users, Package, Leaf, Clock, CheckCircle2, TrendingUp, ArrowRight, Building2 } from 'lucide-react';

const availableDonations = [
  { _id: '1', foodType: 'Rice & Dal', quantity: '30 kg', servings: 60, city: 'Mumbai', donorName: 'Rahul Sharma', category: 'cooked', status: 'available', createdAt: '2 hours ago', dietaryInfo: ['vegetarian'] },
  { _id: '2', foodType: 'Fresh Vegetables', quantity: '20 kg', servings: 40, city: 'Delhi', donorName: 'Amit Gupta', category: 'produce', status: 'available', createdAt: '5 hours ago', dietaryInfo: ['vegan', 'gluten-free'] },
  { _id: '3', foodType: 'Bread Loaves', quantity: '50 loaves', servings: 100, city: 'Bangalore', donorName: 'Sunil Kumar', category: 'bakery', status: 'available', createdAt: '1 day ago', dietaryInfo: ['vegetarian'] },
  { _id: '4', foodType: 'Packaged Meals', quantity: '100 packets', servings: 100, city: 'Mumbai', donorName: 'Priya Foods', category: 'packaged', status: 'available', createdAt: '3 hours ago', dietaryInfo: ['halal'] },
];

const collectedDonations = [
  { _id: '5', foodType: 'Fruit Basket', quantity: '15 kg', servings: 30, city: 'Mumbai', donorName: 'Rahul Sharma', status: 'collected', createdAt: '2025-01-14', category: 'produce' },
];

export default function RecipientDashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'available' | 'collected'>('available');

  const stats = [
    { icon: Package, label: 'Meals Received', value: '45', color: 'from-emerald-400 to-emerald-600', bg: 'bg-emerald-50' },
    { icon: Users, label: 'People Served', value: '350+', color: 'from-blue-400 to-blue-600', bg: 'bg-blue-50' },
    { icon: CheckCircle2, label: 'Active Requests', value: '3', color: 'from-amber-400 to-amber-600', bg: 'bg-amber-50' },
    { icon: TrendingUp, label: 'NGO Rating', value: '4.8 ★', color: 'from-purple-400 to-purple-600', bg: 'bg-purple-50' },
  ];

  const filtered = availableDonations.filter(
    (d) =>
      d.foodType.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase()) ||
      d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Welcome, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              {user?.role === 'ngo' && <Building2 className="w-4 h-4" />}
              {user?.organization || `${user?.role} dashboard`} • {user?.city || 'Your City'}
            </p>
          </div>
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200"
          >
            <Search className="w-5 h-5" />
            Find Food Nearby
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* View Toggle & Search */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex bg-white rounded-xl border border-slate-200 p-1">
                <button
                  onClick={() => setView('available')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    view === 'available' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Available Donations
                </button>
                <button
                  onClick={() => setView('collected')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    view === 'collected' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Collected
                </button>
              </div>
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by food, city, or category..."
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Donation Cards */}
            {view === 'available' ? (
              <div className="space-y-4">
                {filtered.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
                    <Leaf className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500">No donations match your search.</p>
                  </div>
                ) : (
                  filtered.map((donation) => (
                    <div key={donation._id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                            <Package className="w-6 h-6 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{donation.foodType}</h3>
                            <p className="text-xs text-slate-400">Donated by {donation.donorName}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                              <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {donation.quantity}</span>
                              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {donation.servings} servings</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {donation.city}</span>
                              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {donation.createdAt}</span>
                            </div>
                            {donation.dietaryInfo.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {donation.dietaryInfo.map((tag) => (
                                  <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium capitalize">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition-all shrink-0">
                          Request Pickup
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {collectedDonations.map((donation) => (
                  <div key={donation._id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{donation.foodType}</h3>
                        <p className="text-xs text-slate-400">From {donation.donorName}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Package className="w-3.5 h-3.5" /> {donation.quantity}</span>
                          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {donation.servings} servings</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {donation.createdAt}</span>
                        </div>
                      </div>
                      <span className="ml-auto px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        Collected
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{user?.name}</h3>
                  <p className="text-xs text-slate-500 capitalize">
                    {user?.role === 'ngo' ? 'NGO / Charity' : user?.role}
                  </p>
                </div>
              </div>
              <div className="space-y-2.5 text-sm border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Organization</span>
                  <span className="font-medium text-slate-700">{user?.organization || 'Individual'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">City</span>
                  <span className="font-medium text-slate-700">{user?.city || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Member Since</span>
                  <span className="font-medium text-slate-700">{new Date(user?.createdAt || '').toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/browse" className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm font-medium text-slate-700 hover:text-emerald-700">
                  <Search className="w-4 h-4" />
                  Browse All Donations
                </Link>
                <Link to="/contact" className="flex items-center gap-3 p-3 rounded-xl hover:bg-emerald-50 transition-colors text-sm font-medium text-slate-700 hover:text-emerald-700">
                  <ArrowRight className="w-4 h-4" />
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
