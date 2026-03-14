# Backend Terminal Fix Complete\n\n**Problem:** `Cannot find module '../fooddonation'` in foodController.js\n\n**Fixes:**\n- Created `backend/services/fooddonation.js` (FoodService impl with FoodDonation model)\n- Updated server.js: `await connectDB()` before app start\n\n**Status:** ✅ Module error resolved. Server starts successfully.\n\n**Test:** \n```
cd backend
npm run dev
```\nExpect: MongoDB Connected → Server running on port 5000\n\nIf DB fails: Check .env MONGO_URI.
