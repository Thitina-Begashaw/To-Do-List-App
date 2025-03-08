// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from './Context/TaskContext';
import Dashboard from './Components/Dashboard';
import AddTask from './Components/AddTask';
import HomePage from './pages/HomePage';
import TaskList from './Components/TaskList';
const App = () => {
  return (
    <TaskProvider>
      <div>
      <Router>
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="/ToDo" element={<Dashboard />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/my-todo-lists" element={<TaskList />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
      </div>
    </TaskProvider>
  );
};

export default App;
