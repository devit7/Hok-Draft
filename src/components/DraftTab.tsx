import { FC, useState } from "react";
import { Link } from "react-router";
import { DraftConfiguration, DraftPhase } from "../types/draft";

type DraftTabProps = {
    activeTab: string;
};

// Helper function to generate ranked draft sequence
const generateRankedDraftSequence = (banCount: number, pickCount: number): DraftPhase[] => {
    const sequence: DraftPhase[] = [];

    // Ranked specific ban pattern: blue team bans twice, then red team bans twice
    for (let i = 1; i <= Math.min(2, banCount); i++) {
        sequence.push(`blueBan${i}` as DraftPhase);
    }
    for (let i = 1; i <= Math.min(2, banCount); i++) {
        sequence.push(`redBan${i}` as DraftPhase);
    }

    // Standard 5v5 ranked pick order
    if (pickCount === 5) {
        sequence.push("bluePick1" as DraftPhase);
        sequence.push("redPick1" as DraftPhase);
        sequence.push("redPick2" as DraftPhase);
        sequence.push("bluePick2" as DraftPhase);
        sequence.push("bluePick3" as DraftPhase);
        sequence.push("redPick3" as DraftPhase);
        sequence.push("redPick4" as DraftPhase);
        sequence.push("bluePick4" as DraftPhase);
        sequence.push("bluePick5" as DraftPhase);
        sequence.push("redPick5" as DraftPhase);
    } else {
        // Generic alternating for custom pick counts
        for (let i = 1; i <= pickCount; i++) {
            sequence.push(`bluePick${i}` as DraftPhase);
            sequence.push(`redPick${i}` as DraftPhase);
        }
    }

    sequence.push("complete" as DraftPhase);
    return sequence;
};

const DraftTab: FC<DraftTabProps> = ({ activeTab }) => {
    // Add state for timer settings
    const [useTimer, setUseTimer] = useState(true);
    const [timerDuration, setTimerDuration] = useState(30);

    // Create config object to pass to RankedDraft
    const rankedConfig: DraftConfiguration = {
        useTimer,
        timerDuration,
        banCount: 2,
        pickCount: 5,
        draftSequence: generateRankedDraftSequence(2, 5),
        heroes: [] // This will be populated by RankedDraft from heroes.json
    };

    // Serialize config to pass via URL
    const configParam = encodeURIComponent(JSON.stringify(rankedConfig));

    // Content mapping for each tab
    const tabContent = {

        ranked: {
            title: "Ranked Draft Setup",
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div className="bg-[#0D0D28] p-6 rounded-lg border border-[#191937]">
                        {/* Timer Settings */}
                        <h3 className="text-xl font-bold text-white mb-3">Timer Settings</h3>
                        <div className="grid grid-cols-1 gap-2">
                            <div className="mb-4">
                                <label className="flex items-center gap-2 text-[#656891]">
                                    <input
                                        type="checkbox"
                                        name="useTimer"
                                        checked={useTimer}
                                        onChange={(e) => setUseTimer(e.target.checked)}
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
                                    value={timerDuration}
                                    onChange={(e) => setTimerDuration(parseInt(e.target.value))}
                                    min={5}
                                    max={60}
                                    disabled={!useTimer}
                                    className="w-full bg-[#191937] border border-[#323260] rounded p-2 text-white disabled:opacity-50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D0D28] p-6 rounded-lg border border-[#191937]">
                        <h3 className="text-xl font-bold text-white mb-3">Competitive Rules</h3>
                        <div className="text-[#656891] mb-4">
                            <p className="mb-2">• Each team bans 2 heroes</p>
                            <p className="mb-2">• Teams take turns picking heroes</p>
                            <p className="mb-2">• Draft order: Ban(2x) → Ban(2x) → Pick → Pick</p>
                            <p className="mb-2">• No duplicate hero selections allowed</p>
                        </div>
                        <Link to={`/hok/ranked?config=${configParam}`}>
                            <button
                                className="mt-2 w-full bg-[#2B77FF] hover:bg-blue-600 text-white py-2 rounded transition-colors">
                                Begin Ranked Draft
                            </button>
                        </Link>
                    </div>
                </div>
            ),
        },
        peak: {
            title: "Peak Draft Setup",
            content: (
                <div className="mt-6 bg-[#0D0D28] p-6 rounded-lg border border-[#191937]">
                    <h3 className="text-xl font-bold text-white mb-3">Peak Mode</h3>
                    <p className="text-[#656891] mb-4">
                        In Peak Mode, players pick from a common pool of heroes. Once a hero is selected, it becomes unavailable to both teams.
                    </p>
                    <button className="mt-2 w-full bg-[#2B77FF] hover:bg-blue-600 text-white py-2 rounded transition-colors">
                        Start Peak Draft
                    </button>
                </div>
            ),
        },
        gbp: {
            title: "Global Ban Pick Setup",
            content: (
                <div className="mt-6 bg-[#0D0D28] p-6 rounded-lg border border-[#191937]">
                    <h3 className="text-xl font-bold text-white mb-3">Global Ban Pick Mode</h3>
                    <p className="text-[#656891] mb-4">
                        Extended ban phase with global bans affecting both teams, followed by strategic pick phase.
                    </p>
                    <button className="mt-2 w-full bg-[#2B77FF] hover:bg-blue-600 text-white py-2 rounded transition-colors">
                        Start Global Ban Pick
                    </button>
                </div>
            ),
        },
        custom: {
            title: "Normal Draft Setup",
            content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div className="bg-[#0D0D28] p-6 rounded-lg border border-[#191937]">
                        <h3 className="text-xl font-bold text-white mb-3">Team Settings</h3>
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-[#656891] text-sm mb-1">Blue Team Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#070720] border border-[#191937] rounded p-2 text-white"
                                    placeholder="Team Name"
                                />
                            </div>
                            <div>
                                <label className="block text-[#656891] text-sm mb-1">Red Team Name</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#070720] border border-[#191937] rounded p-2 text-white"
                                    placeholder="Team Name"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0D0D28] p-6 rounded-lg border border-[#191937]">
                        <h3 className="text-xl font-bold text-white mb-3">Draft Rules</h3>
                        <div className="text-[#656891]">
                            <p className="mb-2">• Each team bans 2 heroes</p>
                            <p className="mb-2">• Teams take turns picking heroes</p>
                            <p className="mb-2">• Draft order: Ban → Pick → Ban → Pick</p>
                            <p className="mb-2">• No duplicate hero selections allowed</p>
                        </div>
                        <button className="mt-4 w-full bg-[#2B77FF] hover:bg-blue-600 text-white py-2 rounded transition-colors">
                            Start Draft
                        </button>
                    </div>
                </div>
            ),
        },
        ai: {
            title: "AI Draft Assistant",
            content: (
                <div className="mt-6">
                    <div className="bg-[#0D0D28] p-6 rounded-lg border border-[#191937] mb-6">
                        <div className="flex items-center mb-4">
                            <h3 className="text-xl font-bold text-white">AI Draft Analysis</h3>
                            <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold text-white bg-blue-500 rounded-md">
                                BETA
                            </span>
                        </div>
                        <p className="text-[#656891] mb-4">
                            Our AI will suggest optimal picks and bans based on current meta, team composition, and counter strategies.
                        </p>
                        <button className="mt-2 w-full bg-[#2B77FF] hover:bg-blue-600 text-white py-2 rounded transition-colors">
                            Try AI Draft
                        </button>
                    </div>

                    <div className="text-xs text-[#656891] italic">
                        Note: AI suggestions are based on analysis of professional matches and may not reflect all in-game dynamics.
                    </div>
                </div>
            ),
        },
    };

    const currentTab = tabContent[activeTab as keyof typeof tabContent] || tabContent.ranked;

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-2">{currentTab.title}</h2>
            {currentTab.content}
        </div>
    );
};

export default DraftTab;
