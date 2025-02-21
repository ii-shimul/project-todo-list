import { useState } from "react";
import Navbar from "./components/Navbar";
import Column from "./components/Column";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  return (
    <div>
      <Navbar />
      <div className="p-4">
        <div className="flex gap-3.5">
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              tasks={tasks.filter((task) => task.status === col.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
