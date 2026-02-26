"use client";

import useDraftStore from "@/store/useDraftStore";
import Select from "react-select";

const draftModeOptions = [
  { value: "ranked", label: "Tournament (NGBP)" },
  { value: "tournament", label: "Tournament (GBP)" },
];

const bestOfOptions = [
  { value: 1, label: "Best of 1" },
  { value: 3, label: "Best of 3" },
  { value: 5, label: "Best of 5" },
  { value: 7, label: "Best of 7" },
];

const banCountOptions = [
  { value: 3, label: "3 Bans" },
  { value: 4, label: "4 Bans" },
  { value: 5, label: "5 Bans" },
  { value: 6, label: "6 Bans" },
];

const showWinLoseOptions = [
  { value: true, label: "Enabled" },
  { value: false, label: "Disabled" },
];

const draftStyleOptions = [
  { value: "normal", label: "Normal" },
  { value: "compact", label: "Compact" },
];

const bgStyleOptions = [
  { value: "default", label: "Default" },
  { value: "white", label: "White" },
];

const selectStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "rgba(30, 41, 59, 0.5)",
    borderColor: "rgba(255,255,255,0.1)",
  }),
  menu: (base: any) => ({ ...base, backgroundColor: "#1e293b" }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "rgba(59, 130, 246, 0.2)"
      : "transparent",
    color: "white",
  }),
  singleValue: (base: any) => ({ ...base, color: "white" }),
};

export default function DraftConfigPanel() {
  const {
    config,
    updateConfig,
    resetDraft,
    teamAName,
    teamBName,
    updateTeamName,
  } = useDraftStore();

  return (
    <div className="mb-4 rounded-xs border border-white/10">
      <div className="bg-d-primary-surface text-white px-4 py-2 font-medium flex justify-between items-center">
        <h1>Config Panel</h1>
        <button
          onClick={resetDraft}
          className="text-xs bg-red-500/20 hover:bg-red-500/40 text-red-200 px-3 py-1 rounded-xs transition-colors border border-red-500/20"
        >
          Reset All Draft
        </button>
      </div>

      {/* General Config */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-4 py-4 bg-d-primary-surface/70">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Draft Mode</label>
          <Select
            instanceId="mode"
            options={draftModeOptions}
            value={draftModeOptions.find((o) => o.value === config.mode)}
            onChange={(val) => updateConfig({ mode: val?.value as any })}
            className="text-sm"
            styles={selectStyles}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Match Series</label>
          <Select
            instanceId="bestOf"
            options={bestOfOptions}
            value={bestOfOptions.find((o) => o.value === config.bestOf)}
            onChange={(val) => updateConfig({ bestOf: val?.value as any })}
            className="text-sm"
            styles={selectStyles}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Bans per Team</label>
          <Select
            instanceId="banCount"
            options={banCountOptions}
            value={banCountOptions.find((o) => o.value === config.banCount)}
            onChange={(val) => updateConfig({ banCount: val?.value as any })}
            className="text-sm"
            styles={selectStyles}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Show Win/Lose</label>
          <Select
            instanceId="showWinLose"
            options={showWinLoseOptions}
            value={showWinLoseOptions.find(
              (o) => o.value === config.showWinLose,
            )}
            onChange={(val) => updateConfig({ showWinLose: val?.value as any })}
            className="text-sm"
            styles={selectStyles}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Draft Style</label>
          <Select
            instanceId="draftStyle"
            options={draftStyleOptions}
            value={draftStyleOptions.find(
              (o) => o.value === (config.draftStyle || "normal"),
            )}
            onChange={(val) => updateConfig({ draftStyle: val?.value as any })}
            className="text-sm"
            styles={selectStyles}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Background</label>
          <Select
            instanceId="bgStyle"
            options={bgStyleOptions}
            value={bgStyleOptions.find(
              (o) => o.value === (config.bgStyle || "default"),
            )}
            onChange={(val) => updateConfig({ bgStyle: val?.value as any })}
            className="text-sm"
            styles={selectStyles}
          />
        </div>
      </div>

      {/* Team Names */}
      <div className="border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4 bg-d-primary-surface/70">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 tracking-wider">
            Custom Team A Name
          </label>
          <input
            type="text"
            value={teamAName}
            onChange={(e) => updateTeamName("A", e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/20 transition-colors"
            placeholder="Enter team A name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 tracking-wider">
            Custom Team B Name
          </label>
          <input
            type="text"
            value={teamBName}
            onChange={(e) => updateTeamName("B", e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-white/10 rounded-sm text-white text-sm focus:outline-none focus:border-white/20 transition-colors"
            placeholder="Enter team B name"
          />
        </div>
      </div>
    </div>
  );
}
