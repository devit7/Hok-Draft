"use client";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { HeroRole } from "./types";
import type { HeroExperience } from "@/static-database/hero";

interface HeroFilterProps {
  listRole: HeroRole[];
  listExperience: HeroExperience[];
  selectedRole: number | null;
  selectedExperience: string | null;
  onRoleSelect?: (roleId: number | null) => void;
  onExperienceSelect?: (experience: string | null) => void;
  onSearch?: (query: string) => void;
}

export const HeroFilter = ({
  listRole,
  listExperience,
  selectedRole,
  selectedExperience,
  onRoleSelect,
  onExperienceSelect,
  onSearch,
}: HeroFilterProps) => {
  return (
    <div className="mt-8 space-y-4">
      {/* Role Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="flex border-y border-d-primary-surface w-full lg:w-fit items-center overflow-x-auto no-scrollbar">
          <div
            className={`h-12 border-x px-4 py-2 flex shrink-0 items-center border-d-primary-surface text-lg font-medium cursor-pointer transition-colors ${
              selectedRole === null
                ? "bg-blue-600 text-white"
                : "hover:bg-d-primary-surface"
            }`}
            onClick={() => onRoleSelect?.(null)}
          >
            All Role
          </div>
          {listRole.map((role) => (
            <div
              key={role.role}
              className={`px-4 py-2 border-r shrink-0 border-d-primary-surface flex items-center cursor-pointer transition-colors ${
                selectedRole === role.id
                  ? "bg-blue-600"
                  : "hover:bg-d-primary-surface"
              }`}
              onClick={() => onRoleSelect?.(role.id)}
            >
              <Image
                src={role.icon}
                alt={role.role}
                width={40}
                height={40}
                className="h-8 w-8 object-contain"
              />
            </div>
          ))}
        </div>
        <InputGroup className="w-full lg:max-w-xs h-12 text-lg rounded-xs border-d-primary-surface">
          <InputGroupInput
            className="h-12"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
          />
          <InputGroupAddon className="h-12">
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Experience Filter */}
      <div className="flex border-y border-d-primary-surface w-full lg:w-fit items-center overflow-x-auto no-scrollbar">
        <div
          className={`h-10 border-x px-4 py-2 shrink-0 flex items-center border-d-primary-surface text-sm font-medium cursor-pointer transition-colors ${
            selectedExperience === null
              ? "bg-blue-600 text-white"
              : "hover:bg-d-primary-surface"
          }`}
          onClick={() => onExperienceSelect?.(null)}
        >
          All Difficulty
        </div>
        {listExperience.map((exp) => (
          <div
            key={exp.experience}
            className={`px-4 py-2 border-r shrink-0 border-d-primary-surface flex items-center gap-2 cursor-pointer transition-colors text-sm ${
              selectedExperience === exp.experience
                ? "bg-blue-600 text-white"
                : "hover:bg-d-primary-surface"
            }`}
            onClick={() => onExperienceSelect?.(exp.experience)}
          >
            <div className={`h-3 w-3 ${exp.color} rounded-sm`}></div>
            <span>{exp.experience}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
