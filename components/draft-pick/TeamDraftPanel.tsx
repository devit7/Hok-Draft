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
  const draftStyle = useDraftStore((state) => state.config.draftStyle);
  const bgStyle = useDraftStore((state) => state.config.bgStyle || "default");

  const bgColor =
    bgStyle === "white"
      ? isFirstPick
        ? "bg-[#EAF0FC]"
        : "bg-[#FCECF3]"
      : isFirstPick
        ? "bg-blue-900/20"
        : "bg-red-900/20";

  const textColor =
    bgStyle === "white"
      ? isFirstPick
        ? "text-[#1C2C47]"
        : "text-[#2A1C20]"
      : isFirstPick
        ? "text-blue-100"
        : "text-red-100";

  const subtitleColor =
    bgStyle === "white"
      ? isFirstPick
        ? "text-[#5F82B8]"
        : "text-[#BA5A6A]"
      : "text-gray-400";

  return (
    <div
      className={`flex flex-col ${draftStyle === "compact" ? "" : "gap-4"} rounded-xs `}
    >
      {draftStyle !== "compact" && (
        <div
          className={`flex justify-between items-center px-2 py-1 ${bgColor} ${isFirstPick ? "flex-row" : "flex-row-reverse"}`}
        >
          <h3 className={`font-bold uppercase text-lg ${textColor}`}>
            {teamName}
          </h3>
          <div
            className={`text-xs uppercase tracking-widest w-[100px] text-right ${subtitleColor}`}
          >
            {isFirstPick ? "First Pick" : "Second Pick"}
          </div>
        </div>
      )}

      {/* Bans */}
      <div className="flex flex-col gap-2">
        {/* <span
          className={`text-xs font-medium text-gray-400 ${isBlue ? "text-left" : "text-right"}`}
        >
          BANS
        </span> */}
        <div
          className={`flex flex-wrap items-center gap-2 ${
            isFirstPick ? "justify-start" : "flex-row-reverse"
          }`}
        >
          {draftStyle === "compact" && (
            <div
              className={`flex items-center justify-center shrink-0 rounded-xs h-12 md:h-14 md:w-16 px-1 sm:px-1.5 ${
                isFirstPick
                  ? bgStyle === "white"
                    ? "bg-[#6A94D4]/30 text-[#1C2C47]"
                    : "bg-blue-600/30 text-white"
                  : bgStyle === "white"
                    ? "bg-[#D46A80]/30 text-[#2A1C20]"
                    : "bg-red-600/30 text-white"
              }`}
            >
              <span className=" font-semibold uppercase tracking-widest text-[10px] sm:text-xs text-center">
                {teamName}
                <br />
                <span className="text-[9px] opacity-70">
                  {isFirstPick ? "First" : "Second"}
                </span>
              </span>
            </div>
          )}
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
