// Sample tier list data — replace with your exported tier-list-data.ts content
// This is a placeholder structure matching the export format from custom-tier-maker

import type { HeroRole } from "@/components/hero-list/types";

export type TierHero = {
  heroId: number;
  heroName: string;
  heroImage: string;
  heroExperience?: string;
  heroRoles: readonly HeroRole[];
  columnId?: string;
};

export type TierData = {
  label: string;
  color: string;
  heroes: readonly TierHero[];
};

export type TierListExport = {
  title: string;
  columnMode: string;
  tiers: readonly TierData[];
};

// Paste your exported TIER_LIST_DATA here
export const TIER_LIST_DATA = {
  title: "Custom Tier List",
  columnMode: "all-roles",
  tiers: [
    {
      label: "T0",
      color: "#ef5350",
      heroes: [
        {
          heroId: 521,
          heroName: "Haya",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/iIdXNhQ5.png",
          heroExperience: "Intermediate",
          heroRoles: [
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
          ],
          columnId: "role-3",
        },
        {
          heroId: 154,
          heroName: "Mulan",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/p4dfuWXS.png",
          heroExperience: "Advanced",
          heroRoles: [
            {
              id: 1,
              role: "Class Lane",
              icon: "/asset/role/class-lane.png",
            },
          ],
          columnId: "role-1",
        },
        {
          heroId: 140,
          heroName: "Guan Yu",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/V5e2k18Z.png",
          heroExperience: "Advanced",
          heroRoles: [
            {
              id: 1,
              role: "Class Lane",
              icon: "/asset/role/class-lane.png",
            },
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
          ],
          columnId: "role-1",
        },
        {
          heroId: 168,
          heroName: "Lapulapu",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/default/AuWJ7G0J.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 197,
          heroName: "Yixing",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/RLA5jvBk.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
          ],
          columnId: "role-3",
        },
        {
          heroId: 502,
          heroName: "Pei",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/XlRczGYM.png",
          heroExperience: "Intermediate",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-2",
        },
        {
          heroId: 199,
          heroName: "Arli",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/hF8AFVqh.png",
          heroExperience: "Advanced",
          heroRoles: [
            {
              id: 4,
              role: "Farm Lane",
              icon: "/asset/role/farm-lane.png",
            },
          ],
          columnId: "role-4",
        },
        {
          heroId: 531,
          heroName: "Jing",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/HVRw4cpB.png",
          heroExperience: "Advanced",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-2",
        },
      ],
    },
    {
      label: "T1",
      color: "#ec6563",
      heroes: [
        {
          heroId: 172,
          heroName: "Chicha",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/lkU98jAV.png",
          heroExperience: "Intermediate",
          heroRoles: [
            {
              id: 1,
              role: "Class Lane",
              icon: "/asset/role/class-lane.png",
            },
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
            {
              id: 4,
              role: "Farm Lane",
              icon: "/asset/role/farm-lane.png",
            },
          ],
          columnId: "role-4",
        },
        {
          heroId: 109,
          heroName: "Daji",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/dYxuS6IA.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
          ],
          columnId: "role-3",
        },
        {
          heroId: 130,
          heroName: "Musashi",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/jgvSlz3u.png",
          heroExperience: "Intermediate",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-2",
        },
        {
          heroId: 542,
          heroName: "Feyd",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/m8aOqFQE.png",
          heroExperience: "Intermediate",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-2",
        },
        {
          heroId: 517,
          heroName: "Augran",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/ue6KY05b.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
            {
              id: 1,
              role: "Class Lane",
              icon: "/asset/role/class-lane.png",
            },
          ],
          columnId: "role-2",
        },
      ],
    },
    {
      label: "T2",
      color: "#ffbe7c",
      heroes: [],
    },
    {
      label: "T3",
      color: "#bfff7f",
      heroes: [],
    },
    {
      label: "T4",
      color: "#76f8f8",
      heroes: [],
    },
  ],
} as const;
