# Task Management App

A full-stack task management application built with FastAPI, PostgreSQL, React, and Vite.

Environment files such as `.env` are intentionally not included in the repository.

---

## Prerequisites

Before running the project locally, make sure you have:

- Python 3.10+
- Node.js
- npm
- PostgreSQL
- Git

---

# Backend Setup

## 1. Clone the Repository

```bash
git clone https://github.com/Deepak6205/task-management-app.git
cd task-management-app
```

---

## 2. Create a Virtual Environment

Move into the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

### macOS/Linux

```bash
source venv/bin/activate
```

---

## 3. Install Backend Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create a `.env` file for local development.

```env
DB_HOST=localhost
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_database_password
JWT_SECRET_KEY=your_long_random_secret
```

Do not commit `.env` or real credentials to GitHub.

---

## 5. Create the PostgreSQL Database

Create a database named:

```text
task_management
```

For example:

```sql
CREATE DATABASE task_management;
```

---

# Run the Backend

From the `backend` directory:

```bash
uvicorn main:app --reload
```

The local API will run at:

```text
http://127.0.0.1:8000
```

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

Swagger provides an interactive interface for testing the API endpoints.

---

# Frontend Setup

Open another terminal and move into the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

---

## Configure Frontend API URL

For local development, create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://127.0.0.1:8000
```

The frontend uses this variable to communicate with the backend.

For production, the Vercel environment variable is configured as:

```env
VITE_API_URL=https://task-management-app-z078.onrender.com
```

---

## Start the Frontend

```bash
npm run dev
```

The frontend typically runs at:

```text
http://localhost:5173
```

---

# API Endpoints

## Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/users` | Register a new user |
| POST | `/login` | Log in and receive a JWT |

## Tasks

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/tasks` | Create a task |
| GET | `/tasks` | Get tasks for the logged-in user |
| GET | `/tasks/{task_id}` | Get one task |
| PUT | `/tasks/{task_id}` | Update a task |
| DELETE | `/tasks/{task_id}` | Delete a task |
| PATCH | `/tasks/{task_id}/complete` | Mark a task as completed |

Protected task endpoints require:

```text
Authorization: Bearer <access_token>
```

---

# Authentication Flow

```text
User signs up
	↓
Password is validated
	↓
Password is securely hashed
	↓
User logs in
	↓
Backend verifies credentials
	↓
JWT token is generated
	↓
Frontend stores JWT token
	↓
Frontend sends JWT with protected requests
	↓
Backend validates JWT
	↓
Authenticated user accesses their tasks
```

---

# Authorization and User Ownership

Each task belongs to a specific user.

The backend gets the authenticated user's ID from the JWT instead of trusting a user ID sent by the frontend.

This means users can only access their own tasks.

For protected task operations:

```text
JWT
 ↓
Authenticated User ID
 ↓
Find task belonging to that user
 ↓
Allow operation
```

If a task does not belong to the authenticated user, the backend does not allow the operation.

---

# Data Model

The application uses a relational database model.

### User

A user contains:

- `id`
- `name`
- `email`
- `password`

### Task

A task contains:

- `id`
- `title`
- `description`
- `completed`
- `user_id`

Relationship:

```text
User
  │
  │ 1
  │
  │
  │ many
  ▼
Task
```

One user can have many tasks.

Each task belongs to one user.

---

# Testing

Backend tests are written using:

- Pytest
- FastAPI TestClient

Run the tests from the `backend` directory:

```bash
pytest
```

The current test suite covers:

- API health check
- User signup
- Duplicate email rejection
- Successful login
- Incorrect password
- Protected endpoint without JWT
- Protected endpoint with JWT

Current result:

```text
7 tests passed
```

---

# Frontend Build

The production frontend build can be tested with:

```bash
npm run build
```

The build was successfully verified before deployment.

---

# Deployment

The application is deployed using separate frontend and backend services.

```text
			  Internet
			     │
			     ▼
		  ┌─────────────────┐
		  │     Vercel      │
		  │ React + Vite    │
		  └────────┬────────┘
			     │
			     │ HTTPS API Requests
			     ▼
		  ┌─────────────────┐
		  │     Render      │
		  │ FastAPI Backend │
		  └────────┬────────┘
			     │
			     ▼
		  ┌─────────────────┐
		  │    PostgreSQL   │
		  │     Database    │
		  └─────────────────┘
```

### Frontend

Hosted on:

```text
Vercel
```

Live URL:

[https://task-management-app-sandy-xi.vercel.app/](https://task-management-app-sandy-xi.vercel.app/)

### Backend

Hosted on:

```text
Render
```

Live API:

[https://task-management-app-z078.onrender.com](https://task-management-app-z078.onrender.com)

### Database

Hosted using:

```text
Render PostgreSQL
```

---

# Production Configuration

The production frontend uses:

```env
VITE_API_URL=https://task-management-app-z078.onrender.com
```

The FastAPI backend is configured to allow requests from the production Vercel frontend.

The backend also uses environment variables for database credentials and the JWT secret.

Sensitive credentials are not stored in the source code.

---

# Typical User Flow

```text
Open Application
	 ↓
Signup
	 ↓
Login
	 ↓
JWT Token
	 ↓
Dashboard
	 ↓
Create Task
	 ↓
View Tasks
	 ↓
Edit / Complete / Delete
	 ↓
Logout
```

---

# Git Workflow

During development, Git was used to manage changes and collaborate with the development process.

The workflow included:

- Creating feature branches.
- Making focused commits.
- Pushing branches to GitHub.
- Creating pull requests.
- Reviewing changes.
- Merging completed features into `main`.
- Checking `git status` before commits.
- Keeping environment variables and secrets out of Git.

Example workflow:

```bash
git checkout -b feature/example

git add .

git commit -m "Add example feature"

git push origin feature/example
```

After review, the feature branch can be merged into `main`.

---

# Security Practices

The project follows several basic security practices:

- Passwords are hashed before being stored.
- Passwords are never returned in signup responses.
- JWT is used for authentication.
- Protected endpoints require authentication.
- Task ownership is checked on the backend.
- Database credentials are stored in environment variables.
- JWT secrets are stored in environment variables.
- `.env` files are excluded from Git.
- CORS is configured for known frontend origins.

---

# AI-Assisted Development

AI was used as a learning and development assistant throughout the project.

I used AI to:

- Understand FastAPI.
- Learn PostgreSQL and SQLAlchemy.
- Implement authentication.
- Understand JWT.
- Debug backend errors.
- Build React components.
- Connect frontend and backend.
- Write and understand tests.
- Debug CORS issues.
- Improve the UI.
- Understand Git workflows.
- Configure deployment.
- Troubleshoot deployment issues.

AI suggestions were reviewed, modified when necessary, implemented, and tested.

More details about AI usage are available in:

```text
AI-LEARNING.md
```

---

# Engineering Practices Learned

During this project I learned and practiced:

- REST API development
- Backend and frontend integration
- Authentication
- Authorization
- JWT
- Password hashing
- PostgreSQL
- SQLAlchemy
- Pydantic validation
- Error handling
- API testing
- React development
- Fetch API
- CORS
- Git and GitHub
- Feature branch workflow
- Pull requests
- Environment variables
- Cloud deployment
- Debugging
- Working with AI as an engineering assistant

---

# Current Project Status

The application is currently deployed and working in production.

### Backend

- FastAPI API deployed
- PostgreSQL database connected
- JWT authentication working
- Protected routes working
- Task CRUD working
- Automated tests passing

### Frontend

- React application deployed
- Authentication flow working
- Task management working
- Production API connected
- Responsive UI implemented

### Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- PostgreSQL deployed on Render
- Production frontend-to-backend communication verified

---

# Future Improvements

Possible future improvements include:

- Task filtering and sorting
- Search by task title
- Task priority
- Due dates
- Pagination
- Better loading states
- More detailed frontend validation
- Improved error messages
- More automated test coverage
- Test database isolation
- Refresh token support
- Password reset functionality
- User profile management
- Improved accessibility
- Additional dashboard statistics

---

# Learning Objective

The main objective of this project was to understand how a full-stack application works from development to deployment.

The project helped me practice:

```text
Frontend
   ↓
REST API
   ↓
Backend
   ↓
Authentication
   ↓
Database
   ↓
Testing
   ↓
Git Workflow
   ↓
Deployment
```

It also helped me learn how to use AI effectively as an engineering assistant while maintaining responsibility for understanding, testing, and verifying the final implementation.

---

# Repository

GitHub:

[https://github.com/Deepak6205/task-management-app](https://github.com/Deepak6205/task-management-app)

---

# Author

**Deepak Kumar**

Built as a learning and engineering project.

