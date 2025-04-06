
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Hero } from "../../hooks/useHeroes";

interface SortableItemProps {
    id: string;
    hero: Hero;
    isActive: boolean;
}

export function SortableItem({ id, hero, isActive }: SortableItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isActive ? 0.8 : 1,
        zIndex: isActive ? 10 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`w-16 h-16 cursor-grab bg-[#191937] rounded overflow-hidden border-2 ${isActive ? "border-yellow-400 shadow-lg" : "border-transparent hover:border-blue-500"
                }`}
        >
            <div className="relative w-full h-full">
                <img
                    src={hero["Image URL"]}
                    alt={hero.Name}
                    className="w-full h-full object-cover"
                />
                <div className={`absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold
          ${hero.Tier === 'S' ? 'bg-red-500' :
                        hero.Tier === 'A' ? 'bg-orange-500' :
                            hero.Tier === 'B' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                    {hero.Tier}
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-black/60 py-0.5">
                    <div className="text-[10px] text-center text-white truncate px-1">
                        {hero.Name}
                    </div>
                </div>
            </div>
        </div>
    );
}
