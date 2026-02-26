"use client";

import useDraftStore, {
  type DraftSlot,
  type Team,
} from "@/store/useDraftStore";
import HeroSlot from "./HeroSlot";

interface TeamDraftPanelProps {
  team: Team;
  teamName: string;
  matchIndex: number;
  bans: DraftSlot[];
  picks: DraftSlot[];
  isFirstPick: boolean;
}

export default function TeamDraftPanel({
  team,
  teamName,
  matchIndex,
  bans,
  picks,
  isFirstPick,
}: TeamDraftPanelProps) {
  const isBlue = team === "A";
  const bgColor = isFirstPick ? "bg-blue-900/20" : "bg-red-900/20";
  const textColor = isFirstPick ? "text-blue-100" : "text-red-100";
  const subtitleColor = "text-gray-400";
  const draftStyle = useDraftStore((state) => state.config.draftStyle);

  return (
    <div
      className={`flex flex-col ${draftStyle === "compact" ? "gap-2" : "gap-4"} rounded-xs `}
    >
      <div
        className={`flex justify-between items-center px-2 py-1 ${bgColor} ${isFirstPick ? "flex-row" : "flex-row-reverse"}`}
      >
        <h3
          className={`font-bold uppercase ${draftStyle === "compact" ? "text-base" : "text-lg"} ${textColor}`}
        >
          {teamName}
        </h3>
        <div className={`text-xs uppercase tracking-widest w-[100px] text-right ${subtitleColor}`}>
          {isFirstPick ? "First Pick" : "Second Pick"}
        </div>
      </div>

      {/* Bans */}
      <div className="flex flex-col gap-2">
        {/* <span
          className={`text-xs font-medium text-gray-400 ${isBlue ? "text-left" : "text-right"}`}
        >
          BANS
        </span> */}
        <div
          className={`flex flex-wrap gap-2 ${
            isFirstPick ? "justify-start" : "flex-row-reverse"
          }`}
        >
          {bans.map((slot, idx) => (
            <HeroSlot
              key={`ban-${idx}`}
              hero={slot.hero}
              matchIndex={matchIndex}
              team={team}
              type="ban"
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Picks */}
      <div className="flex flex-col gap-2 mt-2">
        {/* <span
          className={`text-xs font-medium text-gray-400 ${isBlue ? "text-left" : "text-right"}`}
        >
          PICKS
        </span> */}
        <div
          className={`flex flex-wrap gap-2 ${
            isFirstPick ? "justify-start" : "flex-row-reverse"
          }`}
        >
          {picks.map((slot, idx) => (
            <HeroSlot
              key={`pick-${idx}`}
              hero={slot.hero}
              matchIndex={matchIndex}
              team={team}
              type="pick"
              index={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
