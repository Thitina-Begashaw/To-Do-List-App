import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdArrowBack } from 'react-icons/md'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { MdDashboard, MdAddTask, MdList, MdLogout, MdOutlineTaskAlt } from "react-icons/md"; // Import icons

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/ToDo`; // Backend URL

const ToDoList = () => {
    const [Title , setTitle] = useState("")
    const [Description , setDescription] = useState("")
    const [tasks, setTasks] = useState([]); // Stores tasks

// Utility function to safely format time
const getFormattedTimeAgo = (date) => {
  if (!date || isNaN(new Date(date).getTime())) return "Unknown time";
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};



// Fetch tasks from the backend
useEffect(() => {
    axios.get(API_URL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  
  

  const handleStatus = async (taskId, currentStatus, event) => {
    event.preventDefault();
   // Ask for confirmation
   const isConfirmed = window.confirm("You are changing the status to completed. Do you want to proceed?");
   if (!isConfirmed) return; // If user cancels, do nothing

   await axios.patch(`${API_URL}/${taskId}`, { Status: !currentStatus }); // ✅ Toggle status
  
      // Update the task list by modifying only the updated task
      setTasks(tasks.map(task => (task._id === taskId ? { ...task, Status: !currentStatus } : task)));
  
  
  };
  

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if (!Title || !Description) return;

    try {
      const response = await axios.post(API_URL, { Title, Description });
      setTasks([...tasks, {
        ...response.data, 
        createdAt: response.data.createdAt || new Date().toISOString(),
    }]);

    setTitle("");
    setDescription("");
} catch (error) {
    console.error("Error adding task:", error);
}
};
    

// DELETE function to remove a task
const handleDelete = async (taskId) => {
  const isConfirmed = window.confirm("Are you sure you want to delete this task?");
  if (!isConfirmed) return; // If user cancels, do nothing
  try {
    await axios.delete(`${API_URL}/${taskId}`);
    setTasks(tasks.filter((task) => task._id !== taskId)); // Update state
    console.log(`Task ${taskId} deleted successfully`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
    
        
  return (

    <div className='bg-white min-h-screen bg-cover'>
        <div className='bg-purple-200 min-w-full border-b-2 border-purple-300 fixed z-10 flex flex-row  '>
        <button className="text-black text-xs md:text-xl lg:text-2xl p-5 ml-0 md:ml-5 lg:ml-0">
  <MdArrowBack />
</button>
            <h1 className='text-black text-xs md:text-xl lg:text-2xl p-5 ml-0 md:ml-5 lg:ml-4 '>ToDo</h1> 
            
        </div>
        <div className="fixed w-60 min-h-screen bg-purple-200 border-2 border-purple-300 flex flex-col p-10 gap-6 py-30">
               <div className="flex items-center gap-2 text-lg font-semibold hover:text-purple-500 cursor-pointer">
            <MdDashboard className="text-xl" />
           <p>Dashboard</p>
         </div>
         <div className="flex items-center gap-2 text-lg font-semibold hover:text-purple-500 cursor-pointer">
    <MdAddTask className="text-xl" />
    <p>Add Task</p>
  </div>

  <div className="flex items-center gap-2 text-lg font-semibold hover:text-purple-500 cursor-pointer">
    <MdList className="text-xl" />
    <p>My ToDo Lists</p>
  </div>

  <div className="flex items-center gap-2 text-lg font-semibold hover:text-red-500 cursor-pointer">
    <MdLogout className="text-xl" />
    <p>Logout</p>
  </div>
        </div>
      
        <h1 className='text-start md:text-center lg:text-center ml-36 p-28 text-xs md:text-3xl lg:text-4xl font-extrabold'>Add Task</h1>
        
            <form onSubmit={handleSubmit} className='flex flex-col absolute top-32 left-5 md:top-52 md:left-36 lg:top-44 lg:left-96 border-2 border-purple-300 h-56 w-48 md:h-72 md:w-[500px] lg:h-96 lg:w-[700px] rounded-2xl 
                             p-10 '>
               
                <label className='text-xl mb-3'>Title</label>
                <input className='border-2 border-purple-200 rounded-2xl p-2 mb-3' 
                type="text" 
                placeholder='Enter Title' 
                value={Title} 
                onChange={(e) => setTitle(e.target.value)}/>
                <label className='text-xl mb-3'>Description</label>
                <textarea className= " placeholder-shown:pt-4 border-2 border-purple-200 rounded-2xl w-[630px] py-10 placeholder-shown:align-text-top  "
                type="text" 
                placeholder='Description' 
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <div className="text-center ">
                <button type='submit' className='text-xl bg-purple-300 rounded-2xl px-16 py-2  text-black m-10'>Add </button>
                <button type='submit' className='text-xl bg-purple-300 hover:bg-amber-700 rounded-2xl px-16 py-2  text-black'>Cancel </button> 
                </div>
            </form>
          
{/* Task List */}
<div className="mt-96  w-[850px] py-30 ml-72  ">
        {tasks.length > 0 ? (
          <ul className=" grid grid-cols-2 gap-10  ">
            {tasks.map((task) => (
              <li key={task.id} className="border py-10  text-start  text-black rounded-lg shadow-md relative ">
           {/* ✅ Diagonal "Done" Text (Only if the task is completed) */}
      {task.Status && (
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] bg-green-500 text-white text-lg font-bold px-8 left-7 py-1 rounded-lg shadow-md">
          Done
        </div>
      )}
                <h3 className="text-xl font-bold mb-6 ml-10 mt-3">{task.Title}</h3>
                <p className="text-gray-600 ml-10 mb-5">{task.Description}</p>
                <p className="text-gray-500 text-sm  mr-6 text-end">
                {getFormattedTimeAgo(task.createdAt)}
          </p>
                <div className="absolute top-4 right-4 flex space-x-3">

                {/* ✅ Toggle Status Button */}
        <button onClick={(e) => handleStatus(task._id, task.Status, e)}>
          <MdOutlineTaskAlt className={ "text-green-500 cursor-pointer" } />
        </button>
                
             <button onClick={() => handleDelete(task._id)}>
              < MdDelete className="text-red-500 hover:text-red-700"/>
              </button>
            </div>
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

