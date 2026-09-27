# Task Management Application

A full-stack Task Management Application built to practice software engineering fundamentals, REST APIs, authentication, authorization, database integration, testing, and Git collaboration.

## Tech Stack

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Argon2 Password Hashing

### Testing
- Pytest
- FastAPI TestClient

### Tools
- Git & GitHub
- Swagger UI
- Postman

---

## Features

- User signup
- Secure password hashing
- User login
- JWT-based authentication
- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Mark tasks as completed
- User-based task authorization
- Protected API endpoints
- Basic automated tests

---

## Project Structure

```text
task-management-app/
│
├── backend/
│   ├── auth.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   │
│   └── tests/
│       ├── __init__.py
│       └── test_main.py
│
├── .env
├── .gitignore
└── README.md
```

---

## Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/Deepak6205/task-management-app.git
```

### 2. Move into the project

```bash
cd task-management-app/backend
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

For Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
DB_HOST=localhost
DB_NAME=task_management
DB_USER=postgres
DB_PASSWORD=your_database_password

JWT_SECRET_KEY=your_long_random_secret
```

Do not put your actual database password or JWT secret in the README or GitHub repository.

---

## Database

This project uses PostgreSQL.

Create a database named:

```text
task_management
```

The application uses SQLAlchemy to communicate with PostgreSQL.

---

## Run the Backend

Move into the backend directory:

```bash
cd backend
```

Run the FastAPI server:

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

---

## API Documentation

FastAPI provides interactive API documentation using Swagger UI.

Open:

```text
http://127.0.0.1:8000/docs
```

You can use Swagger UI to test the API endpoints.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users` | Create a new user |
| POST | `/login` | Login and receive JWT |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/tasks` | Create a task |
| GET | `/tasks` | Get current user's tasks |
| GET | `/tasks/{task_id}` | Get a specific task |
| PUT | `/tasks/{task_id}` | Update a task |
| DELETE | `/tasks/{task_id}` | Delete a task |
| PATCH | `/tasks/{task_id}/complete` | Mark task as completed |

Protected task endpoints require a valid JWT:

```text
Authorization: Bearer <access_token>
```

---

## Running Tests

From the `backend` directory:

```bash
pytest
```

The current test suite covers:

- API health check
- User signup
- Successful login
- Login with incorrect password
- Protected route without authentication
- Protected route with valid JWT

---

## Authentication Flow

```text
User
  ↓
Signup
  ↓
Password is hashed
  ↓
Login
  ↓
JWT token generated
  ↓
Client sends JWT
  ↓
Backend verifies JWT
  ↓
Protected API access
```

---

## Database Relationship

A user can have multiple tasks.

```text
User
 |
 | 1
 |
 |------< Tasks
          |
          | many
```

Each task contains a `user_id` that identifies its owner.

---

## Git Workflow

This project follows a feature-branch workflow.

Example:

```bash
git switch main
git pull

git switch -c feature/task-crud

git add .
git commit -m "Build task CRUD APIs"

git push -u origin feature/task-crud
```

Changes can then be reviewed through a Pull Request before merging into `main`.

---

## Testing Philosophy

The goal of testing is to verify that the API behaves as expected and that important authentication rules are working correctly.

Tests can be run using:

```bash
pytest
```

---

## Future Improvements

- React frontend
- Better test database isolation
- More automated tests
- Improved API error handling
- Frontend authentication
- Task filtering and sorting
- Deployment to the cloud