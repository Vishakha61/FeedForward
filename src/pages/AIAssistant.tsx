import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, Bot, User, CheckCircle2, ShieldAlert, Layers, RefreshCw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  tags?: string[];
  metrics?: { label: string; value: string }[];
}

const PRESET_QUESTIONS = [
  "💡 Predict shelf life for 30kg Cooked Rice & Dal",
  "📍 Which nearby NGOs need Fresh Bakery bread today?",
  "🛡️ What are the FDA guidelines for transporting warm curries?",
  "📈 Show carbon savings for donating 100 surplus packets",
];

const INITIAL_CHAT: ChatMessage[] = [
  {
    id: '1',
    sender: 'ai',
    text: "Hello! I am the **FeedForward AI Engine**. I analyze surplus food safety, match donors directly with optimal high-demand NGOs, and estimate environmental savings. Ask me anything or select a quick action below!",
    timestamp: 'Just now',
    tags: ['Safety Analyzer', 'Smart Allocation', 'CO₂ Metrics'],
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = (e: FormEvent, customText?: string) => {
    e.preventDefault();
    const query = customText || input;
    if (!query.trim()) return;

    // Add User message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setLoading(true);

    // AI Response Simulation with realistic smart parameters
    setTimeout(() => {
      let aiResponseText = "Based on current network telemetry, verified recipient organizations in your sector are ready for instant pickup.";
      let aiTags: string[] = ['AI Verification'];
      let aiMetrics: { label: string; value: string }[] | undefined = undefined;

      const lower = query.toLowerCase();
      if (lower.includes('rice') || lower.includes('dal') || lower.includes('shelf life') || lower.includes('predict')) {
        aiResponseText = "### 🍛 Smart AI Expiration & Allocation Report\n\n**Food Item**: Cooked Rice & Dal (30 kg)\n\n**Shelf Life Prediction**: **4 to 6 hours** safely stored in sealed stainless steel containers. Temperature must remain above 60°C or refrigerated below 4°C immediately.\n\n**Optimal Recipient Match**: **Hope Foundation Shelter** (1.2 km away) currently reports critical demand for 50+ servings.\n\n**Recommendation**: Authorize instant pickup. High priority.";
        aiTags = ['Hot Food Safety', 'Instant Priority', 'Match Score: 98%'];
        aiMetrics = [
          { label: 'Max Safe Window', value: '5.5 Hours' },
          { label: 'Est. Servings', value: '60 People' },
          { label: 'CO₂ Prevention', value: '75 kg saved' }
        ];
      } else if (lower.includes('ngo') || lower.includes('bakery') || lower.includes('bread')) {
        aiResponseText = "### 🍞 Proximity Allocation Engine\n\nFresh bakery goods typically maintain high acceptability for 48 hours. Our matching matrix found **3 verified NGOs** ready to dispatch collection vehicles:\n\n1. **CareLife NGO** (Requires 30 loaves) - 8 mins drive\n2. **Smile Distribution** (Requires 50 loaves) - 14 mins drive\n3. **Community Hub** (Flexible capacity) - 15 mins drive\n\nClicking 'List Donation' auto-notifies these exact organizations.";
        aiTags = ['Bakery Cluster', 'Immediate Route', 'Zero Waste'];
        aiMetrics = [
          { label: 'Target Organizations', value: '3 Active' },
          { label: 'Average SLA', value: '11 Minutes' }
        ];
      } else if (lower.includes('guidelines') || lower.includes('fda') || lower.includes('curries') || lower.includes('safety')) {
        aiResponseText = "### 🛡️ FDA Food Donation Safety Checker\n\nUnder the **Bill Emerson Good Samaritan Food Donation Act**, donors are fully protected from liability when donating in good faith. \n\n**Specific Handling for Curries & Stews**:\n- Use pre-sterilized insulated bulk tubs.\n- Clearly label any known primary allergens (e.g., Peanuts, Dairy).\n- Keep logs of cooking dispatch timestamps.";
        aiTags = ['Compliance Certified', 'Good Samaritan Act', 'Allergen Scan'];
      } else if (lower.includes('carbon') || lower.includes('savings') || lower.includes('packets')) {
        aiResponseText = "### 🌍 Sustainability & GHG Mitigation Predictor\n\nEvery kilogram of surplus food saved directly prevents dangerous methane emissions at municipal landfills.\n\n**Impact Forecast for 100 Packaged Meals**:\n- **Food Waste Avoided**: ~45 kg\n- **Methane Equivalent Saved**: 112.5 kg CO₂e\n- **Water Footprint Retained**: 32,000 Liters\n\n*These metrics are dynamically appended to your final year certificate report.*";
        aiTags = ['GHG Scope 3', 'Methane Reduction', 'Eco-Impact Approved'];
        aiMetrics = [
          { label: 'CO₂e Offset', value: '112.5 kg' },
          { label: 'Water Conserved', value: '32k Liters' }
        ];
      } else {
        aiResponseText = `I have processed your query regarding: *"${query}"*.\n\n**AI Recommendation**: Our localized redistribution nodes are active. Upload the food item via the **Donate Food** dashboard to assign automatic GPS routing and issue real-time notification tokens to the closest verified non-profits.`;
        aiTags = ['Standard Matcher', 'Telemetry Active'];
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tags: aiTags,
        metrics: aiMetrics,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-indigo-400 rounded-full opacity-10 blur-3xl" />
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 backdrop-blur-md border border-purple-300/30 flex items-center justify-center shrink-0 shadow-inner">
                <Sparkles className="w-8 h-8 text-purple-300 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-400/20 border border-purple-300/30 text-[10px] text-purple-200 uppercase font-bold tracking-wider">
                    Powered by Live LLM Telemetry
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  FeedForward AI Allocation Assistant
                </h1>
                <p className="text-purple-200 text-sm mt-1 max-w-xl leading-relaxed">
                  Get real-time safety predictions, optimal non-profit matching routing, and certified food waste carbon metrics.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/10 text-center sm:text-right shrink-0">
              <div className="text-xs text-purple-200 font-medium uppercase">AI Confidence Matrix</div>
              <div className="text-2xl font-black text-white">99.4%</div>
              <div className="text-[10px] text-emerald-300 flex items-center gap-1 justify-end mt-0.5">
                <CheckCircle2 className="w-3 h-3" /> Fully Verified
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Chat Section */}
          <div className="lg:col-span-2 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-[600px]">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-slate-800 text-sm">Interactive AI Terminal</span>
              </div>
              <button 
                onClick={() => setMessages(INITIAL_CHAT)}
                className="text-xs text-slate-400 hover:text-purple-600 transition-colors flex items-center gap-1 p-1 rounded hover:bg-slate-100"
                title="Reset conversation"
              >
                <RefreshCw className="w-3 h-3" /> Reset Session
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.sender === 'user' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-purple-100 text-purple-700 border border-purple-200'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[80%] space-y-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none shadow-sm'
                        : 'bg-slate-50 text-slate-800 rounded-tl-none border border-slate-200/80'
                    }`}>
                      {/* Format bold tags manually or text */}
                      {msg.text.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} className="mb-2 last:mb-0 whitespace-pre-line">
                          {paragraph.startsWith('###') ? (
                            <strong className="text-base text-purple-900 block border-b border-purple-100 pb-1 mb-2">
                              {paragraph.replace('###', '')}
                            </strong>
                          ) : (
                            paragraph
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Meta tags */}
                    {msg.tags && msg.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.tags.map((t) => (
                          <span key={t} className="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold rounded-md">
                            ✨ {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Metrics panel */}
                    {msg.metrics && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 bg-white p-3 rounded-xl border border-purple-100 shadow-2xs">
                        {msg.metrics.map((m) => (
                          <div key={m.label} className="text-left">
                            <div className="text-[10px] text-slate-400 uppercase font-medium">{m.label}</div>
                            <div className="text-xs font-bold text-purple-950 mt-0.5">{m.value}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className={`text-[10px] text-slate-400 px-1 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-200 text-sm text-slate-500 italic flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-100" />
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-200" />
                    Analyzing safety algorithms and NGO clusters...
                  </div>
                </div>
              )}
            </div>

            {/* Prompts / Input */}
            <div className="p-4 border-t border-slate-100 bg-white space-y-3">
              <div className="flex flex-wrap gap-1.5">
                {PRESET_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={(e) => handleSend(e, q)}
                    disabled={loading}
                    className="px-2.5 py-1.5 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-800 text-xs font-medium rounded-lg border border-slate-200 hover:border-purple-200 transition-all text-left truncate max-w-full"
                  >
                    {q}
                  </button>
                ))}
              </div>

              <form onSubmit={(e) => handleSend(e)} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask the AI about food items, shelf life, or legal protections..."
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="px-5 py-3 bg-purple-700 text-white font-semibold rounded-xl hover:bg-purple-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-purple-200"
                >
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Predict</span>
                </button>
              </form>
            </div>
          </div>

          {/* AI Feature Documentation / Metrics sidebar */}
          <div className="space-y-6">
            
            {/* Real-time integration panel */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-600" />
                AI Model Highlights
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                This feature demonstrates how generative AI layers provide mission-critical decisions for surplus management in final year projects.
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-purple-50/50 rounded-xl border border-purple-100">
                  <div className="text-xs font-bold text-purple-900 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Auto-Expiring Logic
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Predicts degradation curves based on storage temperature input to avoid distributing stale food.
                  </p>
                </div>

                <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                  <div className="text-xs font-bold text-indigo-900 flex items-center gap-1 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Routing Matcher
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Scores matching potential based on historical NGO consumption metrics and distance telemetry.
                  </p>
                </div>

                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-100">
                  <div className="text-xs font-bold text-amber-900 flex items-center gap-1 mb-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Liability Checker
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Evaluates good faith compliance under federal donation laws to reassure commercial food donors.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Link to Form */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-base mb-2">Ready to list food?</h3>
              <p className="text-emerald-100 text-xs mb-4 leading-relaxed">
                Experience the live AI analyzer directly on the donation input form! It suggests parameters as you type.
              </p>
              <Link
                to="/donate"
                className="block w-full text-center py-2.5 bg-white text-emerald-800 rounded-xl font-bold text-xs hover:bg-emerald-50 transition-colors shadow-sm"
              >
                Go to Smart Donation Form (Instant Access) →
              </Link>
            </div>

            {/* Presenter Note */}
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-center text-xs text-slate-500">
              🎓 **Final Year Project Note**<br />
              All responses utilize the simulated telemetry framework tailored for full-stack review.
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
