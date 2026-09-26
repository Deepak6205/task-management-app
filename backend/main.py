from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from database import engine, Base, SessionLocal
from models import User, Task
from auth import hash_password

class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class TaskCreate(BaseModel):
    title: str
    description: str
    user_id: int


class TaskUpdate(BaseModel):
    title: str
    description: str


UserCreate.model_rebuild()
TaskCreate.model_rebuild()
TaskUpdate.model_rebuild()

Base.metadata.create_all(bind=engine)

app = FastAPI()


# ---------------- HOME ----------------

@app.get("/")
def home():
    return {"message": "Task Management API is running"}


# ---------------- USERS ----------------

@app.post("/users")
def create_user(user: UserCreate):

    db = SessionLocal()

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    db.close()

    return {
        "message": "User created successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }
    }


# ---------------- CREATE TASK ----------------

@app.post("/tasks")
def create_task(task: TaskCreate):

    db = SessionLocal()

    # Check whether user exists
    user = db.query(User).filter(User.id == task.user_id).first()

    if not user:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    new_task = Task(
        title=task.title,
        description=task.description,
        user_id=task.user_id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    db.close()

    return {
        "message": "Task created successfully",
        "task": {
            "id": new_task.id,
            "title": new_task.title,
            "description": new_task.description,
            "completed": new_task.completed,
            "user_id": new_task.user_id
        }
    }


# ---------------- GET ALL TASKS ----------------

@app.get("/tasks")
def get_tasks():

    db = SessionLocal()

    tasks = db.query(Task).all()

    db.close()

    return tasks


# ---------------- GET ONE TASK ----------------

@app.get("/tasks/{task_id}")
def get_task(task_id: int):

    db = SessionLocal()

    task = db.query(Task).filter(Task.id == task_id).first()

    db.close()

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task


# ---------------- UPDATE TASK ----------------

@app.put("/tasks/{task_id}")
def update_task(task_id: int, task_data: TaskUpdate):

    db = SessionLocal()

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.title = task_data.title
    task.description = task_data.description

    db.commit()
    db.refresh(task)

    db.close()

    return {
        "message": "Task updated successfully",
        "task": task
    }


# ---------------- DELETE TASK ----------------

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):

    db = SessionLocal()

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    db.close()

    return {
        "message": "Task deleted successfully"
    }


# ---------------- MARK TASK COMPLETE ----------------

@app.patch("/tasks/{task_id}/complete")
def complete_task(task_id: int):

    db = SessionLocal()

    task = db.query(Task).filter(Task.id == task_id).first()

    if not task:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.completed = True

    db.commit()
    db.refresh(task)

    db.close()

    return {
        "message": "Task marked as completed",
        "task": task
    }