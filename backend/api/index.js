const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// ==========================================
// MONGODB ATLAS CONNECTION PIPELINE
// ==========================================
// Falls back to your local MongoDB if DATABASE_URL environment variable is not defined
const MONGO_URI = process.env.DATABASE_URL || "mongodb://localhost:27017/hotel-operations-app";

mongoose.connect(MONGO_URI)
  .then(() => console.log("💾 Persistent MongoDB cloud cluster pipeline online!"))
  .catch(err => console.error("❌ Database Connection Fault:", err));

// Define a dynamic schema to hold whatever data arrays/objects n8n pushes to us
const HotelDataSchema = new mongoose.Schema({
  moduleName: { type: String, required: true, unique: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

const HotelData = mongoose.model('HotelData', HotelDataSchema);

// ==========================================
// CROSS-ORIGIN RESOURCE SHARING (CORS)
// ==========================================
const allowedOrigins = [
  'http://localhost:5173', 
  'http://localhost:3000'  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// List of recognized modules matching your frontend dashboards
const validModules = [
  'dashboard', 'arrivals', 'departures', 'inhouse', 
  'roomstatus', 'housekeeping', 'maintenance', 'reports'
];

// ==========================================
// 1. RECEIVE & STORE DATA FROM N8N (DATABASE UPSERT)
// ==========================================
app.post('/api/:module', async (req, res) => {
  const moduleName = req.params.module.toLowerCase();

  if (!validModules.includes(moduleName)) {
    return res.status(404).json({ error: `Unknown module target: ${moduleName}` });
  }

  try {
    // Upsert operation: updates data if module exists, inserts a new document if it doesn't
    await HotelData.findOneAndUpdate(
      { moduleName: moduleName },
      { data: req.body },
      { upsert: true, new: true }
    );

    console.log(`📥 [DATABASE SUCCESS] Saved telemetry from n8n for [${moduleName.toUpperCase()}]`);
    res.status(201).json({
      success: true,
      message: `Data securely saved to cloud database for module: ${moduleName}`
    });
  } catch (error) {
    console.error(`❌ DB Write Error for module ${moduleName}:`, error);
    res.status(500).json({ error: "Failed to process database pipeline transaction" });
  }
});

// ==========================================
// 2. SERVE LIVE DATABASE DATA TO REACT UI
// ==========================================
app.get('/api/:module', async (req, res) => {
  const moduleName = req.params.module.toLowerCase();

  if (!validModules.includes(moduleName)) {
    return res.status(404).json({ error: `No route configured for module: ${moduleName}` });
  }

  try {
    const record = await HotelData.findOne({ moduleName: moduleName });
    
    // If n8n hasn't pushed data yet, return empty defaults so frontend maps don't break
    if (!record) {
      const defaultData = moduleName === 'dashboard' ? {} : [];
      return res.json(defaultData);
    }

    res.json(record.data);
  } catch (error) {
    console.error(`❌ DB Read Error for module ${moduleName}:`, error);
    res.status(500).json({ error: "Internal database stream interruption" });
  }
});

// Verification check route
app.get('/api/arrivals-status', (req, res) => {
    res.status(200).json({ status: "Online", message: "Cloud data pipes clear" });
});

// Active Port Configuration Listener
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Proxy server routing database webhooks on port ${PORT}`));