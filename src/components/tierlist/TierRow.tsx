import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { TierType } from "../../pages/TierListMaker";
import { Hero } from "../../hooks/useHeroes";

interface TierRowProps {
    tier: TierType;
    heroes: Hero[];
    onEdit: (tierId: string, newName: string) => void;
    onChangeColor: (tierId: string, newColor: string) => void;
    onRemove: (tierId: string) => void;
}

export function TierRow({ tier, heroes, onEdit, onChangeColor, onRemove }: TierRowProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState(tier.name);
    const [editColor, setEditColor] = useState(tier.color);
    const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

    const { setNodeRef, isOver } = useDroppable({
        id: tier.id,
    });

    const handleEdit = () => {
        if (isEditing) {
            onEdit(tier.id, editName);
            onChangeColor(tier.id, editColor);
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="flex">
            {/* Tier Label */}
            <div
                className="w-24 min-w-24 flex flex-col justify-center items-center p-2 rounded-l-lg"
                style={{ backgroundColor: tier.color }}
            >
                {isEditing ? (
                    <div className="flex flex-col items-center gap-2">
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-2 py-1 text-black text-center font-bold rounded"
                            maxLength={5}
                        />
                        <div className="relative">
                            <div
                                className="w-6 h-6 border-2 border-white rounded cursor-pointer"
                                style={{ backgroundColor: editColor }}
                                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                            />
                            {isColorPickerOpen && (
                                <div className="absolute left-0 top-8 z-10 bg-[#0D0D28] p-2 rounded shadow-lg">
                                    <input
                                        type="color"
                                        value={editColor}
                                        onChange={(e) => setEditColor(e.target.value)}
                                        className="w-full cursor-pointer"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <span className="text-white text-xl font-bold">{tier.name}</span>
                )}
                <div className="flex mt-2 gap-1">
                    <button
                        onClick={handleEdit}
                        className="bg-[#0D0D28]/50 hover:bg-[#0D0D28] p-1 rounded text-xs text-white"
                    >
                        {isEditing ? "Save" : "Edit"}
                    </button>
                    {/* Only show remove button for non-default tiers (we assume default tiers have single-letter names) */}
                    {tier.name.length > 1 && (
                        <button
                            onClick={() => onRemove(tier.id)}
                            className="bg-red-500/50 hover:bg-red-600 p-1 rounded text-xs text-white"
                        >
                            X
                        </button>
                    )}
                </div>
            </div>

            {/* Heroes Container */}
            <div
                ref={setNodeRef}
                className={`flex-1 p-3 rounded-r-lg min-h-[90px] flex flex-wrap gap-2 items-start ${isOver ? "bg-[#232350]" : "bg-[#191937]"
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
                            isActive={false}
                        />
                    ))}
                </SortableContext>

                {heroes.length === 0 && (
                    <div className="w-full h-full flex items-center justify-center text-[#656891] text-sm">
                        Drop heroes here
                    </div>
                )}
            </div>
        </div>
    );
}
