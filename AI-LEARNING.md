# AI Learning Log

This document records how AI was used during the development of the Task Management Application.

## 1. Why I Used AI

I used AI as a learning and development assistant throughout the project.

I used AI to:

- Understand unfamiliar technologies and concepts.
- Break the project into smaller tasks.
- Get guidance while implementing features.
- Debug errors and understand why they occurred.
- Review and improve my code.
- Learn better development and Git practices.
- Understand testing and deployment.
- Improve the frontend UI and user experience.

AI was not used blindly. I reviewed the suggestions, asked questions when I did not understand something, implemented the changes, tested the application, and took responsibility for the final implementation.

The goal was to learn how to work effectively with AI as an engineering assistant, not simply to generate code.

---

## 2. Project Areas Where I Used AI

### FastAPI and Backend Development

I used AI to understand and implement:

- How to create a FastAPI application.
- How API endpoints work.
- GET, POST, PUT, PATCH, and DELETE endpoints.
- Request and response models.
- Pydantic validation.
- Error handling using HTTPException.
- FastAPI dependencies.
- Connecting FastAPI with PostgreSQL.
- Running the application using Uvicorn.
- Using Swagger UI for API testing.

### PostgreSQL and SQLAlchemy

I used AI to understand:

- PostgreSQL database setup.
- Database connections.
- SQLAlchemy.
- Database models.
- Tables and relationships.
- Primary keys and foreign keys.
- Creating and querying records.
- Connecting tasks to users.
- Filtering tasks based on the authenticated user.

### Authentication and Security

I used AI to understand and implement:

- Password hashing.
- Argon2.
- User signup and login.
- JWT authentication.
- Bearer tokens.
- Protected API endpoints.
- Authentication vs authorization.
- Getting the authenticated user from a JWT.
- Protecting task operations from unauthorized access.
- Keeping passwords and JWT secrets out of the source code.

### Task CRUD

I used AI to understand and implement:

- Creating tasks.
- Reading tasks.
- Updating tasks.
- Deleting tasks.
- Marking tasks as completed.
- Connecting each task to its owner.
- Making sure users can only access their own tasks.

### React Frontend

I used AI to understand and implement:

- React project structure.
- Components.
- State management with `useState`.
- Fetching data from APIs.
- Async/await.
- Login and signup flows.
- Storing JWT tokens in localStorage.
- Protected application flow.
- Task creation, editing, deletion, and completion.
- Connecting the React frontend with the FastAPI backend.
- Improving the UI and CSS.
- Responsive design.

### CORS and Frontend-Backend Integration

I used AI to understand:

- What CORS is.
- Why the browser blocks requests between different origins.
- How to configure CORS in FastAPI.
- How to allow the local React frontend.
- How to allow the production Vercel frontend.

### Git and GitHub

I used AI to understand and follow:

- Git branches.
- Feature branches.
- Commits.
- Push and pull.
- Pull requests.
- Code review.
- Merge conflicts.
- Merging feature branches into `main`.
- Checking Git status.
- Writing meaningful commit messages.
- Keeping sensitive files such as `.env` out of Git.

### Testing

I used AI to learn and implement:

- Pytest.
- FastAPI TestClient.
- Writing API tests.
- Testing successful requests.
- Testing failed authentication.
- Testing duplicate signup.
- Testing incorrect passwords.
- Testing protected endpoints.
- Verifying that authenticated users can access their tasks.

### Deployment

I used AI to understand and complete the deployment process:

- Deploying the FastAPI backend to Render.
- Creating a PostgreSQL database on Render.
- Configuring environment variables.
- Deploying the React frontend to Vercel.
- Configuring the production API URL.
- Connecting the Vercel frontend with the Render backend.
- Configuring production CORS.
- Testing the complete production application.

---

## 3. Examples of AI Assistance

### Example 1: JWT Authentication

#### Problem

I needed to protect task endpoints so that only authenticated users could access them.

#### What I Asked AI

I asked how JWT authentication works with FastAPI and how protected API endpoints can identify the logged-in user.

#### What AI Suggested

AI explained how to:

1. Generate a JWT after successful login.
2. Send the token using the Authorization header.
3. Decode and verify the token on protected routes.
4. Extract the user ID from the token.
5. Use the authenticated user ID when accessing tasks.

#### What I Accepted

I implemented JWT authentication using PyJWT and FastAPI's dependency system.

#### What I Changed

I changed the task endpoints so they use the authenticated user's ID instead of trusting a user ID sent by the client.

#### How I Verified It

I tested:

- Accessing `/tasks` without a token → `401`
- Accessing `/tasks` with a valid token → `200`
- Creating tasks while authenticated.
- Accessing tasks belonging to the authenticated user.
- Logging out and verifying that the protected API could no longer be accessed without a token.

---

### Example 2: Signup Validation

#### Problem

I wanted the signup API to reject invalid user data and prevent duplicate email registrations.

#### What I Asked AI

I asked how to validate signup data using Pydantic and how to handle duplicate email addresses.

#### What AI Suggested

AI suggested:

- Minimum validation rules for user fields.
- Using `EmailStr` for email validation.
- Using `Field` for minimum password and name lengths.
- Checking whether an email already exists.
- Returning an appropriate HTTP error.

#### What I Accepted

I implemented Pydantic validation and duplicate email checking.

#### What I Changed

I reviewed the validation rules and adjusted them to match the requirements of my application.

#### How I Verified It

I tested:

- Valid signup.
- Invalid email.
- Short password.
- Short name.
- Duplicate email.

---

### Example 3: Debugging CORS

#### Problem

My frontend and backend were running on different origins, so browser requests were blocked by CORS.

#### What I Asked AI

I asked why the frontend could not communicate with the FastAPI backend.

#### What AI Suggested

AI explained that the backend needed to allow requests from the frontend origin using FastAPI's CORS middleware.

#### What I Accepted

I configured CORS for the local React development URL.

Later, when deploying the application, I added the Vercel frontend URL to the allowed origins.

#### How I Verified It

I tested API requests from the React frontend locally and then tested the complete deployed application.

---

### Example 4: Deployment

#### Problem

I needed to make the complete application available online.

#### What I Asked AI

I asked how to deploy the React frontend, FastAPI backend, and PostgreSQL database.

#### What AI Suggested

AI guided me through:

- PostgreSQL deployment on Render.
- FastAPI deployment on Render.
- Environment variables.
- React deployment on Vercel.
- Production API configuration.
- CORS configuration.

#### What I Accepted

I deployed:

- React frontend → Vercel
- FastAPI backend → Render
- PostgreSQL database → Render

#### How I Verified It

I tested the live application by:

- Signing up.
- Logging in.
- Creating tasks.
- Editing tasks.
- Completing tasks.
- Deleting tasks.
- Logging out.

The complete production flow worked successfully.

---

## 4. Testing With AI Assistance

I used AI to create and understand automated tests using Pytest and FastAPI TestClient.

The tests cover:

- API health check.
- User signup.
- Duplicate signup.
- Successful login.
- Incorrect password.
- Protected endpoint without JWT.
- Protected endpoint with JWT.

I ran:

```bash
pytest