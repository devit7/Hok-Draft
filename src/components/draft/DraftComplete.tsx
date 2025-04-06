import React from "react";
import { useHeroes } from "../../hooks/useHeroes";

type DraftCompleteProps = {
    blueBans: (string | null)[];
    redBans: (string | null)[];
    bluePicks: (string | null)[];
    redPicks: (string | null)[];
    onRestart: () => void;
};

const DraftComplete: React.FC<DraftCompleteProps> = ({
    blueBans,
    redBans,
    bluePicks,
    redPicks,
    onRestart
}) => {
    const { heroes } = useHeroes();

    // Get hero image by name
    const getHeroImage = (name: string) => {
        const hero = heroes.find(h => h.Name === name);
        return hero ? hero["Image URL"] : "";
    };

    return (
        <div className="text-center bg-[#0D0D28] p-8 rounded-lg border border-[#191937]">
            <h2 className="text-3xl font-bold text-green-400 mb-4">Draft Complete!</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h3 className="text-xl text-blue-400 font-bold mb-2">Blue Team</h3>
                    <div className="bg-[#070720] p-4 rounded-lg">
                        <div className="mb-3">
                            <h4 className="text-[#656891] text-sm mb-1">Bans:</h4>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {blueBans.filter(Boolean).map((hero, idx) => (
                                    <div key={idx} className="flex items-center px-2 py-1 bg-red-900/30 text-red-400 rounded">
                                        <img
                                            src={getHeroImage(hero!)}
                                            alt={hero!}
                                            className="w-6 h-6 mr-1 rounded"
                                        />
                                        <span className="text-sm">{hero}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[#656891] text-sm mb-1">Picks:</h4>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {bluePicks.filter(Boolean).map((hero, idx) => (
                                    <div key={idx} className="flex items-center px-2 py-1 bg-blue-900/30 text-blue-400 rounded">
                                        <img
                                            src={getHeroImage(hero!)}
                                            alt={hero!}
                                            className="w-6 h-6 mr-1 rounded"
                                        />
                                        <span className="text-sm">{hero}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl text-red-400 font-bold mb-2">Red Team</h3>
                    <div className="bg-[#070720] p-4 rounded-lg">
                        <div className="mb-3">
                            <h4 className="text-[#656891] text-sm mb-1">Bans:</h4>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {redBans.filter(Boolean).map((hero, idx) => (
                                    <div key={idx} className="flex items-center px-2 py-1 bg-red-900/30 text-red-400 rounded">
                                        <img
                                            src={getHeroImage(hero!)}
                                            alt={hero!}
                                            className="w-6 h-6 mr-1 rounded"
                                        />
                                        <span className="text-sm">{hero}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-[#656891] text-sm mb-1">Picks:</h4>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {redPicks.filter(Boolean).map((hero, idx) => (
                                    <div key={idx} className="flex items-center px-2 py-1 bg-red-900/30 text-red-400 rounded">
                                        <img
                                            src={getHeroImage(hero!)}
                                            alt={hero!}
                                            className="w-6 h-6 mr-1 rounded"
                                        />
                                        <span className="text-sm">{hero}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <button
                onClick={onRestart}
                className="px-6 py-3 bg-[#2B77FF] hover:bg-blue-600 text-white font-bold rounded-lg"
            >
                Configure New Draft
            </button>
        </div>
    );
};

export default DraftComplete;
