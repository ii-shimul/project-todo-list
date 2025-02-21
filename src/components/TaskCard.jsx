import { useDraggable } from "@dnd-kit/core";
import PropTypes from "prop-types";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;
  return (
    <div
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
      <p className="mt-2 text-sm text-neutral-400">{task.description}</p>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default TaskCard;
