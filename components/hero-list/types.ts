export interface HeroRole {
  id: number;
  role: string;
  icon: string;
}

export interface HeroMedia {
  heroCover: string;
  heroIcon: string;
  heroBody: string;
}

export interface Hero {
  heroId: number;
  heroName: string;
  heroCareer: string;
  showRate: number;
  banRate: number;
  winRate: number;
  media: HeroMedia;
  heroExperience: string;
  role: HeroRole[];
  tags: string[];
  powerSpike: string[];
}
