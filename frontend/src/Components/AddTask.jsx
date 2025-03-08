// AddTask.js
import React, { useState } from 'react';
import { useTasks } from '../Context/TaskContext';
import Nav from './Nav';

const AddTask = () => {
  const { addTask } = useTasks(); // Use addTask from context
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      addTask(title, description); // Add task using context function
      setTitle("");
      setDescription("");
    }
  };

  return (

    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     placeholder="Enter Title"
    //     value={title}
    //     onChange={(e) => setTitle(e.target.value)}
    //   />
    //   <textarea
    //     placeholder="Enter Description"
    //     value={description}
    //     onChange={(e) => setDescription(e.target.value)}
    //   />
    //   <button type="submit">Add Task</button>
    // </form>
      <>
      
  <Nav />
   
    {/* Add Task Heading */}
    <div className="flex justify-center -mt-[480px] ml-50">
        <h1 className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-center text-purple-700">
          Add Task
        </h1>
      </div>
        
    <form onSubmit={handleSubmit} className='flex flex-col absolute top-32 left-5 md:top-52 md:left-36 lg:top-44 lg:left-96 border-2 border-purple-300 h-56 w-48 md:h-72 md:w-[500px] lg:h-96 lg:w-[700px] rounded-2xl 
                     p-10 '>
       
        <label className='text-xl mb-3'>Title</label>
        <input className='border-2 border-purple-200 rounded-2xl p-2 mb-3' 
        type="text" 
        placeholder='Enter Title' 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}/>
        <label className='text-xl mb-3'>Description</label>
        <textarea className= " placeholder-shown:pt-4 border-2 border-purple-200 rounded-2xl w-[630px] py-10 placeholder-shown:align-text-top  "
        type="text" 
        placeholder='Description' 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <div className="text-center ">
        <button type='submit' className='text-xl bg-purple-300 rounded-2xl px-16 py-2  text-black m-10 border-2 border-purple-600'>Add </button>
        <button type='submit' className='text-xl bg-purple-300 hover:bg-amber-700 rounded-2xl px-14 py-2 border-2 border-purple-600 text-black'>Cancel </button> 
        </div>
    </form>
    </>
  );
};

export default AddTask;
