// TaskContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_URL = "${process.env.REACT_APP_BACKEND_URL}/api/ToDo";

// Create Context
const TaskContext = createContext();

// Create a Provider component to wrap your app
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const addTask = async (title, description) => {
    try {
      const response = await axios.post(API_URL, {
        Title: title,
        Description: description,
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (!isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateStatus = async (taskId, currentStatus) => {
    const isConfirmed = window.confirm(
      "You are changing the status to completed. Do you want to proceed?"
    );
    if (!isConfirmed) return;

    try {
      await axios.patch(`${API_URL}/${taskId}`, { Status: !currentStatus });
      setTasks(
        tasks.map((task) =>
          task._id === taskId ? { ...task, Status: !currentStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, updateStatus }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook to use the context
export const useTasks = () => {
  return useContext(TaskContext);
};
