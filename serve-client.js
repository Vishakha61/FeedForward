const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000;

// Serve static files from client/
app.use(express.static(path.join(__dirname, 'client')));

// ✅ Proxy /api requests to backend (port 5000)
app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5000', // backend server
    changeOrigin: true,
    pathRewrite: {
      '^/api': '' // remove /api prefix
    }
  })
);

// Handle React routing (IMPORTANT)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});