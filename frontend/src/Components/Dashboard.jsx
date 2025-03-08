import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Nav from './Nav'
import { IoMdAddCircleOutline } from "react-icons/io";
function Dashboard() {
  return (
    <>
    <Nav/>
  
  
    <div className='flex flex-row  '>
    <Link to="/add-task">
      <div className='w-[400px] h-48  border-purple-300 border-2 ml-72 -mt-[440px] rounded-2xl'>
        <div className='flex flex-row'>
        <h1 className='text-2xl p-4 font-bold '>Add Task</h1>
      <p className='text-3xl text-green-500 p-5 -ml-6'>  < IoMdAddCircleOutline /> </p>
      </div>
        <p className='p-2 text-gray-600 '>Productivity starts with a single step. Add your task and begin your journey.</p>
      </div>
      </Link>
      <Link to="/my-todo-lists">
      <div className='w-[400px] h-48  border-purple-300 border-2 ml-28  -mt-[440px] rounded-2xl'>
        <h1 className='text-2xl p-4 font-bold'>My ToDo Lists</h1>
        <p className='p-2  text-gray-600'>Comprehensive and organized list of all the tasks, goals, and responsibilities.</p>
      </div>
      </Link>

    </div>

    </>
  )
}

export default Dashboard
