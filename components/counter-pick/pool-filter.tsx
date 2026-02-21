"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { HERO_ROLE } from "@/static-database/hero";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";

export type FilterMode = "byRole" | "byChosenHero";

const heroMap = new Map(HERO_LIST_ENRICHED.map((h) => [h.heroId, h]));

const filterTabs: { mode: FilterMode; label: string }[] = [
  { mode: "byRole", label: "By Role" },
  { mode: "byChosenHero", label: "By Chosen Hero" },
];

interface PoolFilterProps {
  filterMode: FilterMode;
  onFilterModeChange: (mode: FilterMode) => void;
  selectedRoleId: number | null;
  onRoleSelect: (roleId: number | null) => void;
  chosenHeroIds: number[];
  onChosenHeroToggle: (heroId: number) => void;
  onChosenHeroClear: () => void;
}

export const PoolFilter = ({
  filterMode,
  onFilterModeChange,
  selectedRoleId,
  onRoleSelect,
  chosenHeroIds,
  onChosenHeroToggle,
  onChosenHeroClear,
}: PoolFilterProps) => {
  const [poolRoleFilter, setPoolRoleFilter] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filterTabs.map((tab) => (
          <div
            key={tab.mode}
            className={`px-4 py-2 text-center rounded-xs cursor-pointer transition-colors text-xs md:text-sm font-medium ${
              filterMode === tab.mode
                ? "bg-blue-600 text-white"
                : "bg-blue-500/50 text-blue-100 hover:bg-blue-500/70"
            }`}
            onClick={() => onFilterModeChange(tab.mode)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* By Role: role icons */}
      {filterMode === "byRole" && (
        <div className="overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex border-y border-d-primary-surface w-fit items-center min-w-full md:min-w-0">
            <div
              className={`h-10 border-x px-4 py-2 flex items-center border-d-primary-surface text-sm font-medium cursor-pointer transition-colors whitespace-nowrap ${
                selectedRoleId === null
                  ? "bg-blue-600 text-white"
                  : "hover:bg-d-primary-surface"
              }`}
              onClick={() => onRoleSelect(null)}
            >
              All
            </div>
            {HERO_ROLE.map((role) => (
              <div
                key={role.id}
                className={`px-4 py-2 border-r border-d-primary-surface flex items-center cursor-pointer transition-colors ${
                  selectedRoleId === role.id
                    ? "bg-blue-600"
                    : "hover:bg-d-primary-surface"
                }`}
                onClick={() => onRoleSelect(role.id)}
              >
                <Image
                  src={role.icon}
                  alt={role.role}
                  width={32}
                  height={32}
                  className="h-6 w-6 object-contain min-w-[24px]"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* By Chosen Hero: icon grid + chips */}
      {filterMode === "byChosenHero" && (
        <div className="space-y-3">
          {chosenHeroIds.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-gray-400 mr-1">Selected:</span>
              {chosenHeroIds.map((heroId) => {
                const hero = heroMap.get(heroId);
                if (!hero) return null;
                return (
                  <div
                    key={heroId}
                    className="flex items-center gap-1 bg-blue-600/50 text-blue-100 text-xs px-2 py-1 rounded-xs cursor-pointer hover:bg-red-500/50 transition-colors"
                    onClick={() => onChosenHeroToggle(heroId)}
                  >
                    <Image
                      src={hero.media.heroIcon}
                      alt={hero.heroName}
                      width={20}
                      height={20}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{hero.heroName}</span>
                    <X size={12} />
                  </div>
                );
              })}
              <div
                className="text-xs text-gray-400 cursor-pointer hover:text-red-400 transition-colors px-2 py-1"
                onClick={onChosenHeroClear}
              >
                Clear All
              </div>
            </div>
          )}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setPoolRoleFilter(null)}
              className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                poolRoleFilter === null
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-blue-600/50"
              }`}
            >
              All
            </button>
            {HERO_ROLE.map((role) => (
              <button
                key={role.id}
                onClick={() => setPoolRoleFilter(role.id)}
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap flex items-center gap-1 transition-colors cursor-pointer ${
                  poolRoleFilter === role.id
                    ? "bg-blue-600 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-blue-600/50"
                }`}
              >
                <Image
                  src={role.icon}
                  alt={role.role}
                  width={12}
                  height={12}
                  className="w-3 h-3"
                />
                {role.role === "Class Lane" ? "Clash Lane" : role.role}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {HERO_LIST_ENRICHED.filter(
              (hero) =>
                poolRoleFilter === null ||
                hero.role.some((r) => r.id === poolRoleFilter),
            ).map((hero) => {
              const isSelected = chosenHeroIds.includes(hero.heroId);
              return (
                <div
                  key={hero.heroId}
                  className={`w-10 h-10 relative overflow-hidden cursor-pointer transition-all ${
                    isSelected
                      ? "ring-2 ring-blue-500 opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => onChosenHeroToggle(hero.heroId)}
                  title={hero.heroName}
                >
                  <Image
                    src={hero.media.heroIcon}
                    alt={hero.heroName}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
