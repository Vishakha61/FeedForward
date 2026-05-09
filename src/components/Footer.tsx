import { Link } from 'react-router-dom';
import { Heart, Globe, MessageCircle, Share2, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">
                Feed<span className="text-emerald-400">Forward</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connecting surplus food with those who need it most. Together, we can eliminate hunger and reduce food waste.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link to="/browse" className="text-sm hover:text-emerald-400 transition-colors">Browse Donations</Link></li>
              <li><Link to="/about" className="text-sm hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-emerald-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get Involved</h4>
            <ul className="space-y-2">
              <li><Link to="/register" className="text-sm hover:text-emerald-400 transition-colors">Register as Donor</Link></li>
              <li><Link to="/register" className="text-sm hover:text-emerald-400 transition-colors">Register as NGO</Link></li>
              <li><Link to="/login" className="text-sm hover:text-emerald-400 transition-colors">Sign In</Link></li>
              <li><Link to="/browse" className="text-sm hover:text-emerald-400 transition-colors">Find Food Near You</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                <span>123 Community Hub, Green Valley, Mumbai - 400001</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@feedforward.org</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 1800-123-FEED</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} FeedForward. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
