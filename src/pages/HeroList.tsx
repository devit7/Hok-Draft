import { useState, useMemo } from "react";
import { useHeroes, Hero } from "../hooks/useHeroes";

const HeroList = () => {
    const { heroes, loading, error } = useHeroes();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<string>("Name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

    // Extract unique roles and tiers for filters
    const roles = useMemo(() => {
        const allRoles = heroes.flatMap(hero => hero.Role.split("/").map(r => r.trim()));
        return [...new Set(allRoles)].sort();
    }, [heroes]);

    const tiers = useMemo(() => {
        return [...new Set(heroes.map(hero => hero.Tier))].sort();
    }, [heroes]);

    // Filter and sort heroes
    const filteredHeroes = useMemo(() => {
        return heroes
            .filter(hero => {
                const matchesSearch = hero.Name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesRole = selectedRole ? hero.Role.includes(selectedRole) : true;
                const matchesTier = selectedTier ? hero.Tier === selectedTier : true;
                return matchesSearch && matchesRole && matchesTier;
            })
            .sort((a, b) => {
                let valueA: string | number;
                let valueB: string | number;

                // Special handling for rate values
                if (sortBy === "Win Rate" || sortBy === "Pick Rate" || sortBy === "Ban Rate") {
                    valueA = parseFloat(a[sortBy].replace("%", ""));
                    valueB = parseFloat(b[sortBy].replace("%", ""));
                } else {
                    valueA = a[sortBy as keyof Hero];
                    valueB = b[sortBy as keyof Hero];
                }

                if (sortOrder === "asc") {
                    return valueA > valueB ? 1 : -1;
                } else {
                    return valueA < valueB ? 1 : -1;
                }
            });
    }, [heroes, searchTerm, selectedRole, selectedTier, sortBy, sortOrder]);

    // Toggle sort order
    const handleSortChange = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    // Reset all filters
    const resetFilters = () => {
        setSearchTerm("");
        setSelectedRole(null);
        setSelectedTier(null);
        setSortBy("Name");
        setSortOrder("asc");
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <div className="bg-red-500/20 text-red-400 p-4 rounded-lg max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold mb-2">Error Loading Heroes</h3>
                    <p>{error.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Hero List</h1>
                <p className="text-[#656891] mt-2">
                    Browse all {heroes.length} heroes available in Honor of Kings. Filter by role, tier, or search for specific heroes.
                </p>
            </div>

            {/* Filter Controls */}
            <div className="bg-[#0D0D28] p-4 rounded-lg border border-[#191937] mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search Input */}
                    <div>
                        <label className="block text-[#656891] text-sm mb-1">Search Heroes</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name..."
                            className="w-full bg-[#070720] border border-[#191937] rounded p-2 text-white"
                        />
                    </div>

                    {/* Role Filter */}
                    <div>
                        <label className="block text-[#656891] text-sm mb-1">Filter by Role</label>
                        <select
                            value={selectedRole || ""}
                            onChange={(e) => setSelectedRole(e.target.value || null)}
                            className="w-full bg-[#070720] border border-[#191937] rounded p-2 text-white"
                        >
                            <option value="">All Roles</option>
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tier Filter */}
                    <div>
                        <label className="block text-[#656891] text-sm mb-1">Filter by Tier</label>
                        <select
                            value={selectedTier || ""}
                            onChange={(e) => setSelectedTier(e.target.value || null)}
                            className="w-full bg-[#070720] border border-[#191937] rounded p-2 text-white"
                        >
                            <option value="">All Tiers</option>
                            {tiers.map(tier => (
                                <option key={tier} value={tier}>Tier {tier}</option>
                            ))}
                        </select>
                    </div>

                    {/* Reset Filters Button */}
                    <div className="flex items-end">
                        <button
                            onClick={resetFilters}
                            className="w-full bg-[#191937] hover:bg-[#232350] text-white py-2 rounded transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Sort Controls */}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="text-[#656891] text-sm">Sort by:</span>
                    {["Name", "Role", "Tier", "Win Rate", "Pick Rate", "Ban Rate"].map(column => (
                        <button
                            key={column}
                            onClick={() => handleSortChange(column)}
                            className={`px-3 py-1 text-sm rounded ${sortBy === column ? "bg-blue-600 text-white" : "bg-[#191937] text-[#656891]"}`}
                        >
                            {column} {sortBy === column && (sortOrder === "asc" ? "↑" : "↓")}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Summary */}
            <div className="mb-4 text-[#656891]">
                Found {filteredHeroes.length} heroes
            </div>

            {/* Heroes Grid */}
            {filteredHeroes.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredHeroes.map(hero => (
                        <div key={hero.Name} className="bg-[#0D0D28] border border-[#191937] rounded-lg overflow-hidden hover:border-blue-500 transition-colors">
                            <div className="relative">
                                <img
                                    src={hero["Image URL"]}
                                    alt={hero.Name}
                                    className="w-full aspect-square object-cover"
                                />
                                <div className={`absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold
                  ${hero.Tier === 'S' ? 'bg-red-500' :
                                        hero.Tier === 'A' ? 'bg-orange-500' :
                                            hero.Tier === 'B' ? 'bg-yellow-500' : 'bg-green-500'
                                    }`}>
                                    {hero.Tier}
                                </div>
                            </div>

                            <div className="p-3">
                                <h3 className="font-bold text-white text-lg truncate">{hero.Name}</h3>
                                <p className="text-[#656891] text-sm">{hero.Role}</p>

                                <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
                                    <div className="bg-[#191937] p-1 rounded">
                                        <div className="text-green-400">Win</div>
                                        <div>{hero["Win Rate"]}</div>
                                    </div>
                                    <div className="bg-[#191937] p-1 rounded">
                                        <div className="text-blue-400">Pick</div>
                                        <div>{hero["Pick Rate"]}</div>
                                    </div>
                                    <div className="bg-[#191937] p-1 rounded">
                                        <div className="text-red-400">Ban</div>
                                        <div>{hero["Ban Rate"]}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-[#0D0D28] rounded-lg border border-[#191937]">
                    <p className="text-[#656891] text-lg">No heroes match your filters</p>
                    <button
                        onClick={resetFilters}
                        className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default HeroList;
