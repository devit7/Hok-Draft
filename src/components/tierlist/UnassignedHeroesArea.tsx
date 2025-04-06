
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { Hero } from "../../hooks/useHeroes";

interface UnassignedHeroesAreaProps {
    heroes: Hero[];
    activeId: string | null;
}

export function UnassignedHeroesArea({ heroes, activeId }: UnassignedHeroesAreaProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: "unassigned",
    });

    return (
        <div
            ref={setNodeRef}
            className={`min-h-[100px] flex flex-wrap gap-3 p-2 rounded ${isOver ? "bg-[#191937]/50" : ""
                }`}
        >
            <SortableContext
                items={heroes.map(hero => hero.Name)}
                strategy={horizontalListSortingStrategy}
            >
                {heroes.map((hero) => (
                    <SortableItem
                        key={hero.Name}
                        id={hero.Name}
                        hero={hero}
                        isActive={activeId === hero.Name}
                    />
                ))}
            </SortableContext>

            {heroes.length === 0 && (
                <div className="w-full h-20 flex items-center justify-center text-[#656891]">
                    No heroes match your filters
                </div>
            )}
        </div>
    );
}
