import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { API_URL } from "../services/api";
import "./Dashboard.css";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(`${API_URL}/tasks`, {
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

  const handleTaskUpdated = (updatedTask) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task,
      ),
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header-row">
        <h1 className="dashboard-title">Dashboard</h1>
        <button className="logout-link" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="task-form-area">
        <TaskForm onTaskCreated={handleTaskCreated} />
      </div>

      <div className="tasks-section">
        <h2 className="tasks-heading">My Tasks</h2>

        {error && <p className="dash-error">{error}</p>}

        {tasks.length === 0 ? (
          <p className="empty-state">No tasks found.</p>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onTaskDeleted={handleTaskDeleted}
                onTaskUpdated={handleTaskUpdated}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
