// TaskList.js
import React from "react";
import { useTasks } from "../Context/TaskContext"; // Import the custom hook
import { MdDelete, MdOutlineTaskAlt } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import Nav from "./Nav";

const TaskList = () => {
  const {
    tasks,
    deleteTask,
    updateStatus,
    filteredCompletedTasks,
    filteredPendingTasks,
  } = useTasks();

  const getFormattedTimeAgo = (date) => {
    if (!date || isNaN(new Date(date).getTime())) return "Unknown time";
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <>
      <Nav />
      <div className="">
        {" "}
        <h1 className="text-3xl text-purple-500  font-extrabold  ml-52 -mt-[480px] text-center">
          My ToDo Lists
        </h1>
      </div>
      <div className="ml-64 flex gap-16 justify-center mt-10">
        <div>
          Total Todos <span>{tasks.length}</span>
        </div>
        <div>
          Pending Todos <span>{filteredPendingTasks.length}</span>
        </div>
        <div>
          Completed Todos <span>{filteredCompletedTasks.length}</span>
        </div>
      </div>
      <div className="-mt-10 w-[850px] py-30 ml-72">
        {tasks.length > 0 ? (
          <ul className="grid grid-cols-2 gap-10">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="border py-10 text-start text-black rounded-lg shadow-md relative"
              >
                {/* ✅ Diagonal "Done" Text (Only if the task is completed) */}
                {task.Status && (
                  <div className="absolute transform -translate-x-1/2 -translate-y-1/2 rotate-[-45deg] bg-green-500 text-white text-lg font-bold px-8 left-7 py-1 rounded-lg shadow-md">
                    Done
                  </div>
                )}
                <h3 className="text-xl font-bold mb-6 ml-10 mt-3">
                  {task.Title}
                </h3>
                <p className="text-gray-600 ml-10 mb-5">{task.Description}</p>
                <p className="text-gray-500 text-sm  mr-6 text-end">
                  {getFormattedTimeAgo(task.createdAt)}
                </p>
                <div className="absolute top-4 right-4 flex space-x-3">
                  <button onClick={() => updateStatus(task._id, task.Status)}>
                    <MdOutlineTaskAlt
                      className={"text-green-500 cursor-pointer"}
                    />
                  </button>
                  <button onClick={() => deleteTask(task._id)}>
                    <MdDelete className="text-red-500 hover:text-red-700 cursor-pointer" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No tasks added yet.</p>
        )}
      </div>
    </>
  );
};

export default TaskList;
