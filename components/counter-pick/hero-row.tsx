"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";

const heroMap = new Map(HERO_LIST_ENRICHED.map((h) => [h.heroId, h]));

// Reusable hero card: fluid width, fixed aspect ratio
const HeroCard = ({
  name,
  image,
  children,
}: {
  name: string;
  image: string;
  children?: React.ReactNode;
}) => (
  <div className="flex flex-col items-center w-full">
    <div className="relative w-full aspect-3/4 bg-d-primary-surface overflow-hidden group">
      <Image
        src={`/asset/hero/${image}`}
        alt={name}
        fill
        className="object-cover opacity-75 hover:opacity-100 transition-all duration-300 group-hover:scale-105"
        sizes="(max-width: 640px) 15vw, (max-width: 1024px) 10vw, 8vw"
      />
      {/* Bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-blue-950/80 to-transparent pointer-events-none" />
      {children}
    </div>
    <span className="text-gray-200 font-medium text-[10px] sm:text-xs mt-0.5 truncate w-full text-center leading-tight">
      {name}
    </span>
  </div>
);

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
    <div className="flex flex-row items-stretch gap-0">
      {/* Hero Pool Card — fixed narrow column */}
      <div className="shrink-0 w-[15%] min-w-[52px] max-w-[112px] px-1 py-1 bg-blue-500/10 flex items-center justify-center">
        <HeroCard name={hero.heroName} image={hero.media.heroBody} />
      </div>

      {/* Counter Picks Row — grows, scrollable horizontally */}
      <div className="flex flex-row gap-1 sm:gap-2 items-center flex-1 overflow-x-auto no-scrollbar bg-red-500/10 px-1 sm:pl-10">
        {counters.map((counterId) => {
          const counterHero = heroMap.get(counterId);
          if (!counterHero) return null;
          return (
            <div
              key={counterId}
              className="relative group flex flex-col items-center shrink-0 w-[14%] min-w-[44px] max-w-[96px]"
            >
              <HeroCard
                name={counterHero.heroName}
                image={counterHero.media.heroBody}
              />
              {/* Remove button */}
              <button
                className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 rounded-full items-center justify-center hidden group-hover:flex z-10"
                onClick={() => onRemoveCounter(hero.heroId, counterId)}
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          );
        })}

        {/* Add Hero Button */}
        {counters.length < maxCounters && (
          <div
            className="flex flex-col items-center cursor-pointer shrink-0 w-[14%] min-w-[44px] max-w-[96px]"
            onClick={() => onAddClick(hero.heroId)}
          >
            <div className="w-full aspect-3/4 border border-dashed border-gray-500 rounded-xs flex items-center justify-center hover:bg-gray-500/20 transition-colors duration-200">
              <span className="text-gray-500 text-lg leading-none">+</span>
            </div>
            <span className="text-gray-500 text-[10px] sm:text-xs mt-0.5 text-center leading-tight">
              Add
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
