import api from "../api/axios";

export const tasksService = {
  getTasks: async () => {
    try {
      const res = await api.get("/tasks");
      return res.data;
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      const res = await api.post("/tasks", task);
      return res.data;
    } catch (error) {
      console.error("Failed to create task:", error);
      throw error;
    }
  },

  updateTask: async (id, task) => {
    try {
      const res = await api.put(`/tasks/${id}`, task);
      return res.data;
    } catch (error) {
      console.error("Failed to update task:", error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
    } catch (error) {
      console.error("Failed to delete task:", error);
      throw error;
    }
  },
};
