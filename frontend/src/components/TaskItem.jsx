import { useState } from "react";
import EditTask from "./EditTask";
import { API_URL } from "../services/api";
import "./TaskItem.css";

function TaskItem({ task, onTaskDeleted, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to delete task");
      }

      onTaskDeleted(task.id);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setIsEditing(false);
    onTaskUpdated(updatedTask);
  };

  if (isEditing) {
    return (
      <EditTask
        task={task}
        onTaskUpdated={handleTaskUpdated}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  const handleComplete = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_URL}/tasks/${task.id}/complete`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to complete task");
      }

      onTaskUpdated(data.task);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`task-status ${task.completed ? "completed" : "pending"}`}>
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-actions">
        <button className="task-button edit" onClick={() => setIsEditing(true)}>
          Edit
        </button>

        <button className="task-button delete" onClick={handleDelete}>
          Delete
        </button>

        <button
          className={`task-button complete ${task.completed ? "done" : ""}`}
          onClick={handleComplete}
          disabled={task.completed}
        >
          {task.completed ? "Done" : "Complete"}
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
