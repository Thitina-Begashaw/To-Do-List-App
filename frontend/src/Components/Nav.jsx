import React from "react";
import { MdArrowBack } from "react-icons/md";
import { MdDashboard, MdAddTask, MdList, MdLogout } from "react-icons/md";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import ToDoLogo from "../assets/To Do Icon3.jpg";
import UseAuth from "../hooks/useAuth";
function Nav() {
  const { logout } = UseAuth();
  return (
    <div className="bg-white min-h-screen ">
      <Link
        to="/"
        className="bg-purple-200 min-w-full border-b-2 border-purple-300 fixed z-10 flex flex-row  "
      >
        {/* <img className='' src={ToDoLogo} alt="" /> */}

        <h1 className="text-black text-xs md:text-xl lg:text-2xl p-5 ml-28 md:ml-5 lg:ml-10 font-extrabold ">
          ToDo
        </h1>
      </Link>
      <div className="fixed w-60 min-h-screen bg-purple-200 border-2 border-purple-300 flex flex-col p-10 gap-6 py-30">
        <Link
          to="/ToDo"
          className="flex items-center gap-2 text-lg font-semibold hover:text-purple-500 cursor-pointer"
        >
          <MdDashboard className="text-xl" />
          <p>Dashboard</p>
        </Link>
        <Link
          to="/add-task"
          className="flex items-center gap-2 text-lg font-semibold hover:text-purple-500 cursor-pointer"
        >
          <MdAddTask className="text-xl" />
          <p>Add Task</p>
        </Link>
        <Link
          to="/my-todo-lists"
          className="flex items-center gap-2 text-lg font-semibold hover:text-purple-500 cursor-pointer"
        >
          <MdList className="text-xl" />
          <p>My ToDo Lists</p>
        </Link>
        <Link
          to="/"
          onClick={()=>logout()}
          className="flex items-center gap-2 text-lg font-semibold hover:text-red-500 cursor-pointer"
        >
          <MdLogout className="text-xl" />
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
