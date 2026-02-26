"use client";

import { useState } from "react";
import useDraftStore from "@/store/useDraftStore";
import TeamDraftPanel from "./TeamDraftPanel";
import { RefreshCw, Edit2, Check, X } from "lucide-react";

interface DraftMatchBoardProps {
  matchIndex: number;
  isExporting?: boolean;
}

export default function DraftMatchBoard({
  matchIndex,
  isExporting,
}: DraftMatchBoardProps) {
  const {
    matches,
    resetMatch,
    toggleFirstPick,
    teamAName,
    teamBName,
    updateMatchName,
    config,
    updateMatchResult,
  } = useDraftStore();
  const match = matches[matchIndex];

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState("");

  if (!match) return null;

  const handleEdit = () => {
    setTempName(match.name || `MATCH ${matchIndex + 1}`);
    setIsEditing(true);
  };

  const handleSave = () => {
    updateMatchName(matchIndex, tempName);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleWinLoseClick = () => {
    if (match.result === "win") updateMatchResult(matchIndex, "lose");
    else if (match.result === "lose") updateMatchResult(matchIndex, null);
    else updateMatchResult(matchIndex, "win");
  };

  // Standard (Default) View
  return (
    <div
      className={`flex flex-col ${config?.draftStyle === "compact" ? "gap-2" : "gap-4"} p-2 relative`}
    >
      {/* Header */}
      <div
        className={`flex items-center ${config?.draftStyle === "compact" ? "justify-between gap-12 mt-1" : "justify-between mb-2"}`}
      >
        {isEditing ? (
          <div className="flex items-center gap-2 border-l-4 border-blue-500 pl-3">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="px-2 py-1 bg-slate-800/50 border border-blue-500/30 rounded-xs text-white text-sm focus:outline-none focus:border-blue-400"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
            />
            <button
              onClick={handleSave}
              className="text-green-400 hover:bg-green-500/20 p-1 rounded-sm"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="text-red-400 hover:bg-red-500/20 p-1 rounded-sm"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div
            className={`flex items-center gap-2 group border-l-4 border-blue-500 pl-3`}
          >
            <h2
              className={`font-medium uppercase ${config?.draftStyle === "compact" ? "text-[14px] sm:text-base tracking-widest text-[#D0D0E6] shrink-0" : "text-xl"}`}
            >
              {match.name || `MATCH ${matchIndex + 1}`}
            </h2>
            <button
              onClick={handleEdit}
              className={`text-gray-400 hover:text-white transition-opacity ${config?.draftStyle === "compact" ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              title="Edit match name"
            >
              <Edit2 size={16} />
            </button>
          </div>
        )}
        {!isExporting && (
          <div
            className={`flex items-center gap-2 ${config?.draftStyle === "compact" ? "shrink-0" : ""}`}
          >
            <button
              onClick={() => toggleFirstPick(matchIndex)}
              className="text-xs px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 rounded-xs transition-colors flex items-center gap-1.5"
              title="Toggle first pick"
            >
              <RefreshCw size={12} />
              Toggle First Pick
            </button>
            <button
              onClick={() => resetMatch(matchIndex)}
              className="text-xs px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 rounded-xs transition-colors"
            >
              Reset Match
            </button>
          </div>
        )}
      </div>

      <div
        className={`flex ${config?.draftStyle === "compact" ? "justify-center gap-2 lg:gap-4 lg:px-4" : "gap-2"}`}
      >
        {/* Win/Lose Sidebar */}
        {config.showWinLose && (
          <div
            onClick={handleWinLoseClick}
            className={`w-6 sm:w-8 shrink-0 flex items-center justify-center rounded-xs cursor-pointer border hover:opacity-80 transition-opacity overflow-hidden ${
              match.result === "win"
                ? "bg-green-600/20 border-green-500/20 text-green-200"
                : match.result === "lose"
                  ? "bg-red-600/20 border-red-500/20 text-red-200"
                  : "bg-slate-800/50 border-white/10 text-gray-500"
            }`}
          >
            <span className="text-xs font-medium tracking-[0.2em] -rotate-90 whitespace-nowrap select-none">
              {match.result === "win"
                ? "WIN"
                : match.result === "lose"
                  ? "LOSE"
                  : "SET RESULT"}
            </span>
          </div>
        )}

        <div
          className={`${config?.draftStyle === "compact" ? "flex flex-col lg:flex-row justify-center gap-2 lg:gap-6" : "flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8"}`}
        >
          {match.firstPickTeam === "A" ? (
            <>
              <TeamDraftPanel
                team="A"
                teamName={teamAName}
                matchIndex={matchIndex}
                bans={match.blue.bans}
                picks={match.blue.picks}
                isFirstPick={true}
              />
              <TeamDraftPanel
                team="B"
                teamName={teamBName}
                matchIndex={matchIndex}
                bans={match.red.bans}
                picks={match.red.picks}
                isFirstPick={false}
              />
            </>
          ) : (
            <>
              <TeamDraftPanel
                team="B"
                teamName={teamBName}
                matchIndex={matchIndex}
                bans={match.red.bans}
                picks={match.red.picks}
                isFirstPick={true}
              />
              <TeamDraftPanel
                team="A"
                teamName={teamAName}
                matchIndex={matchIndex}
                bans={match.blue.bans}
                picks={match.blue.picks}
                isFirstPick={false}
              />
            </>
          )}
        </div>

        {/* Right Win/Lose Sidebar */}
        {config.showWinLose && (
          <div
            onClick={() => {
              if (match.result === "lose") updateMatchResult(matchIndex, "win");
              else if (match.result === "win")
                updateMatchResult(matchIndex, null);
              else updateMatchResult(matchIndex, "lose");
            }}
            className={`w-6 sm:w-8 shrink-0 flex items-center justify-center rounded-xs cursor-pointer border hover:opacity-80 transition-opacity overflow-hidden ${
              match.result === "lose"
                ? "bg-green-600/20 border-green-500/20 text-green-400"
                : match.result === "win"
                  ? "bg-red-600/20 border-red-500/20 text-red-400"
                  : "bg-slate-800/50 border-white/10 text-gray-500"
            }`}
          >
            <span className="text-xs font-medium tracking-[0.2em] -rotate-90 whitespace-nowrap select-none">
              {match.result === "lose"
                ? "WIN"
                : match.result === "win"
                  ? "LOSE"
                  : "SET RESULT"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
