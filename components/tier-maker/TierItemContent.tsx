import { HERO_EXPERIENCE } from "@/static-database/hero";
import type { TierItem } from "../../types/item.type";
import { memo } from "react";

const TierItemContent = memo(
  ({
    item,
    isDragging,
    isActive,
  }: {
    item: TierItem;
    isDragging?: boolean;
    isActive?: boolean;
  }) => {
    const experienceData = HERO_EXPERIENCE.find(
      (exp) => exp.experience === item.heroExperience,
    );
    const color = experienceData?.borderColor || "border-blue-950";

    return (
      <div
        style={{
          opacity: isDragging ? 1 : isActive ? 0.5 : 1,
          outline: isDragging || isActive ? "2px solid #3b82f6" : "none",
        }}
      >
        <div className="w-16 h-20 flex flex-col items-center relative overflow-hidden group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.heroImage}
            alt={item.heroName || "Hero"}
            className={`w-full h-full object-cover transition-transform duration-300 opacity-75 hover:opacity-100 border-b-3 ${color}`}
          />
          <span className="block text-gray-200 font-medium text-xs truncate w-16 h-5 text-center">
            {item.heroName}
          </span>
        </div>
      </div>
    );
  },
);

TierItemContent.displayName = "TierItemContent";

export default TierItemContent;
