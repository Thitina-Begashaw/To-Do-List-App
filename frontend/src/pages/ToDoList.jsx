import React from 'react'

const ToDoList = () => {
  return (
    <div className='bg-purple-200 min-h-screen bg-cover'>
        <div className='bg-green-500 min-w-full '>
            <h1 className='text-gray-300 text-xs md:text-xl lg:text-2xl p-5 ml-0 md:ml-5 lg:ml-10 '>My Tasks</h1>
        </div>
        <h1 className='text-start md:text-center lg:text-center p-10 text-xs md:text-3xl lg:text-6xl font-extrabold'>To-Do List</h1>
            <div className='flex flex-col absolute top-36 left-5 md:top-52 md:left-36 lg:top-48 lg:left-72 border-2 border-green-500 h-56 w-48 md:h-72 md:w-[500px] lg:h-80 lg:w-[700px] rounded-2xl 
                             p-10 '>
               
                <p className='text-2xl mb-3'>Title</p>
                <input className='border-2 border-green-500 rounded-2xl p-2 mb-3' type="text" placeholder='Enter Title' />
                <p className='text-2xl mb-3'>Description</p>
                <input className='border-2 border-green-500 rounded-2xl p-2 mb-5' type="text" placeholder='Description'/>
                <button className='text-2xl bg-green-500 rounded-2xl p-2 text-white'>Add Task</button>
            </div>

    </div>
  )
}

export default ToDoList
