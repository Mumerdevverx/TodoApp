import React, { useState } from "react";
import { FaEye, FaTrash, FaCheck, FaUndo } from "react-icons/fa";

export const Todos = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);

  const handleAddOrUpdate = () => {
    if (input.trim() === "") return;

    const trimmedInput = input.trim();
    const isDuplicate = tasks.some(
      (task, i) =>
        task.trim().toLowerCase() === trimmedInput.toLowerCase() &&
        i !== editIndex
    );

    if (isDuplicate) {
      alert("This task already exists!");
      return;
    }


    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = trimmedInput;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, trimmedInput]);
    }

    setInput("");
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    setCompletedTasks(completedTasks.filter((i) => i !== index));
    if (editIndex === index) {
      setEditIndex(null);
      setInput("");
    }
  };

  const handleEdit = (index) => {
    setInput(tasks[index]);
    setEditIndex(index);
  };

  const handleComplete = (index) => {
    if (completedTasks.includes(index)) {
      setCompletedTasks(completedTasks.filter((i) => i !== index));
    } else {
      setCompletedTasks([...completedTasks, index]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-slate-100 to-slate-300 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl border border-pink-900 rounded-xl w-full max-w-2xl p-12">
        <h1 className="text-3xl font-bold animate-pulse text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-6 hover:scale-105 transition-all duration-300">
          Todo List
        </h1>

        <div className="flex gap-3  mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your task..."
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-slate-400"
          />
          <button
            onClick={handleAddOrUpdate}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-lg transition-all"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>


        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="bg-gray-200 p-4 rounded-lg flex justify-between items-center shadow-md"
            >
              <span
                className={`text-base ${
                  completedTasks.includes(index)
                    ? "line-through text-green-600"
                    : "text-gray-800"
                }`}
              >
                {task}
              </span>


              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <FaEye />
                </button>


                <button
                  onClick={() => handleComplete(index)}
                  className="text-green-600 hover:text-green-800"
                  title={completedTasks.includes(index) ? "Undo" : "Complete"}
                >
                  {completedTasks.includes(index) ? <FaUndo /> : <FaCheck />}
                </button>


                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash />
                </button>

              </div>
            </li>
          ))}
        </ul>


      </div>
    </div>
  );
};

export default Todos;
