# ☕ EMBER & BEAN — Specialty Coffee & Café

> *“Slow mornings. Bold coffee.”*

A premium, production-ready full-stack café brand and web application built with a high-end design agency aesthetic. Designed as a showcase freelance portfolio project with an editorial design philosophy, Japanese/Scandinavian minimalism, generous whitespace, tactile film grain, subtle mouse parallax depth, and separated frontend & backend architectures.

---

## 🏛️ System Architecture

```text
ember-bean/
├── frontend/                     # React + Vite Client
│   ├── public/                   # Favicon & SEO assets
│   ├── src/
│   │   ├── assets/               # Brand assets & grain textures
│   │   ├── components/           # Navbar, Footer, MenuCard, Modals, Headings
│   │   ├── pages/                # Home, Menu, About, Experience, Gallery, Reservation, Contact, Admin
│   │   ├── sections/             # Modular editorial sections (Hero, Intro, Featured, etc.)
│   │   ├── services/             # REST API abstraction layer
│   │   ├── styles/               # CSS Design tokens (variables.css & global.css)
│   │   ├── App.jsx               # Router & Layout wrappers
│   │   └── main.jsx              # React DOM entry point
│   ├── index.html                # Google Fonts, Open Graph, SEO meta tags
│   ├── package.json
│   └── vite.config.js
│
├── backend/                      # Node.js + Express REST API
│   ├── config/
│   │   └── db.js                 # Mongoose connection with resilient fallback mode
│   ├── controllers/              # Menu, Reservation, Contact, and Admin controllers
│   ├── models/                   # MenuItem, Reservation, ContactMessage schemas
│   ├── routes/                   # Clean REST route handlers
│   ├── middleware/               # Admin authorization, rate limiting, error handlers
│   ├── seed/
│   │   ├── seedData.js           # 19 curated coffee, non-coffee, bakery, & dessert items
│   │   └── seedRunner.js         # MongoDB seeding CLI script
│   ├── server.js                 # Express server entry point
│   ├── .env.example              # Template environment variables
│   └── package.json
│
└── README.md                     # Comprehensive setup and deployment documentation
```

### Key Technical Highlights
- **Separated & Independently Deployable**: Zero coupling between client and server.
- **Frontend Stack**: React 18, Vite, Plain Modern CSS (Strictly **No Tailwind**, **No Bootstrap**, **No Next.js**), Framer Motion for editorial reveals and parallax, Lucide React for iconography.
- **Backend Stack**: Node.js, Express.js, MongoDB Atlas with Mongoose schemas, Helmet security headers, CORS protection, express-rate-limit anti-abuse protection, centralized error formatting.
- **Zero-Setup Local Resiliency**: The backend includes an intelligent in-memory fallback that serves the full catalog even before you configure your MongoDB connection string!

---

## 🌿 Brand Identity & Design Direction

- **Colors**:
  - Warm Cream: `#FBF8F3`
  - Roasted Mocha / Dark Charcoal: `#140F0C` & `#1E1713`
  - Cashmere Beige: `#F3ECE2`
  - Vintage Copper: `#C88A58`
  - Golden Amber: `#D8A679`
- **Typography**:
  - Headings: *Cormorant Garamond* (Luxury editorial serif)
  - Body: *Plus Jakarta Sans* (Clean, modern geometric sans)
- **Aesthetic Principles**: Asymmetric layouts, layered photography, micro-interactions, subtle borders, grain noise overlay, and deliberate avoidance of generic template cards.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- Optional: MongoDB Atlas account (free tier) or local MongoDB instance

---

### 2. Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(On Windows PowerShell: `Copy-Item .env.example .env`)*

   Default local contents (`backend/.env`):
   ```ini
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ember-bean?retryWrites=true&w=majority
   FRONTEND_URL=http://localhost:5173
   ADMIN_SECRET=ember_bean_secret_admin_2026
   NODE_ENV=development
   ```

4. *(Optional)* Seed the database with 19 handcrafted menu items:
   ```bash
   npm run seed
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   # or
   npm start
   ```
   The backend API will start on: **`http://localhost:5000`**  
   Health check: **`http://localhost:5000/api/health`**

---

### 3. Frontend Setup

1. Open a second terminal window and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   *(On Windows PowerShell: `Copy-Item .env.example .env`)*

   Contents (`frontend/.env`):
   ```ini
   VITE_API_URL=http://localhost:5000
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open your browser to: **`http://localhost:5173`**

---

## 🗄️ MongoDB Atlas Setup (Free Tier)

1. **Sign Up**:
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. **Create a Free Cluster**:
   - Click **Create a Database**, select the **M0 Shared (Free)** tier.
   - Choose a cloud provider and region closest to you (e.g. AWS / Mumbai, AWS / Frankfurt).
   - Click **Create Deployment**.
3. **Set Up Database User**:
   - Under **Database Access**, click **Add New Database User**.
   - Authentication Method: **Password**.
   - Create a username (e.g. `ember_admin`) and a secure password.
   - User Privileges: `Read and write to any database`.
4. **Configure Network Access**:
   - Under **Network Access**, click **Add IP Address**.
   - Select **Allow Access from Anywhere (`0.0.0.0/0`)** to allow your Render backend to connect.
5. **Get Connection String**:
   - Go to **Database Deployments** and click **Connect**.
   - Choose **Drivers** (Node.js).
   - Copy the connection string. It will look like:
     ```text
     mongodb+srv://ember_admin:<password>@cluster0.abcde.mongodb.net/ember-bean?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your database user password.
   - Paste this into `backend/.env` as `MONGODB_URI`.
6. **Seed Cloud Database**:
   - In your local terminal under `/backend`:
     ```bash
     npm run seed
     ```
   - You should see:
     ```text
     🍃 [MongoDB Connected]
     🧹 Cleared existing items
     ☕ Successfully seeded 19 menu items.
     📅 Seeded sample reservations.
     ```

---

## 📡 REST API Reference

### Public Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & database connection probe |
| `GET` | `/api/menu` | Fetch all menu items (Supports `?category=coffee&search=latte&featured=true`) |
| `GET` | `/api/menu/:id` | Fetch single menu item by ID |
| `POST` | `/api/reservations` | Submit table booking request (Rate limited) |
| `GET` | `/api/reservations/:id`| Lookup reservation status by ID or Reference |
| `POST` | `/api/contact` | Submit customer contact inquiry (Rate limited) |

### Administrative Endpoints (`/admin`)
*Protected by `x-admin-key` header matching `ADMIN_SECRET`*

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/admin/login` | Authenticate with administrator secret |
| `GET` | `/api/admin/stats` | Overview counts (total, pending, confirmed, menu items) |
| `POST` | `/api/menu` | Add a new menu item |
| `PUT` | `/api/menu/:id` | Edit existing menu item |
| `DELETE` | `/api/menu/:id` | Delete menu item from active catalog |
| `GET` | `/api/reservations` | View all reservations (filter by `?status=pending`) |
| `PUT` | `/api/reservations/:id`| Update reservation status (`confirmed`, `cancelled`, `pending`) |
| `DELETE` | `/api/reservations/:id`| Remove reservation record |
| `GET` | `/api/contact` | Review inbound contact messages |

---

## 🌐 Free Tier Deployment Guide

### Step 1: Push Code to GitHub
```bash
git init
git add .
git commit -m "feat: complete EMBER & BEAN full-stack website"
git branch -M main
git remote add origin https://github.com/<your-username>/ember-and-bean.git
git push -u origin main
```

---

### Step 2: Deploy Backend to Render (Free Tier)
1. Go to [render.com](https://render.com) and log in with GitHub.
2. Click **New +** -> **Web Service**.
3. Connect your `ember-and-bean` GitHub repository.
4. Configure the Web Service:
   - **Name**: `ember-bean-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
5. Click **Advanced** -> **Add Environment Variable**:
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: *Your MongoDB Atlas connection string*
   - `ADMIN_SECRET`: *A secure random string*
   - `FRONTEND_URL`: *Your Vercel frontend URL (you can update this after Step 3)*
6. Click **Create Web Service**.
7. Once deployed, copy your backend URL (e.g. `https://ember-bean-backend.onrender.com`).
8. Test the health probe: `https://ember-bean-backend.onrender.com/api/health`

---

### Step 3: Deploy Frontend to Vercel (Free Tier)
1. Go to [vercel.com](https://vercel.com) and log in with GitHub.
2. Click **Add New...** -> **Project**.
3. Import your `ember-and-bean` GitHub repository.
4. In the Project Configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click *Edit* and select **`frontend`**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Open **Environment Variables**:
   - Name: `VITE_API_URL`
   - Value: `https://ember-bean-backend.onrender.com` *(Your Render backend URL)*
6. Click **Deploy**.
7. In ~60 seconds, your production frontend will be live (e.g. `https://ember-and-bean.vercel.app`)!

---

### Step 4: Finalize CORS Configuration
Return to your Render backend dashboard:
1. Under **Environment**, update `FRONTEND_URL` to your live Vercel domain:
   ```text
   FRONTEND_URL=https://ember-and-bean.vercel.app
   ```
2. Render will automatically re-deploy with your production CORS whitelist locked to your Vercel frontend!

---

## 🔒 Security Best Practices Implemented
- **Helmet**: Secures HTTP headers against MIME sniffing, clickjacking, and XSS.
- **Strict CORS**: Only allows approved frontend origins in production mode.
- **Express Rate Limiting**: Protects public reservation and contact forms against automated spam attacks.
- **Zero Exposed Secrets**: Secrets live exclusively on the backend in environment variables.
- **Client Input Validation**: Prevents past dates, invalid email structures, and enforces guest party limits.

---

## ☕ Default Admin Credentials
- Route: `/admin`
- Default Master Key: `ember_bean_secret_admin_2026`
*(Customize anytime in `backend/.env` under `ADMIN_SECRET`)*

---

## 📄 License
This project is open-source and released under the **MIT License**.
Feel free to use it as a benchmark for your agency or freelance portfolio!
