import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Draggable from "./draggable";
import type { DefaultDataDraggable } from "../../types/dragable.type";

const Dropzone = ({
  draggablesData,
}: {
  draggablesData: DefaultDataDraggable[];
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: "dropzone",
  });

  const style = {
    backgroundColor: isOver ? "lightgreen" : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full h-64 border-4 border-dashed border-gray-400 flex items-center justify-start"
    >
      <div className="flex flex-wrap gap-2">
        <SortableContext
          items={draggablesData.map((draggable) => draggable.id)}
        >
          {draggablesData.filter((draggable) => draggable.dz).map((draggable, index) => (
            <Draggable key={index} data={draggable} />
          ))}
        </SortableContext>
      </div>
      <div ref={setNodeRef} className="bg-yellow-500 flex-1">

      </div>
    </div>
  );
};

export default Dropzone;
