"use client";

import useDraftStore from "@/store/useDraftStore";
import TeamDraftPanel from "./TeamDraftPanel";
import { RefreshCw } from "lucide-react";

interface DraftMatchBoardProps {
  matchIndex: number;
}

export default function DraftMatchBoard({ matchIndex }: DraftMatchBoardProps) {
  const { matches, resetMatch, toggleFirstPick, teamAName, teamBName } =
    useDraftStore();
  const match = matches[matchIndex];

  if (!match) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-medium text-xl border-l-4 border-blue-500 pl-3">
          MATCH {matchIndex + 1}
        </h2>
        <div className="flex items-center gap-2">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <TeamDraftPanel
          team="A"
          teamName={teamAName}
          matchIndex={matchIndex}
          bans={match.blue.bans}
          picks={match.blue.picks}
          isFirstPick={match.firstPickTeam === "A"}
        />
        <TeamDraftPanel
          team="B"
          teamName={teamBName}
          matchIndex={matchIndex}
          bans={match.red.bans}
          picks={match.red.picks}
          isFirstPick={match.firstPickTeam === "B"}
        />
      </div>
    </div>
  );
}
