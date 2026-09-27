function TaskItem({ task, onTaskDeleted }) {
  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/tasks/${task.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to delete task");
      }

      onTaskDeleted(task.id);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default TaskItem;