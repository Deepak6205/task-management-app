from fastapi.testclient import TestClient

from main import app
from database import SessionLocal
from models import User


client = TestClient(app)


def test_home():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Task Management API is running"
    }


def test_signup():
    email = "testuser@example.com"

    response = client.post(
        "/users",
        json={
            "name": "Test User",
            "email": email,
            "password": "test123"
        }
    )

    assert response.status_code == 200
    assert response.json()["message"] == "User created successfully"

    # Clean up test user
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()

    if user:
        db.delete(user)
        db.commit()

    db.close()


def test_login():
    # Create user for login test
    email = "logintest@example.com"

    signup_response = client.post(
        "/users",
        json={
            "name": "Login Test",
            "email": email,
            "password": "test123"
        }
    )

    assert signup_response.status_code == 200

    response = client.post(
        "/login",
        json={
            "email": email,
            "password": "test123"
        }
    )

    assert response.status_code == 200
    assert response.json()["message"] == "Login successful"
    assert "access_token" in response.json()

        # Clean up test user
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()

    if user:
        db.delete(user)
        db.commit()

    db.close()


def test_login_wrong_password():
    email = "wrongpassword@example.com"

    # Create test user
    signup_response = client.post(
        "/users",
        json={
            "name": "Wrong Password Test",
            "email": email,
            "password": "test123"
        }
    )

    assert signup_response.status_code == 200

    # Try wrong password
    response = client.post(
        "/login",
        json={
            "email": email,
            "password": "wrongpassword"
        }
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password"

    # Clean up
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()

    if user:
        db.delete(user)
        db.commit()

    db.close()


def test_get_tasks_without_token():
    response = client.get("/tasks")

    assert response.status_code == 401

def test_get_tasks_with_token():
    email = "tasktest@example.com"

    # Create test user
    signup_response = client.post(
        "/users",
        json={
            "name": "Task Test",
            "email": email,
            "password": "test123"
        }
    )

    assert signup_response.status_code == 200

    # Login
    login_response = client.post(
        "/login",
        json={
            "email": email,
            "password": "test123"
        }
    )

    assert login_response.status_code == 200

    token = login_response.json()["access_token"]

    # Access protected route
    response = client.get(
        "/tasks",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert response.status_code == 200

    # Clean up user
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()

    if user:
        db.delete(user)
        db.commit()

    db.close()