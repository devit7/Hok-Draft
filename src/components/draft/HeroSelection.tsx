import React, { useState } from "react";
import { Hero } from "../../hooks/useHeroes";

type HeroSelectionProps = {
    heroes: string[];
    heroData: Hero[];
    selectedHero: string | null;
    blueBans: (string | null)[];
    redBans: (string | null)[];
    bluePicks: (string | null)[];
    redPicks: (string | null)[];
    onSelectHero: (hero: string) => void;
    onConfirmSelection: () => void;
};

const HeroSelection: React.FC<HeroSelectionProps> = ({
    heroes,
    heroData,
    selectedHero,
    blueBans,
    redBans,
    bluePicks,
    redPicks,
    onSelectHero,
    onConfirmSelection
}) => {
    // State for hero filtering
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);

    // Get all available roles
    const roles = Array.from(new Set(heroData.map(hero => {
        const roles = hero.Role.split("/");
        return roles;
    }).flat()));

    // Get all available tiers
    const tiers = Array.from(new Set(heroData.map(hero => hero.Tier)));

    // Filter heroes based on search and filters
    const filteredHeroes = heroes.filter(heroName => {
        const heroInfo = heroData.find(h => h.Name === heroName);
        if (!heroInfo) return false;

        const matchesSearch = heroInfo.Name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole ? heroInfo.Role.includes(selectedRole) : true;
        const matchesTier = selectedTier ? heroInfo.Tier === selectedTier : true;

        return matchesSearch && matchesRole && matchesTier;
    });

    // Get hero data by name
    const getHeroData = (name: string) => heroData.find(h => h.Name === name);

    // Check if a hero is used
    const isHeroUsed = (hero: string) => {
        return [
            ...blueBans,
            ...redBans,
            ...bluePicks,
            ...redPicks
        ].includes(hero);
    };

    // Reset all filters
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedRole(null);
        setSelectedTier(null);
    };

    return (
        <div className="bg-[#0D0D28] p-4 rounded-lg border border-[#191937]">
            {/* Header with selected hero and confirm button */}
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 gap-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">Select Hero</h3>
                </div>

                {/* Selected hero preview */}
                <div className="flex-1 flex items-center justify-center">
                    {selectedHero && getHeroData(selectedHero) && (
                        <div className="flex items-center bg-[#070720] p-2 rounded-lg border border-[#191937]">
                            <img
                                src={getHeroData(selectedHero)?.["Image URL"]}
                                alt={selectedHero}
                                className="w-12 h-12 mr-3 rounded-lg"
                            />
                            <div>
                                <div className="font-bold text-white">{selectedHero}</div>
                                <div className="text-xs text-[#656891]">{getHeroData(selectedHero)?.Role}</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Confirm button */}
                <div className="flex-1 text-right">
                    <button
                        onClick={onConfirmSelection}
                        disabled={!selectedHero}
                        className={`px-4 py-2.5 rounded font-bold text-white ${selectedHero
                                ? "bg-[#2B77FF] hover:bg-blue-600"
                                : "bg-gray-700 cursor-not-allowed"
                            }`}
                    >
                        Confirm Selection
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-4 bg-[#070720] p-3 rounded-lg">
                <div className="flex flex-col md:flex-row gap-3">
                    {/* Search input */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search heroes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#191937] border border-[#323260] rounded p-2 text-white"
                        />
                    </div>

                    {/* Role filter */}
                    <div>
                        <select
                            value={selectedRole || ""}
                            onChange={(e) => setSelectedRole(e.target.value || null)}
                            className="bg-[#191937] border border-[#323260] rounded p-2 text-white"
                        >
                            <option value="">All Roles</option>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tier filter */}
                    <div>
                        <select
                            value={selectedTier || ""}
                            onChange={(e) => setSelectedTier(e.target.value || null)}
                            className="bg-[#191937] border border-[#323260] rounded p-2 text-white"
                        >
                            <option value="">All Tiers</option>
                            {tiers.map(tier => (
                                <option key={tier} value={tier}>Tier {tier}</option>
                            ))}
                        </select>
                    </div>

                    {/* Reset filters button */}
                    <button
                        onClick={resetFilters}
                        className="px-3 py-2 bg-[#191937] hover:bg-[#232350] text-white rounded"
                    >
                        Reset
                    </button>
                </div>
            </div>

            {/* Heroes grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 2xl:grid-cols-10 gap-3 max-h-[500px] overflow-y-auto p-1">
                {filteredHeroes.length > 0 ? filteredHeroes.map((heroName) => {
                    const hero = getHeroData(heroName);
                    if (!hero) return null;

                    const isUsed = isHeroUsed(heroName);

                    return (
                        <div
                            key={heroName}
                            onClick={() => !isUsed && onSelectHero(heroName)}
                            className={`
                p-2 border rounded cursor-pointer 
                ${isUsed ? "bg-gray-800 border-gray-700 opacity-50 cursor-not-allowed" :
                                    selectedHero === heroName ? "bg-blue-900 border-blue-500" : "bg-[#070720] border-[#191937] hover:border-blue-500"}
              `}
                        >
                            <div className="flex flex-col items-center">
                                <div className="relative mb-1">
                                    <img
                                        src={hero["Image URL"]}
                                        alt={hero.Name}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className={`absolute top-0 right-0 w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold ${hero.Tier === 'S' ? 'bg-red-500' :
                                            hero.Tier === 'A' ? 'bg-orange-500' :
                                                hero.Tier === 'B' ? 'bg-yellow-500' : 'bg-green-500'
                                        }`}>
                                        {hero.Tier}
                                    </div>
                                </div>
                                <div className="text-sm font-medium text-center w-full truncate">
                                    {hero.Name}
                                </div>
                                <div className="text-xs text-[#656891] text-center w-full truncate">
                                    {hero.Role}
                                </div>
                                {isUsed && <span className="block text-xs text-red-400 mt-1">(Used)</span>}
                            </div>
                        </div>
                    );
                }) : (
                    <div className="col-span-full text-center py-8 text-[#656891]">
                        No heroes match your filters
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroSelection;
