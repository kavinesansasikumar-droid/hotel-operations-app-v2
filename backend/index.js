import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const PORT = 4000;

// 1. Global Middleware Configuration
app.use(cors({ 
  origin: 'http://localhost:5173', // Allows your React frontend to connect without CORS blocks
  credentials: true 
})); 
app.use(express.json()); // Allows parsing of incoming JSON payloads from n8n

// 2. Local MongoDB Database Connection Setup
// (Make sure your local MongoDB instance is running in the background)
mongoose.connect('mongodb://localhost:27017/hotel-operations-app')
  .then(() => console.log('🎯 Successfully connected to MongoDB via Mongoose!'))
  .catch((err) => console.error('❌ MongoDB database connection error:', err));

// 3. Define the Database Schema & Model
const ArrivalSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  roomNumber: { type: String, required: true },
  time: { type: String, required: true },
}, { timestamps: true });

const Arrival = mongoose.model('Arrival', ArrivalSchema);

// 4. REST API Endpoints

/**
 * @route   POST /api/arrivals
 * @desc    Receives the dynamic guest rows coming straight from your n8n workflow
 */
app.post('/api/arrivals', async (req, res) => {
  try {
    const { guestName, roomNumber, time } = req.body;
    
    // Create and save new document into the collection
    const newArrival = new Arrival({ guestName, roomNumber, time });
    await newArrival.save();
    
    res.status(201).json({ success: true, message: 'Saved to database successfully!' });
  } catch (error) {
    console.error('Error saving entry:', error);
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

/**
 * @route   GET /api/arrivals
 * @desc    Serves the collected arrivals data to your React frontend UI grid
 */
app.get('/api/arrivals', async (req, res) => {
  try {
    // Fetch all records sorted by the newest entry first
    const data = await Arrival.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error: any) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve rows' });
  }
});

// 5. Initialize Server Listener
app.listen(PORT, () => {
  console.log(`🚀 Backend engine actively monitoring on: http://localhost:${PORT}`);
});