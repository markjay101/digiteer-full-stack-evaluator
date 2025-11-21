import { useEffect, useState } from "react";
import TaskModal from "./TaskModal";
import { tasksService } from "./services/tasksServices";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    tasksService
      .getTasks()
      .then((data) => setTasks(data))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  const handleAdd = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSubmit = async (title) => {
    try {
      if (editingTask) {
        const updated = await tasksService.updateTask(editingTask.id, {
          ...editingTask,
          title,
        });
        setTasks((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
      } else {
        const newTask = await tasksService.createTask({ title, isDone: false });
        setTasks((prev) => [...prev, newTask]);
      }
    } catch (err) {
      console.error("Failed to save task:", err);
    } finally {
      setModalOpen(false);
    }
  };

  const toggleDone = async (task) => {
    try {
      const updated = await tasksService.updateTask(task.id, {
        ...task,
        isDone: !task.isDone,
      });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await tasksService.deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h2>Tasks</h2>
        <button className="btn btn-sm btn-primary" onClick={handleAdd}>
          Add
        </button>
      </div>
      <ul className="list-group">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span
              onClick={() => toggleDone(task)}
              style={{
                textDecoration: task.isDone ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {task.title} {task.isDone ? "✅" : "❌"}
            </span>
            <div>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => handleEdit(task)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialValue={editingTask ? editingTask.title : ""}
      />
    </div>
  );
}

export default Tasks;
