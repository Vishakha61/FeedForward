import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: User) => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'donor' | 'recipient' | 'ngo';
  organization?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'feedforward_auth';
const API_URL = 'http://localhost:5000/api';

// ─── DEMO FALLBACK USERS (used when backend is not running) ───
const DEMO_USERS: (User & { password: string })[] = [
  {
    _id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@demo.com',
    password: 'demo123',
    role: 'donor',
    phone: '9876543210',
    address: '42, MG Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    name: 'Hope Foundation',
    email: 'hope@demo.com',
    password: 'demo123',
    role: 'ngo',
    organization: 'Hope Foundation NGO',
    phone: '9876543211',
    address: '15, Park Street',
    city: 'Delhi',
    state: 'Delhi',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    name: 'Priya Patel',
    email: 'priya@demo.com',
    password: 'demo123',
    role: 'recipient',
    phone: '9876543212',
    address: '78, Civil Lines',
    city: 'Bangalore',
    state: 'Karnataka',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '4',
    name: 'Admin User',
    email: 'admin@demo.com',
    password: 'admin123',
    role: 'admin',
    phone: '9876543200',
    address: 'HQ, Tech Park',
    city: 'Mumbai',
    state: 'Maharashtra',
    createdAt: new Date().toISOString(),
  },
];

// ─── PROVIDER ──────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: true,
  });

  // On mount — restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { user, token } = JSON.parse(stored);
        setState({ user, token, isAuthenticated: true, loading: false });
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setState((s) => ({ ...s, loading: false }));
      }
    } else {
      setState((s) => ({ ...s, loading: false }));
    }
  }, []);

  // ─── LOGIN ─────────────────────────────────────────────
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // 1️⃣ Try real backend API first
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user && data.token) {
          const payload = { user: data.user, token: data.token };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
          setState({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
          console.log('✅ Logged in via MongoDB backend');
          return true;
        }
      }

      // API responded but credentials invalid — don't fall back
      if (res.status === 401) {
        // Still check demo users as fallback
        return loginDemoFallback(email, password);
      }
    } catch {
      // Backend unreachable — fall back to demo mode
      console.log('⚠️ Backend not running — using demo mode');
    }

    // 2️⃣ Fallback: demo users
    return loginDemoFallback(email, password);
  }, []);

  const loginDemoFallback = (email: string, password: string): boolean => {
    const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...user } = found;
      const token = `demo_token_${user._id}_${Date.now()}`;
      const payload = { user, token };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setState({ user, token, isAuthenticated: true, loading: false });
      return true;
    }
    return false;
  };

  // ─── REGISTER ──────────────────────────────────────────
  const register = useCallback(async (userData: RegisterData): Promise<boolean> => {
    // 1️⃣ Try real backend API first
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user && data.token) {
          const payload = { user: data.user, token: data.token };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
          setState({ user: data.user, token: data.token, isAuthenticated: true, loading: false });
          console.log('✅ Registered via MongoDB backend');
          return true;
        }
      }
    } catch {
      // Backend unreachable — fall back to demo mode
      console.log('⚠️ Backend not running — using demo mode for registration');
    }

    // 2️⃣ Fallback: create user locally
    const { password, ...rest } = userData;
    const newUser: User = {
      _id: `user_${Date.now()}`,
      ...rest,
      createdAt: new Date().toISOString(),
    };
    const token = `demo_token_${newUser._id}_${Date.now()}`;
    const payload = { user: newUser, token };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    setState({ user: newUser, token, isAuthenticated: true, loading: false });
    return true;
  }, []);

  // ─── LOGOUT ────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, token: null, isAuthenticated: false, loading: false });
  }, []);

  // ─── UPDATE USER ───────────────────────────────────────
  const updateUser = useCallback((user: User) => {
    const data = { user, token: state.token };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setState((s) => ({ ...s, user }));
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
