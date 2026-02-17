"use client";

import { memo } from "react";
import { Check } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";

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
  const drawerHeroes = HERO_LIST_ENRICHED.filter(
    (hero) =>
      search === "" ||
      hero.heroName.toLowerCase().includes(search.toLowerCase()),
  );

  const isFull = activeCounters.length >= maxCounters;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[45vh] sm:h-[60vh] md:h-[70vh] bg-d-primary border-t border-white/10 p-0 flex flex-col">
        <DrawerHeader className="px-4 py-3 sm:px-6 sm:py-4 border-b border-white/5 bg-d-primary-surface/50">
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
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search hero..."
            className="w-full bg-black/20 border border-white/10 rounded-sm py-1.5 px-3 text-xs sm:text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
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
