"use client";

import { memo, useState, useMemo } from "react";
import { Check, Search } from "lucide-react";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";
import { HERO_ROLE } from "@/static-database/hero";

const heroMap = new Map(HERO_LIST_ENRICHED.map((h) => [h.heroId, h]));

// Memoized single hero icon
const HeroIcon = memo(
  ({
    hero,
    isSelected,
    onSelect,
  }: {
    hero: { heroId: number; heroName: string; media: { heroIcon: string } };
    isSelected: boolean;
    onSelect: (heroId: number) => void;
  }) => (
    <div
      className={`cursor-pointer transition-opacity ${
        isSelected
          ? "opacity-40 pointer-events-none"
          : "opacity-75 hover:opacity-100"
      }`}
      onClick={() => onSelect(hero.heroId)}
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-d-primary-surface flex flex-col items-center relative overflow-hidden group border border-transparent hover:border-blue-500/50 transition-all">
        <img
          src={hero.media.heroIcon}
          alt={hero.heroName}
          width={64}
          height={64}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {isSelected && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Check className="text-green-400 w-4 h-4 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>
      <span className="block text-gray-200 font-medium text-[9px] sm:text-[10px] truncate w-12 sm:w-16 text-center mt-1 leading-tight">
        {hero.heroName}
      </span>
    </div>
  ),
);
HeroIcon.displayName = "HeroIcon";

interface HeroSelectDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeHeroId: number | null;
  activeCounters: number[];
  maxCounters: number;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (heroId: number) => void;
}

export const HeroSelectDrawer = ({
  open,
  onOpenChange,
  activeHeroId,
  activeCounters,
  maxCounters,
  search,
  onSearchChange,
  onSelect,
}: HeroSelectDrawerProps) => {
  const [roleFilter, setRoleFilter] = useState<number | null>(null);

  const drawerHeroes = useMemo(() => {
    return HERO_LIST_ENRICHED.filter((hero) => {
      const matchesSearch =
        search === "" ||
        hero.heroName.toLowerCase().includes(search.toLowerCase());
      const matchesRole =
        roleFilter === null || hero.role.some((r) => r.id === roleFilter);
      return matchesSearch && matchesRole;
    });
  }, [search, roleFilter]);

  const isFull = activeCounters.length >= maxCounters;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[55vh] sm:h-[65vh] md:h-[70vh] bg-d-primary border-t border-white/10 p-0 flex flex-col">
        <DrawerHeader className="px-4 py-3 sm:px-6 sm:py-4 border-b border-white/5 bg-d-primary-surface/50">
          {/* Title + Done Button */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <DrawerTitle className="text-gray-200 text-sm sm:text-base">
                Select Counter Hero
                {activeHeroId && (
                  <span className="text-xs sm:text-sm font-normal text-gray-400 ml-2">
                    for {heroMap.get(activeHeroId)?.heroName}
                  </span>
                )}
              </DrawerTitle>
              <DrawerDescription className="text-gray-400 text-[10px] sm:text-xs">
                {isFull
                  ? "Maximum counters reached!"
                  : `Click heroes to add (${activeCounters.length}/${maxCounters})`}
              </DrawerDescription>
            </div>
            <div
              className="px-3 py-1 sm:px-6 sm:py-2 bg-blue-600 text-white rounded-xs cursor-pointer hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium"
              onClick={() => onOpenChange(false)}
            >
              Done
            </div>
          </div>

          {/* Search Input */}
          <div className="relative mb-2">
            <Search
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={14}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search hero..."
              className="w-full bg-black/20 border border-white/10 rounded-sm py-1.5 pl-8 pr-4 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Role Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setRoleFilter(null)}
              className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                roleFilter === null
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-blue-600/50"
              }`}
            >
              All
            </button>
            {HERO_ROLE.map((role) => (
              <button
                key={role.id}
                onClick={() => setRoleFilter(role.id)}
                className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap flex items-center gap-1 transition-colors cursor-pointer ${
                  roleFilter === role.id
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
                {role.role}
              </button>
            ))}
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {drawerHeroes.map((hero) => (
              <HeroIcon
                key={hero.heroId}
                hero={hero}
                isSelected={activeCounters.includes(hero.heroId)}
                onSelect={isFull ? () => {} : onSelect}
              />
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
