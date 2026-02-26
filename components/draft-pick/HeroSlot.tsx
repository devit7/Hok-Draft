"use client";

import { Plus } from "lucide-react";
import type { TierItem } from "@/types/item.type";
import useDraftStore, { SlotType, Team } from "@/store/useDraftStore";

interface HeroSlotProps {
  hero: TierItem | null;
  matchIndex: number;
  team: Team;
  type: SlotType;
  index: number;
}

export default function HeroSlot({
  hero,
  matchIndex,
  team,
  type,
  index,
}: HeroSlotProps) {
  const { openHeroSelection, selectHero, config } = useDraftStore();
  const draftStyle = config?.draftStyle || "normal";

  const handleClick = () => {
    openHeroSelection(matchIndex, team, type, index);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    // To clear, we select null. But we need to set the selecting slot first contextually
    // Actually, selectHero uses the *currently selecting* slot.
    // So we need a way to clear specific slot without opening menu,
    // OR we just open menu and have a clear button there.
    // For now, let's just open menu.
    handleClick();
  };

  const isBan = type === "ban";

  // Style based on type and state
  // Ban: Smaller square
  // Pick: Larger portrait card (HeroCardBase style)
  const containerClass = isBan
    ? "w-10 h-10 md:w-14 md:h-14 rounded-xs" // Ban
    : draftStyle === "compact"
      ? "w-12 h-12 md:w-16 md:h-16 rounded-xs" // Compact Pick
      : "w-13 sm:w-20 md:w-28 aspect-4/5 rounded-none"; // Pick (Portrait)

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        onClick={handleClick}
        className={`relative ${containerClass} border ${
          hero ? "border-transparent" : "border-dashed border-gray-600"
        } flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors group bg-d-primary-surface overflow-hidden`}
      >
        {hero ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                !isBan && hero.heroBody && draftStyle !== "compact"
                  ? `/asset/hero/${hero.heroBody}`
                  : hero.heroImage
              }
              alt={hero.heroName}
              className={`absolute inset-0 w-full h-full object-cover ${isBan ? "grayscale" : "transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"}`}
            />

            {/* Gradient overlay for Picks (like HeroCardBase) */}
            {!isBan && draftStyle !== "compact" && (
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/90 via-d-from-black/50 to-transparent pointer-events-none flex items-end justify-center pb-1">
                <span className="text-[9px] md:text-[12px] text-white font-medium truncate px-1 drop-shadow-md">
                  {hero.heroName}
                </span>
              </div>
            )}

            {/* Hover overlay to change */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10">
              <span className="text-xs text-white">Change</span>
            </div>
          </>
        ) : (
          <Plus className="text-gray-500" size={isBan ? 16 : 24} />
        )}
      </div>
      {!isBan && (
        <span className="text-[10px] md:text-[11px] text-gray-400 max-w-[4rem] truncate text-center font-medium mt-0.5">
          {type === "pick" ? `Pick ${index + 1}` : `Ban ${index + 1}`}
        </span>
      )}
    </div>
  );
}
