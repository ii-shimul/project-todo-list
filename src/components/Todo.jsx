import { useState } from "react";
import { DndContext } from "@dnd-kit/core";
import { useQuery } from "@tanstack/react-query";
import { ClockLoader } from "react-spinners";
import { Button, DatePicker, Input, Modal, Select } from "antd";
import "antd/dist/reset.css";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import Column from "./Column";

const COLUMNS = [
  { id: "To-Do", title: "To Do" },
  { id: "In Progress", title: "In Progress" },
  { id: "Done", title: "Done" },
];

const Todo = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const axe = useAxios();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
  });

  // eslint-disable-next-line no-unused-vars
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["tasksQuery"],
    queryFn: async () => {
      const result = await axe.get(`/tasks/${user.email}`);
      setTasks(result.data);
      return result.data;
    },
  });
  if (isLoading) {
    return (
      <div className="w-screen h-[calc(100vh-68px)] flex justify-center items-center">
        <ClockLoader size={60} />
      </div>
    );
  }

  // function to handle when dragging ends
  const handleDragEnd = async (event) => {
    const { active, over } = event;
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

  // add task function
  const handleOk = async () => {
    setConfirmLoading(true);
    if (form.title.length > 50 || form.description.length > 200) {
      toast.error("Please follow the given length instructions.");
    }
    const newTask = {
      email: user.email,
      title: form.title,
      description: form.description,
      timestamp: new Date().toISOString(),
      category: form.category,
      order: 100000,
      dueDate: form.dueDate,
    };
    const result = await axe.post("/tasks", newTask);
    if (result.data.insertedId) {
      toast.success("Added");
      refetch();
    } else {
      toast.error("Something bad happened!");
    }
    setConfirmLoading(false);
    setOpen(false);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <div className="relative p-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((col) => (
              <Column
                key={col.id}
                column={col}
                refetch={refetch}
                tasks={tasks.filter((task) => task.category === col.id)}
              />
            ))}
          </DndContext>
        </div>
        <div className="absolute right-4 -bottom-10">
          <Button
            onClick={() => {
              setOpen(true);
            }}
            type="primary"
            size="large"
          >
            Add Task
          </Button>
        </div>
      </div>
      <Modal
        title="Add Task"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Add"
      >
        <div className="flex flex-col gap-2">
          <Input
            onChange={(e) => {
              setForm((prev) => ({ ...prev, title: e.target.value }));
            }}
            placeholder="Title (max 50 characters)"
            variant="filled"
          />
          <Input
            onChange={(e) => {
              setForm((prev) => ({ ...prev, description: e.target.value }));
            }}
            placeholder="Description (max 200 characters)"
            variant="filled"
          />
          <span className="flex gap-2">
            <Select
              style={{ width: 120 }}
              allowClear
              options={[
                { value: "To-Do", label: "To-Do" },
                { value: "In Progress", label: "In Progress" },
                { value: "Done", label: "Done" },
              ]}
              placeholder="Category"
              onChange={(e) => {
                setForm((prev) => ({ ...prev, category: e }));
              }}
            />
            <DatePicker
              className="grow"
              placeholder="Select due date"
              onChange={(e) => {
                setForm((prev) => ({
                  ...prev,
                  dueDate: e.$d.toISOString(),
                }));
              }}
            />
          </span>
        </div>
      </Modal>
    </>
  );
};

export default Todo;
