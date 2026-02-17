import Image from "next/image";
import { HERO_EXPERIENCE } from "@/static-database/hero/hero-experience";
import { HERO_LIST_ENRICHED } from "@/static-database/main/hero-list-enriched";
import { ToolTipHeroCard } from "@/components/hero-list/tool-tip-hero-card";
import type { TierHero } from "@/static-database/tier-list/tier-list-data";

const TierHeroCard = ({ hero }: { hero: TierHero }) => {
  const experienceData = HERO_EXPERIENCE.find(
    (exp) => exp.experience === hero.heroExperience,
  );
  const borderColor = experienceData?.borderColor || "border-blue-950";

  // Look up full hero data for tooltip
  const fullHero = HERO_LIST_ENRICHED.find((h) => h.heroId === hero.heroId);

  const card = (
    <div className="w-16 h-20 cursor-pointer flex flex-col items-center overflow-hidden relative group">
      <Image
        src={hero.heroImage}
        alt={hero.heroName}
        width={64}
        height={64}
        className={`w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity border-b-3 ${borderColor}`}
      />
      <span className="block text-gray-200 font-medium text-xs truncate w-16 text-center h-6">
        {hero.heroName}
      </span>
    </div>
  );

  if (!fullHero) return card;

  return <ToolTipHeroCard hero={fullHero}>{card}</ToolTipHeroCard>;
};

export default TierHeroCard;
