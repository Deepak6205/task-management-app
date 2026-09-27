import { useState } from "react";

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
        `http://127.0.0.1:8000/tasks/${task.id}`,
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
    <div>
      <h3>Edit Task</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <button type="submit">Save Changes</button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default EditTask;