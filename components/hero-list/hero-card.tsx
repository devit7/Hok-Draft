import Image from "next/image";
import { HeroRole } from "./types";
import { HERO_EXPERIENCE } from "@/static-database/hero/hero-experience";

interface HeroCardProps {
  heroName?: string;
  heroImage?: string;
  heroRole?: HeroRole[];
  heroExperience?: string;
}

export const HeroCard = ({
  heroName,
  heroImage,
  heroRole,
  heroExperience,
}: HeroCardProps) => {
  // Find the color based on experience
  const experienceData = HERO_EXPERIENCE.find(
    (exp) => exp.experience === heroExperience,
  );
  const gradientColor = experienceData?.cardColor || "blue-950";

  return (
    <div>
      <div className="w-full aspect-4/5 bg-d-primary-surface flex flex-col items-center relative overflow-hidden cursor-pointer group">
        <Image
          src={heroImage ? `/asset/hero/${heroImage}` : ""}
          alt="Hero Image"
          width={1000}
          height={1000}
          className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Role badges */}
        <div className="absolute top-0 left-0 right-0 h-full w-30 bg-linear-to-r from-blue-950/90 via-black/0 to-transparent pointer-events-none" />
        <div className="absolute top-2 left-2 flex flex-col gap-1 pointer-events-none">
          {heroRole?.map((role) => (
            <div
              key={role.id}
              className="w-7 h-7 rotate-45 border border-gray-300/50 backdrop-blur-xs flex items-center justify-center"
            >
              <Image
                src={role.icon}
                alt={role.role}
                width={20}
                height={20}
                className="w-5 h-5 -rotate-45 object-contain"
              />
            </div>
          ))}
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t ${gradientColor} to-transparent pointer-events-none`}
        />
        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
          <span className="text-white font-medium text-xl ">{heroName}</span>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;