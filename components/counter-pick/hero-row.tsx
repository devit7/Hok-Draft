"use client";

import { X } from "lucide-react";
import { HeroCardBase } from "@/components/hero-list/hero-card-base";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";

const heroMap = new Map(HERO_LIST_ENRICHED.map((h) => [h.heroId, h]));

interface HeroRowProps {
  hero: {
    heroId: number;
    heroName: string;
    media: { heroBody: string };
    role: { id: number; role: string; icon: string }[];
    heroExperience: string;
  };
  counters: number[];
  maxCounters: number;
  onAddClick: (heroId: number) => void;
  onRemoveCounter: (targetHeroId: number, counterHeroId: number) => void;
}

export const HeroRow = ({
  hero,
  counters,
  maxCounters,
  onAddClick,
  onRemoveCounter,
}: HeroRowProps) => {
  return (
    <div className="flex flex-row gap-2 md:gap-4 items-center md:items-start overflow-hidden">
      {/* Hero Pool Card */}
      <div className="shrink-0 w-auto md:w-38">
        <HeroCardBase
          heroName={hero.heroName}
          heroImage={hero.media.heroBody}
          heroRole={hero.role}
          heroExperience={hero.heroExperience}
          className="w-20 md:w-28"
        />
      </div>

      {/* Counter Picks Row */}
      <div className="flex flex-row gap-2 md:gap-3 items-start flex-1 overflow-x-auto  md:px-6  md:pb-0 no-scrollbar">
        {counters.map((counterId) => {
          const counterHero = heroMap.get(counterId);
          if (!counterHero) return null;
          return (
            <div
              key={counterId}
              className="relative group flex flex-col items-center shrink-0"
            >
              <HeroCardBase
                heroName={counterHero.heroName}
                heroImage={counterHero.media.heroBody}
                heroRole={counterHero.role}
                heroExperience={counterHero.heroExperience}
                className="w-20 md:w-28"
              />
              {/* Remove button */}
              <button
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full items-center justify-center hidden group-hover:flex z-10"
                onClick={() => onRemoveCounter(hero.heroId, counterId)}
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          );
        })}

        {/* Add Hero Button */}
        {counters.length < maxCounters && (
          <div
            className="flex flex-col items-center cursor-pointer shrink-0"
            onClick={() => onAddClick(hero.heroId)}
          >
            <div className="w-20 h-[100px] md:w-28 md:h-36 border border-dashed border-gray-500 rounded-xs flex items-center justify-center hover:bg-gray-500/50 transition-colors duration-200">
              <span className="text-gray-500">+</span>
            </div>
            <span className="text-gray-500 text-xs md:text-sm">Add Hero</span>
          </div>
        )}
      </div>
    </div>
  );
};
