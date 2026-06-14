const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Enable Cross-Origin Resource Sharing (CORS) for production and local environments
const allowedOrigins = [
  'http://localhost:5173', // Your local React setup
  'http://localhost:3000'  // Alternative local port just in case
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl requests, or n8n webhooks)
    if (!origin) return callback(null, true);
    
    // In production, you can add your specific Vercel URL to allowedOrigins, 
    // or keep it open/flexible for your different deployment domains:
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Local in-memory data store to hold your spreadsheet arrays
const dataStorage = {
  dashboard: {},
  arrivals: [],
  departures: [],
  inhouse: [],
  roomstatus: [],
  housekeeping: [],
  maintenance: [],
  reports: [],
};

// ==========================================
// 1. RECEIVE DATA FROM N8N (PUSH PIPELINE)
// ==========================================
app.post('/api/:module', (req, res) => {
  const moduleName = req.params.module;

  if (!(moduleName in dataStorage)) {
    return res.status(404).json({ error: `Unknown module target: ${moduleName}` });
  }

  dataStorage[moduleName] = req.body;
  
  console.log(`📥 Successfully received and stored data from n8n for [${moduleName.toUpperCase()}]`);
  res.status(201).json({
    success: true,
    message: `Data saved successfully for module: ${moduleName}`
  });
});

// ==========================================
// 2. SERVE DATA TO REACT UI (FETCH PIPELINE)
// ==========================================
app.get('/api/:module', (req, res) => {
  const moduleName = req.params.module;

  if (!(moduleName in dataStorage)) {
    return res.status(404).json({ error: `No route configured for module: ${moduleName}` });
  }

  res.json(dataStorage[moduleName]);
});

// Verification check route
app.get('/api/arrivals-status', (req, res) => {
    res.status(200).json({ status: "Online", message: "Data pipes clear" });
});

// Active Port Configuration Listener (Dynamically bound for Cloud Hosting)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Proxy server routing n8n webhooks on port ${PORT}`));