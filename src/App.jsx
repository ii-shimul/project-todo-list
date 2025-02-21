import { useState } from "react";
import Navbar from "./components/Navbar";
import Column from "./components/Column";
import { DndContext } from "@dnd-kit/core";
import useAxios from "./hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./hooks/useAuth";
import { ClockLoader } from "react-spinners";

const COLUMNS = [
  { id: "To-Do", title: "To Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Done", title: "Done" },
];

function App() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const axe = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ["tasksQuery", user],
    queryFn: async () => {
      const result = await axe.get(`/tasks/${user.email}`);
      setTasks(result.data);
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <ClockLoader size={60}/>
      </div>
    );
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    console.log(over);
    if (!over) {
      return;
    }
    const taskId = active.id;
    const newStatus = over.id;
    const newTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, category: newStatus } : task
    );
    setTasks(newTasks);
    const reCalculateOrder = (tasks) => {
      return tasks.map((task, index) => ({ ...task, order: index }));
    };

    const categories = ["To-Do", "In Progress", "Done"];
    const updatedTasksOrder = categories.reduce((acc, category) => {
      const tasksInCategory = newTasks.filter(
        (task) => task.category === category
      );
      return [...acc, ...reCalculateOrder(tasksInCategory)];
    }, []);
    try {
      await axe.put("/tasks-reorder", { tasks: updatedTasksOrder });
    } catch (error) {
      console.error("Error updating task order:", error);
      // Optionally revert the state update or notify the user about the failure
    }
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
                tasks={tasks.filter((task) => task.category === col.id)}
              />
            ))}
          </DndContext>
        </div>
      </div>
    </div>
  );
}

export default App;
