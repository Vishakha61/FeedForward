import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Heart, Menu, X, LogOut, User, PlusCircle, Search, Home, Info, Mail, LayoutDashboard, Sparkles, Award } from 'lucide-react';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'donor') return '/donor/dashboard';
    return '/recipient/dashboard';
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/browse', label: 'Browse Donations', icon: Search },
    { to: '/ai-assistant', label: 'AI Assistant', icon: Sparkles, highlight: true },
    { to: '/about', label: 'About', icon: Info },
    { to: '/contact', label: 'Contact', icon: Mail },
  ];

  const isActive = (path: string) =>
    location.pathname === path ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600';

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-md shadow-emerald-200 group-hover:shadow-lg group-hover:shadow-emerald-300 transition-shadow">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              Feed<span className="text-emerald-600">Forward</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5',
                  link.highlight 
                    ? 'bg-gradient-to-r from-purple-50 via-indigo-50 to-amber-50 text-purple-700 font-semibold border border-purple-200 shadow-sm hover:shadow-md' 
                    : isActive(link.to)
                )}
              >
                <link.icon className={cn("w-4 h-4", link.highlight ? "text-purple-600 animate-pulse" : "")} />
                {link.label}
                {link.highlight && (
                  <span className="ml-1 text-[9px] uppercase px-1.5 py-0.5 bg-purple-600 text-white rounded-full font-bold tracking-wider">
                    AI
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2',
                    location.pathname.includes('dashboard')
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  )}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                {user?.role === 'donor' && (
                  <Link
                    to="/donor/donate"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-sm shadow-emerald-200"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Donate Food
                  </Link>
                )}
                <Link
                  to="/profile"
                  className={cn(
                    'px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
                    location.pathname === '/profile'
                      ? 'bg-yellow-50 text-yellow-700'
                      : 'text-slate-600 hover:bg-yellow-50 hover:text-yellow-700'
                  )}
                  title="Badges & Certificate"
                >
                  <Award className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2.5 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-sm shadow-emerald-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  link.highlight 
                    ? 'bg-purple-50 text-purple-700 font-semibold border border-purple-200' 
                    : isActive(link.to)
                )}
              >
                <link.icon className={cn("w-4 h-4", link.highlight ? "text-purple-600" : "")} />
                {link.label}
                {link.highlight && (
                  <span className="ml-auto text-[9px] uppercase px-1.5 py-0.5 bg-purple-600 text-white rounded-full font-bold">
                    AI Feature
                  </span>
                )}
              </Link>
            ))}
            <div className="border-t border-slate-100 pt-2 mt-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  {user?.role === 'donor' && (
                    <Link
                      to="/donor/donate"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Donate Food
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-yellow-700 hover:bg-yellow-50 transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    Badges &amp; Certificate
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-1">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 text-white text-center"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
