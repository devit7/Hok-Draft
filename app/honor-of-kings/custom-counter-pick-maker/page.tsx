"use client";

import { useState, useEffect, useRef } from "react";
import { RotateCcw, Download, FileCode } from "lucide-react";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";
import { HERO_ROLE } from "@/static-database/hero";
import {
  PoolFilter,
  HeroRow,
  HeroSelectDrawer,
  type FilterMode,
} from "@/components/counter-pick";
import { domToPng } from "modern-screenshot";

const STORAGE_KEY = "hok-counter-pick-data";
const MAX_COUNTERS = 10;

type CounterData = Record<number, number[]>;

export default function CounterPickMakerPage() {
  // Filter state
  const [filterMode, setFilterMode] = useState<FilterMode>("byRole");
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(1);
  const [chosenHeroIds, setChosenHeroIds] = useState<number[]>([]);

  // Counter data state
  const [counterData, setCounterData] = useState<CounterData>({});
  const [loaded, setLoaded] = useState(false);

  // Single shared drawer state
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeHeroId, setActiveHeroId] = useState<number | null>(null);
  const [drawerSearch, setDrawerSearch] = useState("");
  const [customTitle, setCustomTitle] = useState(
    "Btw You Can Customize This Title :]",
  );

  const exportRef = useRef<HTMLDivElement>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCounterData(JSON.parse(saved));
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(counterData));
  }, [counterData, loaded]);

  // Filter heroes
  const filteredHeroes = HERO_LIST_ENRICHED.filter((hero) => {
    if (filterMode === "byRole") {
      if (selectedRoleId === null) return true;
      return hero.role.some((r) => r.id === selectedRoleId);
    }
    if (filterMode === "byChosenHero") {
      if (chosenHeroIds.length === 0) return true;
      return chosenHeroIds.includes(hero.heroId);
    }
    return true;
  });

  //   // Header text
  //   const headerText =
  //     filterMode === "byChosenHero"
  //       ? "By Chosen Hero"
  //       : selectedRoleId
  //         ? HERO_ROLE.find((r) => r.id === selectedRoleId)?.role || "Hero Pool"
  //         : "All Roles";

  // Open drawer for a specific hero row
  const openDrawerFor = (heroId: number) => {
    setActiveHeroId(heroId);
    setDrawerSearch("");
    setDrawerOpen(true);
  };

  // Add counter hero
  const addCounter = (counterHeroId: number) => {
    if (activeHeroId === null) return;
    setCounterData((prev) => {
      const existing = prev[activeHeroId] || [];
      if (existing.length >= MAX_COUNTERS || existing.includes(counterHeroId))
        return prev;
      return { ...prev, [activeHeroId]: [...existing, counterHeroId] };
    });
  };

  // Remove counter hero
  const removeCounter = (targetHeroId: number, counterHeroId: number) => {
    setCounterData((prev) => {
      const existing = prev[targetHeroId] || [];
      const updated = existing.filter((id) => id !== counterHeroId);
      if (updated.length === 0) {
        const copy = { ...prev };
        delete copy[targetHeroId];
        return copy;
      }
      return { ...prev, [targetHeroId]: updated };
    });
  };

  // Reset all
  const handleReset = () => {
    setCounterData({});
    localStorage.removeItem(STORAGE_KEY);
  };

  // Export to image
  const handleExport = async () => {
    if (!exportRef.current) return;
    try {
      const dataUrl = await domToPng(exportRef.current, {
        backgroundColor: "#0a0a0a",
        scale: 2,
      });
      const link = document.createElement("a");
      link.download = "counter-pick-list.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Export failed:", err);
    }
  };

  // Export data as TS file
  const handleExportData = () => {
    const exportEntries = Object.entries(counterData)
      .filter(([, counters]) => counters.length > 0)
      .map(([heroIdStr, counterIds]) => {
        const heroId = Number(heroIdStr);
        const hero = HERO_LIST_ENRICHED.find((h) => h.heroId === heroId);
        return {
          heroId,
          heroName: hero?.heroName || "Unknown",
          heroImage: hero?.media.heroIcon || "",
          heroRoles: hero?.role || [],
          counters: counterIds.map((cId) => {
            const c = HERO_LIST_ENRICHED.find((h) => h.heroId === cId);
            return {
              heroId: cId,
              heroName: c?.heroName || "Unknown",
              heroImage: c?.media.heroIcon || "",
            };
          }),
        };
      });

    const exportObj = {
      title: customTitle,
      entries: exportEntries,
    };

    const tsContent = `// Auto-generated counter pick data\n// Generated at: ${new Date().toISOString()}\n\nexport const COUNTER_PICK_DATA = ${JSON.stringify(exportObj, null, 2)} as const;\n`;

    const blob = new Blob([tsContent], { type: "text/typescript" });
    const link = document.createElement("a");
    link.download = "counter-pick-data.ts";
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // Toggle chosen hero
  const toggleChosenHero = (heroId: number) => {
    setChosenHeroIds((prev) =>
      prev.includes(heroId)
        ? prev.filter((id) => id !== heroId)
        : [...prev, heroId],
    );
  };

  // Active counters for drawer
  const activeCounters = activeHeroId ? counterData[activeHeroId] || [] : [];

  return (
    <main className="flex flex-col my-20">
      <div className="mb-10">
        <div className="text-2xl font-medium">Custom Counter Pick Maker</div>
        <span className="text-sm">Create your own counter pick list.</span>
      </div>

      {/* Filter + Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
        <PoolFilter
          filterMode={filterMode}
          onFilterModeChange={setFilterMode}
          selectedRoleId={selectedRoleId}
          onRoleSelect={setSelectedRoleId}
          chosenHeroIds={chosenHeroIds}
          onChosenHeroToggle={toggleChosenHero}
          onChosenHeroClear={() => setChosenHeroIds([])}
        />

        {/* Action Buttons */}
        <div className="flex gap-2 flex-wrap w-full md:w-auto">
          <div
            className="flex-1 md:flex-none px-4 py-2 flex items-center justify-center gap-2 text-center bg-green-500/50 rounded-xs text-green-100 cursor-pointer hover:bg-green-500/70 transition-colors duration-200 text-sm font-medium"
            onClick={handleExport}
          >
            <Download size={16} />
            <span className="whitespace-nowrap">Export Image</span>
          </div>
          <div
            className="flex-1 md:flex-none px-4 py-2 flex items-center justify-center gap-2 text-center bg-purple-500/50 rounded-xs text-purple-100 cursor-pointer hover:bg-purple-500/70 transition-colors duration-200 text-sm font-medium"
            onClick={handleExportData}
          >
            <FileCode size={16} />
            <span className="whitespace-nowrap">Export Data</span>
          </div>
          <div
            className="flex-1 md:flex-none px-4 py-2 flex items-center justify-center gap-2 text-center bg-blue-500/50 rounded-xs text-blue-100 cursor-pointer hover:bg-blue-500/70 transition-colors duration-200 text-sm font-medium"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Reset
          </div>
        </div>
      </div>

      <div ref={exportRef}>
        <div>
          <div className="w-full text-xl py-2  border-b mt-10 border-blue-800">
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              className="bg-transparent text-center  border-none outline-none w-full focus:text-white transition-colors"
            />
          </div>
        </div>

        {/* Column Headers - Hidden on mobile, visible on desktop */}
        <div className="flex flex-row gap-1 md:gap-4 font-medium mt-2">
          <div className="flex flex-col w-full max-w-21 md:max-w-38">
            <div className="md:px-6 py-2 text-center bg-[#5053ef] text-sm md:text-base rounded-xs text-blue-100">
              Hero Pool
            </div>
          </div>
          <div className="w-full">
            <div className="md:px-6 py-2 text-center bg-[#ef5350]/70 text-sm md:text-base rounded-xs text-red-100">
              Counter List
            </div>
          </div>
        </div>

        {/* Hero Rows */}
        <div>
          <div className="flex flex-col gap-2 pt-4">
            {filteredHeroes.map((hero) => (
              <HeroRow
                key={hero.heroId}
                hero={hero}
                counters={counterData[hero.heroId] || []}
                maxCounters={MAX_COUNTERS}
                onAddClick={openDrawerFor}
                onRemoveCounter={removeCounter}
              />
            ))}
          </div>
        </div>

        {/* Watermark */}
        <div className="text-center text-xs text-gray-200 pt-4 pb-2">
          Made by hok-draft.web.id | Copyright © {new Date().getFullYear()} .
          All rights reserved.
        </div>
      </div>

      {/* Single Shared Drawer */}
      <HeroSelectDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        activeHeroId={activeHeroId}
        activeCounters={activeCounters}
        maxCounters={MAX_COUNTERS}
        search={drawerSearch}
        onSearchChange={setDrawerSearch}
        onSelect={addCounter}
      />
    </main>
  );
}
