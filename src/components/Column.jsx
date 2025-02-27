import PropTypes from "prop-types";
import TaskCard from "./TaskCard";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";



const Column = ({ column, tasks, refetch }) => {
  const { setNodeRef } = useDroppable({ id: column.id });
  return (
    <div className={`${column.id === "To-Do"? "bg-red-400" : column.id === "In Progress" ? "bg-yellow-400": "bg-green-400"} flex w-full max-md:min-h-32 flex-col rounded-lg p-4`}>
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        <SortableContext
          items={tasks.map((task) => task._id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => {
            return <TaskCard refetch={refetch} key={task._id} task={task} />;
          })}
        </SortableContext>
      </div>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  refetch: PropTypes.func.isRequired,
};

export default Column;
