// Food Donation Endpoint
app.post('/api/food-donations', async (req, res) => {
  await db.read();
  const { name, contact, food } = req.body;
  if (!name || !contact || !food) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  db.data.foodDonations ||= [];
  const donation = {
    id: uuidv4(),
    name,
    contact,
    food,
    createdAt: new Date().toISOString()
  };
  db.data.foodDonations.push(donation);
  await db.write();
  res.status(201).json({ donation });
});
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { join } = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

let db;
let Low;
let JSONFile;
const dbPath = join(__dirname, 'db.json');

async function initDB() {
  if (!Low || !JSONFile) {
    const lowdb = await import('lowdb');
    const lowdbNode = await import('lowdb/node');
    Low = lowdb.Low;
    JSONFile = lowdbNode.JSONFile;
  }

  db = new Low(new JSONFile(dbPath));
  await db.read();
  db.data ||= {
    campaigns: [],
    donations: [],
    payments: [],
    ratings: [],
    users: [],
    notifications: [],
    watchers: []
  };

  // seed a default user for demo login
  if (db.data.users.length === 0) {
    db.data.users.push({ id: uuidv4(), email: 'demo@user.com', password: 'password', role: 'donor' });
  }

  if (db.data.campaigns.length === 0) {
    db.data.campaigns.push(
      {
        id: uuidv4(),
        name: 'City Hunger Relief',
        category: 'hunger-relief',
        description: 'Immediate food support to families in need.',
        lat: 12.9716,
        lng: 77.5946,
        documents: ['certificate1.pdf'],
        createdBy: 'ngo-1',
        status: 'verified',
        goal: { amount: 2000, raised: 0 },
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Rainforest School Supplies',
        category: 'school-supplies',
        description: 'Books and stationery for rural students.',
        lat: 12.2958,
        lng: 76.6394,
        documents: ['certificate2.pdf'],
        createdBy: 'ngo-2',
        status: 'verified',
        goal: { amount: 1500, raised: 0 },
        createdAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        name: 'Health Camp Bangalore',
        category: 'medical-camps',
        description: 'Free checkups and medicines for seniors.',
        lat: 13.0827,
        lng: 80.2707,
        documents: ['certificate3.pdf'],
        createdBy: 'ngo-3',
        status: 'pending',
        goal: { amount: 3000, raised: 0 },
        createdAt: new Date().toISOString()
      }
    );
  }

  await db.write();
}

function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function ruleBasedCategory(interest) {
  const map = {
    food: ['hunger-relief', 'community-kitchen', 'food-packages'],
    education: ['scholarship', 'school-supplies', 'tutoring'],
    health: ['medical-camps', 'vaccination', 'health-kits']
  };
  return map[interest] || [];
}

app.post('/api/register', async (req, res) => {
  await db.read();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  const exists = db.data.users.find(u => u.email === email);
  if (exists) return res.status(400).json({ error: 'User already exists' });
  const user = { id: uuidv4(), email, password, role: 'donor', createdAt: new Date().toISOString() };
  db.data.users.push(user);
  await db.write();
  res.json({ user: { id: user.id, email: user.email, role: user.role } });
});

app.post('/api/login', async (req, res) => {
  await db.read();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });
  const user = db.data.users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ user: { id: user.id, email: user.email, role: user.role } });
});

app.get('/api/campaigns', async (req, res) => {
  await db.read();
  let result = db.data.campaigns.filter(c => c.status === 'verified');
  const { interest, lat, lng, radius } = req.query;

  if (interest) {
    const allowed = ruleBasedCategory(interest.toLowerCase());
    result = result.filter(c => allowed.includes(c.category.toLowerCase()));
  }
  if (lat && lng) {
    const userLat = Number(lat);
    const userLng = Number(lng);
    result = result
      .map(c => ({ ...c, distance: distanceKm(userLat, userLng, c.lat, c.lng) }))
      .sort((a, b) => a.distance - b.distance);
    if (radius) {
      const maxR = Number(radius);
      result = result.filter(c => c.distance <= maxR);
    }
  }

  res.json(result);
});

app.post('/api/campaigns', async (req, res) => {
  await db.read();
  const { name, category, description, lat, lng, documents, createdBy, goalAmount } = req.body;
  const campaign = {
    id: uuidv4(),
    name,
    category,
    description,
    lat: Number(lat) || 0,
    lng: Number(lng) || 0,
    documents: documents || [],
    createdBy: createdBy || 'ngo',
    status: 'pending',
    goal: { amount: Number(goalAmount) || 1000, raised: 0 },
    createdAt: new Date().toISOString()
  };
  db.data.campaigns.push(campaign);
  await db.write();
  res.status(201).json(campaign);
});

app.post('/api/seed', async (req, res) => {
  await initDB();
  res.json({ message: 'Seed data loaded', campaigns: db.data.campaigns.length });
});

app.patch('/api/admin/campaigns/:id', async (req, res) => {
  await db.read();
  const { id } = req.params;
  const { status } = req.body;
  const camp = db.data.campaigns.find(c => c.id === id);
  if (!camp) return res.status(404).json({ error: 'Campaign not found' });
  camp.status = status;
  await db.write();

  if (status === 'verified') {
    io.emit('campaignVerified', { campaign: camp });
  }

  res.json(camp);
});

app.post('/api/donations', async (req, res) => {
  await db.read();
  const { campaignId, userId, amount } = req.body;
  const campaign = db.data.campaigns.find(c => c.id === campaignId);
  if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
  if (campaign.status !== 'verified') return res.status(400).json({ error: 'Campaign not verified' });

  const donation = {
    id: uuidv4(),
    campaignId,
    userId: userId || 'anonymous',
    amount: Number(amount || 0),
    createdAt: new Date().toISOString()
  };
  db.data.donations.push(donation);
  campaign.goal.raised += donation.amount;
  await db.write();

  const meals = Math.floor(donation.amount / 10);
  const students = Math.floor(donation.amount / 25);
  const message = `Your donation funded ${meals} meals and helped ${students} students`;

  const update = {
    type: 'donation',
    campaignId,
    donationId: donation.id,
    message,
    createdAt: new Date().toISOString()
  };
  db.data.notifications.push(update);
  await db.write();

  io.emit('donationUpdate', update);

  const isFull = campaign.goal.amount > 0 && campaign.goal.raised >= campaign.goal.amount;
  if (isFull) {
    const watchers = db.data.watchers.filter(w =>
      w.interest === campaign.category || w.interest === 'all'
    );
    watchers.forEach(w => {
      const note = {
        id: uuidv4(),
        userId: w.userId,
        message: `Campaign ${campaign.name} is full. Similar new campaigns will be notified.`,
        createdAt: new Date().toISOString()
      };
      db.data.notifications.push(note);
      io.to(w.userId).emit('notifyMe', note);
    });
    await db.write();
  }

  res.json({ donation, message });
});

app.post('/api/pay', async (req, res) => {
  const { userId, amount, method = 'mock', metadata = {} } = req.body;

  if (Number(amount) <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  const payment = {
    id: uuidv4(),
    userId: userId || 'anonymous',
    amount: Number(amount),
    method,
    status: 'succeeded',
    metadata,
    createdAt: new Date().toISOString()
  };

  await db.read();
  db.data.payments ||= [];
  db.data.payments.push(payment);
  await db.write();

  return res.json({ payment, message: 'Payment successful (mock)' });
});

app.get('/api/impact', async (req, res) => {
  await db.read();
  const totalDonations = db.data.donations.length;
  const totalAmount = db.data.donations.reduce((sum, d) => sum + d.amount, 0);
  const totalMeals = Math.floor(totalAmount / 10);
  const totalStudents = Math.floor(totalAmount / 25);

  res.json({ totalDonations, totalAmount, totalMeals, totalStudents });
});

app.post('/api/ngo/:id/ratings', async (req, res) => {
  await db.read();
  const ngoId = req.params.id;
  const { userId, rating, comment } = req.body;
  const item = { id: uuidv4(), ngoId, userId, rating: Number(rating), comment, createdAt: new Date().toISOString() };
  db.data.ratings.push(item);
  await db.write();
  res.json(item);
});

app.get('/api/ngo/:id/ratings', async (req, res) => {
  await db.read();
  const ngoId = req.params.id;
  const ratings = db.data.ratings.filter(r => r.ngoId === ngoId);
  const average = ratings.length ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0;
  res.json({ average: Number(average.toFixed(2)), count: ratings.length, ratings });
});

app.post('/api/watchers', async (req, res) => {
  await db.read();
  const { userId, interest } = req.body;
  const entry = { id: uuidv4(), userId, interest, createdAt: new Date().toISOString() };
  db.data.watchers.push(entry);
  await db.write();
  res.json(entry);
});

app.get('/api/notifications/:userId', async (req, res) => {
  await db.read();
  const { userId } = req.params;
  const notifications = db.data.notifications.filter(n => n.userId === userId || !n.userId);
  res.json(notifications);
});

io.on('connection', socket => {
  console.log('Socket connected', socket.id);
  socket.on('join', userId => {
    if (userId) socket.join(userId);
  });
});

const PORT = process.env.PORT || 5000;
initDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
