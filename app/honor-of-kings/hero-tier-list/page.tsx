"use client";

import { useState } from "react";
import { TIER_LIST_DATA } from "@/static-database/tier-list/tier-list-data";
import TierRoleFilter from "@/components/hero-tier-list/TierRoleFilter";
import TierRoleColumnHeader from "@/components/hero-tier-list/TierRoleColumnHeader";
import StaticTierRow from "@/components/hero-tier-list/StaticTierRow";

export default function HeroTierListPage() {
  const { title, tiers } = TIER_LIST_DATA;
  const [roleFilter, setRoleFilter] = useState<number | null>(null);

  return (
    <div className="mx-auto p-0 my-20 md:p-8">
      <div className="mb-6">
        <div className="text-2xl font-medium">Hero Tier List</div>
        <span className="text-sm text-gray-400">
          Current meta tier rankings.
        </span>
      </div>

      {/* Role filter */}
      <TierRoleFilter
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
      />

      {/* Tier list title */}
      {/* <div className="w-full mb-4 text-base lg:text-xl py-2 border-b border-blue-800 text-center">
        {title}
      </div> */}
      <div className="mt-15 mb-5 text-sm flex gap-2">
        made by @admin
        <span className="text-gray-400">13 Feb 2026, 18:57 WIB</span>
      </div>
      
      <div className="min-w-97.5 overflow-x-auto">
        {/* Role column header */}
        <TierRoleColumnHeader roleFilter={roleFilter} />

        {/* Tiers */}
        <div className="space-y-0">
          {tiers.map((tier) => (
            <StaticTierRow
              key={tier.label}
              tier={tier}
              roleFilter={roleFilter}
            />
          ))}
        </div>
      </div>

      {/* Watermark */}
      <div className="text-center text-xs text-gray-600 pt-4 pb-2">
        Made by hok-draft.web.id | Copyright © {new Date().getFullYear()} . All
        rights reserved.
      </div>
    </div>
  );
}
