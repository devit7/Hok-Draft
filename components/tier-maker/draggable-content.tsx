import useActiveDraggable from "../../store/useActiveDraggable";
import type { DefaultDataDraggable } from "../../types/dragable.type";



const DraggableContent = ({ data, isDragging }: { data: DefaultDataDraggable, isDragging?: boolean }) => {

  const { id, src } = data;
  const { activeDraggable } = useActiveDraggable();
  const isActive = activeDraggable?.id === id;
  console.log({ isActive, isDragging });
  return (
    <img
      src={`/src/assets/wife/${src}`}
      alt=""
      className="max-h-30 aspect-[0.833] object-cover"
      style={{
        opacity: isDragging || isActive ? 0.5 : 1,
        border: isDragging || isActive ? "2px solid blue" : "none",
      }}
    />
  );
};

export default DraggableContent;
