import React from "react";
const HomePage = () => {
  return (
    <div className=" bg-[url('./assets/ToDoBg10.jpg')] bg-cover bg-center min-h-screen flex flex-col">
      
      <div class=" flex justify-end items-end m-5 ">
        <p className=" text-xl px-6 py-2 rounded-full text-white font-bold cursor-pointer ">
          Sign in
        </p>
      </div>
      <div class="flex flex-col justify-center items-center lg:p-10 lg:ml-96 ">
        <h1
          class=" font-extrabold text-5xl md:text-7xl lg:text-8xl mb-7"
          
        >
          Welcome
        </h1>
        <h1 class="mb-20 text-3xl md:text-3xl lg:text-5xl ">
          To-Do List App
        </h1>
        <button class=" text-xl md:text-2xl lg:text-3xl  bg-green-500 px-4 py-2 md:px-5 md:py-3 lg:px-10 lg:py-4 rounded-full text-gray-300 font-bold">Start</button>
      </div>
    </div>
  );
};

export default HomePage;
