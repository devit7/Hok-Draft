import { HERO_ROLE } from "@/static-database/hero/hero-role";
import type { TierData } from "@/static-database/tier-list/tier-list-data";
import TierHeroCard from "./TierHeroCard";

const StaticTierRow = ({
  tier,
  roleFilter,
}: {
  tier: TierData;
  roleFilter: number | null;
}) => {
  // Filter heroes by selected role (using columnId if available, fallback to heroRoles)
  const filteredHeroes =
    roleFilter !== null
      ? tier.heroes.filter((h) => {
          if (h.columnId) return h.columnId === `role-${roleFilter}`;
          return h.heroRoles?.some((r) => r.id === roleFilter);
        })
      : tier.heroes;

  // "All Roles" mode → show 5 role columns
  if (roleFilter === null) {
    return (
      <div className="flex gap-0 items-stretch">
        {/* Tier label */}
        <div
          className="w-10 md:min-w-15 min-h-22 shrink-0 flex items-center justify-center font-bold text-base md:text-xl text-d-primary"
          style={{ backgroundColor: tier.color }}
        >
          {tier.label}
        </div>

        {/* Role columns */}
        <div
          className="flex-1 grid min-h-22"
          style={{
            gridTemplateColumns: `repeat(${HERO_ROLE.length}, minmax(0, 1fr))`,
          }}
        >
          {HERO_ROLE.map((role) => {
            const heroesInRole = tier.heroes.filter((h) => {
              if (h.columnId) return h.columnId === `role-${role.id}`;
              return h.heroRoles?.some((r) => r.id === role.id);
            });
            return (
              <div
                key={role.id}
                className="flex flex-wrap items-start content-start gap-1 p-1.5 min-h-22"
                style={{ backgroundColor: tier.color + "11" }}
              >
                {heroesInRole.map((hero) => (
                  <TierHeroCard key={hero.heroId} hero={hero} />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Single role filter → flat list
  return (
    <div className="flex gap-0 items-stretch">
      <div
        className="min-w-15 min-h-22 shrink-0 flex items-center justify-center font-bold text-xl text-d-primary"
        style={{ backgroundColor: tier.color }}
      >
        {tier.label}
      </div>

      <div
        className="flex-1 flex flex-wrap gap-1 p-1.5 min-h-22"
        style={{ backgroundColor: tier.color + "11" }}
      >
        {filteredHeroes.length === 0 ? (
          <div className="flex items-center justify-center w-full text-gray-600 text-sm">
            —
          </div>
        ) : (
          filteredHeroes.map((hero) => (
            <TierHeroCard key={hero.heroId} hero={hero} />
          ))
        )}
      </div>
    </div>
  );
};

export default StaticTierRow;
