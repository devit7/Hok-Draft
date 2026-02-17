import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TierItemContent from "./TierItemContent";
import type { TierItem as TierItemType } from "../../types/item.type";
import useTierListStore from "../../store/useTierListStore";
import { memo } from "react";

const TierItem = memo(({ item }: { item: TierItemType }) => {
  const {
    setNodeRef,
    listeners,
    attributes,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  });

  const activeItem = useTierListStore((s) => s.activeItem);
  const isActive = activeItem?.id === item.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <button
      className="cursor-pointer"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <TierItemContent item={item} isActive={isActive} />
    </button>
  );
});

TierItem.displayName = "TierItem";

export default TierItem;
