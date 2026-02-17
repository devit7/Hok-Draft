import Image from "next/image";
import { HeroRole } from "./types";
import { HERO_EXPERIENCE } from "@/static-database/hero/hero-experience";

import { cn } from "@/lib/utils";

interface HeroCardProps {
  heroName?: string;
  heroImage?: string;
  heroRole?: HeroRole[];
  heroExperience?: string;
  className?: string;
}

export const HeroCardBase = ({
  heroName,
  heroImage,
  heroRole,
  heroExperience,
  className,
}: HeroCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-28 aspect-4/5 bg-d-primary-surface flex flex-col items-center relative overflow-hidden cursor-pointer group",
          className,
        )}
      >
        <Image
          src={heroImage ? `/asset/hero/${heroImage}` : ""}
          alt="Hero Image"
          width={1000}
          height={1000}
          className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-transform duration-1000 group-hover:scale-110"
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-blue-950/80 via-blue-950/70 to-transparent pointer-events-none`}
        />
      </div>
      <span className="text-gray-200 font-medium text-sm mt-0.5 truncate w-20 md:w-auto">
        {heroName}
      </span>
    </div>
  );
};
