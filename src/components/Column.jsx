import PropTypes from "prop-types";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ column, tasks }) => {
  const {setNodeRef} = useDroppable({ id: column.id });
  return (
    <div className="flex w-full flex-col rounded-lg bg-neutral-800 p-4">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Column;
