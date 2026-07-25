Good call. Before deployment, a README is exactly what this project needs. It makes the GitHub repo look like a real portfolio project.

Create:

```text
README.md
```

in the **root folder**:

```text
BlogPro
│
├── backend
├── frontend
└── README.md   ✅
```

Paste this:

```markdown
# 📖 BlogPro

A full-stack blogging platform where users can create, share, and discuss stories with a vintage book-inspired interface.

BlogPro was built to practice real-world full-stack development concepts including authentication, REST APIs, database relationships, frontend state management, and deployment workflows.

---

## ✨ Features

### Authentication

- User registration
- User login
- JWT-based authentication
- Protected routes
- Persistent login sessions

### User Features

- View user profiles
- Update profile information
- Delete account

### Blog Features

- Create blog posts
- View published posts
- View individual stories
- Edit and delete owned posts
- Display author information

### Comment System

- Add comments to posts
- View discussions under stories
- Delete your own comments

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- React Router
- Context API
- Axios
- CSS

## Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication

## Database

- PostgreSQL

---

# 📂 Project Structure
```

BlogPro
│
├── backend
│ │
│ ├── config
│ ├── controllers
│ ├── middleware
│ ├── routes
│ ├── services
│ ├── utils
│ ├── prisma
│ ├── app.js
│ └── server.js
│
├── frontend
│ │
│ ├── src
│ │ ├── components
│ │ ├── pages
│ │ ├── services
│ │ ├── context
│ │ └── api
│
└── README.md

````

---

# 🚀 Installation

## Clone the repository

```bash
git clone https://github.com/yourusername/BlogPro.git

cd BlogPro
````

---

# Backend Setup

Move into backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string

JWT_SECRET=your_secret_key

PORT=3000
```

Run Prisma migrations:

```bash
npx prisma migrate dev
```

Start development server:

```bash
npm run dev
```

Backend runs on:

```
http://localhost:3000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create:

```
.env
```

Add:

```env
VITE_API_URL=http://localhost:3000
```

Start frontend:

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔐 Authentication Flow

BlogPro uses JWT authentication.

Flow:

```
User Login
     |
     ↓
Backend validates credentials
     |
     ↓
JWT token generated
     |
     ↓
Frontend stores token
     |
     ↓
Protected requests include token
     |
     ↓
Backend verifies user
```

---

# 🗄️ Database Relationships

Main models:

```
User
 |
 |--- Posts
 |
 |--- Comments


Post
 |
 |--- Comments
```

A user can:

- Create many posts
- Write many comments

A post can:

- Have many comments
- Belong to one author

---

# 🎨 Design

The interface follows a vintage book aesthetic inspired by:

- Old libraries
- Printed manuscripts
- Warm paper tones

Design choices:

- Cream backgrounds
- Brown accents
- Serif typography
- Paper-like cards

The goal was to make reading feel like opening a physical book.

---

<img src="image/photo_2026-07-25_09-10-41.jpg">

# 📌 Future Improvements

Possible improvements:

- Image uploads
- Like system
- Bookmarks
- Rich text editor
- Search functionality
- Notifications
- Admin dashboard
- User avatars
- Post categories
- Automated tests

---

# 👩‍💻 Author

Built by Kalkidan

A full-stack learning project focused on building real-world applications and improving software engineering skills.

live demo
backend
https://blogproject-qzip.onrender.com

frontend
https://blog-project-ten-tau.vercel.app/
