import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import UseAuth from "../hooks/useAuth";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/ToDo`;

// Create Context
const TaskContext = createContext();

// Create a Provider component to wrap your app
export const TaskProvider = ({ children }) => {
  const {  token } = UseAuth();
  const [tasks, setTasks] = useState([]);

  console.log(token);

  // Fetch tasks from the API
  useEffect(() => {
    if (!token) return;

    axios
      .get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
        // setLoading(false);
      });
  }, [token]);

  const addTask = async (title, description) => {
    if (!token) return;

    try {
      const response = await axios.post(
        API_URL,
        { Title: title, Description: description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!token) return;

    const isConfirmed = window.confirm("Are you sure you want to delete this task?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateStatus = async (taskId, currentStatus) => {
    if (!token) return;

    const isConfirmed = window.confirm("You are changing the status to completed. Do you want to proceed?");
    if (!isConfirmed) return;

    try {
      await axios.patch(
        `${API_URL}/${taskId}`,
        { Status: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
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
