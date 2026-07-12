# 📸 LensCraft Studio - Full Stack Web Application

LensCraft Studio is a premium, state-of-the-art web application built for luxury wedding planners, floral designers, event stylists, and professional photography studios. The application features a dynamic, high-end front-end landing page, a hybrid client-side mock-database fallback system, and a robust Node.js/Express admin server powered by MongoDB and Cloudinary.

---

## 🏗 Project Architecture

The project is structured as a monorepo consisting of two primary components:
1. **`client/`**: React 19 single-page application built on Vite 8, styled using Tailwind CSS v4, utilizing Framer Motion for premium micro-animations.
2. **`server/`**: Express.js server providing RESTful endpoints, JWT-based administrator authorization, and direct media storage synchronization with Cloudinary.

```text
mukest_website/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Specialized sections (booking, hero, contact, testimonials, etc.)
│   │   ├── data/           # Configs and local asset resources
│   │   ├── pages/          # Home.jsx, Login.jsx, Dashboard.jsx
│   │   ├── services/       # api.js (Axios client & mock controller), mockData.js
│   │   ├── App.jsx         # App routes config
│   │   └── main.jsx        # Mounting React app to index.html
│   ├── .env                # Client environment configuration
│   ├── package.json        # Frontend dependencies & run scripts
│   └── vite.config.js      # Vite and Tailwind config
└── server/                 # Backend Node.js / Express Server
    ├── common/             # Standard ApiResponse and ApiError handlers
    ├── config/             # MongoDB Connection and Cloudinary config
    ├── controllers/        # Express route handler logic
    ├── middleware/         # auth verification, file upload, error handling
    ├── models/             # Mongoose schemas (User, Hero, Category, Gallery, etc.)
    ├── routes/             # REST endpoints (/api/*)
    ├── seed/               # seed.js (Database initialization presets)
    ├── services/           # DB query wrapper services
    ├── .env                # Server credentials and configurations
    ├── package.json        # Backend dependencies & run scripts
    └── server.js           # Server application entry point
```

---

## ⚡ Key Features

* **High-End UI/UX**: Premium aesthetics featuring smooth page transitions, interactive categories, a filterable featured portfolio gallery, and slide-in testimonials.
* **Fully Interactive Admin Dashboard**: An extensive dashboard located under `/admin/dashboard` allowing full CRUD capabilities for all website sections:
  * **Hero Sliders**: Dynamic images/videos with customized headers, taglines, and call-to-actions.
  * **Categories**: Visual tags to group portfolio photos (Weddings, Pre-Weddings, Maternity, etc.).
  * **Featured Gallery**: Single and multi-image project listings with dates and heritage venues.
  * **Services Offered**: Manage detail-oriented plans and styling proposals.
  * **Studio Standards**: Highlight crew experience, camera resolutions, and timelines.
  * **Booking Process**: Detailed walkthrough steps (Consultation, Execution, Planning).
  * **Testimonials**: Interactive clients reviews and star ratings.
  * **About Content & Contact Details**: General studio bios, address information, and social coordinates.
  * **SEO Settings**: Custom global metadata title, descriptions, and keyword optimization tag management.
* **Dual Operation Mode (Mock vs Live)**:
  * **Mock Mode (`VITE_API_USE_MOCK=true`)**: Runs completely client-side. The dashboard writes to/reads from browser `localStorage` and converts uploaded image files to local Base64 URLs. Perfect for immediate sandboxed demo usage without server or database credentials.
  * **Live Mode (`VITE_API_USE_MOCK=false`)**: Full database-backed operations querying the live Node/Express API with secure Cloudinary file uploads.
* **Advanced Seeding Support**: Instant database resets via code commands or directly from the Admin Dashboard using the database reset utility button.

---

## 🛠 Technology Stack

### Frontend (Client)
* **React 19** (Functional UI layout library)
* **Vite 8** (Lightning-fast frontend tooling)
* **Tailwind CSS v4** (Utility styling with modern CSS configuration)
* **Framer Motion** (Fluid micro-animations)
* **Swiper** (Smooth touch-enabled sliding layouts)
* **Lucide React** (Consistent modern icon sets)
* **React Router DOM v7** (Secure multi-route client redirection)
* **React Toastify** (Elegant notification prompts)
* **Axios** (Robust promise-based HTTP client requests)

### Backend (Server)
* **Node.js & Express.js** (Server framework)
* **MongoDB & Mongoose** (NoSQL storage and object document modeling)
* **JSON Web Token (JWT)** (Secure stateless admin verification)
* **BcryptJS** (Blowfish password hashing algorithm)
* **Multer** (Efficient memory-buffered binary stream processing)
* **Cloudinary** (Secure cloud hosting for high-resolution gallery pictures/videos)

---

## ⚙️ Environment Configurations

Create a `.env` file in both directories according to the specifications below:

### Client configuration (`client/.env`)
```env
# Controls database operation mode:
# - 'true' utilizes localStorage + Local Base64 mocks.
# - 'false' links directly with the live server.
VITE_API_USE_MOCK=true

# Local server API baseline endpoint
VITE_API_BASE_URL=http://localhost:5000/api
```

### Server configuration (`server/.env`)
```env
PORT=5000

# MongoDB Connection String
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/lenscraft

# Secret key for JWT hashing
JWT_SECRET=your_jwt_signing_key

# Cloudinary Integration Details
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Allowed CORS client URL
CLIENT_URL=http://localhost:5173

# Future Expansion Configurations (Reserved)
GEMINI_API_KEY=your_gemini_api_key
EMAIL_USER=your_smtp_email
EMAIL_PASS=your_smtp_app_password
```

---

## 🚀 Running the Project Locally

### 1. Prerequisite Installations
Ensure you have [Node.js](https://nodejs.org) installed on your system.

### 2. Setting Up the Server
1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install server-side dependencies:
   ```bash
   npm install
   ```
3. Seed default admin credentials and placeholder content into MongoDB:
   ```bash
   npm run seed
   ```
4. Spin up the local development server:
   ```bash
   npm run dev
   ```
The backend server will run at **`http://localhost:5000`**.

### 3. Setting Up the Client
1. Open a new terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Install client-side dependencies:
   ```bash
   npm install
   ```
3. Start the Vite server:
   ```bash
   npm run dev
   ```
The frontend portal will start at **`http://localhost:5173`**.

---

## 🔑 Authentication Credentials

For both Live MongoDB mode and LocalStorage Mock mode, the default administrator login is pre-configured:
* **Admin Email**: `admin@gmail.com`
* **Admin Password**: `Admin@123`

To access the console, navigate to the URL path: **`/admin/login`**.

---

## 🔌 API Endpoints Summary

All routes are mounted under `/api` in the backend server.

### 🔐 Authentication Route (`/api/auth`)
* `POST /login` - Sign-in administrator, yields JWT signature.
* `GET /profile` - Retrieve active admin profile info *(Protected)*.
* `PUT /profile` - Update email/profile details *(Protected)*.

### 🎛 General Content Section Routes
The endpoints listed below use standard CRUD methods to control database documents:
*(All Write operations: `POST`, `PUT`, `DELETE` are protected by verification JWT and administrator role checks)*

* `/api/hero` - Manage Landing Page Hero Slides (Supports image/video files via Multer + Cloudinary).
* `/api/category` - Portfolio styling categories.
* `/api/gallery` - Portfolios project gallery (Supports multi-image upload).
* `/api/service` - Service description lists.
* `/api/standard` - Studio quality metrics.
* `/api/process` - Step-by-step booking procedures.
* `/api/testimonial` - Client reviews and rankings.

### ⚙️ Singleton & Utility Config Routes
* `/api/about` - GET / PUT about content parameters (Supports About Image + Header Banner Uploads).
* `/api/contact` - GET / PUT contact details and social media profile URLs.
* `/api/seo` - Retrieve and update search engine keywords/headers (GET retrieves specific pages, PUT changes metadata).
* `/api/seed` - REST post route to purge collections and re-initialize with system defaults.

---

## 🌐 Deployment Instructions

LensCraft Studio is prepared for two common deployment strategies: **Unified Deployment (Single Service)** or **Split Deployment (Separate Hostings)**.

### Option A: Unified Deployment (Recommended)
This approach hosts both the frontend React app and the backend Express API on a single platform (e.g., Render, Railway, or Heroku). The server will serve the React production bundle automatically.

1. **Deploying to Render**:
   - Create a new **Web Service** on Render.
   - Connect your GitHub repository.
   - Set the following configuration details:
     * **Environment**: `Node`
     * **Build Command**: `npm run install:all && npm run build:client`
     * **Start Command**: `npm run start:server`
   - Set the required **Environment Variables** in the Render dashboard:
     * `NODE_ENV`: `production`
     * `MONGO_URI`: *Your MongoDB connection string*
     * `JWT_SECRET`: *Your JWT secret*
     * `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: *Cloudinary credentials*
     * `CLIENT_URL`: *The URL of your deployed Render service (optional, defaults to allow same-origin)*

### Option B: Split Deployment (Separate Services)
This approach hosts the frontend on a static hosting platform (like Vercel or Netlify) and the backend server on Render or Railway.

1. **Deploying the Backend (Render / Railway)**:
   - Create a **Web Service** for the backend server.
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - Add all environment variables (except `CLIENT_URL`, which should point to your upcoming frontend URL).

2. **Deploying the Frontend (Vercel)**:
   - Import your repository to Vercel.
   - **Root Directory**: `client`
   - Set the build settings:
     * **Build Command**: `npm run build` or `vite build`
     * **Output Directory**: `dist`
   - Configure **Environment Variables**:
     * `VITE_API_USE_MOCK`: `false` (Forces API calls instead of localStorage mocks)
     * `VITE_API_BASE_URL`: `https://your-backend-url.onrender.com/api` (Point to your deployed server)

---

## 🛡 License
This project is licensed under the ISC License. All mock assets and media belong to their respective creators under Unsplash usage rules.
