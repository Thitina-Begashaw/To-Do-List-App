// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { TaskProvider } from "./Context/TaskContext";
import AuthContextProvider from "./Context/AuthContext.jsx";
import Dashboard from "./Components/Dashboard";
import AddTask from "./Components/AddTask";
import HomePage from "./pages/HomePage";
import TaskList from "./Components/TaskList";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import UseAuth from "./hooks/useAuth.js";
const App = () => {
  const { user } = UseAuth();
  return (
      <TaskProvider>
        <div>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/ToDo" element={user?<Dashboard />:<Navigate to='/signin'/>} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/my-todo-lists" element={<TaskList />} />
              <Route path="/signin" element={user?<Navigate to='/ToDo'/>:<Signin />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
          </Router>
        </div>
      </TaskProvider>
  );
};

export default App;
