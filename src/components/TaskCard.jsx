import { useDraggable } from "@dnd-kit/core";
import PropTypes from "prop-types";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import useAxios from "../hooks/useAxios";
import toast from "react-hot-toast";

const TaskCard = ({ task }) => {
  const axe = useAxios();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const handleDelete = async () => {
    const result = await axe.delete(`/tasks/${task._id}`);
    if (result.data.deletedCount > 0) {
      toast.success("Deleted task.");
    } else {
      toast.error("Something went wrong.");
    }
  };
  return (
    <div
      style={style}
      className="cursor-grab flex rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
    >
      <div ref={setNodeRef} {...listeners} {...attributes} className="grow">
        <h3 className="font-medium text-neutral-100">{task.title}</h3>
        <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
      </div>
      <div className="flex flex-col gap-2 text-xl text-white w-fit h-fit">
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <MdDeleteOutline className="cursor-pointer p-0.5" />
        </span>
        <span>
          <FaRegEdit className="cursor-pointer p-0.5" />
        </span>
      </div>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    _id: PropTypes.number.isRequired,
  }).isRequired,
};

export default TaskCard;
