"use client";

import Image from "next/image";
import { useState } from "react";
import {
  COUNTER_PICK_DATA,
  type CounterPickEntry,
  type CounterHero,
} from "@/static-database/counter-pick/counter-pick-data";
import { HERO_ROLE } from "@/static-database/hero";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";
import { ToolTipHeroCard } from "@/components/hero-list/tool-tip-hero-card";
import { HeroCardBase } from "@/components/hero-list/hero-card-base";

// Build a lookup for full hero data (for tooltip)
const heroMap = new Map(HERO_LIST_ENRICHED.map((h) => [h.heroId, h]));

const CounterHeroIcon = ({ counter }: { counter: CounterHero }) => {
  const fullHero = heroMap.get(counter.heroId);
  const card = (
    <div className="flex flex-col items-center">
      <HeroCardBase
        heroName={counter.heroName}
        heroImage={fullHero?.media.heroBody || counter.heroImage}
        heroRole={fullHero?.role || []}
        heroExperience={fullHero?.heroExperience || ""}
      />
    </div>
  );

  if (!fullHero) return card;
  return <ToolTipHeroCard hero={fullHero}>{card}</ToolTipHeroCard>;
};

const StaticHeroRow = ({ entry }: { entry: CounterPickEntry }) => {
  const fullHero = heroMap.get(entry.heroId);

  const heroCard = (
    <div className="w-full max-w-38">
      <HeroCardBase
        heroName={entry.heroName}
        heroImage={fullHero?.media.heroBody || entry.heroImage}
        heroRole={fullHero?.role || [...entry.heroRoles]}
        heroExperience={fullHero?.heroExperience || ""}
      />
    </div>
  );

  return (
    <div className="flex flex-row gap-4">
      {/* Hero */}
      {fullHero ? (
        <ToolTipHeroCard hero={fullHero}>{heroCard}</ToolTipHeroCard>
      ) : (
        heroCard
      )}

      {/* Counter picks */}
      <div className="flex flex-row gap-3 items-start mx-4 flex-wrap">
        {entry.counters.map((counter) => (
          <CounterHeroIcon key={counter.heroId} counter={counter} />
        ))}
        {entry.counters.length === 0 && (
          <div className="flex items-center text-gray-600 text-sm h-36">
            No counters assigned
          </div>
        )}
      </div>
    </div>
  );
};

export default function CounterPickPage() {
  const { title, entries } = COUNTER_PICK_DATA;
  const [roleFilter, setRoleFilter] = useState<number | null>(null);

  const filteredEntries =
    roleFilter !== null
      ? entries.filter((e) => e.heroRoles.some((r) => r.id === roleFilter))
      : entries;

  return (
    <main className="flex flex-col my-20">
      <div className="mb-10">
        <div className="text-2xl font-medium">Counter Pick</div>
        <span className="text-sm text-gray-400">
          Hero counter matchups and recommendations.
        </span>
      </div>

      {/* Role filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setRoleFilter(null)}
          className={`px-3 py-1.5 text-sm rounded-xs cursor-pointer transition-colors ${
            roleFilter === null
              ? "bg-blue-500/50 text-blue-100"
              : "bg-d-primary-surface text-gray-400 hover:text-gray-200"
          }`}
        >
          All Roles
        </button>
        {HERO_ROLE.map((role) => (
          <button
            key={role.id}
            onClick={() => setRoleFilter(role.id)}
            className={`px-3 py-1.5 text-sm rounded-xs cursor-pointer flex items-center gap-1.5 transition-colors ${
              roleFilter === role.id
                ? "bg-blue-500/50 text-blue-100"
                : "bg-d-primary-surface text-gray-400 hover:text-gray-200"
            }`}
          >
            <Image src={role.icon} alt={role.role} width={14} height={14} />
            {role.role}
          </button>
        ))}
      </div>

      {/* Title */}
      <div className="w-full text-xl py-2 border-b border-blue-800">
        {title}
      </div>

      {/* Column Headers */}
      <div className="flex flex-row gap-4 font-medium mt-2">
        <div className="flex flex-col w-full max-w-38">
          <div className="px-6 py-2 text-center bg-[#5053ef] rounded-xs text-blue-100">
            Hero Pool
          </div>
        </div>
        <div className="w-full">
          <div className="px-6 py-2 text-center bg-[#ef5350]/70 rounded-xs text-red-100">
            Counter List
          </div>
        </div>
      </div>

      {/* Hero Rows */}
      <div className="flex flex-col gap-2 pt-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            No counter pick data available. Export from Counter Pick Maker
            first.
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <StaticHeroRow key={entry.heroId} entry={entry} />
          ))
        )}
      </div>

      {/* Watermark */}
      <div className="text-center text-xs text-gray-600 pt-4 pb-2">
        Made by hok-draft.web.id | Copyright © {new Date().getFullYear()} . All
        rights reserved.
      </div>
    </main>
  );
}
