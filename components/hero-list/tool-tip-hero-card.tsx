"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Hero } from "./types";
import { HERO_EXPERIENCE } from "@/static-database/hero";
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
} from "../ui/hyprid-tooltip";

interface ToolTipHeroCardProps {
  children: React.ReactNode;
  hero: Hero;
}

export const ToolTipHeroCard = ({ children, hero }: ToolTipHeroCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const roleNames = hero.role
    .map((r) => (r.role === "Class Lane" ? "Clash Lane" : r.role))
    .join(", ");

  const experienceData = HERO_EXPERIENCE.find(
    (exp) => exp.experience === hero.heroExperience,
  );
  const experienceColor = experienceData?.color || "bg-blue-400";

  return (
    <HybridTooltip
      open={isOpen}
      onOpenChange={setIsOpen}
      delayDuration={0}
      // disableHoverableContent={!isMobile}
    >
      <HybridTooltipTrigger
        onClick={(e) => {
          if (isMobile) {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
      >
        {children}
      </HybridTooltipTrigger>
      <HybridTooltipContent side="top">
        <div className="w-85 sm:w-sm">
          {/* BannerImage */}
          <div className="relative max-h-22.25 overflow-hidden bg-gray-900">
            <Image
              src={hero.media.heroCover}
              alt={hero.heroName}
              width={300}
              height={300}
              loading="eager"
              className="w-full h-full object-cover opacity-90"
            />
            {/* Gradient overlays from all sides */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-20 bg-linear-to-b from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-black/80 to-transparent" />
              <div className="absolute top-0 bottom-0 left-0 w-20 bg-linear-to-r from-black/80 to-transparent" />
              <div className="absolute top-0 bottom-0 right-0 w-20 bg-linear-to-l from-black/80 to-transparent" />
            </div>
            {/* Hero Name & Info */}
            <div className="absolute bottom-3 left-3 flex items-center gap-3 pointer-events-none">
              <div>
                <span className="text-lg font-medium">{hero.heroName}</span>
                <p className="text-sm text-gray-300">
                  {hero.heroCareer} • {roleNames}
                </p>
              </div>
            </div>
          </div>
          <div className="my-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-200 font-medium">
                {hero.powerSpike.join(" - ")} Game
              </span>
              <div className="flex items-center gap-1.5">
                <div className={`h-3 w-3 ${experienceColor} rounded-xs`}></div>
                <span className="text-sm text-gray-300">
                  {hero.heroExperience}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1 p-3 rounded flex flex-col items-center">
                <span className="text-xs text-gray-400">Win rate</span>
                <span className="text-2xl font-bold text-white">
                  {(hero.winRate * 100).toFixed(1)}
                  <span className="text-sm">%</span>
                </span>
              </div>
              <div className="flex-1 p-3 rounded flex flex-col items-center">
                <span className="text-xs text-gray-400">Pick rate</span>
                <span className="text-2xl font-bold text-white">
                  {(hero.showRate * 100).toFixed(1)}
                  <span className="text-sm">%</span>
                </span>
              </div>
              <div className="flex-1 p-3 rounded flex flex-col items-center">
                <span className="text-xs text-gray-400">Ban rate</span>
                <span className="text-2xl font-bold text-white">
                  {(hero.banRate * 100).toFixed(1)}
                  <span className="text-sm">%</span>
                </span>
              </div>
            </div>
            {/* Tags */}
            {hero.tags.length > 0 && (
              <div>
                <span className="text-sm text-gray-400">TAG:</span>
                <div className="mt-1 flex flex-wrap gap-2 uppercase text-xs font-medium text-gray-300">
                  {hero.tags.map((tag) => (
                    <div key={tag} className="bg-gray-800 p-0.5">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </HybridTooltipContent>
    </HybridTooltip>
  );
};
