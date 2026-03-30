// Simple QR code generator using Google Chart API
function QRCode({ value, size = 180 }) {
  if (!value) return null;
  const url = `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodeURIComponent(value)}`;
  return <img src={url} alt="QR Code" width={size} height={size} style={{margin:'0 auto',display:'block',background:'#fff',padding:8,borderRadius:12}} />;
}

function CreditCardForm({ onPay }) {
  const [card, setCard] = useState('');
  const [exp, setExp] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  return (
    <form style={{marginTop:12,background:'#f8fafc',padding:12,borderRadius:10}} onSubmit={e=>{e.preventDefault();onPay();}}>
      <div style={{marginBottom:8}}>
        <input type="text" placeholder="Card Number" value={card} onChange={e=>setCard(e.target.value)} maxLength={19} style={{width:'100%',padding:8,marginBottom:6}} required />
        <input type="text" placeholder="MM/YY" value={exp} onChange={e=>setExp(e.target.value)} maxLength={5} style={{width:'48%',padding:8,marginRight:'4%',marginBottom:6}} required />
        <input type="text" placeholder="CVV" value={cvv} onChange={e=>setCvv(e.target.value)} maxLength={4} style={{width:'48%',padding:8,marginBottom:6}} required />
        <input type="text" placeholder="Name on Card" value={name} onChange={e=>setName(e.target.value)} style={{width:'100%',padding:8,marginBottom:6}} required />
      </div>
      <button type="submit" style={{width:'100%',background:'#2563eb'}}>Pay ₹100 (Mock Card)</button>
    </form>
  );
}

function DonateFoodForm() {
  const [showThanks, setShowThanks] = React.useState(false);
  const [name, setName] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [food, setFood] = React.useState('');
  const [error, setError] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/food-donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contact, food })
      });
      if (!res.ok) throw new Error('Failed to submit');
      setShowThanks(true);
    } catch {
      setError('Could not submit your donation. Please try again.');
    }
  }

  if (showThanks) {
    return <div style={{color:'#16a34a',fontWeight:700,fontSize:'1.2rem',marginTop:12}}>Thank you for your food donation! Our team will contact you soon.</div>;
  }
  return (
    <form style={{display:'flex',flexDirection:'column',gap:10,alignItems:'center',width:'100%',maxWidth:340}} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={e=>setName(e.target.value)}
        required
        style={{padding:10,borderRadius:8,border:'1px solid #fbbf24',width:'100%'}}
      />
      <input
        type="text"
        placeholder="Contact (Phone/Email)"
        value={contact}
        onChange={e=>setContact(e.target.value)}
        required
        style={{padding:10,borderRadius:8,border:'1px solid #fbbf24',width:'100%'}}
      />
      <textarea
        placeholder="Food Items/Details (e.g. 10kg rice, 5 meal packs)"
        value={food}
        onChange={e=>setFood(e.target.value)}
        required
        rows={3}
        style={{padding:10,borderRadius:8,border:'1px solid #fbbf24',width:'100%',resize:'vertical'}}
      />
      <button type="submit" style={{background:'#f59e42',color:'#fff',fontWeight:700,fontSize:'1.1rem',padding:'10px 0',border:'none',borderRadius:8,width:'100%',marginTop:6,cursor:'pointer'}}>Submit Food Donation</button>
      {error && <div style={{color:'#dc2626',marginTop:6}}>{error}</div>}
    </form>
  );
}

import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const API_BASE = '/api';

function AuthForm({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('Auth failed');
      const data = await res.json();
      onAuth(data.user);
    } catch {
      setError(`${mode === 'login' ? 'Login' : 'Register'} failed`);
    }
  };

  return (
    <div className="auth-section">
      <div className="auth-card">
        <h2 style={{textAlign:'center'}}>{mode === 'login' ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="primary-button" type="submit" style={{marginBottom: 12}}>
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <button
          type="button"
          style={{
            width: '100%',
            padding: '10px 0',
            background: '#f1f5f9',
            color: '#2563eb',
            border: '1px solid #cbd5e1',
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 8,
            marginTop: 0,
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Switch to Register' : 'Switch to Login'}
        </button>
        {error && <div className="auth-error">{error}</div>}
      </div>
    </div>
  );
}

function ImpactGraph() {
  // Mock data for the impact graph
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const data = [32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54];
  return (
    <div style={{marginTop:16}}>
      <h3>Impact graph</h3>
      <div style={{width:'100%',height:180,background:'#f8fafc',borderRadius:8,padding:12}}>
        <svg width="100%" height="150">
          {data.map((v,i) => (
            <rect key={i} x={i*32+20} y={150-v*2} width="20" height={v*2} fill="#67e8f9" />
          ))}
          {months.map((m,i) => (
            <text key={m} x={i*32+30} y={145} fontSize="10" textAnchor="middle">{m}</text>
          ))}
        </svg>
        <div style={{display:'flex',gap:16,marginTop:8}}>
          <span style={{color:'#f43f5e',fontWeight:600}}>■ Food</span>
          <span style={{color:'#3b82f6',fontWeight:600}}>■ Education</span>
          <span style={{color:'#f59e42',fontWeight:600}}>■ Health</span>
        </div>
        <div style={{fontSize:12,opacity:0.7}}>Monthly Donation (Mock)</div>
      </div>
    </div>
  );
}

function Dashboard({ user, onLogout }) {

  const [campaigns, setCampaigns] = useState([]);
  const [selected, setSelected] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [donateStatus, setDonateStatus] = useState('');
  const [upiId, setUpiId] = useState('');
  const [upiName, setUpiName] = useState('');
  const [subInterest, setSubInterest] = useState('Food');
  const [interest, setInterest] = useState('Food');
  const [userLocation, setUserLocation] = useState(null);
  const [showNearby, setShowNearby] = useState(false);

  // Google Maps API key from .env or Vite config
  const GOOGLE_MAP_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '').trim();
  const isGoogleMapEnabled = Boolean(GOOGLE_MAP_KEY && !/your_google_maps_api_key/i.test(GOOGLE_MAP_KEY));
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: isGoogleMapEnabled ? GOOGLE_MAP_KEY : undefined });

  useEffect(() => {
    fetch(`${API_BASE}/campaigns`)
      .then(r => r.json())
      .then(setCampaigns)
      .catch(() => setCampaigns([]));
  }, []);

  useEffect(() => {
    const ws = new window.WebSocket('ws://localhost:5000');
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'donationUpdate') {
          setNotifications(n => [msg.message, ...n]);
        }
      } catch {}
    };
    return () => ws.close();
  }, []);


  // Helper: Calculate distance between two lat/lng points (Haversine formula)
  function getDistanceKm(lat1, lon1, lat2, lon2) {
    function toRad(x) { return x * Math.PI / 180; }
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Filter by interest
  let filteredCampaigns = campaigns.filter(c => {
    if (!c.category) return true;
    return c.category.toLowerCase().includes(interest.toLowerCase());
  });

  // If showNearby and userLocation, filter/sort by proximity (within 50km)
  if (showNearby && userLocation) {
    filteredCampaigns = filteredCampaigns
      .map(c => {
        if (c.lat && c.lng) {
          return { ...c, _distance: getDistanceKm(userLocation.lat, userLocation.lng, c.lat, c.lng) };
        }
        return { ...c, _distance: null };
      })
      .filter(c => c._distance !== null && c._distance < 50)
      .sort((a, b) => a._distance - b._distance);
  }

  const handleDonate = async (id) => {
    setDonateStatus('');
    try {
      const res = await fetch(`${API_BASE}/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaignId: id, amount: 100 })
      });
      if (!res.ok) throw new Error();
      setDonateStatus('Donation successful!');
    } catch {
      setDonateStatus('Donation failed.');
    }
  };

  const handleUPIDonate = () => {
    if (!upiId) return;
    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiName||'FeedForward')}&am=100&cu=INR`;
    window.open(upiUrl, '_blank');
  };

  // Mock payment integration (Razorpay/Stripe)
  const handleMockPayment = () => {
    alert('Mock payment successful! (Razorpay/Stripe UI placeholder)');
    setDonateStatus('Mock payment successful!');
  };

  return (
    <div className="app-container" style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      {/* Modern Header */}
      <header style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'18px 24px',borderRadius:'14px',background:'linear-gradient(90deg,#3b82f6,#9333ea)',color:'#fff',marginBottom:20,boxShadow:'0 4px 16px rgba(59,130,246,0.08)'}}>
        <div style={{display:'flex',alignItems:'center',gap:14}}>
          <img src="https://cdn-icons-png.flaticon.com/512/1048/1048953.png" alt="FeedForward Logo" width="48" height="48" style={{borderRadius:'12px',background:'#fff',padding:4}} />
          <div>
            <h1 style={{margin:0,fontSize:'2rem',letterSpacing:'0.01em'}}>FeedForward</h1>
            <div style={{fontSize:'1.1rem',opacity:0.92}}>Empowering Change, One Donation at a Time</div>
          </div>
        </div>
        <nav style={{display:'flex',gap:18,alignItems:'center'}}>
          <a href="#campaigns" style={{color:'#fff',textDecoration:'none',fontWeight:600}}>Campaigns</a>
          <a href="#impact" style={{color:'#fff',textDecoration:'none',fontWeight:600}}>Impact</a>
          <a href="#about" style={{color:'#fff',textDecoration:'none',fontWeight:600}}>About</a>
          <button onClick={onLogout} style={{background:'#fff',color:'#3b82f6',padding:'8px 18px',borderRadius:8,fontWeight:700,marginLeft:12}}>Logout</button>
        </nav>
      </header>
      <div className="filter-section" style={{marginTop:24, marginBottom:8}}>
        <label htmlFor="interest" style={{fontWeight:700, fontSize:'1.2rem',marginRight:8}}>Select your interest:</label>
        <select id="interest" value={interest} onChange={e => setInterest(e.target.value)} style={{fontSize:'1.1rem',padding:'4px 8px',borderRadius:6,border:'1px solid #cbd5e1'}}>
          <option value="Food">Food</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
        </select>
        <button
          style={{marginLeft:18,background:showNearby?'#2563eb':'#f1f5f9',color:showNearby?'#fff':'#2563eb',border:'1px solid #cbd5e1',fontWeight:700,fontSize:'1.1rem',padding:'8px 28px',borderRadius:12,boxShadow:showNearby?'0 2px 8px #2563eb22':'0 2px 8px #64748b11',transition:'all 0.2s'}}
          onClick={() => {
            if (!userLocation) {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                  err => alert('Location access denied or unavailable.')
                );
              } else {
                alert('Geolocation not supported.');
              }
            }
            setShowNearby(v => !v);
          }}
        >
          {showNearby ? 'Show All' : 'Show Nearby'}
        </button>
      </div>
      {/* Trust Badges & Testimonials Section (About) */}
      <section id="about" style={{margin:'0 0 32px 0',padding:'24px 0',background:'#f8fafc',borderRadius:14,boxShadow:'0 2px 12px rgba(59,130,246,0.04)'}}>
        <h2 style={{textAlign:'center',marginBottom:24,fontSize:'2rem',color:'#3b82f6',fontWeight:800,letterSpacing:'-0.01em'}}>About FeedForward</h2>
        <div style={{display:'flex',justifyContent:'center',gap:32,flexWrap:'wrap',marginBottom:18}}>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <img src="https://cdn-icons-png.flaticon.com/512/190/190411.png" alt="Verified NGOs" width="32" height="32" />
            <span style={{fontWeight:700,color:'#10b981'}}>100% Verified NGOs</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="Secure Payments" width="32" height="32" />
            <span style={{fontWeight:700,color:'#2563eb'}}>Secure Payments</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <img src="https://cdn-icons-png.flaticon.com/512/1828/1828640.png" alt="Instant Impact" width="32" height="32" />
            <span style={{fontWeight:700,color:'#f59e42'}}>Instant Impact</span>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:32,flexWrap:'wrap'}}>
          <div style={{maxWidth:320,background:'#fff',border:'1px solid #e2e8f0',borderRadius:10,padding:18,boxShadow:'0 2px 8px rgba(16,185,129,0.07)'}}>
            <div style={{fontWeight:600,marginBottom:8}}>&ldquo;I donated for food and got updates on every meal delivered. Amazing transparency!&rdquo;</div>
            <div style={{fontSize:13,color:'#64748b'}}>— Priya S., Donor</div>
          </div>
          <div style={{maxWidth:320,background:'#fff',border:'1px solid #e2e8f0',borderRadius:10,padding:18,boxShadow:'0 2px 8px rgba(59,130,246,0.07)'}}>
            <div style={{fontWeight:600,marginBottom:8}}>&ldquo;Our NGO reached more families thanks to FeedForward. The process is smooth and secure.&rdquo;</div>
            <div style={{fontSize:13,color:'#64748b'}}>— Rakesh K., NGO Partner</div>
          </div>
          <div style={{maxWidth:320,background:'#fff',border:'1px solid #e2e8f0',borderRadius:10,padding:18,boxShadow:'0 2px 8px rgba(245,158,66,0.07)'}}>
            <div style={{fontWeight:600,marginBottom:8}}>&ldquo;I subscribed for notifications and got to help right when it was needed most!&rdquo;</div>
            <div style={{fontSize:13,color:'#64748b'}}>— Anjali M., Volunteer</div>
          </div>
        </div>
      </section>
      <section id="campaigns">
        <h2 style={{margin:'18px 0 18px 0',fontSize:'1.7rem',color:'#2563eb',fontWeight:700,letterSpacing:'-0.01em'}}>Campaigns</h2>
        <div className="main-grid" style={{flex:1}}>
        {/* Left: Campaign List */}
        <div className="panel">
          {filteredCampaigns.length === 0 && <div style={{color:'#64748b'}}>No campaigns found for this filter.</div>}
          {filteredCampaigns.map(c => (
            <div className="campaign-card" key={c.id}>
              <h3 style={{marginBottom:4}}>{c.name}</h3>
              <div style={{marginBottom:4}}>{c.description}</div>
              <div style={{fontSize:13,marginBottom:2}}>Status: <b>verified</b></div>
              <div style={{fontSize:13,marginBottom:2}}>Category: {c.category||'hunger-relief'}</div>
              <div style={{fontSize:13,marginBottom:2}}>
                Distance: {c._distance !== undefined ? (c._distance !== null ? `${c._distance.toFixed(1)} km` : 'N/A') : 'N/A'}
              </div>
              <div style={{fontSize:13,marginBottom:8}}>Raised: ₹{c.raised||400} / ₹{c.goal||2000}</div>
              <button onClick={() => setSelected(c)} style={{marginRight:8}}>Select</button>
              <button onClick={() => handleDonate(c.id)}>Donate ₹100</button>
            </div>
          ))}
          {/* Google Map for campaigns */}
          {isLoaded && userLocation && (
            <div style={{marginTop:18, borderRadius:12, overflow:'hidden'}}>
              <GoogleMap
                mapContainerStyle={{width:'100%',height:300}}
                center={userLocation}
                zoom={11}
              >
                <Marker position={userLocation} label="You" />
                {filteredCampaigns.map((c,i) => c.lat && c.lng && (
                  <Marker key={i} position={{lat:c.lat, lng:c.lng}} label={c.name} />
                ))}
              </GoogleMap>
            </div>
          )}
        </div>
        {/* Right: Details, Donate, Graph, Notify, Notifications */}
        <div className="panel" id="impact">
          <h2 style={{margin:'0 0 18px 0',fontSize:'1.5rem',color:'#10b981',fontWeight:700,letterSpacing:'-0.01em'}}>Impact</h2>
          {/* Impact Dashboard */}
          <div className="top-cards" style={{marginBottom:18}}>
            <div className="card">
              <div style={{fontSize:13,opacity:0.7}}>Total Donations</div>
              <div style={{fontWeight:700,fontSize:22}}>₹12,500</div>
            </div>
            <div className="card">
              <div style={{fontSize:13,opacity:0.7}}>Meals Provided</div>
              <div style={{fontWeight:700,fontSize:22}}>2,300</div>
            </div>
            <div className="card">
              <div style={{fontSize:13,opacity:0.7}}>Students Helped</div>
              <div style={{fontWeight:700,fontSize:22}}>410</div>
            </div>
          </div>
          <ImpactGraph />
          {/* Campaign Details */}
          {selected ? (
            <>
              <h2 style={{marginTop:18}}>{selected.name}</h2>
              <div>{selected.description}</div>
              <div style={{fontSize:13,margin:'6px 0'}}>Category: {selected.category||'hunger-relief'}</div>
              <div style={{fontSize:13}}>Status: <b>verified</b></div>
              <div style={{margin:'10px 0',display:'flex',flexWrap:'wrap',gap:8}}>
                <button onClick={() => handleDonate(selected.id)} style={{background:'#2563eb',color:'#fff'}}>Donate ₹100 (direct)</button>
                <button onClick={handleUPIDonate} style={{background:'#10b981',color:'#fff'}}>Pay + Donate ₹100</button>
                <button style={{background:'#f59e42',color:'#fff'}} onClick={handleMockPayment}>Mock Payment (Razorpay/Stripe)</button>
                {/* Unique food donation options */}
                <button style={{background:'#f43f5e',color:'#fff'}} onClick={()=>alert('Thank you for donating a meal!')}>Donate a Meal</button>
                <button style={{background:'#3b82f6',color:'#fff'}} onClick={()=>alert('Thank you for sponsoring a family!')}>Sponsor a Family</button>
                <button style={{background:'#a3e635',color:'#222'}} onClick={()=>alert('Thank you for sending groceries!')}>Send Groceries</button>
              </div>
              {/* UPI Section */}
              <div style={{margin:'16px 0',padding:12,background:'#f8fafc',borderRadius:10}}>
                <div style={{fontWeight:600,marginBottom:6}}>Pay via UPI</div>
                <div style={{display:'flex',gap:8,marginBottom:8,justifyContent:'center'}}>
                  <button style={{background:'#fff',border:'1px solid #cbd5e1',borderRadius:8,padding:'6px 14px',display:'flex',alignItems:'center',gap:6,cursor:'pointer'}} onClick={handleUPIDonate}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="GPay" width="22" height="22" /> Google Pay
                  </button>
                  <button style={{background:'#fff',border:'1px solid #cbd5e1',borderRadius:8,padding:'6px 14px',display:'flex',alignItems:'center',gap:6,cursor:'pointer'}} onClick={handleUPIDonate}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/PhonePe_Logo.png" alt="PhonePe" width="22" height="22" /> PhonePe
                  </button>
                  <button style={{background:'#fff',border:'1px solid #cbd5e1',borderRadius:8,padding:'6px 14px',display:'flex',alignItems:'center',gap:6,cursor:'pointer'}} onClick={handleUPIDonate}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Paytm_logo.png" alt="Paytm" width="22" height="22" /> Paytm
                  </button>
                  <button style={{background:'#fff',border:'1px solid #cbd5e1',borderRadius:8,padding:'6px 14px',display:'flex',alignItems:'center',gap:6,cursor:'pointer'}} onClick={handleUPIDonate}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/BHIM_logo.png" alt="BHIM" width="22" height="22" /> BHIM
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g. yourname@upi)"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  style={{width:'100%',marginBottom:6,padding:8}}
                />
                <input
                  type="text"
                  placeholder="Recipient name for immediate food assignment"
                  value={upiName}
                  onChange={e => setUpiName(e.target.value)}
                  style={{width:'100%',marginBottom:6,padding:8}}
                />
                <button style={{width:'100%',background:'#10b981',marginBottom:10}} onClick={handleUPIDonate}>
                  Pay ₹100 via UPI + Donate and Dispatch Food
                </button>
                {/* UPI QR Code */}
                <div style={{marginTop:10,textAlign:'center'}}>
                  <div style={{fontSize:13,marginBottom:4}}>Or scan QR to pay:</div>
                  <QRCode value={upiId ? `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(upiName||'FeedForward')}&am=100&cu=INR` : ''} />
                </div>
              </div>
              {/* Credit Card Section */}
              <div style={{margin:'16px 0'}}>
                <div style={{fontWeight:600,marginBottom:6}}>Pay by Credit/Debit Card (Mock)</div>
                <CreditCardForm onPay={handleMockPayment} />
              </div>
              {/* Paytm Section */}
              <div style={{margin:'16px 0'}}>
                <div style={{fontWeight:600,marginBottom:6}}>Pay with Paytm (Mock)</div>
                <button style={{width:'100%',background:'#00baf2',color:'#fff',marginBottom:8}} onClick={()=>alert('Mock Paytm payment successful!')}>Pay ₹100 with Paytm</button>
              </div>
              {/* PhonePe Section */}
              <div style={{margin:'16px 0'}}>
                <div style={{fontWeight:600,marginBottom:6}}>Pay with PhonePe (Mock)</div>
                <button style={{width:'100%',background:'#5f259f',color:'#fff',marginBottom:8}} onClick={()=>alert('Mock PhonePe payment successful!')}>Pay ₹100 with PhonePe</button>
              </div>
              {/* Wallets Section */}
              <div style={{margin:'16px 0'}}>
                <div style={{fontWeight:600,marginBottom:6}}>Pay with Wallet (Mock)</div>
                <button style={{width:'100%',background:'#f59e42',color:'#fff',marginBottom:8}} onClick={()=>alert('Mock Wallet payment successful!')}>Pay ₹100 with Wallet</button>
              </div>
            </>
          ) : (
            <div style={{color:'#64748b',textAlign:'center',marginTop:40}}>Select a campaign to see details and donate.</div>
          )}
          <div style={{marginTop:24}}>
            <h3>Notify Me When Needed</h3>
            <select value={subInterest} onChange={e=>setSubInterest(e.target.value)}>
              <option>Food</option>
              <option>Education</option>
              <option>Health</option>
            </select>
            <button style={{marginLeft:8}}>Subscribe</button>
          </div>
          <div style={{marginTop:18}}>
            <h3>Notifications</h3>
            <div className="notifications">
              {notifications.length === 0 && <div style={{color:'#64748b'}}>No notifications yet.</div>}
              {notifications.map((n, i) => (
                <div className="notification-item" key={i}>{typeof n === 'string' ? n : n.message ? n.message : JSON.stringify(n)}</div>
              ))}
            </div>
          </div>
          {donateStatus && <div style={{color: donateStatus.includes('success') ? '#10b981' : '#ef4444',marginTop:8}}>{donateStatus}</div>}
          </div> {/* end .panel (right) */}
        </div> {/* end .main-grid */}
      </section>
      {/* Modern Footer */}
      <footer style={{marginTop:32,padding:'24px 0',background:'#f1f5f9',borderTop:'1px solid #e2e8f0',textAlign:'center'}}>
        <div style={{fontWeight:700,fontSize:18,marginBottom:8}}>FeedForward</div>
        <div style={{marginBottom:8}}>
          <a href="#" style={{margin:'0 10px',color:'#2563eb',textDecoration:'none'}}>Privacy Policy</a>
          <a href="#" style={{margin:'0 10px',color:'#2563eb',textDecoration:'none'}}>Terms of Service</a>
          <a href="#" style={{margin:'0 10px',color:'#2563eb',textDecoration:'none'}}>Contact</a>
        </div>
        <div style={{marginBottom:8}}>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" style={{margin:'0 8px'}}><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="24" height="24" /></a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" style={{margin:'0 8px'}}><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" width="24" height="24" /></a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" style={{margin:'0 8px'}}><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="24" height="24" /></a>
        </div>
        <div style={{fontSize:13,opacity:0.7}}>© {new Date().getFullYear()} FeedForward. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('auth'));
    } catch {
      return null;
    }
  });

  const handleAuth = (userObj) => {
    setUser(userObj);
    localStorage.setItem('auth', JSON.stringify(userObj));
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('auth');
  };

  return user ? (
    <Dashboard user={user} onLogout={handleLogout} />
  ) : (
    <AuthForm onAuth={handleAuth} />
  );
}