// Sample counter pick data — replace with your exported counter-pick-data.ts content

import type { HeroRole } from "@/components/hero-list/types";

export type CounterHero = {
  heroId: number;
  heroName: string;
  heroImage: string;
};

export type CounterPickEntry = {
  heroId: number;
  heroName: string;
  heroImage: string;
  heroRoles: readonly HeroRole[];
  counters: readonly CounterHero[];
};

export type CounterPickExport = {
  title: string;
  entries: readonly CounterPickEntry[];
};

// Paste your exported COUNTER_PICK_DATA here
export const COUNTER_PICK_DATA: CounterPickExport = {
  title: "Counter Pick List",
  entries: [],
};
