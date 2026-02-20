"use client";

import useDraftStore from "@/store/useDraftStore";
import Select from "react-select";

const draftModeOptions = [
  { value: "ranked", label: "Ranked" },
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
          className="text-xs bg-red-500/20 hover:bg-red-500/40 text-red-200 px-3 py-1 rounded-sm transition-colors"
        >
          Reset Draft
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-4 bg-d-primary-surface/70">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Draft Mode</label>
          <Select
            instanceId="mode"
            options={draftModeOptions}
            value={draftModeOptions.find((o) => o.value === config.mode)}
            onChange={(val) => updateConfig({ mode: val?.value as any })}
            className="text-sm text-d-primary"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                borderColor: "rgba(255,255,255,0.1)",
              }),
              menu: (base) => ({ ...base, backgroundColor: "#1e293b" }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? "rgba(59, 130, 246, 0.2)"
                  : "transparent",
                color: "white",
              }),
              singleValue: (base) => ({ ...base, color: "white" }),
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Match Series</label>
          <Select
            instanceId="bestOf"
            options={bestOfOptions}
            value={bestOfOptions.find((o) => o.value === config.bestOf)}
            onChange={(val) => updateConfig({ bestOf: val?.value as any })}
            className="text-sm text-d-primary"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                borderColor: "rgba(255,255,255,0.1)",
              }),
              menu: (base) => ({ ...base, backgroundColor: "#1e293b" }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? "rgba(59, 130, 246, 0.2)"
                  : "transparent",
                color: "white",
              }),
              singleValue: (base) => ({ ...base, color: "white" }),
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Bans per Team</label>
          <Select
            instanceId="banCount"
            options={banCountOptions}
            value={banCountOptions.find((o) => o.value === config.banCount)}
            onChange={(val) => updateConfig({ banCount: val?.value as any })}
            className="text-sm text-d-primary"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "rgba(30, 41, 59, 0.5)",
                borderColor: "rgba(255,255,255,0.1)",
              }),
              menu: (base) => ({ ...base, backgroundColor: "#1e293b" }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? "rgba(59, 130, 246, 0.2)"
                  : "transparent",
                color: "white",
              }),
              singleValue: (base) => ({ ...base, color: "white" }),
            }}
          />
        </div>
      </div>

      {/* Team Names Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 pb-4 bg-d-primary-surface/70 border-t border-white/5 pt-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase tracking-wider">
            Team A Name
          </label>
          <input
            type="text"
            value={teamAName}
            onChange={(e) => updateTeamName("A", e.target.value)}
            className="px-3 py-2 bg-blue-900/10 border border-blue-500/20 rounded-xs text-blue-100 text-sm focus:outline-none focus:border-blue-500/40 transition-colors"
            placeholder="Enter team A name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400 uppercase tracking-wider">
            Team B Name
          </label>
          <input
            type="text"
            value={teamBName}
            onChange={(e) => updateTeamName("B", e.target.value)}
            className="px-3 py-2 bg-red-900/10 border border-red-500/20 rounded-xs text-red-100 text-sm focus:outline-none focus:border-red-500/40 transition-colors"
            placeholder="Enter team B name"
          />
        </div>
      </div>
    </div>
  );
}
