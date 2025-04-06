import React, { useState, useEffect } from "react";
import { useHeroes, Hero } from "../hooks/useHeroes";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "../components/tierlist/SortableItem";
import { TierRow } from "../components/tierlist/TierRow";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

// Default tier structure
const defaultTiers = [
    { id: "s-tier", name: "S", color: "#FF4655" },
    { id: "a-tier", name: "A", color: "#FF8C00" },
    { id: "b-tier", name: "B", color: "#FFD700" },
    { id: "c-tier", name: "C", color: "#32CD32" },
    { id: "unranked", name: "Unranked", color: "#6C757D" },
];

export type TierType = {
    id: string;
    name: string;
    color: string;
};

const TierListMaker = () => {
    const { heroes, loading } = useHeroes();
    const [tiers, setTiers] = useState<TierType[]>(defaultTiers);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [heroesInTiers, setHeroesInTiers] = useState<Record<string, Hero[]>>({});
    const [unassignedHeroes, setUnassignedHeroes] = useState<Hero[]>([]);
    const [newTierName, setNewTierName] = useState("");
    const [newTierColor, setNewTierColor] = useState("#7950F2");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState<string | null>(null);

    // Setup sensors for drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Initialize heroes when data is loaded
    useEffect(() => {
        if (heroes.length > 0) {
            const tierInitialState: Record<string, Hero[]> = {};
            tiers.forEach((tier) => {
                tierInitialState[tier.id] = [];
            });
            setHeroesInTiers(tierInitialState);
            setUnassignedHeroes(heroes);
        }
    }, [heroes]);

    // Extract unique roles for filters
    const roles = React.useMemo(() => {
        const allRoles = heroes.flatMap(hero => hero.Role.split("/").map(r => r.trim()));
        return [...new Set(allRoles)].sort();
    }, [heroes]);

    // Filter unassigned heroes
    const filteredUnassignedHeroes = React.useMemo(() => {
        return unassignedHeroes.filter(hero => {
            const matchesSearch = hero.Name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = selectedRole ? hero.Role.includes(selectedRole) : true;
            return matchesSearch && matchesRole;
        });
    }, [unassignedHeroes, searchTerm, selectedRole]);

    // Handle drag start
    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    };

    // Handle drag end
    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) {
            setActiveId(null);
            return;
        }

        // Get the source and destination
        const activeId = active.id as string;
        const overId = over.id as string;

        // Find which tier or unassigned the hero is coming from
        let sourceContainer = "unassigned";
        let sourceIndex = unassignedHeroes.findIndex(hero => hero.Name === activeId);
        let activeHero = unassignedHeroes.find(hero => hero.Name === activeId);

        if (sourceIndex === -1) {
            // Check in tiers
            for (const tierId of Object.keys(heroesInTiers)) {
                const tierIndex = heroesInTiers[tierId].findIndex(hero => hero.Name === activeId);
                if (tierIndex !== -1) {
                    sourceContainer = tierId;
                    sourceIndex = tierIndex;
                    activeHero = heroesInTiers[tierId][tierIndex];
                    break;
                }
            }
        }

        if (!activeHero) {
            setActiveId(null);
            return;
        }

        // If destination is a tier
        if (tiers.some(tier => tier.id === overId)) {
            // Move to a tier
            const destinationTier = overId;

            // Remove from source
            if (sourceContainer === "unassigned") {
                setUnassignedHeroes(prev => prev.filter(hero => hero.Name !== activeId));
            } else {
                setHeroesInTiers(prev => ({
                    ...prev,
                    [sourceContainer]: prev[sourceContainer].filter(hero => hero.Name !== activeId)
                }));
            }

            // Add to destination
            setHeroesInTiers(prev => ({
                ...prev,
                [destinationTier]: [...prev[destinationTier], activeHero!]
            }));
        }
        // If destination is "unassigned"
        else if (overId === "unassigned") {
            // Move to unassigned
            if (sourceContainer !== "unassigned") {
                setHeroesInTiers(prev => ({
                    ...prev,
                    [sourceContainer]: prev[sourceContainer].filter(hero => hero.Name !== activeId)
                }));
                setUnassignedHeroes(prev => [...prev, activeHero!]);
            }
        }
        // If destination is another hero (reordering)
        else {
            let destContainer = "unassigned";
            let destIndex = unassignedHeroes.findIndex(hero => hero.Name === overId);

            if (destIndex === -1) {
                // Check in tiers
                for (const tierId of Object.keys(heroesInTiers)) {
                    const tierIndex = heroesInTiers[tierId].findIndex(hero => hero.Name === overId);
                    if (tierIndex !== -1) {
                        destContainer = tierId;
                        destIndex = tierIndex;
                        break;
                    }
                }
            }

            // If source and destination are the same container, reorder
            if (sourceContainer === destContainer) {
                if (sourceContainer === "unassigned") {
                    setUnassignedHeroes(prev => {
                        const result = [...prev];
                        const [removed] = result.splice(sourceIndex, 1);
                        result.splice(destIndex, 0, removed);
                        return result;
                    });
                } else {
                    setHeroesInTiers(prev => ({
                        ...prev,
                        [sourceContainer]: arrayMove(prev[sourceContainer], sourceIndex, destIndex)
                    }));
                }
            }
            // If source and destination are different containers
            else {
                // Remove from source
                if (sourceContainer === "unassigned") {
                    setUnassignedHeroes(prev => prev.filter(hero => hero.Name !== activeId));
                } else {
                    setHeroesInTiers(prev => ({
                        ...prev,
                        [sourceContainer]: prev[sourceContainer].filter(hero => hero.Name !== activeId)
                    }));
                }

                // Add to destination
                if (destContainer === "unassigned") {
                    setUnassignedHeroes(prev => {
                        const result = [...prev];
                        result.splice(destIndex, 0, activeHero!);
                        return result;
                    });
                } else {
                    setHeroesInTiers(prev => {
                        const result = [...prev[destContainer]];
                        result.splice(destIndex, 0, activeHero!);
                        return {
                            ...prev,
                            [destContainer]: result
                        };
                    });
                }
            }
        }

        setActiveId(null);
    };

    // Add a new tier
    const addNewTier = () => {
        if (newTierName.trim() === "") return;

        const newTierId = `tier-${Date.now()}`;
        const newTier = {
            id: newTierId,
            name: newTierName,
            color: newTierColor
        };

        setTiers(prev => [...prev, newTier]);
        setHeroesInTiers(prev => ({
            ...prev,
            [newTierId]: []
        }));

        setNewTierName("");
    };

    // Remove a tier
    const removeTier = (tierId: string) => {
        // Move heroes from this tier to unassigned
        const heroesToMove = heroesInTiers[tierId] || [];
        setUnassignedHeroes(prev => [...prev, ...heroesToMove]);

        // Remove the tier
        setTiers(prev => prev.filter(tier => tier.id !== tierId));
        setHeroesInTiers(prev => {
            const newState = { ...prev };
            delete newState[tierId];
            return newState;
        });
    };

    // Edit tier name
    const editTier = (tierId: string, newName: string) => {
        setTiers(prev =>
            prev.map(tier =>
                tier.id === tierId ? { ...tier, name: newName } : tier
            )
        );
    };

    // Edit tier color
    const editTierColor = (tierId: string, newColor: string) => {
        setTiers(prev =>
            prev.map(tier =>
                tier.id === tierId ? { ...tier, color: newColor } : tier
            )
        );
    };

    // Reset tier list to default
    const resetTierList = () => {
        // Get all heroes from tiers
        const allHeroes = [...unassignedHeroes];
        Object.values(heroesInTiers).forEach(tierHeroes => {
            allHeroes.push(...tierHeroes);
        });

        // Reset tiers to default
        setTiers(defaultTiers);

        // Reset heroes in tiers
        const tierInitialState: Record<string, Hero[]> = {};
        defaultTiers.forEach((tier) => {
            tierInitialState[tier.id] = [];
        });
        setHeroesInTiers(tierInitialState);

        // Move all heroes to unassigned
        setUnassignedHeroes(allHeroes);
    };

    // Save/Export tier list as image
    const exportTierList = () => {
        // Use html2canvas to capture the tier list as an image
        import('html2canvas').then((html2canvas) => {
            // Find the tier list container
            const tierListContainer = document.getElementById('tier-list-container');

            if (tierListContainer) {
                html2canvas.default(tierListContainer, {
                    backgroundColor: '#070720',
                    scale: 2, // Higher quality
                    logging: false,
                }).then(canvas => {
                    // Convert canvas to image data URL
                    const imgData = canvas.toDataURL('image/png');

                    // Create a link to download the image
                    const downloadLink = document.createElement('a');
                    downloadLink.href = imgData;
                    downloadLink.download = 'hok_tier_list.png';
                    downloadLink.click();
                });
            } else {
                console.error("Tier list container not found");
            }
        }).catch(err => {
            console.error("Error generating screenshot:", err);
            alert("Failed to export tier list as image. Please try again.");
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Tier List Maker</h1>
                <p className="text-[#656891] mt-2">
                    Create your own custom tier list for Honor of Kings heroes. Drag and drop heroes into tiers to rank them.
                </p>
            </div>

            {/* Controls */}
            <div className="bg-[#0D0D28] p-4 rounded-lg border border-[#191937] mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Add New Tier */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-white">Add New Tier</h3>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newTierName}
                                onChange={(e) => setNewTierName(e.target.value)}
                                placeholder="Tier Name (e.g. S+)"
                                className="flex-grow bg-[#070720] border border-[#191937] rounded p-2 text-white"
                            />
                            <input
                                type="color"
                                value={newTierColor}
                                onChange={(e) => setNewTierColor(e.target.value)}
                                className="w-10 h-10 rounded cursor-pointer bg-transparent"
                            />
                            <button
                                onClick={addNewTier}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                            >
                                Add
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold text-white">Actions</h3>
                        <div className="flex gap-2">
                            <button
                                onClick={resetTierList}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                            >
                                Reset
                            </button>
                            <button
                                onClick={exportTierList}
                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                            >
                                Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[#656891] text-sm mb-1">Search Heroes</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name..."
                            className="w-full bg-[#070720] border border-[#191937] rounded p-2 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-[#656891] text-sm mb-1">Filter by Role</label>
                        <select
                            value={selectedRole || ""}
                            onChange={(e) => setSelectedRole(e.target.value || null)}
                            className="w-full bg-[#070720] border border-[#191937] rounded p-2 text-white"
                        >
                            <option value="">All Roles</option>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToWindowEdges]}
            >
                {/* Tiers */}
                <div id="tier-list-container" className="mb-8 space-y-4">
                    {tiers.map((tier) => (
                        <TierRow
                            key={tier.id}
                            tier={tier}
                            heroes={heroesInTiers[tier.id] || []}
                            onEdit={editTier}
                            onChangeColor={editTierColor}
                            onRemove={removeTier}
                        />
                    ))}
                </div>

                {/* Unassigned Heroes Section */}
                <div className="bg-[#0D0D28] p-4 rounded-lg border border-[#191937]">
                    <h3 className="text-xl font-bold text-white mb-4">Unassigned Heroes ({filteredUnassignedHeroes.length})</h3>
                    <div
                        id="unassigned"
                        className="min-h-[100px] p-4 bg-[#070720] rounded-lg flex flex-wrap gap-3"
                    >
                        <SortableContext
                            items={filteredUnassignedHeroes.map(hero => hero.Name)}
                            strategy={horizontalListSortingStrategy}
                        >
                            {filteredUnassignedHeroes.map((hero) => (
                                <SortableItem
                                    key={hero.Name}
                                    id={hero.Name}
                                    hero={hero}
                                    isActive={activeId === hero.Name}
                                />
                            ))}
                        </SortableContext>
                    </div>
                </div>
            </DndContext>
        </div>
    );
};

export default TierListMaker;
