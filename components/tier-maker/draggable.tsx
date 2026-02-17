import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import DraggableContent from "./draggable-content";
import type { DefaultDataDraggable } from "../../types/dragable.type";

const Draggable = ({ data }: { data: DefaultDataDraggable }) => {
  const { id, src } = data;
  const { setNodeRef, listeners, attributes, transform, transition } = useSortable({
    id: id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
      : undefined,
    transition,
  };

  return (
    <button
      className=" cursor-pointer"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      {src && <DraggableContent data={data} />}
    </button>
  );
};

export default Draggable;
