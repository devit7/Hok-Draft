export type HeroExperience = {
  id: number;
  experience: string;
  color: string;
  cardColor: string;
  borderColor: string;
};

export const HERO_EXPERIENCE: HeroExperience[] = [
  {
    id: 1,
    experience: "Easy",
    color: "bg-green-400",
    cardColor: "from-cyan-950/60 via-cyan-950/40",
    borderColor: "border-green-400",
  },
  {
    id: 2,
    experience: "Intermediate",
    color: "bg-amber-400",
    cardColor: "from-amber-950/50 via-amber-950/40",
    borderColor: "border-amber-400",
  },
  {
    id: 3,
    experience: "Advanced",
    color: "bg-red-400",
    cardColor: "from-purple-950/50 via-purple-950/40",
    borderColor: "border-red-400",
  },
];
