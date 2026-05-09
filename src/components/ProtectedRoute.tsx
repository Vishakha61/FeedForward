import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface Props {
  children: React.ReactNode;
  allowedRoles?: Array<'donor' | 'recipient' | 'ngo' | 'admin'>;
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const redirectPath = user.role === 'admin' ? '/admin' : user.role === 'donor' ? '/donor/dashboard' : '/recipient/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
