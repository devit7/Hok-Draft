"use client";

import { forwardRef } from "react";
import useDraftStore from "@/store/useDraftStore";

interface Props {
  customTitle: string;
  exportBgColor: string;
}

const ComprehensiveExportBoard = forwardRef<HTMLDivElement, Props>(
  function ComprehensiveExportBoard({ customTitle, exportBgColor }, ref) {
    const { matches, teamAName, teamBName, config } = useDraftStore();

    const isLight = exportBgColor === "#ffffff";
    const bg = isLight ? "bg-white text-slate-800" : "text-white";
    const sidebarBg = isLight
      ? "bg-slate-200 text-slate-600"
      : "bg-slate-800 text-slate-400";
    const border = isLight ? "border-slate-300" : "border-white/10";
    const rowBg = isLight ? "bg-slate-50" : "bg-white/5";
    const emptyBg = isLight ? "bg-slate-100" : "bg-black/30";

    return (
      <div
        ref={ref}
        className={`${bg} p-6 min-w-[900px]`}
        style={{ backgroundColor: exportBgColor }}
      >
        {/* Title */}
        <div className="text-center font-bold text-xl mb-4">
          {customTitle || "Draft Pick Simulation"}
        </div>

        {/* Matches */}
        <div className="flex flex-col gap-0.5">
          {matches.map((match, matchIndex) => {
            const isWin = match.result === "win";
            const isLose = match.result === "lose";
            const leftKey = match.firstPickTeam === "A" ? "blue" : "red";
            const rightKey = match.firstPickTeam === "A" ? "red" : "blue";
            const leftName =
              match.firstPickTeam === "A" ? teamAName : teamBName;
            const rightName =
              match.firstPickTeam === "A" ? teamBName : teamAName;
            const resultBg = isWin
              ? "bg-green-600 text-white"
              : isLose
                ? "bg-red-600 text-white"
                : sidebarBg;
            const resultLabel = isWin
              ? "WIN"
              : isLose
                ? "LOSE"
                : `G${matchIndex + 1}`;

            return (
              <div
                key={match.id}
                className={`border ${border} rounded-sm overflow-hidden`}
              >
                {/* Row 1: Bans */}
                <div className={`flex ${rowBg} border-b ${border}`}>
                  {/* Left sidebar: WIN/LOSE (rowSpan via absolute height) */}
                  <div
                    className={`w-10 shrink-0 flex items-center justify-center border-r ${border} ${resultBg}`}
                    style={{
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    <span className="text-[10px] font-bold tracking-widest">
                      {config.showWinLose ? resultLabel : `G${matchIndex + 1}`}
                    </span>
                  </div>
                  {/* Left bans */}
                  <div className="flex flex-1 items-center gap-1.5 px-2 py-1">
                    <span className="text-[11px] font-bold uppercase w-16 shrink-0">
                      {leftName}
                    </span>
                    {match[leftKey].bans.map((slot, i) => (
                      <div
                        key={i}
                        className={`w-7 h-7 border ${border} rounded-sm overflow-hidden shrink-0 ${emptyBg}`}
                      >
                        {slot.hero && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={slot.hero.heroImage}
                            alt=""
                            className="w-full h-full object-cover grayscale"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Right bans */}
                  <div
                    className={`flex flex-1 flex-row-reverse items-center gap-1.5 px-2 py-1 border-l ${border}`}
                  >
                    <span className="text-[11px] font-bold uppercase w-16 shrink-0 text-right">
                      {rightName}
                    </span>
                    {match[rightKey].bans.map((slot, i) => (
                      <div
                        key={i}
                        className={`w-7 h-7 border ${border} rounded-sm overflow-hidden shrink-0 ${emptyBg}`}
                      >
                        {slot.hero && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={slot.hero.heroImage}
                            alt=""
                            className="w-full h-full object-cover grayscale"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Row 2: Picks */}
                <div className="flex">
                  <div
                    className={`w-10 shrink-0 flex items-center justify-center border-r ${border} ${sidebarBg}`}
                  >
                    <span className="text-xs font-bold">{matchIndex + 1}</span>
                  </div>
                  {/* Left picks */}
                  <div className="flex flex-1 gap-1 p-1">
                    {match[leftKey].picks.map((slot, i) => (
                      <div
                        key={i}
                        className={`w-13 h-[72px] border ${border} rounded-sm overflow-hidden relative shrink-0 ${emptyBg}`}
                      >
                        {slot.hero && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={
                              slot.hero.heroBody
                                ? `/asset/hero/${slot.hero.heroBody}`
                                : slot.hero.heroImage
                            }
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover object-top"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Right picks */}
                  <div
                    className={`flex flex-1 flex-row-reverse gap-1 p-1 border-l ${border}`}
                  >
                    {match[rightKey].picks.map((slot, i) => (
                      <div
                        key={i}
                        className={`w-13 h-[72px] border ${border} rounded-sm overflow-hidden relative shrink-0 ${emptyBg}`}
                      >
                        {slot.hero && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={
                              slot.hero.heroBody
                                ? `/asset/hero/${slot.hero.heroBody}`
                                : slot.hero.heroImage
                            }
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover object-top"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Watermark */}
        <div className="text-center text-[10px] opacity-40 mt-3">
          Made by hok-draft.web.id | Copyright © {new Date().getFullYear()} .
          All rights reserved.
        </div>
      </div>
    );
  },
);

export default ComprehensiveExportBoard;
