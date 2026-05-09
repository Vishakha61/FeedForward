export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'donor' | 'recipient' | 'ngo' | 'admin';
  organization?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  createdAt: string;
}

export interface FoodDonation {
  _id: string;
  donorId: string;
  donorName: string;
  foodType: string;
  quantity: string;
  description: string;
  category: 'cooked' | 'raw' | 'packaged' | 'bakery' | 'produce' | 'other';
  servings: number;
  expiryDate: string;
  pickupAddress: string;
  city: string;
  state: string;
  images: string[];
  status: 'available' | 'reserved' | 'collected' | 'expired';
  dietaryInfo: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export type DietaryTag = 'vegetarian' | 'vegan' | 'halal' | 'gluten-free' | 'dairy-free' | 'nut-free';
