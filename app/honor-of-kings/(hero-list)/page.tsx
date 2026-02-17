"use client";

import { useState } from "react";
import {
  HeroCard,
  HeroFilter,
  ToolTipHeroCard,
  type HeroRole,
} from "@/components/hero-list";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";
import { HERO_EXPERIENCE } from "@/static-database/hero";

const listRole: HeroRole[] = [
  { id: 1, role: "Class Lane", icon: "/asset/role/class-lane.png" },
  { id: 2, role: "Jungle", icon: "/asset/role/jungle.png" },
  { id: 3, role: "Mid Lane", icon: "/asset/role/mid-lane.png" },
  { id: 4, role: "Farm Lane", icon: "/asset/role/farm-lane.png" },
  { id: 5, role: "Roamer", icon: "/asset/role/roamer.png" },
];

export default function HeroListPage() {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHeroes = HERO_LIST_ENRICHED.filter((hero) => {
    const matchesRole =
      selectedRole === null || hero.role.some((r) => r.id === selectedRole);

    const matchesExperience =
      selectedExperience === null || hero.heroExperience === selectedExperience;

    const matchesSearch =
      searchQuery === "" ||
      hero.heroName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRole && matchesExperience && matchesSearch;
  });

  return (
    <main className="flex flex-col my-20">
      <div className="mb-10">
        <div className="text-2xl font-medium">Honor Of Kings Characters</div>
        <span className="text-sm">List of Heroes from Honor Of Kings.</span>
        <p className="text-gray-400">
          Last Update:{" "}
          <span className="font-medium text-blue-400">February 2026</span>
        </p>
      </div>

      {/* Filter */}
      <HeroFilter
        listRole={listRole}
        listExperience={HERO_EXPERIENCE}
        selectedRole={selectedRole}
        selectedExperience={selectedExperience}
        onRoleSelect={(roleId) => setSelectedRole(roleId)}
        onExperienceSelect={(experience) => setSelectedExperience(experience)}
        onSearch={(query) => setSearchQuery(query)}
      />

      {/* Hero Grid */}
      <div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-6">
          {filteredHeroes.map((hero) => (
            <ToolTipHeroCard key={hero.heroId} hero={hero}>
              <HeroCard
                heroName={hero.heroName}
                heroImage={hero.media.heroBody}
                heroRole={hero.role}
                heroExperience={hero.heroExperience}
              />
            </ToolTipHeroCard>
          ))}
        </div>

        {/* Empty State */}
        {filteredHeroes.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            <div className="text-3xl mb-2">🔍</div>
            <p>No heroes found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
