import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Search, MapPin, Package, Users, Clock, Leaf, Filter, X, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const allDonations = [
  { _id: '1', foodType: 'Fresh Cooked Rice & Dal', quantity: '30 kg', servings: 60, city: 'Mumbai', state: 'Maharashtra', donorName: 'Rahul Sharma', category: 'cooked', status: 'available', createdAt: '2 hours ago', dietaryInfo: ['vegetarian'], description: 'Freshly cooked rice and dal, packed in insulated containers.' },
  { _id: '2', foodType: 'Mixed Vegetables', quantity: '20 kg', servings: 40, city: 'Delhi', state: 'Delhi', donorName: 'Amit Gupta', category: 'produce', status: 'available', createdAt: '5 hours ago', dietaryInfo: ['vegan', 'gluten-free'], description: 'Fresh farm vegetables including potatoes, onions, and tomatoes.' },
  { _id: '3', foodType: 'Bread Loaves & Pastries', quantity: '50 loaves', servings: 100, city: 'Bangalore', state: 'Karnataka', donorName: 'Sunil Bakery', category: 'bakery', status: 'available', createdAt: '1 day ago', dietaryInfo: ['vegetarian'], description: 'Fresh bread and pastries from morning batch. Best consumed within 2 days.' },
  { _id: '4', foodType: 'Packaged Meal Boxes', quantity: '100 packets', servings: 100, city: 'Mumbai', state: 'Maharashtra', donorName: 'Priya Foods', category: 'packaged', status: 'available', createdAt: '3 hours ago', dietaryInfo: ['halal'], description: 'Individually packed meal boxes with biryani, sealed and ready to distribute.' },
  { _id: '5', foodType: 'Fresh Fruits Basket', quantity: '15 kg', servings: 30, city: 'Chennai', state: 'Tamil Nadu', donorName: 'Mega Mart', category: 'produce', status: 'available', createdAt: '8 hours ago', dietaryInfo: ['vegan', 'nut-free'], description: 'Assorted fruits - apples, bananas, oranges. Slightly ripe but perfectly edible.' },
  { _id: '6', foodType: 'Sandwiches & Wraps', quantity: '75 pieces', servings: 75, city: 'Pune', state: 'Maharashtra', donorName: 'Cafe Goodwill', category: 'cooked', status: 'available', createdAt: '6 hours ago', dietaryInfo: ['vegetarian'], description: 'Freshly made veg sandwiches and wraps from today\'s surplus.' },
  { _id: '7', foodType: 'Rice & Sambar', quantity: '40 kg', servings: 80, city: 'Hyderabad', state: 'Telangana', donorName: 'Temple Trust', category: 'cooked', status: 'available', createdAt: '4 hours ago', dietaryInfo: ['vegetarian', 'gluten-free'], description: 'Temple prasadam - rice and sambar cooked this morning.' },
  { _id: '8', foodType: 'Canned Goods Bundle', quantity: '200 cans', servings: 200, city: 'Delhi', state: 'Delhi', donorName: 'Food Bank India', category: 'packaged', status: 'available', createdAt: '2 days ago', dietaryInfo: ['halal'], description: 'Assorted canned vegetables, beans, and soups. Long shelf life.' },
];

const cities = ['All Cities', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad'];
const categories = ['All Categories', 'cooked', 'produce', 'bakery', 'packaged'];

export default function BrowseDonations() {
  const { isAuthenticated } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleDietary = (tag: string) => {
    setSelectedDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = allDonations.filter((d) => {
    const matchesSearch = d.foodType.toLowerCase().includes(search.toLowerCase()) ||
      d.city.toLowerCase().includes(search.toLowerCase()) ||
      d.donorName.toLowerCase().includes(search.toLowerCase());
    const matchesCity = selectedCity === 'All Cities' || d.city === selectedCity;
    const matchesCategory = selectedCategory === 'All Categories' || d.category === selectedCategory;
    const matchesDietary = selectedDietary.length === 0 ||
      selectedDietary.every((tag) => d.dietaryInfo.includes(tag));
    return matchesSearch && matchesCity && matchesCategory && matchesDietary;
  });

  const dietaryTags = ['vegetarian', 'vegan', 'halal', 'gluten-free', 'dairy-free', 'nut-free'];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Browse Food Donations</h1>
          <p className="text-slate-500 mt-1">
            Find available food donations near you. {!isAuthenticated && 'Sign in to request pickups.'}
          </p>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search food, city, or donor..."
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 capitalize"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all',
                showFilters
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'
              )}
            >
              <Filter className="w-4 h-4" />
              Dietary
              <ChevronDown className={cn('w-4 h-4 transition-transform', showFilters && 'rotate-180')} />
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-sm font-medium text-slate-700 mb-2">Filter by dietary preference:</p>
              <div className="flex flex-wrap gap-2">
                {dietaryTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleDietary(tag)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all capitalize',
                      selectedDietary.includes(tag)
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                        : 'border-slate-200 text-slate-500 hover:border-slate-300'
                    )}
                  >
                    {tag}
                    {selectedDietary.includes(tag) && <X className="w-3 h-3 inline ml-1" />}
                  </button>
                ))}
                {selectedDietary.length > 0 && (
                  <button
                    onClick={() => setSelectedDietary([])}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-all"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            {filtered.length} donation{filtered.length !== 1 ? 's' : ''} found
          </p>
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
              <Leaf className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No donations match your criteria.</p>
              <p className="text-sm text-slate-400 mt-1">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((donation) => (
                <div
                  key={donation._id}
                  className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Package className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                      Available
                    </span>
                  </div>

                  <h3 className="font-semibold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">
                    {donation.foodType}
                  </h3>
                  <p className="text-xs text-slate-400 mb-3 line-clamp-2">{donation.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Package className="w-3.5 h-3.5 text-slate-400" />
                      <span>{donation.quantity}</span>
                      <span className="text-slate-300">•</span>
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{donation.servings} servings</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{donation.city}, {donation.state}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{donation.createdAt}</span>
                    </div>
                  </div>

                  {donation.dietaryInfo.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {donation.dietaryInfo.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-medium capitalize">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-xs text-slate-400">By {donation.donorName}</span>
                    <button className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition-all">
                      {isAuthenticated ? 'Request Pickup' : 'View Details'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
