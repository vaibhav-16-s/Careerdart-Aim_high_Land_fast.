# CareerDart - How to Run

A simple job portal with Admin, Employer, and Job Seeker roles.

## What you need

1. **Node.js** installed
2. **MongoDB** running locally

## Setup (one time)

### 1. Backend

```bash
cd backend
npm install
```

Copy `.env.example` to `.env` and set your values:

```
mongo_URI=mongodb://127.0.0.1:27017/Careerdart
JWT_SECRET=your_secret_key_here
PORT=5000
```

### 2. Frontend

```bash
cd frontend
npm install
```

## Run the app

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
You should see: `Server connected successfully on port 5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Open the URL shown (usually http://localhost:5173)

## Main pages

| Page | URL |
|------|-----|
| Home | http://localhost:5173/ |
| Login | http://localhost:5173/home/login |
| Job Seeker Register | http://localhost:5173/home/get_started |
| Admin Dashboard | http://localhost:5173/admin/dashboard |
| Employer Dashboard | http://localhost:5173/employer/dashboard |
| Job Search | http://localhost:5173/jobseeker/jobsearch |

## First-time setup

1. Register an **Admin** at `/admin/adminReg` (or use an existing admin account)
2. Login as Admin → register Employers
3. Login as Employer → post jobs at `/employer/jobreg`
4. Register as Job Seeker → search and apply for jobs

## Common issues

- **"Something went wrong" on login** → Is the backend running? Check terminal for errors.
- **MongoDB connection failed** → Start MongoDB service.
- **Unauthorized page** → Login first, or your role doesn't have access to that page.
