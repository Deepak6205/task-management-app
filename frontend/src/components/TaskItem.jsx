import { useState } from "react";
import EditTask from "./EditTask";

function TaskItem({ task, onTaskDeleted, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks/${task.id}`, {
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
        `http://127.0.0.1:8000/tasks/${task.id}/complete`,
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
    <div>
      <h3>{task.title}</h3>
      <p>Status: {task.completed ? "Completed" : "Pending"}</p>

      <button onClick={() => setIsEditing(true)}>Edit</button>

      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleComplete}>Complete</button>
    </div>
  );
}

export default TaskItem;
