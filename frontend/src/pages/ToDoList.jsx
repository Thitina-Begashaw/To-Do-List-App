import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdArrowBack } from 'react-icons/md'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";

const API_URL = "http://localhost:5000/api/ToDo"; // Backend URL

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

  
  

  const handleEdit = async (taskId, event) => {
    event.preventDefault();
    console.log("Title:", Title, "Description:", Description); // Debugging line
    if (!Title || !Description) return;
  
    try {
      const response = await axios.patch(`${API_URL}/${taskId}`, { Title, Description });
  
      // Update the task in the list instead of adding a new one
      setTasks(tasks.map(task => (task.id === taskId ? response.data : task)));
  
      // Reset input fields
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
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
    
    
        
  return (

    <div className='bg-white min-h-screen bg-cover'>
        <div className='bg-purple-200 min-w-full border-b-2 border-purple-300  '>
            {/* <h1 className='text-white text-xs md:text-xl lg:text-2xl p-5 ml-0 md:ml-5 lg:ml-10 '><MdArrowBack/></h1> */}
            <button className="text-black text-xs md:text-xl lg:text-2xl p-5 ml-0 md:ml-5 lg:ml-8">
  <MdArrowBack />
</button>
        </div>
        <div className="fixed w-60 min-h-screen bg-purple-200 border-2 border-purple-300 ">

        </div>
      
        <h1 className='text-start md:text-center lg:text-center ml-36 p-10 text-xs md:text-3xl lg:text-4xl font-extrabold'>Add Task</h1>
        
            <form onSubmit={handleSubmit} className='flex flex-col absolute top-32 left-5 md:top-52 md:left-36 lg:top-44 lg:left-96 border-2 border-purple-300 h-56 w-48 md:h-72 md:w-[500px] lg:h-96 lg:w-[700px] rounded-2xl 
                             p-10 '>
               
                <label className='text-xl mb-3'>Title</label>
                <input className='border-2 border-purple-200 rounded-2xl p-2 mb-3' 
                type="text" 
                placeholder='Enter Title' 
                value={Title} 
                onChange={(e) => setTitle(e.target.value)}/>
                <label className='text-xl mb-3'>Description</label>
                <textarea className= "placeholder-shown:text-start  placeholder-shown:pt-4 border-2 border-purple-200 rounded-2xl py-20 "
                type="text" 
                placeholder='Description' 
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                />
                <div className="text-center ">
                <button type='submit' className='text-xl bg-purple-300 rounded-2xl px-16 py-2  text-black m-10'>Add </button>
                <button type='submit' className='text-xl bg-purple-300 rounded-2xl px-16 py-2  text-black'>Cancel </button> 
                </div>
            </form>
          
{/* Task List */}
<div className="mt-96  w-[850px] py-30 ml-72  ">
        {tasks.length > 0 ? (
          <ul className=" grid grid-cols-2 gap-10  ">
            {tasks.map((task) => (
              <li key={task.id} className="border py-10  text-start  text-black rounded-lg shadow-md relative ">
          
                <h3 className="text-xl font-bold mb-6 ml-10 mt-3">{task.Title}</h3>
                <p className="text-gray-600 ml-10 mb-5">{task.Description}</p>
                <p className="text-gray-500 text-sm  mr-6 text-end">
                {getFormattedTimeAgo(task.createdAt)}
          </p>
                <div className="absolute top-4 right-4 flex space-x-3">
                <button onClick={(e) => {
    console.log("Task ID:", task.id); // Debugging line
    handleEdit(task.id, e);
}}>
    <MdEdit />
</button>

             <button><MdDelete/></button>
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

