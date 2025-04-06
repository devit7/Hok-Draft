import React, { useState } from "react";
import { DraftConfiguration, DraftPhase } from "../../types/draft";

type DraftConfigProps = {
    initialConfig: DraftConfiguration;
    onStartDraft: (config: DraftConfiguration) => void;
};

// Helper to generate ban-pick sequences
const generateDraftSequence = (banCount: number, pickCount: number, draftType: 'ranked' | 'standard' = 'standard'): DraftPhase[] => {
    const sequence: DraftPhase[] = [];

    // Add ban phases based on draft type
    if (draftType === 'ranked' && banCount >= 2) {
        // Ranked draft has a specific ban pattern:
        // Blue team bans twice in a row, then Red team bans twice in a row
        for (let i = 1; i <= Math.min(2, banCount); i++) {
            sequence.push(`blueBan${i}` as DraftPhase);
        }
        for (let i = 1; i <= Math.min(2, banCount); i++) {
            sequence.push(`redBan${i}` as DraftPhase);
        }

        // If there are more bans (e.g., 3+), add them in alternating order
        for (let i = 3; i <= banCount; i++) {
            sequence.push(`blueBan${i}` as DraftPhase);
            sequence.push(`redBan${i}` as DraftPhase);
        }
    } else {
        // Standard alternating bans
        for (let i = 1; i <= banCount; i++) {
            sequence.push(`blueBan${i}` as DraftPhase);
            sequence.push(`redBan${i}` as DraftPhase);
        }
    }

    // Add pick phases (alternating with some special ordering for competitive)
    if (pickCount === 5) {
        // Standard 5v5 competitive ordering
        sequence.push("bluePick1");
        sequence.push("redPick1");
        sequence.push("redPick2");
        sequence.push("bluePick2");
        sequence.push("bluePick3");
        sequence.push("redPick3");
        sequence.push("bluePick4");
        sequence.push("redPick4");
        sequence.push("bluePick5");
        sequence.push("redPick5");
    } else {
        // Generic alternating for custom pick counts
        for (let i = 1; i <= pickCount; i++) {
            sequence.push(`bluePick${i}` as DraftPhase);
            sequence.push(`redPick${i}` as DraftPhase);
        }
    }

    sequence.push("complete");
    return sequence;
};

const DraftConfig: React.FC<DraftConfigProps> = ({ initialConfig, onStartDraft }) => {
    const [config, setConfig] = useState<DraftConfiguration>(initialConfig);
    const [customHeroes, setCustomHeroes] = useState(initialConfig.heroes.join(", "));
    const [draftType, setDraftType] = useState<'ranked' | 'standard'>('ranked');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value/* , type */ } = e.target;

        if (name === "useTimer") {
            setConfig({
                ...config,
                useTimer: (e.target as HTMLInputElement).checked
            });
        } else if (name === "customHeroes") {
            setCustomHeroes(value);
            const heroList = value.split(",").map(h => h.trim()).filter(h => h);
            setConfig({
                ...config,
                heroes: heroList
            });
        } else if (name === "draftType") {
            const newDraftType = value as 'ranked' | 'standard';
            setDraftType(newDraftType);

            // Update draft sequence when draft type changes
            setConfig({
                ...config,
                draftSequence: generateDraftSequence(
                    config.banCount,
                    config.pickCount,
                    newDraftType
                )
            });
        } else if (name === "banCount" || name === "pickCount" || name === "timerDuration") {
            const numValue = parseInt(value);
            setConfig({
                ...config,
                [name]: numValue
            });

            // Update draft sequence if ban or pick count changes
            if (name === "banCount" || name === "pickCount") {
                const updatedConfig = {
                    ...config,
                    [name]: numValue
                };
                setConfig({
                    ...updatedConfig,
                    draftSequence: generateDraftSequence(
                        name === "banCount" ? numValue : updatedConfig.banCount,
                        name === "pickCount" ? numValue : updatedConfig.pickCount,
                        draftType
                    )
                });
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onStartDraft(config);
    };

    return (
        <div className="bg-[#0D0D28] p-6 rounded-lg border border-[#191937]">
            <h2 className="text-2xl font-bold text-white mb-6">Draft Configuration</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Timer Settings */}
                    <div className="bg-[#070720] p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Timer Settings</h3>

                        <div className="mb-4">
                            <label className="flex items-center gap-2 text-[#656891]">
                                <input
                                    type="checkbox"
                                    name="useTimer"
                                    checked={config.useTimer}
                                    onChange={handleChange}
                                    className="rounded text-blue-500 focus:ring-blue-500 bg-[#191937] border-[#191937]"
                                />
                                Enable Timer
                            </label>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#656891] text-sm mb-1">Timer Duration (seconds)</label>
                            <input
                                type="number"
                                name="timerDuration"
                                value={config.timerDuration}
                                onChange={handleChange}
                                min={5}
                                max={60}
                                disabled={!config.useTimer}
                                className="w-full bg-[#191937] border border-[#323260] rounded p-2 text-white disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Draft Structure */}
                    <div className="bg-[#070720] p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-white mb-4">Draft Structure</h3>

                        <div className="mb-4">
                            <label className="block text-[#656891] text-sm mb-1">Draft Type</label>
                            <select
                                name="draftType"
                                value={draftType}
                                onChange={handleChange}
                                className="w-full bg-[#191937] border border-[#323260] rounded p-2 text-white"
                            >
                                <option value="ranked">Ranked (Blue double ban, then Red double ban)</option>
                                <option value="standard">Standard (Alternating bans)</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#656891] text-sm mb-1">Ban Count (per team)</label>
                            <select
                                name="banCount"
                                value={config.banCount}
                                onChange={handleChange}
                                className="w-full bg-[#191937] border border-[#323260] rounded p-2 text-white"
                            >
                                <option value={0}>No Bans</option>
                                <option value={1}>1 Ban</option>
                                <option value={2}>2 Bans</option>
                                <option value={3}>3 Bans</option>
                                <option value={4}>4 Bans</option>
                                <option value={5}>5 Bans</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[#656891] text-sm mb-1">Pick Count (per team)</label>
                            <select
                                name="pickCount"
                                value={config.pickCount}
                                onChange={handleChange}
                                className="w-full bg-[#191937] border border-[#323260] rounded p-2 text-white"
                            >
                                <option value={1}>1 Hero</option>
                                <option value={3}>3 Heroes</option>
                                <option value={5}>5 Heroes</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Draft Sequence Preview */}
                <div className="mt-6 bg-[#070720] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-2">Draft Sequence</h3>
                    <div className="flex flex-wrap gap-2 text-sm text-[#656891]">
                        {config.draftSequence.filter(phase => phase !== "complete").map((phase, index) => (
                            <div key={index} className="px-2 py-1 bg-[#191937] rounded">
                                {phase}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Pool */}
                <div className="mt-6 bg-[#070720] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Hero Pool</h3>
                    <div className="mb-4">
                        <label className="block text-[#656891] text-sm mb-1">Custom Heroes (comma-separated)</label>
                        <textarea
                            name="customHeroes"
                            value={customHeroes}
                            onChange={handleChange}
                            className="w-full bg-[#191937] border border-[#323260] rounded p-2 text-white h-24"
                            placeholder="Hero1, Hero2, Hero3..."
                        />
                    </div>
                    <div className="text-[#656891] text-xs">
                        {config.heroes.length} heroes available for drafting
                    </div>
                </div>

                {/* Preview and Submit */}
                <div className="mt-6 text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-[#2B77FF] hover:bg-blue-600 text-white font-bold rounded-lg"
                    >
                        Start Draft
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DraftConfig;
