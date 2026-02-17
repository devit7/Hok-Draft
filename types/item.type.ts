import type { HeroRole } from "@/components/hero-list/types";

export type TierItem = {
  id: string;
  heroId: number;
  heroName: string;
  heroImage: string;
  heroBody?: string;
  heroExperience?: string;
  heroRoles: HeroRole[];
  tierId?: string;
  columnId?: string; // which column the hero is placed in (e.g. "role-1", "custom-0")
};

export type TierZone = {
  id: string;
  label: string;
  color: string;
};
