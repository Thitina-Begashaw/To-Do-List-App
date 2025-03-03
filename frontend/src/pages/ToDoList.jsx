import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/ToDo"; // Backend URL

const ToDoList = () => {
    const [Title , setTitle] = useState(" ")
    const [Description , setDescription] = useState("")
    const [tasks, setTasks] = useState([]); // Stores tasks

// Fetch tasks from the backend
useEffect(() => {
    axios.get(API_URL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);


    const handleSubmit = async (event) =>{
        event.preventDefault();
        if (!Title || !Description) return;

    try {
      const response = await axios.post(API_URL, { Title, Description });
      setTasks([...tasks, response.data]); // Update UI
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
    
    
        
  return (
    <div className='bg-purple-200 min-h-screen bg-cover'>
        <div className='bg-green-500 min-w-full '>
            <h1 className='text-gray-300 text-xs md:text-xl lg:text-2xl p-5 ml-0 md:ml-5 lg:ml-10 '>My Tasks</h1>
        </div>
        <h1 className='text-start md:text-center lg:text-center p-10 text-xs md:text-3xl lg:text-6xl font-extrabold'>To-Do List</h1>
            <form onSubmit={handleSubmit} className='flex flex-col absolute top-36 left-5 md:top-52 md:left-36 lg:top-48 lg:left-72 border-2 border-green-500 h-56 w-48 md:h-72 md:w-[500px] lg:h-80 lg:w-[700px] rounded-2xl 
                             p-10 '>
               
                <label className='text-2xl mb-3'>Title</label>
                <input className='border-2 border-green-500 rounded-2xl p-2 mb-3' 
                type="text" 
                placeholder='Enter Title' 
                value={Title} 
                onChange={(e) => setTitle(e.target.value)}/>
                <label className='text-2xl mb-3'>Description</label>
                <textarea className='border-2 border-green-500 rounded-2xl p-2 mb-5' 
                type="text" 
                placeholder='Description' 
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <button type='submit' className='text-2xl bg-green-500 rounded-2xl p-2 text-white'>Add Task</button>
            </form>
{/* Task List */}
<div className="mt-10 p-5">
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="border p-3 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{task.title}</h3>
                <p className="text-gray-600">{task.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No tasks added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ToDoList;

