// This checks if a live Vercel URL exists. If not, it falls back to your local server.
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export default API_URL;