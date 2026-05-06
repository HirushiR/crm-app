# CRM Lead Management System

## Project Overview
A full-stack CRM (Customer Relationship Management) application built for managing sales leads, tracking pipeline progress, adding notes, and viewing a dashboard with key metrics.

## Tech Stack
- **Frontend:** React, React Router, Axios, CSS
- **Backend:** Node.js, Express
- **Database:** SQLite (via better-sqlite3)
- **Authentication:** JWT (JSON Web Tokens)

## Features Implemented
- User authentication (login/logout)
- Dashboard with lead statistics and deal values
- Create, view, edit, and delete leads
- Update lead status through the pipeline
- Add and delete notes on leads
- Search leads by name, company, or email
- Filter leads by status, source, and assigned salesperson

## How to Run Locally

### Prerequisites
- Node.js v18 or higher
- Git

### Backend Setup
cd backend
npm install
node server.js

### Frontend Setup (in a new terminal)
cd frontend
npm install
npm start

The app will open at http://localhost:3000

## Environment Variables
Create a .env file in the backend folder:
JWT_SECRET=supersecretkey123
PORT=5000

## Test Login Credentials
- Email: admin@example.com
- Password: password123

## Database Setup
The SQLite database is created automatically when you run the backend for the first time. No manual setup needed.

## Known Limitations
- Only one default user (no user registration)
- No deployment (runs locally only)
- No email notifications

## Reflection
This was my first full-stack project. I learned how to connect a React frontend to a Node.js backend using REST APIs, how JWT authentication works, and how to design a database schema. The biggest challenge was understanding how the frontend and backend communicate with each other. I used documentation and resources to debug issues independently and build a working application from scratch.
