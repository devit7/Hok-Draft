"use client";

import { useState, useRef } from "react";
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  useSensors,
  useSensor,
  PointerSensor,
  TouchSensor,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import TierZone from "@/components/tier-maker/TierZone";
import TierRoleHeader from "@/components/tier-maker/TierRoleHeader";
import TierColumnModeFilter, {
  buildColumns,
  type ColumnMode,
  type TierColumn,
} from "@/components/tier-maker/TierColumnModeFilter";
import { arrayMove } from "@dnd-kit/sortable";
import TierItemContent from "@/components/tier-maker/TierItemContent";
import useTierListStore from "@/store/useTierListStore";
import type {
  TierItem as TierItemType,
  TierZone as TierZoneType,
} from "@/types/item.type";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";
import { domToPng } from "modern-screenshot";
import { RotateCcw, Download, Plus, Search, FileCode } from "lucide-react";

// Default tier zones
const DEFAULT_TIER_ZONES: TierZoneType[] = [
  { id: "tier-s", label: "T0", color: "#ef5350" },
  { id: "tier-a", label: "T1", color: "#ec6563" },
  { id: "tier-b", label: "T2", color: "#ffbe7c" },
  { id: "tier-c", label: "T3", color: "#bfff7f" },
  { id: "tier-d", label: "T4", color: "#76f8f8" },
];

const TIER_COLORS = [
  "#ef5350",
  "#ec6563",
  "#ffbe7c",
  "#bfff7f",
  "#76f8f8",
  "#c084fc",
  "#f472b6",
  "#fb923c",
  "#a3e635",
  "#38bdf8",
];

const POOL_ID = "item-pool";

// Generate items from real hero data
const initialItems: TierItemType[] = HERO_LIST_ENRICHED.map((hero) => ({
  id: crypto.randomUUID(),
  heroId: hero.heroId,
  heroName: hero.heroName,
  heroImage: hero.media.heroIcon,
  heroExperience: hero.heroExperience,
  heroRoles: hero.role,
  tierId: undefined,
  columnId: undefined,
}));

function Page() {
  // Items state
  const [items, setItems] = useState<TierItemType[]>(initialItems);
  const { activeItem, setActiveItem } = useTierListStore();

  // Tier zones state (mutable)
  const [tierZones, setTierZones] =
    useState<TierZoneType[]>(DEFAULT_TIER_ZONES);

  // Custom title
  const [customTitle, setCustomTitle] = useState("Custom Tier List");

  // Column mode
  const [columnMode, setColumnMode] = useState<ColumnMode>("all-roles");
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(1);
  const [customColumns, setCustomColumns] = useState<TierColumn[]>([
    { id: "custom-0", label: "Column 1" },
    { id: "custom-1", label: "Column 2" },
    { id: "custom-2", label: "Column 3" },
  ]);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Export loading state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  // Sensors for smooth drag activation
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
  );

  // Export ref
  const exportRef = useRef<HTMLDivElement>(null);

  // Current columns
  const columns = buildColumns(columnMode, selectedRoleId, customColumns);

  // --- Column mode handlers ---
  const handleModeChange = (mode: ColumnMode) => {
    setColumnMode(mode);
    // Clear column assignments when mode changes
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        columnId: item.tierId ? columns[0]?.id : undefined,
      })),
    );
  };

  const handleAddCustomColumn = () => {
    const nextId = `custom-${Date.now()}`;
    setCustomColumns((prev) => [
      ...prev,
      { id: nextId, label: `Column ${prev.length + 1}` },
    ]);
  };

  const handleRenameCustomColumn = (id: string, label: string) => {
    setCustomColumns((prev) =>
      prev.map((col) => (col.id === id ? { ...col, label } : col)),
    );
  };

  const handleDeleteCustomColumn = (id: string) => {
    setCustomColumns((prev) => prev.filter((col) => col.id !== id));
    // Move items from deleted column to first remaining column
    setItems((prev) =>
      prev.map((item) =>
        item.columnId === id
          ? { ...item, columnId: customColumns[0]?.id }
          : item,
      ),
    );
  };

  // --- Tier management ---
  const handleRenameTier = (id: string, label: string) => {
    setTierZones((prev) =>
      prev.map((z) => (z.id === id ? { ...z, label } : z)),
    );
  };

  const handleDeleteTier = (id: string) => {
    setTierZones((prev) => prev.filter((z) => z.id !== id));
    // Move items from deleted tier back to pool
    setItems((prev) =>
      prev.map((item) =>
        item.tierId === id
          ? { ...item, tierId: undefined, columnId: undefined }
          : item,
      ),
    );
  };

  const handleAddTier = () => {
    const nextIndex = tierZones.length;
    const color = TIER_COLORS[nextIndex % TIER_COLORS.length];
    setTierZones((prev) => [
      ...prev,
      { id: `tier-${Date.now()}`, label: `T${nextIndex}`, color },
    ]);
  };

  // --- Drag & Drop ---
  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as string;
    const item = items.find((item) => item.id === activeId);
    if (!item) return;

    setActiveItem(item);

    // If dragging from pool, create a clone immediately so the pool doesn't empty
    if (item.tierId === undefined) {
      setItems((prev) => [
        ...prev,
        {
          ...item,
          id: crypto.randomUUID(),
          tierId: undefined,
          columnId: undefined,
        },
      ]);
    }
  };

  // Parse compound droppable ID: "tier-s__col-role-1" or "tier-s__col-custom-0"
  const parseDropId = (overId: string) => {
    if (overId.includes("__col-")) {
      const [tierId, colPart] = overId.split("__col-");
      return { tierId, columnId: colPart };
    }
    if (overId === POOL_ID) {
      return { tierId: undefined, columnId: undefined };
    }
    if (tierZones.some((zone) => zone.id === overId)) {
      return { tierId: overId, columnId: columns[0]?.id };
    }
    return null;
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeItemData = items.find((item) => item.id === activeId);
    if (!activeItemData) return;

    const parsed = parseDropId(overId);

    if (parsed) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === activeId
            ? { ...item, tierId: parsed.tierId, columnId: parsed.columnId }
            : item,
        ),
      );
    } else {
      const overItemData = items.find((item) => item.id === overId);
      if (!overItemData) return;

      const activeIndex = items.findIndex((item) => item.id === activeId);
      const overIndex = items.findIndex((item) => item.id === overId);
      if (activeIndex === overIndex) return;

      setItems((prev) => {
        const newItems = arrayMove(prev, activeIndex, overIndex);
        newItems[overIndex] = {
          ...newItems[overIndex],
          tierId: overItemData.tierId,
          columnId: overItemData.columnId,
        };
        return newItems;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id as string;

    setActiveItem(undefined);

    // If dropped outside or back into pool, remove the item
    // (If it was from pool, we already cloned it at start, so we remove the dragged instance)
    const overItem = items.find((item) => item.id === over?.id);
    const isOverPoolItem = overItem && overItem.tierId === undefined;

    setItems((prev) => {
      let nextItems = prev;

      // If dropped outside or back into pool, remove the item
      if (!over || over.id === POOL_ID || isOverPoolItem) {
        nextItems = nextItems.filter((item) => item.id !== activeId);
      }

      // Deduplicate pool items: Ensure only one copy of each heroId exists in the pool
      const seenHeroIds = new Set<unknown>();
      return nextItems.filter((item) => {
        // Always keep items in tiers
        if (item.tierId !== undefined) return true;

        // For pool items, only keep the first occurrence of each heroId
        if (seenHeroIds.has(item.heroId)) {
          return false;
        }
        seenHeroIds.add(item.heroId);
        return true;
      });
    });
  };

  const handleDragCancel = () => {
    setActiveItem(undefined);
    setItems((prev) => {
      // Deduplicate pool items to clean up any clones created during drag start
      const seenHeroIds = new Set<unknown>();
      return prev.filter((item) => {
        if (item.tierId !== undefined) return true;
        if (seenHeroIds.has(item.heroId)) {
          return false;
        }
        seenHeroIds.add(item.heroId);
        return true;
      });
    });
  };

  // --- Export ---
  const handleExport = async () => {
    if (!exportRef.current || isExporting) return;

    setIsExporting(true);
    setExportProgress(0);

    try {
      // Simulate progress tracking
      let nodeCount = 0;
      const totalNodes = exportRef.current.querySelectorAll("*").length;

      const dataUrl = await domToPng(exportRef.current, {
        backgroundColor: "#0a0a0a",
        scale: 2,
        onCloneNode: (clonedNode) => {
          nodeCount++;
          const progress = Math.min(
            Math.round((nodeCount / totalNodes) * 90),
            90,
          );
          setExportProgress(progress);
        },
      });

      // Final processing
      setExportProgress(95);

      const link = document.createElement("a");
      link.download = "tier-list.png";
      link.href = dataUrl;
      link.click();

      setExportProgress(100);

      // Reset after a short delay
      setTimeout(() => {
        setIsExporting(false);
        setExportProgress(0);
      }, 1000);
    } catch (err) {
      console.error("Export failed:", err);
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  // --- Export Data (TS file) ---
  const handleExportData = () => {
    const tierData = tierZones.map((zone) => {
      const tierItems = items
        .filter((item) => item.tierId === zone.id)
        .map((item) => ({
          heroId: item.heroId,
          heroName: item.heroName,
          heroImage: item.heroImage,
          heroExperience: item.heroExperience,
          heroRoles: item.heroRoles,
          columnId: item.columnId,
        }));
      return {
        label: zone.label,
        color: zone.color,
        heroes: tierItems,
      };
    });

    const exportObj = {
      title: customTitle,
      columnMode,
      tiers: tierData,
    };

    const tsContent = `// Auto-generated tier list data\n// Generated at: ${new Date().toISOString()}\n\nexport const TIER_LIST_DATA = ${JSON.stringify(exportObj, null, 2)} as const;\n`;

    const blob = new Blob([tsContent], { type: "text/typescript" });
    const link = document.createElement("a");
    link.download = "tier-list-data.ts";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // --- Reset ---
  const handleReset = () => {
    setItems(
      initialItems.map((item) => ({
        ...item,
        tierId: undefined,
        columnId: undefined,
      })),
    );
    setTierZones(DEFAULT_TIER_ZONES);
    setCustomTitle("Custom Tier List");
  };

  // Get items by tier
  const getItemsByTier = (tierId: string | undefined) => {
    return items.filter((item) => item.tierId === tierId);
  };

  const poolItems = getItemsByTier(undefined)
    .filter((item) =>
      item.heroName.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      if (a.heroId < b.heroId) return -1;
      if (a.heroId > b.heroId) return 1;
      return 0;
    });

  return (
    <>
      <div className="mx-auto p-0 md:p-8">
        <div className="mb-6">
          <div className="text-2xl font-medium">Custom Tier List</div>
          <span className="text-sm">
            Create your own tier list. ( ui not mobile friendly)
          </span>
        </div>

        {/* Filter + Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <TierColumnModeFilter
            mode={columnMode}
            onModeChange={handleModeChange}
            selectedRoleId={selectedRoleId}
            onRoleSelect={setSelectedRoleId}
            customColumns={customColumns}
            onAddCustomColumn={handleAddCustomColumn}
            onRenameCustomColumn={handleRenameCustomColumn}
            onDeleteCustomColumn={handleDeleteCustomColumn}
          />

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 shrink-0">
            <div className="flex gap-2 flex-wrap">
              <div
                className={`px-4 py-2 flex items-center gap-2 text-center rounded-xs text-sm font-medium transition-colors duration-200 ${
                  isExporting
                    ? "bg-green-500/30 text-green-300 cursor-wait"
                    : "bg-green-500/50 text-green-100 cursor-pointer hover:bg-green-500/70"
                }`}
                onClick={handleExport}
              >
                <Download size={16} />
                {isExporting ? `Exporting ${exportProgress}%` : "Export Image"}
              </div>
              <div
                className="px-4 py-2 flex items-center gap-2 text-center bg-purple-500/50 rounded-xs text-purple-100 cursor-pointer hover:bg-purple-500/70 transition-colors duration-200 text-sm font-medium"
                onClick={handleExportData}
              >
                <FileCode size={16} />
                Export Data
              </div>
              <div
                className="px-4 py-2 flex items-center gap-2 text-center bg-blue-500/50 rounded-xs text-blue-100 cursor-pointer hover:bg-blue-500/70 transition-colors duration-200 text-sm font-medium"
                onClick={handleReset}
              >
                <RotateCcw size={16} />
                Reset
              </div>
            </div>

            {/* Progress Bar */}
            {isExporting && (
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300 ease-out"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
            )}
          </div>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {/* Export area */}
          <div ref={exportRef}>
            {/* Custom title */}
            <div className="w-full mb-4 text-base lg:text-xl py-2 border-b border-blue-800">
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="bg-transparent text-center border-none outline-none w-full focus:text-white transition-colors"
              />
            </div>

            {/* Scrollable Container for Tier List */}
            <div className="overflow-x-auto pb-4">
              <div className="min-w-[800px]">
                {/* Role Column Header */}
                <TierRoleHeader columns={columns} />

                {/* Tier Zones */}
                <div className="space-y-0 mb-2 md:mb-4">
                  {tierZones.map((zone) => (
                    <TierZone
                      key={zone.id}
                      zone={zone}
                      items={getItemsByTier(zone.id)}
                      columns={columns}
                      onRenameZone={handleRenameTier}
                      onDeleteZone={handleDeleteTier}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Watermark */}
            <div className="text-center text-xs text-gray-200 pt-4 pb-2">
              Made by hok-draft.web.id | Copyright © {new Date().getFullYear()}{" "}
              . All rights reserved.
            </div>
          </div>

          {/* Add Tier Button */}
          <button
            onClick={handleAddTier}
            className="w-full py-2 mb-4 flex items-center justify-center gap-2 text-sm text-gray-400 bg-d-primary-surface hover:bg-d-primary-surface/80 transition-colors cursor-pointer rounded-xs"
          >
            <Plus size={16} />
            Add Tier
          </button>

          {/* Item Pool */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Hero Pool</h2>
              <div className="relative">
                <Search
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search hero..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-4 py-1.5 bg-d-primary-surface text-sm rounded-xs border border-transparent focus:border-blue-500/50 outline-none transition-colors w-48 text-gray-200 placeholder:text-gray-500"
                />
              </div>
            </div>
            <TierZone
              zone={{ id: POOL_ID, label: "POOL", color: "#6366f1" }}
              items={poolItems}
              columns={columns}
              variant="pool"
            />
          </div>

          {/* Drag Overlay */}
          <DragOverlay>
            {activeItem && (
              <TierItemContent item={activeItem} isDragging={true} />
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

export default Page;
