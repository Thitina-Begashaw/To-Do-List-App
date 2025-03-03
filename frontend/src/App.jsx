import React from 'react'
import HomePage from './pages/HomePage.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ToDoList from './pages/ToDoList.jsx';
const App = () => {
  return (
    <div>
      <Router>
      <Routes>
      
        <Route path="/" element={<HomePage />} />
        <Route path="/TodoList" element={<ToDoList />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
    </div>
  )
}

export default App
