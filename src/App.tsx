import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import DonorDashboard from '@/pages/DonorDashboard';
import RecipientDashboard from '@/pages/RecipientDashboard';
import DonateFood from '@/pages/DonateFood';
import BrowseDonations from '@/pages/BrowseDonations';
import AIAssistant from '@/pages/AIAssistant';
import Profile from '@/pages/Profile';
import AdminPanel from '@/pages/AdminPanel';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/browse" element={<BrowseDonations />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />

              {/* Donor Routes */}
              <Route
                path="/donor/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['donor']}>
                    <DonorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/donor/donate"
                element={<DonateFood />}
              />
              <Route
                path="/donate"
                element={<DonateFood />}
              />
              <Route
                path="/profile"
                element={<Profile />}
              />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />

              {/* Recipient/NGO Routes */}
              <Route
                path="/recipient/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['recipient', 'ngo']}>
                    <RecipientDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-slate-200 mb-4">404</h1>
                      <p className="text-slate-500 text-lg mb-6">Page not found</p>
                      <Link to="/" className="text-emerald-600 font-medium hover:text-emerald-700">
                        Go back home
                      </Link>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
