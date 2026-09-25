from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class User(BaseModel):
    name: str
    email: str
    password: str


@app.get("/")
def home():
    return {"message": "Task Management API is running"}


@app.post("/users")
def create_user(user: User):
    return {
        "message": "User created successfully",
        "user": {
            "name": user.name,
            "email": user.email
        }
    }   