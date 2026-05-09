import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/utils/cn';
import {
  LayoutDashboard, Users, Package, ShieldCheck, Settings, TrendingUp,
  Search, CheckCircle2, XCircle, Clock, Eye, Trash2,
  UserCheck, UserX, AlertTriangle, Activity, ArrowUpRight, ArrowDownRight,
  Leaf, MapPin, Mail, Phone, Calendar, Download, RefreshCw, Bell
} from 'lucide-react';

// ─── MOCK DATA ─────────────────────────────────────────────
const MOCK_USERS = [
  { _id: 'u1', name: 'Rahul Sharma', email: 'rahul@demo.com', role: 'donor', city: 'Mumbai', phone: '9876543210', status: 'active', donations: 24, createdAt: '2024-11-02', verified: true },
  { _id: 'u2', name: 'Hope Foundation', email: 'hope@demo.com', role: 'ngo', city: 'Delhi', phone: '9876543211', status: 'active', donations: 0, createdAt: '2024-10-15', verified: true, organization: 'Hope Foundation NGO' },
  { _id: 'u3', name: 'Priya Patel', email: 'priya@demo.com', role: 'recipient', city: 'Bangalore', phone: '9876543212', status: 'active', donations: 0, createdAt: '2024-12-01', verified: true },
  { _id: 'u4', name: 'Aman Singh', email: 'aman@test.com', role: 'donor', city: 'Pune', phone: '9123456789', status: 'active', donations: 12, createdAt: '2024-12-20', verified: true },
  { _id: 'u5', name: 'FeedMore NGO', email: 'feedmore@ngo.org', role: 'ngo', city: 'Chennai', phone: '9988776655', status: 'pending', donations: 0, createdAt: '2025-01-05', verified: false, organization: 'FeedMore Trust' },
  { _id: 'u6', name: 'Sneha Reddy', email: 'sneha@mail.com', role: 'recipient', city: 'Hyderabad', phone: '9112233445', status: 'active', donations: 0, createdAt: '2025-01-10', verified: true },
  { _id: 'u7', name: 'Vikram Mehta', email: 'vikram@rest.com', role: 'donor', city: 'Mumbai', phone: '9001122334', status: 'suspended', donations: 5, createdAt: '2024-09-15', verified: true },
  { _id: 'u8', name: 'Care4All Foundation', email: 'care4all@ngo.org', role: 'ngo', city: 'Kolkata', phone: '9556677889', status: 'pending', donations: 0, createdAt: '2025-01-18', verified: false, organization: 'Care4All Foundation' },
  { _id: 'u9', name: 'Meera Joshi', email: 'meera@gmail.com', role: 'donor', city: 'Bangalore', phone: '9334455667', status: 'active', donations: 8, createdAt: '2025-01-03', verified: true },
  { _id: 'u10', name: 'Ravi Kumar', email: 'ravi@yahoo.com', role: 'recipient', city: 'Delhi', phone: '9445566778', status: 'active', donations: 0, createdAt: '2025-01-12', verified: true },
];

const MOCK_DONATIONS = [
  { _id: 'd1', foodType: 'Rice & Curry', quantity: '25 kg', servings: 50, city: 'Mumbai', donorName: 'Rahul Sharma', category: 'cooked', status: 'available', createdAt: '2025-01-15' },
  { _id: 'd2', foodType: 'Bread & Pastries', quantity: '15 kg', servings: 30, city: 'Mumbai', donorName: 'Rahul Sharma', category: 'bakery', status: 'collected', createdAt: '2025-01-14' },
  { _id: 'd3', foodType: 'Vegetables', quantity: '10 kg', servings: 20, city: 'Mumbai', donorName: 'Aman Singh', category: 'produce', status: 'reserved', createdAt: '2025-01-13' },
  { _id: 'd4', foodType: 'Packaged Snacks', quantity: '50 packets', servings: 100, city: 'Mumbai', donorName: 'Rahul Sharma', category: 'packaged', status: 'available', createdAt: '2025-01-12' },
  { _id: 'd5', foodType: 'Fresh Fruits', quantity: '15 kg', servings: 30, city: 'Pune', donorName: 'Aman Singh', category: 'produce', status: 'collected', createdAt: '2025-01-11' },
  { _id: 'd6', foodType: 'Biryani', quantity: '40 kg', servings: 80, city: 'Hyderabad', donorName: 'Meera Joshi', category: 'cooked', status: 'available', createdAt: '2025-01-10' },
  { _id: 'd7', foodType: 'Canned Soup', quantity: '200 cans', servings: 200, city: 'Delhi', donorName: 'Vikram Mehta', category: 'packaged', status: 'expired', createdAt: '2024-12-20' },
  { _id: 'd8', foodType: 'Sandwiches', quantity: '75 pieces', servings: 75, city: 'Bangalore', donorName: 'Meera Joshi', category: 'cooked', status: 'collected', createdAt: '2025-01-09' },
];

const MOCK_REPORTS = [
  { _id: 'r1', type: 'spam', reportedBy: 'Sneha Reddy', target: 'Donation: Canned Soup', reason: 'Suspected expired items listed as fresh', date: '2025-01-16', status: 'open' },
  { _id: 'r2', type: 'fraud', reportedBy: 'Priya Patel', target: 'User: Vikram Mehta', reason: 'Fake donor account, never delivers food', date: '2025-01-14', status: 'investigating' },
  { _id: 'r3', type: 'quality', reportedBy: 'Hope Foundation', target: 'Donation: Bread & Pastries', reason: 'Food was stale upon arrival', date: '2025-01-13', status: 'resolved' },
];

type Tab = 'overview' | 'users' | 'donations' | 'ngos' | 'reports' | 'settings';

// ─── COMPONENT ─────────────────────────────────────────────
export default function AdminPanel() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [donationSearch, setDonationSearch] = useState('');
  const [donationFilter, setDonationFilter] = useState('all');

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    { id: 'donations', label: 'Donations', icon: <Package className="w-4 h-4" /> },
    { id: 'ngos', label: 'NGO Verification', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  // filtered data
  const filteredUsers = MOCK_USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchFilter = userFilter === 'all' || u.role === userFilter || u.status === userFilter;
    return matchSearch && matchFilter;
  });

  const filteredDonations = MOCK_DONATIONS.filter(d => {
    const matchSearch = d.foodType.toLowerCase().includes(donationSearch.toLowerCase()) || d.donorName.toLowerCase().includes(donationSearch.toLowerCase());
    const matchFilter = donationFilter === 'all' || d.status === donationFilter;
    return matchSearch && matchFilter;
  });

  const pendingNGOs = MOCK_USERS.filter(u => u.role === 'ngo' && !u.verified);
  const openReports = MOCK_REPORTS.filter(r => r.status !== 'resolved');

  const statusBadge = (status: string) => {
    const m: Record<string, string> = {
      active: 'bg-emerald-100 text-emerald-700',
      pending: 'bg-amber-100 text-amber-700',
      suspended: 'bg-red-100 text-red-700',
      available: 'bg-emerald-100 text-emerald-700',
      reserved: 'bg-blue-100 text-blue-700',
      collected: 'bg-slate-100 text-slate-600',
      expired: 'bg-red-100 text-red-700',
      open: 'bg-red-100 text-red-700',
      investigating: 'bg-amber-100 text-amber-700',
      resolved: 'bg-emerald-100 text-emerald-700',
    };
    return m[status] || 'bg-slate-100 text-slate-600';
  };

  // ─── OVERVIEW TAB ────────────────────────────────────────
  const renderOverview = () => {
    const stats = [
      { label: 'Total Users', value: '2,847', change: '+12%', up: true, icon: <Users className="w-5 h-5" />, bg: 'bg-blue-50', color: 'text-blue-600' },
      { label: 'Active Donations', value: '342', change: '+28%', up: true, icon: <Package className="w-5 h-5" />, bg: 'bg-emerald-50', color: 'text-emerald-600' },
      { label: 'Meals Served', value: '54,200', change: '+18%', up: true, icon: <Leaf className="w-5 h-5" />, bg: 'bg-amber-50', color: 'text-amber-600' },
      { label: 'Verified NGOs', value: '128', change: '+5', up: true, icon: <ShieldCheck className="w-5 h-5" />, bg: 'bg-purple-50', color: 'text-purple-600' },
      { label: 'Pending Approvals', value: `${pendingNGOs.length}`, change: 'Action needed', up: false, icon: <Clock className="w-5 h-5" />, bg: 'bg-orange-50', color: 'text-orange-600' },
      { label: 'Open Reports', value: `${openReports.length}`, change: 'Review now', up: false, icon: <AlertTriangle className="w-5 h-5" />, bg: 'bg-red-50', color: 'text-red-600' },
    ];

    return (
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', s.bg)}>
                  <span className={s.color}>{s.icon}</span>
                </div>
                <span className={cn('text-xs font-semibold flex items-center gap-0.5', s.up ? 'text-emerald-600' : 'text-amber-600')}>
                  {s.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {s.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Activity + Alerts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" /> Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                { text: 'Rahul Sharma listed 25 kg Rice & Curry', time: '2 hours ago', type: 'donation' },
                { text: 'FeedMore NGO submitted verification request', time: '5 hours ago', type: 'ngo' },
                { text: 'Hope Foundation collected Bread & Pastries', time: '1 day ago', type: 'collected' },
                { text: 'Sneha Reddy reported a donation for spam', time: '1 day ago', type: 'report' },
                { text: 'Aman Singh registered as a new donor', time: '2 days ago', type: 'user' },
                { text: 'Care4All Foundation submitted verification', time: '3 days ago', type: 'ngo' },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className={cn('w-2 h-2 rounded-full mt-2 shrink-0',
                    a.type === 'donation' && 'bg-emerald-500',
                    a.type === 'ngo' && 'bg-purple-500',
                    a.type === 'collected' && 'bg-blue-500',
                    a.type === 'report' && 'bg-red-500',
                    a.type === 'user' && 'bg-amber-500',
                  )} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 truncate">{a.text}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts Panel */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-red-500" /> Alerts &amp; Action Items
            </h3>
            <div className="space-y-3">
              {pendingNGOs.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
                    <ShieldCheck className="w-4 h-4" /> {pendingNGOs.length} NGO verification{pendingNGOs.length > 1 ? 's' : ''} pending
                  </div>
                  <p className="text-xs text-amber-700 mt-1">Review and approve or reject NGO applications.</p>
                  <button onClick={() => setActiveTab('ngos')} className="text-xs font-bold text-amber-900 mt-2 hover:underline">Go to NGO Verification →</button>
                </div>
              )}
              {openReports.length > 0 && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-2 text-sm font-semibold text-red-800">
                    <AlertTriangle className="w-4 h-4" /> {openReports.length} open report{openReports.length > 1 ? 's' : ''} to review
                  </div>
                  <p className="text-xs text-red-700 mt-1">User-submitted reports need admin attention.</p>
                  <button onClick={() => setActiveTab('reports')} className="text-xs font-bold text-red-900 mt-2 hover:underline">Go to Reports →</button>
                </div>
              )}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-semibold text-blue-800">
                  <TrendingUp className="w-4 h-4" /> Platform growing at 28% MoM
                </div>
                <p className="text-xs text-blue-700 mt-1">Active donations increased significantly this month.</p>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
                  <Leaf className="w-4 h-4" /> 1,420 kg CO₂ prevented this month
                </div>
                <p className="text-xs text-emerald-700 mt-1">Sustainability goals on track!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ─── USERS TAB ───────────────────────────────────────────
  const renderUsers = () => (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Search users by name or email..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'donor', 'ngo', 'recipient', 'active', 'pending', 'suspended'].map(f => (
            <button key={f} onClick={() => setUserFilter(f)}
              className={cn('px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-all',
                userFilter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              )}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">User</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600 hidden md:table-cell">City</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600 hidden lg:table-cell">Joined</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(u => (
                <tr key={u._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0">
                        {u.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-900 truncate">{u.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn('px-2 py-0.5 rounded-md text-[10px] font-bold uppercase',
                      u.role === 'donor' && 'bg-emerald-100 text-emerald-700',
                      u.role === 'ngo' && 'bg-purple-100 text-purple-700',
                      u.role === 'recipient' && 'bg-blue-100 text-blue-700',
                    )}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 hidden md:table-cell">{u.city}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs hidden lg:table-cell">{u.createdAt}</td>
                  <td className="py-3 px-4">
                    <span className={cn('px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize', statusBadge(u.status))}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button title="View" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      {u.status === 'active' ? (
                        <button title="Suspend" className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                          <UserX className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <button title="Activate" className="p-1.5 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 transition-colors">
                          <UserCheck className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button title="Delete" className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <p className="text-xs text-slate-500">Showing {filteredUsers.length} of {MOCK_USERS.length} users</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-600">Previous</button>
            <button className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-900 text-white">1</button>
            <button className="px-3 py-1 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-600">2</button>
            <button className="px-3 py-1 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── DONATIONS TAB ───────────────────────────────────────
  const renderDonations = () => (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" value={donationSearch} onChange={e => setDonationSearch(e.target.value)} placeholder="Search donations..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'available', 'reserved', 'collected', 'expired'].map(f => (
            <button key={f} onClick={() => setDonationFilter(f)}
              className={cn('px-3 py-2 rounded-lg text-xs font-semibold capitalize transition-all',
                donationFilter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              )}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Food Item</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Donor</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600 hidden md:table-cell">City</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600 hidden md:table-cell">Servings</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-600">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map(d => (
                <tr key={d._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-slate-900">{d.foodType}</p>
                      <p className="text-[10px] text-slate-400">{d.quantity} • {d.category}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{d.donorName}</td>
                  <td className="py-3 px-4 text-slate-500 hidden md:table-cell">{d.city}</td>
                  <td className="py-3 px-4 text-slate-500 hidden md:table-cell">{d.servings}</td>
                  <td className="py-3 px-4">
                    <span className={cn('px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize', statusBadge(d.status))}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button title="View" className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button title="Remove" className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50">
          <p className="text-xs text-slate-500">Showing {filteredDonations.length} of {MOCK_DONATIONS.length} donations</p>
        </div>
      </div>
    </div>
  );

  // ─── NGO VERIFICATION TAB ───────────────────────────────
  const renderNGOs = () => {
    const allNGOs = MOCK_USERS.filter(u => u.role === 'ngo');
    return (
      <div className="space-y-5">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center">
            <div className="text-2xl font-bold text-emerald-600">{allNGOs.filter(n => n.verified).length}</div>
            <div className="text-xs text-slate-500">Verified NGOs</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center">
            <div className="text-2xl font-bold text-amber-600">{pendingNGOs.length}</div>
            <div className="text-xs text-slate-500">Pending Verification</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center">
            <div className="text-2xl font-bold text-slate-600">{allNGOs.length}</div>
            <div className="text-xs text-slate-500">Total NGOs</div>
          </div>
        </div>

        {pendingNGOs.length > 0 && (
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" /> Pending Verification ({pendingNGOs.length})
            </h3>
            <div className="space-y-4">
              {pendingNGOs.map(ngo => (
                <div key={ngo._id} className="bg-white rounded-2xl p-5 border-2 border-amber-200 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg shrink-0">
                        {ngo.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{ngo.name}</h4>
                        <p className="text-xs text-slate-500">{'organization' in ngo ? (ngo as typeof ngo & {organization: string}).organization : ngo.name}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {ngo.email}</span>
                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {ngo.phone}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {ngo.city}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Applied: {ngo.createdAt}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-xs font-bold rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Verified NGOs
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {allNGOs.filter(n => n.verified).map(ngo => (
              <div key={ngo._id} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold shrink-0">
                  {ngo.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{ngo.name}</p>
                  <p className="text-[10px] text-slate-400">{ngo.city} • Verified</p>
                </div>
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ─── REPORTS TAB ─────────────────────────────────────────
  const renderReports = () => (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center">
          <div className="text-2xl font-bold text-red-600">{MOCK_REPORTS.filter(r => r.status === 'open').length}</div>
          <div className="text-xs text-slate-500">Open</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center">
          <div className="text-2xl font-bold text-amber-600">{MOCK_REPORTS.filter(r => r.status === 'investigating').length}</div>
          <div className="text-xs text-slate-500">Investigating</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm text-center">
          <div className="text-2xl font-bold text-emerald-600">{MOCK_REPORTS.filter(r => r.status === 'resolved').length}</div>
          <div className="text-xs text-slate-500">Resolved</div>
        </div>
      </div>

      <div className="space-y-4">
        {MOCK_REPORTS.map(r => (
          <div key={r._id} className={cn('bg-white rounded-2xl p-5 border shadow-sm',
            r.status === 'open' ? 'border-red-200' : r.status === 'investigating' ? 'border-amber-200' : 'border-slate-100'
          )}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase', statusBadge(r.status))}>
                    {r.status}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600 uppercase">{r.type}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{r.target}</h4>
                <p className="text-xs text-slate-500 mt-1">{r.reason}</p>
                <p className="text-[10px] text-slate-400 mt-2">Reported by {r.reportedBy} • {r.date}</p>
              </div>
              {r.status !== 'resolved' && (
                <div className="flex gap-2 shrink-0">
                  {r.status === 'open' && (
                    <button className="px-3 py-1.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg hover:bg-amber-200 transition-colors">
                      Investigate
                    </button>
                  )}
                  <button className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg hover:bg-emerald-200 transition-colors">
                    Resolve
                  </button>
                  <button className="px-3 py-1.5 bg-red-100 text-red-800 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors">
                    Take Action
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ─── SETTINGS TAB ────────────────────────────────────────
  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Platform Settings</h3>
        <div className="space-y-5">
          {[
            { label: 'Platform Name', value: 'FeedForward', type: 'text' },
            { label: 'Support Email', value: 'support@feedforward.org', type: 'email' },
            { label: 'Max Donation Listing Duration', value: '48', type: 'number', suffix: 'hours' },
            { label: 'Auto-expire Stale Donations', value: 'true', type: 'toggle' },
          ].map(s => (
            <div key={s.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <label className="text-sm font-medium text-slate-700">{s.label}</label>
              {s.type === 'toggle' ? (
                <div className="w-12 h-7 bg-emerald-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input type={s.type} defaultValue={s.value}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                  {s.suffix && <span className="text-xs text-slate-400 shrink-0">{s.suffix}</span>}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          <button className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors">Save Changes</button>
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">Reset</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-4">Data Management</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors text-left">
            <Download className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-blue-900">Export All Users (CSV)</p>
              <p className="text-[10px] text-blue-600">Download complete user database</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl hover:bg-emerald-100 transition-colors text-left">
            <Download className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-emerald-900">Export Donations (CSV)</p>
              <p className="text-[10px] text-emerald-600">Download all donation records</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors text-left">
            <RefreshCw className="w-5 h-5 text-purple-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-purple-900">Sync with MongoDB</p>
              <p className="text-[10px] text-purple-600">Force re-sync all collections</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors text-left">
            <Trash2 className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-900">Purge Expired Donations</p>
              <p className="text-[10px] text-red-600">Remove all expired listings</p>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-900 mb-2">System Info</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          {[
            { label: 'Version', value: 'v2.1.0' },
            { label: 'Environment', value: 'Production' },
            { label: 'Database', value: 'MongoDB Atlas' },
            { label: 'Uptime', value: '99.97%' },
          ].map(i => (
            <div key={i.label}>
              <p className="text-[10px] text-slate-400 uppercase tracking-wide">{i.label}</p>
              <p className="font-semibold text-slate-700 mt-0.5">{i.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── MAIN RENDER ─────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'users': return renderUsers();
      case 'donations': return renderDonations();
      case 'ngos': return renderNGOs();
      case 'reports': return renderReports();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-red-600">Admin Panel</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Administration Dashboard</h1>
            <p className="text-slate-500 text-sm mt-0.5">Welcome, {user?.name} • Manage your entire FeedForward platform</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-xs font-bold text-red-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-1 bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all',
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'ngos' && pendingNGOs.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {pendingNGOs.length}
                </span>
              )}
              {tab.id === 'reports' && openReports.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {openReports.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}

      </div>
    </div>
  );
}
