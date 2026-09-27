# Task Management App

A full-stack task management application built with FastAPI on the backend and React + Vite on the frontend. The app allows users to sign up, log in, create personal tasks, and manage them through a protected dashboard.

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT authentication
- Password hashing with `pwdlib`

### Frontend
- React
- Vite
- JavaScript

### Testing
- Pytest
- FastAPI TestClient

---

## Features

- User signup with email validation
- Secure password hashing
- User login with JWT token generation
- Protected API routes
- Create, read, update, and delete tasks
- Mark tasks as complete
- User-specific task ownership
- React dashboard for authenticated users
- Logout flow with token removal from browser storage

---

## Project Structure

```text
task-management-app/
├── backend/
│   ├── auth.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_main.py
│   └── .env
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── EditTask.jsx
│       │   ├── TaskForm.jsx
│       │   └── TaskItem.jsx
│       ├── pages/
│       │   ├── Dashboard.jsx
│       │   ├── LoginPage.jsx
│       │   └── SignupPage.jsx
│       └── services/
│           └── api.js
├── README.md
├── AI-LEARNING.md
├── .gitignore
└── .env.example (optional, if you create one locally)
```

---

## Prerequisites

Before running the app, make sure you have:

- Python 3.10+
- Node.js and npm
- PostgreSQL installed and running
- Git

---

## Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/Deepak6205/task-management-app.git
cd task-management-app
```

### 2. Create and activate a virtual environment

```bash
cd backend
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

macOS/Linux:

```bash
source venv/bin/activate
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
DB_HOST=localhost
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_database_password
JWT_SECRET_KEY=your_long_random_secret
```

Create the PostgreSQL database:

```sql
CREATE DATABASE task_management;
```

> Do not commit real secrets or credentials to GitHub.

---

## Run the Backend

From the backend folder:

```bash
uvicorn main:app --reload
```

The API will run at:

```text
http://127.0.0.1:8000
```

Swagger UI is available at:

```text
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

### 1. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 2. Start the React app

```bash
npm run dev
```

The frontend typically runs at:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users` | Register a new user |
| POST | `/login` | Log in and receive a JWT |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks` | Create a task |
| GET | `/tasks` | Get all tasks for the logged-in user |
| GET | `/tasks/{task_id}` | Get one task by ID |
| PUT | `/tasks/{task_id}` | Update a task |
| DELETE | `/tasks/{task_id}` | Delete a task |
| PATCH | `/tasks/{task_id}/complete` | Mark a task as completed |

Protected task endpoints require:

```text
Authorization: Bearer <access_token>
```

---

## Authentication Flow

```text
User signs up
  ↓
Password is hashed
  ↓
User logs in
  ↓
JWT token is generated
  ↓
Frontend stores token in localStorage
  ↓
Backend validates token on protected requests
  ↓
User can access dashboard and task APIs
```

---

## Data Model

This app uses a simple relational model:

- A `User` can have many `Task` records
- Each `Task` belongs to one `User`
- A task stores:
  - `id`
  - `title`
  - `description`
  - `completed`
  - `user_id`

---

## Running Tests

From the `backend` directory:

```bash
pytest
```

The test suite currently checks:

- Home route availability
- User registration
- Duplicate email rejection
- Successful login
- Invalid login credentials
- Access to protected task routes without a token
- Access to protected task routes with a valid token

---

## Typical Usage

1. Open the frontend in the browser.
2. Sign up for a new account.
3. Log in with your email and password.
4. Create tasks from the dashboard.
5. Edit, delete, or mark tasks as complete.
6. Log out when finished.

---

## Notes

- The backend uses CORS to allow requests from the frontend at `http://localhost:5173`.
- The frontend stores the JWT in `localStorage` so the user remains authenticated during the session.
- The app is intended as a learning project for backend APIs, authentication, database integration, and frontend integration.

---

## Future Improvements

- Better error handling and validation messages
- Task filtering and sorting
- Search by title or status
- Frontend polish and responsive styling
- Test database isolation
- Deployment to a cloud service
- More automated test coverage