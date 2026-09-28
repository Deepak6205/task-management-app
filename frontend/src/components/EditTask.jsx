import { useState } from "react";
import "./TaskForm.css";
import { API_URL } from "../services/api";
function EditTask({ task, onTaskUpdated, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${API_URL}/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to update task");
      }

      onTaskUpdated(data.task);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="task-form-card">
      <h2>Edit Task</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label className="form-label">Title</label>
          <input
            className="form-input"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label className="form-label">Description</label>
          <textarea
            className="form-textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <div className="task-actions">
          <button className="task-submit-btn" type="submit">
            Save Changes
          </button>

          <button className="task-button delete" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>

      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

export default EditTask;