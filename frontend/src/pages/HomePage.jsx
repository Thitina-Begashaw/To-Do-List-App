import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
const HomePage = () => {
  const navigate = useNavigate(); // Initialize navigation function
  return (
    <div className=" bg-[url('./assets/ToDoBg10.jpg')] bg-cover bg-center min-h-screen flex flex-col">
      
      <div class=" flex justify-end items-end m-5 ">
        <p className=" text-xl px-6 py-2 rounded-full text-gray-200 font-bold cursor-pointer ">
          Sign in
        </p>
      </div>
      <div class="flex flex-col justify-center items-center lg:p-10 lg:ml-96 ">
        <h1
          class=" font-extrabold text-5xl md:text-7xl lg:text-8xl mb-7  "
          
        >
          Welcome
        </h1>
        <h1 class="mb-10 text-3xl md:text-3xl lg:text-5xl ">
          To-Do List 
        </h1>
        <div className=""><p className="mb-10 text-sm md:text-sm lg:text-xl ml-52 mr-10 ">Stay organized and boost your productivity with ToDo List, a simple yet powerful to-do list app. Easily add, prioritize, and track your tasks to stay on top of your daily goals—anytime, anywhere! 🚀</p></div>
        <button  onClick={() => navigate("/Todo")}  class=" text-xl md:text-2xl lg:text-2xl  bg-purple-600 px-4 py-2 md:px-5 md:py-3 lg:px-10 lg:py-2 rounded-full text-gray-300 font-bold ml-10 border-2 cursor-pointer">Start</button>
      </div>
    </div>
  );
};

export default HomePage;
