import { createApp } from "./app.js";
import { loadEnv } from "./config/env.js";
import { connectDb } from "./db/connect.js";
import mongoose from "mongoose";

async function main() {
    const env = loadEnv();
    await connectDb();
    const app = createApp();

    // ==========================================
    // 1. POST: Receives data from n8n into MongoDB
    // ==========================================
    app.post('/api/arrivals', async (req: any, res: any) => {
        try {
            console.log("📥 Incoming Row Payload from n8n:", req.body);

            // Bypass import errors dynamically via Mongoose models registry
            const Arrival = mongoose.models.Arrival || mongoose.model('Arrival', new mongoose.Schema({}, { strict: false }));

            const newArrival = new Arrival({
                guestName: req.body['Today Arrival'] || "Unknown", 
                roomNo: req.body['Column1'],        
                eta: req.body['Column2']            
            });

            const savedArrival = await newArrival.save();
            console.log("💾 Successfully saved to MongoDB! Document ID:", savedArrival._id);

            res.status(201).json({ 
                success: true, 
                message: "Saved to database successfully!",
                id: savedArrival._id 
            });
        } catch (error: any) {
            console.error("❌ Database Operation Failed:", error.message);
            res.status(500).json({ success: false, error: error.message });
        }
    });

    // ==========================================
    // 2. GET: Sends data from MongoDB to Frontend
// ==========================================
// 2. GET: Sends data from MongoDB to Frontend with strict object wrapping
// ==========================================
app.get('/api/arrivals', async (req: any, res: any) => {
    try {
        const Arrival = mongoose.models.Arrival || mongoose.model('Arrival', new mongoose.Schema({}, { strict: false }));
        
        // Find all records from the collection
        const allArrivals = await Arrival.find({}); 
        
        // Wrap the array inside a "data" object property so your frontend reads it perfectly
        res.status(200).json({
            success: true,
            data: allArrivals
        });
    } catch (error: any) {
        console.error("❌ Failed to fetch arrivals:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

    // ==========================================
    // Start Server Listener
    // ==========================================
    app.listen(env.PORT, () => {
        console.log(`API listening on port ${env.PORT}`);
    });
}

main().catch((e) => {
    console.error("Server crashed at startup:", e);
});