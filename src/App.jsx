import { useState } from "react";
import Navbar from "./components/Navbar";
import Column from "./components/Column";
import { DndContext } from "@dnd-kit/core";

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
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const taskId = active.id;
    const newStatus = over.id;
    const newTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(newTasks);
  };
  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-3.5">
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((col) => (
              <Column
                key={col.id}
                column={col}
                tasks={tasks.filter((task) => task.status === col.id)}
              />
            ))}
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default App;
