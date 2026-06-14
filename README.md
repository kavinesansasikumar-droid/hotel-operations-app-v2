# Fortel Hotel — operations dashboard

Monorepo with a static HTML prototype, a **React + TypeScript + Tailwind** frontend, and an **Express + TypeScript + MongoDB** API.

## Repository layout

| Path | Description |
|------|-------------|
| [`prototype/dashboard.html`](prototype/dashboard.html) | Single-file dashboard (Chart.js, BEM + utilities, mock JSON). Open in a browser. |
| [`frontend/`](frontend/) | Vite React app: dashboard UI, dark mode, TanStack Query, Recharts donut. |
| [`backend/`](backend/) | REST API: JWT auth, Zod validation, Mongoose models, modular routes/controllers/services. |

## Architecture

- **Frontend** calls `GET /api/dashboard/summary` and `GET /api/reservations/today` with `Authorization: Bearer <token>`. If the API is unreachable or returns an error, the UI falls back to embedded mock data so layouts can be developed offline.
- **Backend** is stateless; store session tokens on the client (`localStorage` in a future login screen). Roles: `front_office`, `housekeeping`, `maintenance`, `admin`.

## Local development

### Prerequisites

- Node.js 20+ and npm
- MongoDB (local or [Atlas](https://www.mongodb.com/cloud/atlas))

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env — set MONGODB_URI and JWT_SECRET (16+ chars)

npm install
npm run seed   # optional: demo data + admin@fortel.example / ChangeMe123!
npm run dev
```

API defaults to `http://localhost:4000`. Health check: `GET /health`.

### Frontend

```bash
cd frontend
cp .env.example .env
# Leave VITE_API_URL empty to use Vite proxy → http://localhost:4000

npm install
npm run dev
```

Open `http://localhost:5173`. The Vite dev server proxies `/api` to the backend.

### Obtain a JWT (example)

```bash
curl -s -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@fortel.example\",\"password\":\"ChangeMe123!\"}"
```

Use the returned `token` when calling protected routes:

```bash
curl -s http://localhost:4000/api/dashboard/summary \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Deploy

### Frontend (Vercel)

1. Import the Git repository in [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Framework: Vite. Build command: `npm run build`. Output directory: `dist`.
4. Add environment variable `VITE_API_URL` = your public API URL (e.g. `https://fortel-api.onrender.com`), no trailing slash.
5. Redeploy when env vars change.

### Backend (Render)

1. Create a **Web Service** from the same repo; **Root Directory** `backend`.
2. Build command: `npm install && npm run build`. Start command: `npm start`.
3. Set environment variables from `backend/.env.example` (production `MONGODB_URI`, strong `JWT_SECRET`, `NODE_ENV=production`, `CORS_ORIGIN` = your Vercel URL).
4. Optional: add a **Deploy Hook** for CI/CD from Git pushes.

### Backend (AWS — high level)

- Containerize the API (Dockerfile) or use **Elastic Beanstalk** / **ECS Fargate** behind an **Application Load Balancer**.
- Store secrets in **AWS Secrets Manager** or SSM Parameter Store; inject as env vars.
- Point **MongoDB Atlas** IP access or VPC peering at your AWS network.

## Security notes

- Never commit `.env`. Rotate `JWT_SECRET` if exposed.
- Use HTTPS only in production; set `CORS_ORIGIN` to exact frontend origins.
- Add rate limiting and audit logging before production traffic.

## API summary

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | No | Create user |
| POST | `/api/auth/login` | No | JWT |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/dashboard/summary` | Yes | KPIs + room status strip |
| GET | `/api/reservations/today` | Yes | Arrivals, departures, VIP, alerts |
| GET | `/api/rooms` | Yes | List rooms |
| PATCH | `/api/rooms/:id/status` | Yes (admin, front_office) | Update room status |
