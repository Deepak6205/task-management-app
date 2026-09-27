import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://127.0.0.1:8000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Failed to fetch tasks");
        }

        setTasks(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((previousTasks) => [...previousTasks, newTask]);
  };
  const handleTaskDeleted = (taskId) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== taskId),
    );
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <TaskForm onTaskCreated={handleTaskCreated} />

      {error && <p>{error}</p>}

      <h2>My Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskDeleted={handleTaskDeleted}
          />
        ))
      )}
    </div>
  );
}

export default Dashboard;
