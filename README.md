### 💼 Job Portal Web App

A full-stack Job Portal built with **React.js**, **Node.js**, **Express.js**, **MongoDB**, **Clerk Authentication**, and **Sentry** for error monitoring. Users can register, upload resumes, apply for jobs, and companies can post job openings. The application provides a clean and responsive UI with secure, scalable backend architecture.


🌍 **Client**:  
[https://job-portal-new-client-navy.vercel.app](https://job-portal-new-client-navy.vercel.app)

🗂️ **GitHub**:  
[DevS-2004/Job-Portal](https://github.com/DevS-2004/Job-Portal)

🔐 **Recruiter Login**:  
`User ID`: `google@demo.com`  
`Password`: `google1234`


## 🚀 Tech Stack

### Frontend:
- React.js (Vite)
- Tailwind CSS
- Axios
- Moment.js
- React Router
- Clerk Auth
- React Toastify

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary (for resume uploads)
- Multer (file handling)
- Clerk Middleware (Authentication)
- Sentry (Error monitoring)

---
```
## 📁 Project Structure

JOB-PORTAL-APP/
│
├── client/                     # Frontend (React + Vite)
│   ├── public/                 # Public assets
│   ├── src/                    # Source code
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # App pages like Home, Apply, Applications, etc.
│   │   ├── context/            # Global state (AppContext)
│   │   └── assets/             # Images, icons, static files
│   ├── .env                    # Frontend environment variables (NOT committed)
│   ├── vite.config.js          # Vite configuration
│   ├── package.json            # Frontend dependencies
│   └── vercel.json             # Vercel frontend deployment config
│
├── server/                     # Backend (Node.js + Express)
│   ├── config/                 # DB, Cloudinary, and Sentry configs
│   ├── controllers/            # Route handlers (user, company, job, etc.)
│   ├── middleware/             # Auth, error handlers
│   ├── models/                 # Mongoose schemas (User, Job, Application)
│   ├── routes/                 # Express routes
│   ├── utils/                  # Utility functions (e.g., logger)
│   ├── .env                    # Backend environment variables (NOT committed)
│   ├── server.js               # App entry point
│   ├── package.json            # Backend dependencies
│   └── vercel.json             # Vercel backend deployment config
│
├── .gitignore                  # Ignore node_modules, .env, etc.
└── README.md                   # Project documentation

🔐 Environment Variables

###Frontend (.env) --

VITE_CLERK_PUBLISHABLE_KEY = your_clerk_publishable_key
VITE_BACKEND_URL = http://localhost:5000

###Backend (.env) --

PORT=5000
MONGO_URI = your_mongodb_uri
CLERK_SECRET_KEY = your_clerk_secret_key
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_cloudinary_api_key
CLOUDINARY_API_SECRET = your_cloudinary_api_secret
SENTRY_DSN = your_sentry_dsn
CLERK_WEBHOOK_SECRET = your_ clerk_webhook_secret
CLERK_SECRET_KEY = your_clerk_secret_key

🛠️ Features
  👤 User Registration/Login (Clerk)
  📄 Resume Upload via Cloudinary
  💼 Job Listings
  📝 Apply to Jobs
  🧾 Job Applications Table
  🔍 Filter/Search Jobs
  🧩 Company Dashboard (Post Jobs)
  📬 Email Notifications (optional)
  ⚠️ Error tracking via Sentry

🧪 Setup Instructions

## ⚙️ Run Locally

### Backend

  cd server
  npm install
  npm run dev

### Frontend
  cd client
  npm install
  npm run dev

```

👨‍💻 Author
Devendra Singh
📍 GitHub - https://github.com/DevS-2004
