import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Award, Flame, Heart, Star, Trophy, Zap, Target, Crown,
  Shield, Sparkles, Download, Calendar, ArrowLeft, Users,
  Package, Leaf, TrendingUp
} from 'lucide-react';
import { cn } from '@/utils/cn';

// ─── BADGES ────────────────────────────────────────────────
interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedDate?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  progress: number;      // 0-100
  requirement: string;
}

const BADGES: Badge[] = [
  {
    id: 'first-donation',
    name: 'First Step',
    description: 'Made your very first food donation',
    icon: <Heart className="w-6 h-6" />,
    unlocked: true,
    unlockedDate: '2025-01-02',
    tier: 'bronze',
    progress: 100,
    requirement: 'Donate food 1 time',
  },
  {
    id: 'ten-donations',
    name: 'Generous Soul',
    description: 'Completed 10 food donations',
    icon: <Star className="w-6 h-6" />,
    unlocked: true,
    unlockedDate: '2025-01-18',
    tier: 'silver',
    progress: 100,
    requirement: 'Donate food 10 times',
  },
  {
    id: 'streak-7',
    name: 'Weekly Warrior',
    description: '7-day consecutive donation streak',
    icon: <Flame className="w-6 h-6" />,
    unlocked: true,
    unlockedDate: '2025-01-20',
    tier: 'silver',
    progress: 100,
    requirement: 'Donate 7 days in a row',
  },
  {
    id: 'meals-100',
    name: 'Century Feeder',
    description: 'Your donations fed 100+ people',
    icon: <Users className="w-6 h-6" />,
    unlocked: true,
    unlockedDate: '2025-01-22',
    tier: 'gold',
    progress: 100,
    requirement: 'Feed 100 people',
  },
  {
    id: 'meals-500',
    name: 'Community Hero',
    description: 'Your donations fed 500+ people',
    icon: <Shield className="w-6 h-6" />,
    unlocked: true,
    unlockedDate: '2025-02-05',
    tier: 'gold',
    progress: 100,
    requirement: 'Feed 500 people',
  },
  {
    id: 'meals-1000',
    name: 'Hunger Slayer',
    description: 'Your donations fed 1000+ people',
    icon: <Trophy className="w-6 h-6" />,
    unlocked: true,
    unlockedDate: '2025-03-10',
    tier: 'platinum',
    progress: 100,
    requirement: 'Feed 1000 people',
  },
  {
    id: 'streak-30',
    name: '30-Day Streak 🔥',
    description: '30 consecutive days of donations',
    icon: <Zap className="w-6 h-6" />,
    unlocked: false,
    tier: 'platinum',
    progress: 72,
    requirement: 'Donate 30 days in a row (22/30)',
  },
  {
    id: 'eco-warrior',
    name: 'Eco Warrior',
    description: 'Prevented 500 kg of CO₂ emissions',
    icon: <Leaf className="w-6 h-6" />,
    unlocked: false,
    tier: 'gold',
    progress: 85,
    requirement: 'Prevent 500 kg CO₂ (425/500)',
  },
  {
    id: 'top-donor',
    name: 'Platinum Legend',
    description: 'Reached the top 1% of all donors',
    icon: <Crown className="w-6 h-6" />,
    unlocked: false,
    tier: 'platinum',
    progress: 60,
    requirement: 'Reach top 1% donors',
  },
  {
    id: 'variety-king',
    name: 'Variety King',
    description: 'Donated from all 6 food categories',
    icon: <Target className="w-6 h-6" />,
    unlocked: false,
    tier: 'silver',
    progress: 66,
    requirement: 'Donate in all categories (4/6)',
  },
];

const tierStyles: Record<string, { ring: string; bg: string; text: string; glow: string }> = {
  bronze:   { ring: 'ring-amber-700/30',  bg: 'bg-gradient-to-br from-amber-600 to-amber-800',     text: 'text-amber-700',   glow: 'shadow-amber-200' },
  silver:   { ring: 'ring-slate-400/30',   bg: 'bg-gradient-to-br from-slate-400 to-slate-600',     text: 'text-slate-500',   glow: 'shadow-slate-200' },
  gold:     { ring: 'ring-yellow-400/40',  bg: 'bg-gradient-to-br from-yellow-400 to-amber-500',    text: 'text-yellow-600',  glow: 'shadow-yellow-200' },
  platinum: { ring: 'ring-purple-400/40',  bg: 'bg-gradient-to-br from-purple-500 to-indigo-600',   text: 'text-purple-600',  glow: 'shadow-purple-200' },
};

// ─── STREAK CALENDAR ───────────────────────────────────────
function generateStreakData() {
  const data: { date: string; count: number }[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    // simulate donation activity
    let count = 0;
    const dayOfWeek = d.getDay();
    if (i < 25) count = Math.random() > 0.15 ? Math.ceil(Math.random() * 4) : 0;          // recent = active
    else if (i < 60) count = Math.random() > 0.35 ? Math.ceil(Math.random() * 3) : 0;
    else if (i < 180) count = Math.random() > 0.55 ? Math.ceil(Math.random() * 2) : 0;
    else count = Math.random() > 0.7 ? 1 : 0;
    if (dayOfWeek === 0) count = Math.max(count - 1, 0);                                   // quieter sundays
    data.push({ date: dateStr, count });
  }
  return data;
}

const STREAK_DATA = generateStreakData();
const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getCellColor(count: number) {
  if (count === 0) return 'bg-slate-100';
  if (count === 1) return 'bg-emerald-200';
  if (count === 2) return 'bg-emerald-400';
  if (count === 3) return 'bg-emerald-500';
  return 'bg-emerald-700';
}

// ─── COMPONENT ─────────────────────────────────────────────
export default function Profile() {
  const { user } = useAuth();
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  const [hoveredCell, setHoveredCell] = useState<{ date: string; count: number } | null>(null);
  const certRef = useRef<HTMLDivElement>(null);

  // badge filtering
  const filteredBadges = BADGES.filter(b => {
    if (badgeFilter === 'unlocked') return b.unlocked;
    if (badgeFilter === 'locked') return !b.unlocked;
    return true;
  });

  const unlockedCount = BADGES.filter(b => b.unlocked).length;

  // streak stats
  const currentStreak = (() => {
    let s = 0;
    for (let i = STREAK_DATA.length - 1; i >= 0; i--) {
      if (STREAK_DATA[i].count > 0) s++;
      else break;
    }
    return s;
  })();
  const longestStreak = (() => {
    let max = 0, cur = 0;
    STREAK_DATA.forEach(d => { if (d.count > 0) { cur++; max = Math.max(max, cur); } else cur = 0; });
    return max;
  })();
  const totalActive = STREAK_DATA.filter(d => d.count > 0).length;
  const totalDonationsYear = STREAK_DATA.reduce((s, d) => s + d.count, 0);

  // arrange cells into weeks (columns) for the grid
  const weeks: { date: string; count: number }[][] = [];
  let week: { date: string; count: number }[] = [];
  STREAK_DATA.forEach((d, i) => {
    const dayOfWeek = new Date(d.date).getDay();
    if (i === 0 && dayOfWeek !== 0) {
      for (let p = 0; p < dayOfWeek; p++) week.push({ date: '', count: -1 });
    }
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  });
  if (week.length) { while (week.length < 7) week.push({ date: '', count: -1 }); weeks.push(week); }

  // month label positions
  const monthPositions: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((w, wi) => {
    const validDay = w.find(d => d.date);
    if (validDay) {
      const m = new Date(validDay.date).getMonth();
      if (m !== lastMonth) { monthPositions.push({ label: MONTH_LABELS[m], col: wi }); lastMonth = m; }
    }
  });

  // ── Certificate download ─────────────────────────────────
  const handleDownloadCert = () => {
    const el = certRef.current;
    if (!el) return;

    // Build a self-contained HTML document for print/download
    const certHtml = `
      <!DOCTYPE html>
      <html><head><meta charset="utf-8"><title>FeedForward Impact Certificate</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Inter',sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:#f1f5f9}
        .cert{width:800px;background:#fff;border:3px solid #059669;border-radius:16px;padding:60px;position:relative;overflow:hidden}
        .cert::before{content:'';position:absolute;top:0;left:0;right:0;height:8px;background:linear-gradient(90deg,#059669,#10b981,#34d399)}
        .watermark{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-30deg);font-size:120px;font-weight:800;color:rgba(16,185,129,0.04);white-space:nowrap;pointer-events:none}
        .header{text-align:center;margin-bottom:32px}
        .logo{font-size:28px;font-weight:800;color:#0f172a;margin-bottom:4px}
        .logo span{color:#059669}
        .sub{color:#64748b;font-size:13px}
        .title{text-align:center;margin:28px 0;font-size:32px;font-weight:800;color:#0f172a;letter-spacing:-0.5px}
        .name{text-align:center;font-size:36px;font-weight:800;background:linear-gradient(135deg,#059669,#0d9488);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin:8px 0 4px}
        .role{text-align:center;color:#64748b;font-size:14px;margin-bottom:28px}
        .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:32px 0}
        .stat{text-align:center;padding:20px;background:#f0fdf4;border-radius:12px;border:1px solid #bbf7d0}
        .stat-val{font-size:28px;font-weight:800;color:#059669}
        .stat-lbl{font-size:11px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:0.5px}
        .badges{display:flex;justify-content:center;gap:12px;margin:28px 0;flex-wrap:wrap}
        .badge{display:flex;align-items:center;gap:6px;padding:6px 14px;background:#fef3c7;border-radius:999px;font-size:12px;font-weight:600;color:#92400e;border:1px solid #fcd34d}
        .footer{text-align:center;margin-top:36px;padding-top:24px;border-top:2px dashed #d1d5db}
        .date{color:#64748b;font-size:12px}
        .sig{margin-top:16px;font-size:14px;font-weight:600;color:#334155}
        .cert-id{margin-top:8px;font-size:10px;color:#94a3b8}
      </style></head><body>
      <div class="cert">
        <div class="watermark">FEEDFORWARD</div>
        <div class="header">
          <div class="logo">Feed<span>Forward</span></div>
          <div class="sub">Connecting Donors with Those in Need</div>
        </div>
        <div class="title">🏆 Certificate of Impact</div>
        <p style="text-align:center;color:#475569;font-size:14px">This certificate is proudly presented to</p>
        <div class="name">${user?.name || 'Donor'}</div>
        <div class="role">Verified ${user?.role === 'ngo' ? 'NGO Partner' : 'Food Donor'} • ${user?.city || 'India'}</div>
        <div class="stats">
          <div class="stat"><div class="stat-val">1,200+</div><div class="stat-lbl">People Fed</div></div>
          <div class="stat"><div class="stat-val">480 kg</div><div class="stat-lbl">Food Saved</div></div>
          <div class="stat"><div class="stat-val">1,200 kg</div><div class="stat-lbl">CO₂ Prevented</div></div>
        </div>
        <div class="badges">
          <div class="badge">🏅 Community Hero</div>
          <div class="badge">🔥 Streak Master</div>
          <div class="badge">🌿 Eco Warrior</div>
        </div>
        <p style="text-align:center;color:#64748b;font-size:13px;max-width:500px;margin:0 auto;line-height:1.6">
          In recognition of your outstanding contribution to fighting hunger and reducing food waste in your community through the FeedForward platform.
        </p>
        <div class="footer">
          <div class="date">Issued on: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div class="sig">FeedForward Foundation</div>
          <div class="cert-id">Certificate ID: FF-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}</div>
        </div>
      </div>
      <script>window.onload=()=>{window.print()}<\/script>
      </body></html>
    `;

    const blob = new Blob([certHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    if (win) win.focus();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back button */}
        <Link to="/donor/dashboard" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        {/* ═══ PROFILE HEADER ═══ */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-emerald-200 shrink-0">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
              <p className="text-sm text-slate-500 mt-0.5">{user?.email} • <span className="capitalize">{user?.role}</span> • {user?.city || 'India'}</p>
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" /> {unlockedCount}/{BADGES.length} Badges
                </div>
                <div className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" /> {currentStreak} Day Streak
                </div>
                <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" /> 1,200+ People Fed
                </div>
              </div>
            </div>
            <button
              onClick={handleDownloadCert}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-md shadow-emerald-200 hover:shadow-lg hover:from-emerald-700 hover:to-emerald-800 transition-all shrink-0"
            >
              <Download className="w-4 h-4" />
              Download Certificate
            </button>
          </div>
        </div>

        {/* ═══ SECTION 1 — ACHIEVEMENT BADGES ═══ */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" /> Achievement Badges
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">{unlockedCount} of {BADGES.length} badges unlocked</p>
            </div>
            <div className="flex bg-white rounded-xl border border-slate-200 p-1">
              {(['all', 'unlocked', 'locked'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setBadgeFilter(f)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all',
                    badgeFilter === f ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredBadges.map(badge => {
              const ts = tierStyles[badge.tier];
              return (
                <div
                  key={badge.id}
                  className={cn(
                    'relative bg-white rounded-2xl border p-5 text-center transition-all group',
                    badge.unlocked
                      ? `border-slate-200 hover:shadow-lg hover:${ts.glow} cursor-default`
                      : 'border-dashed border-slate-300 opacity-60'
                  )}
                >
                  {/* Tier label */}
                  <span className={cn('absolute top-2 right-2 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md',
                    badge.tier === 'bronze' && 'bg-amber-100 text-amber-800',
                    badge.tier === 'silver' && 'bg-slate-100 text-slate-600',
                    badge.tier === 'gold' && 'bg-yellow-100 text-yellow-700',
                    badge.tier === 'platinum' && 'bg-purple-100 text-purple-700',
                  )}>
                    {badge.tier}
                  </span>

                  {/* Icon */}
                  <div className={cn(
                    'w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-white shadow-md',
                    badge.unlocked ? ts.bg : 'bg-slate-300',
                    badge.unlocked && ts.glow,
                  )}>
                    {badge.icon}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-tight mb-1">{badge.name}</h4>
                  <p className="text-[10px] text-slate-500 leading-snug mb-3">{badge.description}</p>

                  {/* Progress bar */}
                  {!badge.unlocked && (
                    <div className="mt-auto">
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${badge.progress}%` }} />
                      </div>
                      <p className="text-[9px] text-slate-400 mt-1.5">{badge.requirement}</p>
                    </div>
                  )}

                  {badge.unlocked && (
                    <p className="text-[9px] text-emerald-600 font-semibold mt-1">✓ Unlocked {badge.unlockedDate}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ═══ SECTION 2 — DONATION STREAK TRACKER ═══ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" /> Donation Streak Tracker
          </h2>
          <p className="text-sm text-slate-500 mb-5">Your contribution activity over the past year — just like GitHub!</p>

          {/* Streak stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Current Streak', value: `${currentStreak} days`, icon: <Flame className="w-4 h-4 text-orange-500" />, bg: 'bg-orange-50' },
              { label: 'Longest Streak', value: `${longestStreak} days`, icon: <Trophy className="w-4 h-4 text-yellow-600" />, bg: 'bg-yellow-50' },
              { label: 'Active Days', value: `${totalActive}/365`, icon: <Calendar className="w-4 h-4 text-blue-500" />, bg: 'bg-blue-50' },
              { label: 'Total Donations', value: `${totalDonationsYear}`, icon: <Package className="w-4 h-4 text-emerald-600" />, bg: 'bg-emerald-50' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-3 shadow-sm">
                <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', s.bg)}>
                  {s.icon}
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-900">{s.value}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wide">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Calendar heatmap */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 overflow-x-auto">
            {/* Month labels */}
            <div className="flex gap-0 mb-1 ml-8">
              {monthPositions.map((mp, i) => (
                <div
                  key={i}
                  className="text-[10px] text-slate-400 font-medium"
                  style={{ position: 'relative', left: `${mp.col * 14}px`, width: 0, whiteSpace: 'nowrap' }}
                >
                  {mp.label}
                </div>
              ))}
            </div>

            <div className="flex gap-0.5 items-start">
              {/* Day labels */}
              <div className="flex flex-col gap-0.5 mr-1.5 pt-0.5">
                {['','Mon','','Wed','','Fri',''].map((d, i) => (
                  <div key={i} className="h-[12px] text-[9px] text-slate-400 leading-[12px] w-6 text-right pr-1">{d}</div>
                ))}
              </div>

              {/* Grid */}
              {weeks.map((w, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {w.map((d, di) => (
                    <div
                      key={di}
                      className={cn(
                        'w-[12px] h-[12px] rounded-[2px] transition-all',
                        d.count === -1 ? 'bg-transparent' : getCellColor(d.count),
                        d.count >= 0 && 'hover:ring-2 hover:ring-emerald-400 cursor-pointer'
                      )}
                      onMouseEnter={() => d.count >= 0 ? setHoveredCell(d) : null}
                      onMouseLeave={() => setHoveredCell(null)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Tooltip */}
            {hoveredCell && (
              <div className="mt-3 text-xs text-slate-600 bg-slate-50 inline-block px-3 py-1.5 rounded-lg border border-slate-200">
                <strong>{hoveredCell.count} donation{hoveredCell.count !== 1 ? 's' : ''}</strong> on {hoveredCell.date}
              </div>
            )}

            {/* Legend */}
            <div className="flex items-center gap-2 mt-3 justify-end">
              <span className="text-[10px] text-slate-400">Less</span>
              {[0, 1, 2, 3, 4].map(c => (
                <div key={c} className={cn('w-[12px] h-[12px] rounded-[2px]', getCellColor(c))} />
              ))}
              <span className="text-[10px] text-slate-400">More</span>
            </div>
          </div>
        </div>

        {/* ═══ SECTION 3 — IMPACT CERTIFICATE PREVIEW ═══ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-purple-500" /> Impact Certificate
          </h2>
          <p className="text-sm text-slate-500 mb-5">A personalized certificate recognizing your contribution — click download to save as PDF.</p>

          <div ref={certRef} className="bg-white rounded-2xl border-2 border-emerald-200 shadow-lg overflow-hidden">
            {/* Green top bar */}
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400" />

            <div className="p-8 sm:p-12 relative">
              {/* Watermark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[25deg] text-[100px] sm:text-[140px] font-extrabold text-emerald-50 select-none pointer-events-none tracking-wider whitespace-nowrap">
                FEEDFORWARD
              </div>

              <div className="relative z-10">
                {/* Logo */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xl font-bold text-slate-800">Feed<span className="text-emerald-600">Forward</span></span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Connecting Donors with Those in Need</p>
                </div>

                {/* Title */}
                <div className="text-center mb-6">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">🏆 Certificate of Impact</h3>
                  <p className="text-sm text-slate-500 mt-2">This certificate is proudly presented to</p>
                </div>

                {/* Name */}
                <div className="text-center mb-8">
                  <h4 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                    {user?.name || 'Donor Name'}
                  </h4>
                  <p className="text-sm text-slate-500 mt-1 capitalize">
                    Verified {user?.role === 'ngo' ? 'NGO Partner' : 'Food Donor'} • {user?.city || 'India'}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                  {[
                    { val: '1,200+', lbl: 'People Fed' },
                    { val: '480 kg', lbl: 'Food Saved' },
                    { val: '1,200 kg', lbl: 'CO₂ Prevented' },
                  ].map(s => (
                    <div key={s.lbl} className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <div className="text-2xl font-extrabold text-emerald-600">{s.val}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-1">{s.lbl}</div>
                    </div>
                  ))}
                </div>

                {/* Unlocked badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {BADGES.filter(b => b.unlocked).slice(0, 4).map(b => (
                    <span key={b.id} className="px-3 py-1.5 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-full text-xs font-semibold">
                      🏅 {b.name}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-center text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-8">
                  In recognition of your outstanding contribution to fighting hunger and reducing food waste in your community through the FeedForward platform.
                </p>

                {/* Footer */}
                <div className="text-center border-t-2 border-dashed border-slate-200 pt-6">
                  <p className="text-xs text-slate-400">
                    Issued on: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm font-semibold text-slate-700 mt-2">FeedForward Foundation</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Certificate ID: FF-{Date.now().toString(36).toUpperCase()}-{Math.random().toString(36).slice(2, 6).toUpperCase()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Download button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleDownloadCert}
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-200 hover:shadow-xl hover:from-emerald-700 hover:to-emerald-800 transition-all text-sm"
            >
              <Download className="w-5 h-5" />
              Download as PDF Certificate
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
