# 🚀 Pankaj Rana – Portfolio (MERN + MySQL)

A production-level, fully dynamic portfolio website built with the **MERN stack** and **MySQL** database.

---

## 🎯 Features

- ⚡ **Dynamic content** – All sections (profile, experience, projects, skills, education, certifications) are stored in MySQL and editable via the Admin Dashboard
- 🔐 **JWT Authentication** – Secure admin login with token-based auth
- 📸 **Photo Upload** – Upload and update your profile photo
- 💬 **Contact Form** – Visitors can send messages, visible in the admin inbox
- 🎨 **Stunning UI** – Dark theme with particle animations, framer-motion transitions, and typed text
- 📱 **Fully Responsive** – Mobile-first design
- 🛡️ **Protected Admin Panel** – Full CRUD for every section

---

## 🏗️ Tech Stack

| Layer      | Technology                         |
|------------|-------------------------------------|
| Frontend   | React.js 18, Framer Motion, React Router v6 |
| Backend    | Node.js, Express.js                |
| Database   | MySQL 8 (via mysql2 + connection pool) |
| Auth       | JWT + bcryptjs                     |
| Upload     | Multer                             |
| Styling    | Custom CSS (no UI library)        |

---

## 📁 Project Structure

```
portfolio/
├── server/
│   ├── config/db.js          # MySQL pool + init + seeder
│   ├── controllers/
│   │   ├── authController.js
│   │   └── portfolioController.js
│   ├── middleware/
│   │   ├── auth.js           # JWT middleware
│   │   └── upload.js         # Multer config
│   ├── routes/api.js
│   ├── uploads/              # Uploaded photos stored here
│   ├── index.js              # Express entry point
│   ├── package.json
│   └── .env.example
├── client/
│   ├── public/index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js
│       │   ├── Hero.js       # Particle canvas + typewriter
│       │   ├── Experience.js # Timeline layout
│       │   ├── Projects.js   # Card grid
│       │   ├── Skills.js     # Grouped + progress bars
│       │   ├── Education.js
│       │   ├── Contact.js    # Form → API → DB
│       │   └── Footer.js
│       ├── pages/
│       │   ├── Portfolio.js  # Main public page
│       │   ├── Login.js      # Admin login
│       │   └── Admin.js      # Full dashboard (all CRUD)
│       ├── context/AuthContext.js
│       ├── utils/api.js
│       └── index.css
└── package.json
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

---

### 1. Clone & Install

```bash
# Install all dependencies
npm run install-all
```

---

### 2. MySQL Setup

```sql
-- Open MySQL CLI or MySQL Workbench
CREATE DATABASE portfolio_db;
-- (The app auto-creates all tables and seeds data on first run)
```

---

### 3. Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
JWT_SECRET=change_this_to_a_random_string
ADMIN_EMAIL=your_email
ADMIN_PASSWORD=Admin_password
CLIENT_URL=http://localhost:3000
```

---

### 4. Run Development

```bash
# From root directory – runs both server and client
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:3000/admin
- **Login**: http://localhost:3000/login

Default admin credentials:
- **Email**: `Enter your email`
- **Password**: `Admin@1234`

> ⚠️ Change the password immediately after first login via Admin → Settings.

---

### 5. Production Build

```bash
npm run build
# Then serve the Express server — it will serve the React build
cd server && NODE_ENV=production node index.js
```

---

## 🔌 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/portfolio` | Full portfolio data (one call) |
| GET | `/api/profile` | Profile info |
| GET | `/api/experience` | Work experience |
| GET | `/api/projects` | Projects |
| GET | `/api/skills` | Skills |
| GET | `/api/education` | Education |
| GET | `/api/certifications` | Certifications |
| POST | `/api/contact` | Send contact message |
| POST | `/api/auth/login` | Admin login |

### Admin (JWT Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/profile` | Update profile |
| POST | `/api/profile/photo` | Upload photo |
| POST/PUT/DELETE | `/api/experience/:id` | CRUD experience |
| POST/PUT/DELETE | `/api/projects/:id` | CRUD projects |
| POST/PUT/DELETE | `/api/skills/:id` | CRUD skills |
| POST/PUT/DELETE | `/api/education/:id` | CRUD education |
| POST/DELETE | `/api/certifications/:id` | CRUD certifications |
| GET | `/api/messages` | Get all messages |
| PUT | `/api/messages/:id/read` | Mark read |
| DELETE | `/api/messages/:id` | Delete message |

---

## 🎨 Customization

1. **Personal info** – Log in to `/admin`, go to Profile, update everything
2. **Add projects** – Admin → Projects → Add New
3. **Skills** – Admin → Skills → Add with level % and color
4. **Photo** – Admin → Profile → Upload Photo

---

## 🚀 Deployment Tips

- **Backend**: Deploy on Railway, Render, or a VPS (DigitalOcean)
- **Frontend**: Build with `npm run build`, deploy on Vercel/Netlify or serve via Express
- **Database**: Use PlanetScale, Railway MySQL, or AWS RDS
- Set all `.env` variables in your hosting platform's environment settings

---

**Built with ❤️ for Pankaj Rana**
