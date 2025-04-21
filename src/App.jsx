import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    await axios.post("http://localhost:5000/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    fetchTasks();
  };

  const markComplete = async (id) => {
    await axios.put(`http://localhost:5000/complete/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Enter new task"
      />
      <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      <ul className="mt-4">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center mb-2">
            <span className={task.completed ? "line-through" : ""}>{task.title}</span>
            <div>
              <button onClick={() => markComplete(task.id)} className="text-green-500 mr-2">✔️</button>
              <button onClick={() => deleteTask(task.id)} className="text-red-500">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
