import React from "react";
import { DraftPhase } from "../../types/draft";
import { useHeroes } from "../../hooks/useHeroes";

type DraftBoardProps = {
    currentPhase: DraftPhase;
    blueBans: (string | null)[];
    redBans: (string | null)[];
    bluePicks: (string | null)[];
    redPicks: (string | null)[];
};

const DraftBoard: React.FC<DraftBoardProps> = ({
    currentPhase,
    blueBans,
    redBans,
    bluePicks,
    redPicks
}) => {
    const { heroes } = useHeroes();

    // Get hero image by name
    const getHeroImage = (name: string) => {
        const hero = heroes.find(h => h.Name === name);
        return hero ? hero["Image URL"] : "";
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Blue team */}
            <div className="flex-1 bg-[#0D0D28] p-4 rounded-md border-2 border-blue-900">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-blue-400">BLUE TEAM</h2>
                </div>

                {/* Blue bans */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#656891] mb-2">BANS</h3>
                    <div className="flex gap-2 flex-wrap">
                        {blueBans.map((hero, index) => (
                            <div
                                key={`blue-ban-${index}`}
                                className={`w-16 h-16 rounded border ${currentPhase === `blueBan${index + 1}`
                                        ? "border-yellow-400 bg-blue-900/50 animate-pulse"
                                        : "border-[#191937] bg-[#070720]"
                                    } flex items-center justify-center overflow-hidden`}
                            >
                                {hero ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={getHeroImage(hero)}
                                            alt={hero}
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="font-bold text-red-500 text-xs bg-black/50 px-1 py-0.5 rounded">
                                                BANNED
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-[#656891] text-xs">
                                        {currentPhase === `blueBan${index + 1}` ? "BANNING" : "BAN"}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Blue picks */}
                <div>
                    <h3 className="text-lg font-semibold text-[#656891] mb-2">HEROES</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {bluePicks.map((hero, index) => (
                            <div
                                key={`blue-pick-${index}`}
                                className={`aspect-square rounded border ${currentPhase === `bluePick${index + 1}`
                                        ? "border-yellow-400 bg-blue-900/50 animate-pulse"
                                        : "border-[#191937] bg-[#070720]"
                                    } flex items-center justify-center overflow-hidden`}
                            >
                                {hero ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={getHeroImage(hero)}
                                            alt={hero}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 inset-x-0 bg-blue-900/70 py-1 px-1">
                                            <div className="text-xs font-bold text-center text-blue-100 truncate">
                                                {hero}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-[#656891] text-xs">
                                        {currentPhase === `bluePick${index + 1}` ? "PICKING" : "HERO"}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* VS indicator */}
            <div className="flex items-center justify-center">
                <div className="text-2xl font-bold text-[#656891]">VS</div>
            </div>

            {/* Red team */}
            <div className="flex-1 bg-[#0D0D28] p-4 rounded-md border-2 border-red-900">
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-red-400">RED TEAM</h2>
                </div>

                {/* Red bans */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#656891] mb-2">BANS</h3>
                    <div className="flex gap-2 flex-wrap">
                        {redBans.map((hero, index) => (
                            <div
                                key={`red-ban-${index}`}
                                className={`w-16 h-16 rounded border ${currentPhase === `redBan${index + 1}`
                                        ? "border-yellow-400 bg-red-900/30 animate-pulse"
                                        : "border-[#191937] bg-[#070720]"
                                    } flex items-center justify-center overflow-hidden`}
                            >
                                {hero ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={getHeroImage(hero)}
                                            alt={hero}
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="font-bold text-red-500 text-xs bg-black/50 px-1 py-0.5 rounded">
                                                BANNED
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-[#656891] text-xs">
                                        {currentPhase === `redBan${index + 1}` ? "BANNING" : "BAN"}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Red picks */}
                <div>
                    <h3 className="text-lg font-semibold text-[#656891] mb-2">HEROES</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {redPicks.map((hero, index) => (
                            <div
                                key={`red-pick-${index}`}
                                className={`aspect-square rounded border ${currentPhase === `redPick${index + 1}`
                                        ? "border-yellow-400 bg-red-900/30 animate-pulse"
                                        : "border-[#191937] bg-[#070720]"
                                    } flex items-center justify-center overflow-hidden`}
                            >
                                {hero ? (
                                    <div className="relative w-full h-full">
                                        <img
                                            src={getHeroImage(hero)}
                                            alt={hero}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-0 inset-x-0 bg-red-900/70 py-1 px-1">
                                            <div className="text-xs font-bold text-center text-red-100 truncate">
                                                {hero}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-[#656891] text-xs">
                                        {currentPhase === `redPick${index + 1}` ? "PICKING" : "HERO"}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DraftBoard;
