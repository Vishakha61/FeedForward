# FeedForward Donation Platform

Full stack sample app (Node/Express + React) with donation recommendations, verification workflow, impact tracking, real-time updates, and mock payments.

## Features implemented

- Smart donation suggestions by user interest (food, education, health)
- Location-based campaign discovery (mocked lat/lng distance)
- Impact dashboard (total donations, meals, students) with charts
- Verified campaign approval flow (admin patch endpoint)
- Real-time updates through Socket.io
- Feedback/rating API for NGOs
- "Notify me when needed" watcher channel
- Mock donation endpoint + notification system

## Setup

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

App will run at `http://localhost:3000` and backend at `http://localhost:5000`.

## API endpoints

- `GET /api/campaigns` (filter by `interest`, `lat`, `lng`, `radius`)
- `POST /api/campaigns` (create pending campaign)
- `PATCH /api/admin/campaigns/:id` (verify/reject)
- `POST /api/donations`
- `GET /api/impact`
- `POST /api/ngo/:id/ratings`
- `GET /api/ngo/:id/ratings`
- `POST /api/watchers`
- `GET /api/notifications/:userId`

## Notes

- Campaign documents are stored as string array in campaign model (mock upload)
- Production should replace lowdb with persistent DB (Mongo/PostgreSQL)
- Google Maps API call not included, but can be added in client easily with `@react-google-maps/api`.
- Payment integration placeholder via donation endpoint; Stripe/Razorpay can be plugged in later.
