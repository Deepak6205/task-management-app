# AI Learning Log

This document records how AI was used during the development of the Task Management Application.

## 1. Why I Used AI

I used AI as a learning and development assistant to understand concepts, debug errors, improve code, and learn better engineering practices.

AI was not used blindly. I reviewed the suggestions, understood the code, tested the changes, and took responsibility for the final implementation.

---

## 2. Topics I Used AI For

### FastAPI

I used AI to understand:

- How to create a FastAPI application
- How API endpoints work
- How to create GET and POST endpoints
- How to use request models
- How to connect FastAPI with PostgreSQL
- How to use Swagger UI

### PostgreSQL and SQLAlchemy

I used AI to understand:

- Database connection
- SQLAlchemy
- Models
- Tables and relationships
- Primary keys and foreign keys
- Creating and querying records
- Connecting tasks to users

### Authentication

I used AI to understand and implement:

- Password hashing
- Argon2
- Login
- JWT authentication
- Bearer tokens
- Protected API endpoints
- Authentication and authorization

### Git

I used AI to understand:

- Branches
- Commits
- Push and pull
- Pull requests
- Merge conflicts
- Feature branch workflow

### Testing

I used AI to learn:

- Pytest
- FastAPI TestClient
- Writing API tests
- Testing successful requests
- Testing failed authentication
- Cleaning up test data

---

## 3. Example of AI Assistance

### Problem

I needed to protect task endpoints so that only authenticated users could access them.

### What I Asked AI

I asked how to use JWT authentication with FastAPI and how to protect API endpoints.

### What AI Suggested

AI explained how to:

1. Generate a JWT after successful login.
2. Send the token using the Authorization header.
3. Decode and verify the token on protected routes.
4. Get the user ID from the token.
5. Use the user ID when accessing tasks.

### What I Accepted

I implemented JWT authentication using PyJWT and FastAPI's dependency system.

### What I Changed

I changed the task endpoints so they use the authenticated user's ID instead of trusting a user ID sent by the client.

### How I Verified It

I tested:

- Accessing `/tasks` without a token → `401`
- Accessing `/tasks` with a valid token → `200`
- Creating tasks with the authenticated user's ID
- Accessing tasks belonging to the authenticated user

---

## 4. Testing With AI Assistance

I used AI to create basic automated tests using Pytest and FastAPI TestClient.

The tests currently cover:

- API health check
- User signup
- Successful login
- Incorrect password
- Protected endpoint without JWT
- Protected endpoint with JWT

I ran the tests using:

```bash
pytest
```

All current tests passed successfully.

---

## 5. Important Learning

Using AI helped me understand that AI should be used as an engineering assistant rather than as a replacement for understanding.

I learned to:

- Understand the problem before asking AI for code.
- Review AI-generated code.
- Ask questions when I do not understand something.
- Test the implementation.
- Debug errors instead of blindly copying solutions.
- Keep sensitive information such as passwords and JWT secrets private.

---

## 6. Verification

I verified the implementation by:

- Running the FastAPI application.
- Testing APIs through Swagger UI.
- Testing database operations.
- Testing authentication.
- Running automated tests using Pytest.
- Checking Git status and commits.
- Reviewing the code before continuing to the next feature.

---

## 7. My Reflection

AI helped me learn faster, especially when I was stuck on errors or unfamiliar technologies.

However, I learned that I still need to understand the code and the problem myself because I am responsible for the final solution.

My goal is to use AI to improve my productivity while continuing to build my own software engineering skills.