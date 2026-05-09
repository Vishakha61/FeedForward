import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Package, MapPin, Calendar, Users, Leaf, ArrowLeft, ImagePlus, CheckCircle2, AlertCircle, Sparkles, Bot } from 'lucide-react';
import { cn } from '@/utils/cn';

const categories = [
  { value: 'cooked', label: 'Cooked Food', icon: '🍛' },
  { value: 'raw', label: 'Raw Ingredients', icon: '🥬' },
  { value: 'packaged', label: 'Packaged Food', icon: '📦' },
  { value: 'bakery', label: 'Bakery Items', icon: '🍞' },
  { value: 'produce', label: 'Fresh Produce', icon: '🥕' },
  { value: 'other', label: 'Other', icon: '🍽️' },
];

const dietaryOptions = [
  { value: 'vegetarian', label: '🥬 Vegetarian' },
  { value: 'vegan', label: '🌱 Vegan' },
  { value: 'halal', label: '☪️ Halal' },
  { value: 'gluten-free', label: '🌾 Gluten-Free' },
  { value: 'dairy-free', label: '🥛 Dairy-Free' },
  { value: 'nut-free', label: '🥜 Nut-Free' },
];

export default function DonateFood() {
  const { user, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    foodType: '',
    quantity: '',
    description: '',
    category: 'cooked' as string,
    servings: '',
    expiryDate: '',
    pickupAddress: '',
    city: user?.city || '',
    state: user?.state || '',
    dietaryInfo: [] as string[],
  });

  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const toggleDietary = (value: string) => {
    setForm((f) => ({
      ...f,
      dietaryInfo: f.dietaryInfo.includes(value)
        ? f.dietaryInfo.filter((d) => d !== value)
        : [...f.dietaryInfo, value],
    }));
  };

  const [aiPredicting, setAiPredicting] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');

  const handleAIPredict = () => {
    if (!form.foodType.trim()) {
      setError('Please type a Food Type first (e.g., "Vegetable Biryani", "Apple Pies") for AI to analyze.');
      return;
    }
    setError('');
    setAiPredicting(true);
    setAiFeedback('LLM Engine scanning food taxonomy and compliance rules...');

    setTimeout(() => {
      const lower = form.foodType.toLowerCase();
      let predictedCat = 'cooked';
      let predictedServings = '40';
      let predictedQty = '20 kg';
      let additionalDesc = '';
      let addedDietary: string[] = [];

      if (lower.includes('bread') || lower.includes('pie') || lower.includes('pastry') || lower.includes('cake') || lower.includes('bun')) {
        predictedCat = 'bakery';
        predictedServings = '50';
        predictedQty = '50 pieces';
        additionalDesc = 'AI Predicted Handling: High starch content, keep dry at room temp. Optimal shelf life: 48 hours.';
        addedDietary = ['vegetarian'];
      } else if (lower.includes('fruit') || lower.includes('veg') || lower.includes('salad') || lower.includes('apple') || lower.includes('banana')) {
        predictedCat = 'produce';
        predictedServings = '30';
        predictedQty = '15 kg';
        additionalDesc = 'AI Predicted Handling: Fresh produce item. High vitamin content. Wash before consumption.';
        addedDietary = ['vegan', 'gluten-free', 'dairy-free'];
      } else if (lower.includes('box') || lower.includes('packet') || lower.includes('can') || lower.includes('biscuit')) {
        predictedCat = 'packaged';
        predictedServings = '100';
        predictedQty = '100 packets';
        additionalDesc = 'AI Predicted Handling: Sealed manufacturer packing. Extended ambient shelf life verified.';
        addedDietary = [];
      } else {
        predictedCat = 'cooked';
        predictedServings = '60';
        predictedQty = '30 kg';
        additionalDesc = 'AI Predicted Handling: Freshly prepared cooked meal. Must be distributed within 4 hours or stored above 60°C.';
        addedDietary = ['vegetarian'];
      }

      setForm(f => {
        const mergedTags = Array.from(new Set([...f.dietaryInfo, ...addedDietary]));
        return {
          ...f,
          category: predictedCat,
          servings: f.servings || predictedServings,
          quantity: f.quantity || predictedQty,
          description: f.description ? `${f.description}\n\n${additionalDesc}` : additionalDesc,
          dietaryInfo: mergedTags,
        };
      });

      setAiFeedback(`✨ AI Success: Auto-assigned category "${predictedCat.toUpperCase()}", estimated ${predictedServings} servings, and appended compliance rules.`);
      setAiPredicting(false);
    }, 1200);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.foodType || !form.quantity || !form.servings) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => navigate('/donor/dashboard'), 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Donation Listed Successfully! 🎉</h2>
          <p className="text-slate-500 mb-4">
            Your food donation has been listed. NGOs and recipients in your area can now find and request it.
          </p>
          <p className="text-sm text-slate-400">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/donor/dashboard')}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Donate Food</h1>
          <p className="text-slate-500 mt-1">Fill in the details about the food you'd like to donate.</p>
          
          {!isAuthenticated && (
            <div className="mt-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-purple-950">
                  💡 Public Demo Preview Mode Active
                </p>
                <p className="text-xs text-purple-800 mt-0.5">
                  You can test the ✨ AI Auto-Predictor below instantly. To fully save items to your account, click here to log in as our Demo Donor:
                </p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  await login('rahul@demo.com', 'demo123');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 py-2 bg-purple-700 text-white rounded-lg text-xs font-bold shrink-0 hover:bg-purple-800 transition-colors shadow-2xs"
              >
                Instant Login (Rahul)
              </button>
            </div>
          )}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Food Type & Category */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Food Type *</label>
                <div className="relative">
                  <Leaf className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={form.foodType}
                    onChange={(e) => update('foodType', e.target.value)}
                    placeholder="e.g., Rice & Curry, Fresh Bread"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
                
                {/* AI Prediction trigger */}
                <div className="mt-2.5">
                  <button
                    type="button"
                    onClick={handleAIPredict}
                    disabled={aiPredicting}
                    className="w-full py-2 px-3 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-200 rounded-xl text-xs text-purple-800 font-bold flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer disabled:opacity-60"
                  >
                    {aiPredicting ? (
                      <>
                        <Sparkles className="w-3.5 h-3.5 animate-spin text-purple-600" />
                        <span>{aiFeedback || 'Analyzing...'}</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-3.5 h-3.5 text-purple-600" />
                        <span>✨ AI Auto-Fill Parameters & Predict Handling</span>
                      </>
                    )}
                  </button>

                  {aiFeedback && !aiPredicting && (
                    <div className="mt-2 p-2.5 bg-purple-50 rounded-lg border border-purple-100 text-[11px] text-purple-900 leading-relaxed animate-fadeIn">
                      {aiFeedback}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Quantity *</label>
                <div className="relative">
                  <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={form.quantity}
                    onChange={(e) => update('quantity', e.target.value)}
                    placeholder="e.g., 25 kg, 50 packets"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Food Category</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => update('category', cat.value)}
                    className={cn(
                      'p-3 rounded-xl border-2 text-center transition-all',
                      form.category === cat.value
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-slate-200 hover:border-slate-300'
                    )}
                  >
                    <span className="text-2xl block">{cat.icon}</span>
                    <span className={cn('text-[10px] font-medium mt-1 block', form.category === cat.value ? 'text-emerald-700' : 'text-slate-500')}>
                      {cat.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Servings & Expiry */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Number of Servings *</label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="number"
                    value={form.servings}
                    onChange={(e) => update('servings', e.target.value)}
                    placeholder="e.g., 50"
                    min="1"
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Expiry Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => update('expiryDate', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                placeholder="Describe the food, packaging, and any special handling instructions..."
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
              />
            </div>

            {/* Dietary Info */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">Dietary Information</label>
              <div className="flex flex-wrap gap-2">
                {dietaryOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggleDietary(opt.value)}
                    className={cn(
                      'px-4 py-2 rounded-lg text-sm font-medium border transition-all',
                      form.dietaryInfo.includes(opt.value)
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pickup Info */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Pickup Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <textarea
                    value={form.pickupAddress}
                    onChange={(e) => update('pickupAddress', e.target.value)}
                    placeholder="Full pickup address"
                    rows={2}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">City</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      placeholder="City"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={form.state}
                      onChange={(e) => update('state', e.target.value)}
                      placeholder="State"
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload (Mock) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Food Images</label>
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-emerald-300 transition-colors cursor-pointer">
                <ImagePlus className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500">Click to upload images</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => navigate('/donor/dashboard')}
                className="px-6 py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-all shadow-md shadow-emerald-200 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Listing Donation...
                  </>
                ) : (
                  <>
                    <Leaf className="w-5 h-5" />
                    List Donation
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
