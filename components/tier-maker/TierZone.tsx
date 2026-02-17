import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import TierItem from "./TierItem";
import type {
  TierItem as TierItemType,
  TierZone as TierZoneType,
} from "../../types/item.type";
import type { TierColumn } from "./TierColumnModeFilter";
import { X } from "lucide-react";

/** Each column inside a tier row is its own droppable */
const ColumnCell = ({
  zoneId,
  columnId,
  items,
  color,
}: {
  zoneId: string;
  columnId: string;
  items: TierItemType[];
  color: string;
}) => {
  const droppableId = `${zoneId}__col-${columnId}`;
  const { setNodeRef, isOver } = useDroppable({ id: droppableId });

  return (
    <div
      ref={setNodeRef}
      className="flex flex-wrap items-start content-start gap-2 p-1.5 min-h-16 transition-colors"
      style={{
        backgroundColor: isOver ? color + "44" : color + "11",
      }}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={rectSortingStrategy}
      >
        {items.map((item) => (
          <TierItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </div>
  );
};

interface TierZoneProps {
  zone: TierZoneType;
  items: TierItemType[];
  columns: TierColumn[];
  variant?: "default" | "pool";
  onRenameZone?: (id: string, label: string) => void;
  onDeleteZone?: (id: string) => void;
}

const TierZone = ({
  zone,
  items,
  columns,
  variant = "default",
  onRenameZone,
  onDeleteZone,
}: TierZoneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: zone.id,
  });

  const style = {
    backgroundColor: isOver ? zone.color + "33" : zone.color + "11",
  };

  if (variant === "pool") {
    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          backgroundColor: isOver ? zone.color + "22" : "transparent",
        }}
        className="min-h-32 border-2 border-dashed rounded-xs p-2 flex flex-wrap gap-2 transition-colors"
      >
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={rectSortingStrategy}
        >
          {items.length === 0 ? (
            <div className="w-full h-24 flex items-center justify-center text-gray-400 text-sm pointer-events-none">
              Drag items back here to remove from tiers
            </div>
          ) : (
            items.map((item) => <TierItem key={item.id} item={item} />)
          )}
        </SortableContext>
      </div>
    );
  }

  // Group items by their assigned columnId
  const getItemsByColumn = (columnId: string) => {
    return items.filter((item) => item.columnId === columnId);
  };

  const colCount = columns.length;

  return (
    <div className="flex gap-0 items-stretch group/tier">
      {/* Tier Label — editable */}
      <div
        className="min-w-15 min-h-18 shrink-0 flex items-center justify-center font-bold text-xl text-d-primary relative group/label"
        style={{
          backgroundColor: zone.color,
        }}
      >
        {/* Delete tier button (Left side, vertical text) */}
        {onDeleteZone && (
          <div
            onClick={() => onDeleteZone(zone.id)}
            className="absolute left-0 top-0 bottom-0 w-6 bg-black/20 hover:bg-black/40 items-center justify-center cursor-pointer opacity-0 group-hover/tier:opacity-100 transition-opacity z-10 hidden group-hover/label:flex"
            title="Remove Tier"
          >
            <span className="text-[10px] font-bold text-white -rotate-90 whitespace-nowrap tracking-wider">
              REMOVE
            </span>
          </div>
        )}

        {onRenameZone ? (
          <input
            type="text"
            value={zone.label}
            onChange={(e) => onRenameZone(zone.id, e.target.value)}
            className="bg-transparent text-center font-bold text-xl text-d-primary w-full h-full outline-none border-none -ml-6 -mr-6 group-hover/label:pl-6"
            style={{ maxWidth: "80px" }}
          />
        ) : (
          <span className="group-hover/label:pl-6">{zone.label}</span>
        )}
      </div>

      {/* Dynamic Columns */}
      <div
        className="flex-1 grid  min-h-22 transition-colors"
        style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
      >
        {columns.map((col) => (
          <ColumnCell
            key={col.id}
            zoneId={zone.id}
            columnId={col.id}
            items={getItemsByColumn(col.id)}
            color={zone.color}
          />
        ))}
      </div>
    </div>
  );
};

export default TierZone;
