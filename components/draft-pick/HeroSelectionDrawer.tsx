"use client";

import { useMemo, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import useDraftStore from "@/store/useDraftStore";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";
import { Search, ArrowDownAZ, ArrowDownZA } from "lucide-react";
import Image from "next/image";
import { HERO_ROLE } from "@/static-database/hero/hero-role";
import type { TierItem } from "@/types/item.type";

// Convert static data to TierItem shape for consistency
const ALL_HEROES: TierItem[] = HERO_LIST_ENRICHED.map((h) => ({
  id: crypto.randomUUID(),
  heroId: h.heroId,
  heroName: h.heroName,
  heroImage: h.media.heroIcon,
  heroBody: h.media.heroBody,
  heroExperience: h.heroExperience,
  heroRoles: h.role,
}));

export default function HeroSelectionDrawer() {
  const {
    isHeroPoolOpen,
    closeHeroSelection,
    selectHero,
    selectingSlot,
    matches,
    config,
  } = useDraftStore();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // GBP Logic: Get list of heroes already picked by this team in PREVIOUS matches
  const globalBannedHeroIds = useMemo(() => {
    if (!selectingSlot || config.mode !== "tournament")
      return new Set<number>();

    const { matchIndex, team } = selectingSlot;
    const teamKey = team === "A" ? "blue" : "red";
    const ids = new Set<number>();

    // Iterate through all matches BEFORE the current one
    for (let i = 0; i < matchIndex; i++) {
      const match = matches[i];
      // GBP applies to PICKS only? Usually yes.
      // If a hero was PICKED by the SAME team previously, it cannot be picked again.
      match[teamKey].picks.forEach((slot) => {
        if (slot.hero) ids.add(slot.hero.heroId);
      });
    }
    return ids;
  }, [selectingSlot, matches, config.mode]);

  // Current Match Bans/Picks check (Standard Draft Rules)
  // Hero cannot be picked if already Banned or Picked in THIS match by EITHER team.
  const currentMatchUsedHeroIds = useMemo(() => {
    if (!selectingSlot) return new Set<number>();
    const { matchIndex } = selectingSlot;
    const match = matches[matchIndex];
    const ids = new Set<number>();

    const processSlots = (slots: any[]) => {
      slots.forEach((s) => {
        if (s.hero) ids.add(s.hero.heroId);
      });
    };

    processSlots(match.blue.bans);
    processSlots(match.blue.picks);
    processSlots(match.red.bans);
    processSlots(match.red.picks);

    return ids;
  }, [selectingSlot, matches]);

  const filteredHeroes = useMemo(() => {
    const filtered = ALL_HEROES.filter((hero) => {
      const matchesSearch = hero.heroName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesRole =
        roleFilter === null || hero.heroRoles?.some((r) => r.id === roleFilter);
      return matchesSearch && matchesRole;
    });

    return filtered.sort((a, b) => {
      const cmp = a.heroName.localeCompare(b.heroName);
      return sortOrder === "asc" ? cmp : -cmp;
    });
  }, [search, roleFilter, sortOrder]);

  const handleSelect = (hero: TierItem) => {
    selectHero(hero);
    setSearch(""); // Reset search on select
  };

  return (
    <Sheet
      open={isHeroPoolOpen}
      onOpenChange={(open) => !open && closeHeroSelection()}
    >
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="h-[45vh] bg-d-primary border-t border-white/10 p-0 flex flex-col"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="px-4 py-3 sm:px-6 sm:py-4 border-b border-white/5 bg-d-primary-surface/50">
          <SheetTitle className="text-white flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base">Select Hero</span>
              {selectingSlot && (
                <span className="text-xs sm:text-sm font-normal text-gray-400">
                  for{" "}
                  <span
                    className={`uppercase font-bold ${selectingSlot.team === "A" ? "text-blue-400" : "text-red-400"}`}
                  >
                    {selectingSlot.team}
                  </span>{" "}
                  (Match {selectingSlot.matchIndex + 1})
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                  size={14}
                />
                <input
                  className="w-full bg-black/20 border border-white/10 rounded-sm py-1.5 pl-8 pr-4 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500/50"
                  placeholder="Search hero..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus={false}
                />
              </div>
              <button
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                className="p-1.5 bg-black/20 border border-white/10 rounded-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title={sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
              >
                {sortOrder === "asc" ? (
                  <ArrowDownAZ size={16} />
                ) : (
                  <ArrowDownZA size={16} />
                )}
              </button>
            </div>
          </SheetTitle>

          {/* Role Filters */}
          <div className="flex gap-2 mt-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setRoleFilter(null)}
              className={`px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                roleFilter === null
                  ? "bg-d-primary text-white"
                  : "bg-white/5 text-gray-400 hover:bg-d-primary"
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
                    ? "bg-d-primary text-white"
                    : "bg-white/5 text-gray-400 hover:bg-d-primary"
                }`}
              >
                <Image
                  src={role.icon}
                  alt={role.role}
                  width={12}
                  height={12}
                  className="w-3 h-3 "
                />
                {role.role}
              </button>
            ))}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {filteredHeroes.map((hero) => {
              const isGlobalBanned = globalBannedHeroIds.has(hero.heroId);
              const isUsedInMatch = currentMatchUsedHeroIds.has(hero.heroId);
              const disabled = isGlobalBanned || isUsedInMatch;

              return (
                <div
                  key={hero.id}
                  onClick={() => !disabled && handleSelect(hero)}
                  className={`flex flex-col items-center gap-1 group cursor-pointer ${disabled ? "opacity-40 pointer-events-none" : "opacity-75 hover:opacity-100"}`}
                >
                  <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-d-primary-surface flex flex-col items-center overflow-hidden border border-transparent group-hover:border-blue-400 transition-all">
                    <Image
                      src={hero.heroImage}
                      alt={hero.heroName}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {isGlobalBanned && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[8px] sm:text-[10px] text-center text-red-300 font-bold px-1 uppercase leading-tight">
                        Global Ban
                      </div>
                    )}
                    {isUsedInMatch && !isGlobalBanned && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-[8px] sm:text-[10px] text-center text-gray-300 font-bold uppercase">
                        Picked
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] sm:text-[10px] text-gray-300 group-hover:text-white truncate w-12 sm:w-16 text-center font-medium leading-tight">
                    {hero.heroName}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
