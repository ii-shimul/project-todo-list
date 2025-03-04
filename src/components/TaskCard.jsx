import PropTypes from "prop-types";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";
import { Modal, Select } from "antd";
import { useState } from "react";
import { Input } from "antd";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, refetch }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
  });
  const axe = useAxios();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task._id,
    });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDelete = async () => {
    const result = await axe.delete(`/tasks/${task._id}`);
    if (result.data.deletedCount > 0) {
      toast.success("Deleted task.");
      refetch();
    } else {
      toast.error("Something went wrong.");
    }
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    const updatedTask = {
      title: form.title,
      description: form.description,
      category: form.category,
    };
    const result = await axe.put(`/tasks/${task._id}`, updatedTask);
    if (result.data.modifiedCount > 0) {
      toast.success("Updated");
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
      <div
        style={style}
        className="cursor-grab flex rounded-lg bg-neutral-100 p-4 touch-none shadow-sm hover:shadow-md"
      >
        <div ref={setNodeRef} {...listeners} {...attributes} className="grow">
          <h3 className="font-medium text-neutral-700">{task.title}</h3>
          <p className="mt-2 text-sm text-neutral-500">{task.description}</p>
          <p className="text-xs text-neutral-400">
            {new Date(task.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-xl w-fit h-fit">
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
          >
            <MdDeleteOutline className="cursor-pointer p-0.5 text-gray-700 hover:text-gray-400 hover:scale-115" />
          </span>
          <span
            onClick={() => {
              setOpen(true);
            }}
          >
            <FaRegEdit className="cursor-pointer p-0.5 text-gray-700 hover:text-gray-400 hover:scale-115" />
          </span>
        </div>
      </div>
      <Modal
        title="Edit Task"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Update"
      >
        <div className="flex flex-col gap-2">
          <Input
            onChange={(e) => {
              setForm((prev) => ({ ...prev, title: e.target.value }));
            }}
            placeholder="Title"
            variant="filled"
          />
          <Input
            onChange={(e) => {
              setForm((prev) => ({ ...prev, description: e.target.value }));
            }}
            placeholder="Description"
            variant="filled"
          />
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
        </div>
      </Modal>
    </>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
  }).isRequired,
  refetch: PropTypes.func,
};

export default TaskCard;
