
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Menu, Pencil, Trash2, Plus, X } from "lucide-react";

const App = () => {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("showtasks")) || [])
  const [category, setCategory] = useState("all");
  const [priority, setPriority] = useState("all");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const { register, handleSubmit, reset } = useForm();

const formSubmit = (data) => {
  let updatedTasks;
  if (editIndex !== null) {
    updatedTasks = tasks.map((val, index) =>
      index === editIndex ? data : val
    );
    setEditIndex(null);
  } else {
    updatedTasks = [...tasks, data];
  }

  setTasks(updatedTasks);
  localStorage.setItem("showtasks", JSON.stringify(updatedTasks));

  reset();
};

  
  const editTask = (index) => {
    reset(tasks[index]);
    setEditIndex(index);
  };

  
  const deleteTask = (index) => {
    setTasks(tasks.filter((val, i) => i !== index));
  };

  
  const filterCategory = tasks.filter((val) => {
    return (
      (category === "all" || val.status === category) &&
      (priority === "all" || val.priority === priority) &&
      val.addtask.toLowerCase().includes(search.toLowerCase())
    );
  });

  const statusStyle = {
    todo: "bg-yellow-100 text-yellow-700",
    inprogress: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  const priorityStyle = {
    High: "bg-red-100 text-red-600",
    Medium: "bg-orange-100 text-orange-600",
    Low: "bg-green-100 text-green-600",
  };

  return (
    <div className="min-h-screen bg-blue-50">

      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 via-blue-800 to-blue-950 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-white font-bold text-xl sm:text-2xl">
            Kanban TaskBoard
          </h1>

          <Menu className="text-white sm:hidden" size={27} />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4 sm:p-6">

        {/* Add Task */}
        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-7 mb-8">

          <h2 className="text-xl font-bold text-blue-900 mb-5">
            {editIndex !== null ? "Edit Task" : "Add New Task"}
          </h2>

          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Task Title
                </label>

                <input
                  type="text"
                  placeholder="Enter task name"
                  className="w-full bg-slate-50 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-200"
                  {...register("addtask", { required: true })}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>

                <textarea
                  rows="3"
                  placeholder="Enter description"
                  className="w-full bg-slate-50 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                  {...register("description")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Date
                </label>

                <input
                  type="date"
                  className="w-full bg-slate-50 border rounded-lg p-3 outline-none"
                  {...register("date")}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Priority
                </label>

                <select
                  className="w-full bg-slate-50 border rounded-lg p-3 outline-none"
                  {...register("priority")}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Status
                </label>

                <select
                  className="w-full bg-slate-50 border rounded-lg p-3 outline-none"
                  {...register("status")}
                >
                  <option value="todo">Todo</option>
                  <option value="inprogress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="flex-1 flex justify-center items-center gap-2 bg-blue-800 hover:bg-blue-950 text-white p-3 rounded-lg transition"
                >
                  {editIndex !== null ? (
                    <>
                      <Pencil size={17} />
                      Update Task
                    </>
                  ) : (
                    <>
                      <Plus size={19} />
                      Add Task
                    </>
                  )}
                </button>

                {editIndex !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditIndex(null);
                      reset();
                    }}
                    className="bg-slate-200 p-3 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

            </div>
          </form>
        </div>

        {/* Filter Tasks */}
        <div className="bg-white rounded-xl shadow-sm p-5 sm:p-6 mb-8">

          <h2 className="text-xl font-bold text-blue-900 mb-5">
            Filter Your Tasks
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div>
              <label className="block text-sm font-semibold mb-2">
                Search
              </label>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search task..."
                className="w-full bg-slate-50 border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-slate-50 border rounded-lg p-3 outline-none"
              >
                <option value="all">All</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border rounded-lg p-3 outline-none"
              >
                <option value="all">All</option>
                <option value="todo">Todo</option>
                <option value="inprogress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

          </div>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("all");
              setPriority("all");
            }}
            className="mt-4 border border-slate-300 px-6 py-2 rounded-lg hover:bg-slate-100"
          >
            Reset Filters
          </button>

        </div>

        {/* Task List */}
        <div>

          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-blue-950">
              Your Tasks
            </h2>

            <span className="text-sm text-slate-500">
              {filterCategory.length} Tasks
            </span>
          </div>

          {filterCategory.length === 0 ? (

            <div className="bg-white rounded-xl p-10 text-center text-slate-500">
              No tasks found. Add your first task!
            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {filterCategory.map((val,index) => {

                

                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition"
                  >

                    <div className="flex justify-between items-center gap-2 mb-4">

                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${priorityStyle[val.priority]}`}>
                        {val.priority} Priority
                      </span>

                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusStyle[val.status]}`}>
                        {val.status === "inprogress"
                          ? "In Progress"
                          : val.status}
                      </span>

                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-2 break-words">
                      {val.addtask}
                    </h3>

                    <p className="text-sm text-slate-500 min-h-10 break-words">
                      {val.description || "No description"}
                    </p>

                    <p className="text-sm text-slate-500 mt-4 border-t pt-3">
                      Date: {val.date || "Not selected"}
                    </p>

                    {/* Edit and Delete */}
                    <div className="flex gap-3 mt-5">

                      <button
                        type="button"
                        onClick={() => editTask(index)}
                        className="flex-1 flex justify-center items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 p-2 rounded-lg font-semibold transition"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteTask(index)}
                        className="flex-1 flex justify-center items-center gap-2 bg-red-100 text-red-600 hover:bg-red-200 p-2 rounded-lg font-semibold transition"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </main>
    </div>
  );
};

export default App;
