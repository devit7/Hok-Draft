"use client";

import useDraftStore from "@/store/useDraftStore";
import TeamDraftPanel from "./TeamDraftPanel";

interface DraftMatchBoardProps {
  matchIndex: number;
}

export default function DraftMatchBoard({ matchIndex }: DraftMatchBoardProps) {
  const { matches, resetMatch } = useDraftStore();
  const match = matches[matchIndex];

  if (!match) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-medium text-xl border-l-4 border-blue-500 pl-3">
          MATCH {matchIndex + 1}
        </h2>
        <button
          onClick={() => resetMatch(matchIndex)}
          className="text-xs px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 rounded-xs transition-colors"
        >
          Reset Match
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <TeamDraftPanel
          team="blue"
          matchIndex={matchIndex}
          bans={match.blue.bans}
          picks={match.blue.picks}
        />
        <TeamDraftPanel
          team="red"
          matchIndex={matchIndex}
          bans={match.red.bans}
          picks={match.red.picks}
        />
      </div>
    </div>
  );
}
