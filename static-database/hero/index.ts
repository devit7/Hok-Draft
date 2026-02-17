// Export all hero-related data and types from a single entry point

// Hero List
export { HERO_LIST } from "./hero-list-simple";

// Hero Tags
export { HERO_TAG, type HeroTag } from "./hero-tag";

// Hero Roles
export { HERO_ROLE } from "./hero-role";

// Hero Experience Levels
export { HERO_EXPERIENCE, type HeroExperience } from "./hero-experience";

// Hero Power Spikes
export { HERO_POWER_SPIKE, type HeroPowerSpike } from "./hero-scaling";

// Re-export HeroRole type if needed elsewhere
export type { HeroRole } from "@/components/hero-list";
