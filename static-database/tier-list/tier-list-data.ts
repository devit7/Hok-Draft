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

export const TIER_LIST_DATA = {
  title: "Custom Tier List",
  columnMode: "all-roles",
  tiers: [
    {
      label: "T0",
      color: "#ef5350",
      heroes: [
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
        {
          heroId: 146,
          heroName: "Luna",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/hz3BqNue.png",
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
          heroId: 182,
          heroName: "Gan & Mo",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/ui5UKQex.png",
          heroExperience: "Advanced",
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
          heroId: 564,
          heroName: "Mayene",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/FsGXCnH1.png",
          heroExperience: "Intermediate",
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
          heroId: 134,
          heroName: "Dharma",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/9u997w0x.png",
          heroExperience: "Intermediate",
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
          heroId: 179,
          heroName: "Nuwa",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/E39kxNsD.png",
          heroExperience: "Advanced",
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
          heroId: 577,
          heroName: "Dyadia",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/Qdvu6qgO.png",
          heroExperience: "Intermediate",
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
          heroId: 176,
          heroName: "Yuhuan",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/r97AVgaV.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 118,
          heroName: "Sun Bin",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/1zkBQ1l1.png",
          heroExperience: "Advanced",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
          ],
          columnId: "role-5",
        },
      ],
    },
    {
      label: "T1",
      color: "#ec6563",
      heroes: [
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
          heroId: 133,
          heroName: "Di Renjie",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/XTSDAJkR.png",
          heroExperience: "Easy",
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
          heroId: 177,
          heroName: "Chano",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/default/sJURXorM.png",
          heroExperience: "Easy",
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
          heroId: 155,
          heroName: "Erin",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/joVNQWhw.png",
          heroExperience: "Easy",
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
          heroId: 519,
          heroName: "Ao'yin",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/OzH2TSZN.jpg",
          heroExperience: "Intermediate",
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
          heroId: 128,
          heroName: "Fatih",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/default/6IY77h7c.png",
          heroExperience: "Easy",
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
          ],
          columnId: "role-1",
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
        {
          heroId: 198,
          heroName: "Menki",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/Ym7KcrIW.png",
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
        {
          heroId: 503,
          heroName: "Biron",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/F3A0JkoT.png",
          heroExperience: "Easy",
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
          heroId: 558,
          heroName: "Umbrosa",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/ioDVAbAf.jpg",
          heroExperience: "Easy",
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
          ],
          columnId: "role-1",
        },
        {
          heroId: 536,
          heroName: "Charlotte",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/iIwO0Kwk.png",
          heroExperience: "Intermediate",
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
          heroId: 139,
          heroName: "Fuzi",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/UhQkVUBi.png",
          heroExperience: "Easy",
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
          heroId: 105,
          heroName: "Lian Po",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/csLOp1dL.png",
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
          heroId: 157,
          heroName: "Mai Shiranui",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/4jaM0F19.png",
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
          heroId: 176,
          heroName: "Yuhuan",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/r97AVgaV.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-3",
        },
        {
          heroId: 110,
          heroName: "Garuda",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/default/h6UHy1TN.png",
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
          heroId: 106,
          heroName: "Xiao Qiao",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/paTVVlNq.png",
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
          heroId: 171,
          heroName: "Zhang Fei",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/w0QS7N1L.png",
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
          heroId: 156,
          heroName: "Liang",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/cNugkXGO.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 114,
          heroName: "Liu Shan",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/i8WMjP6d.png",
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
      ],
    },
    {
      label: "T2",
      color: "#ffbe7c",
      heroes: [
        {
          heroId: 111,
          heroName: "Lady Sun",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/BmY46Zgb.png",
          heroExperience: "Easy",
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
          heroId: 159,
          heroName: "Dolia",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/tfvb3IJf.png",
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
          heroId: 108,
          heroName: "Mozi",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/Za4OlJ6t.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 187,
          heroName: "Donghuang",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/PRcq49iS.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
            {
              id: 1,
              role: "Class Lane",
              icon: "/asset/role/class-lane.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 514,
          heroName: "Allain",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/Ek9OHopQ.png",
          heroExperience: "Easy",
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
          heroId: 123,
          heroName: "Lu Bu",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/dXLF2kE7.png",
          heroExperience: "Easy",
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
          heroId: 522,
          heroName: "Yao",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/xw0HrvxD.png",
          heroExperience: "Intermediate",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-1",
        },
        {
          heroId: 166,
          heroName: "Arthur",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/YTBrsBIg.png",
          heroExperience: "Easy",
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
          heroId: 523,
          heroName: "Shi",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/MjBadKpJ.png",
          heroExperience: "Advanced",
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
          heroId: 124,
          heroName: "Zhou Yu",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/kqkpA18w.png",
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
          heroId: 190,
          heroName: "Kongming",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/XDnXeq3x.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
          ],
          columnId: "role-3",
        },
        {
          heroId: 127,
          heroName: "Lady Zhen",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/gqPEOybC.png",
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
          heroId: 522,
          heroName: "Yao",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/xw0HrvxD.png",
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
          columnId: "role-2",
        },
        {
          heroId: 528,
          heroName: "Lam",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/02i6M2YK.png",
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
          heroId: 163,
          heroName: "Ukyo Tachibana",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/8e9WRFgL.png",
          heroExperience: "Intermediate",
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
        {
          heroId: 581,
          heroName: "Flowborn (Tank)",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/jbrX5mQc.jpeg",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-1",
        },
        {
          heroId: 135,
          heroName: "Xiang Yu",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/FLyy9J46.png",
          heroExperience: "Easy",
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
          heroId: 152,
          heroName: "Wang Zhaojun",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/lhZtGJlg.png",
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
          heroId: 169,
          heroName: "Hou Yi",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/S5isJokI.png",
          heroExperience: "Easy",
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
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
            {
              id: 4,
              role: "Farm Lane",
              icon: "/asset/role/farm-lane.png",
            },
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
          ],
          columnId: "role-4",
        },
        {
          heroId: 584,
          heroName: "Flowborn (Marksman)",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/WuG07My1.jpeg",
          heroExperience: "Easy",
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
          heroId: 174,
          heroName: "Consort Yu",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/Ku5RzFmQ.png",
          heroExperience: "Easy",
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
          heroId: 132,
          heroName: "Marco Polo",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/48d8GxkP.png",
          heroExperience: "Easy",
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
          heroId: 149,
          heroName: "Liu Bang",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/bVHGeH45.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
            {
              id: 1,
              role: "Class Lane",
              icon: "/asset/role/class-lane.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 581,
          heroName: "Flowborn (Tank)",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/jbrX5mQc.jpeg",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 534,
          heroName: "Sakeer",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/ionwVFtV.png",
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
      ],
    },
    {
      label: "T3",
      color: "#bfff7f",
      heroes: [
        {
          heroId: 510,
          heroName: "Sun Ce",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/Te1nmDGP.png",
          heroExperience: "Intermediate",
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
          heroId: 180,
          heroName: "Nezha",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/WDh84DWg.png",
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
          columnId: "role-1",
        },
        {
          heroId: 193,
          heroName: "Kaizer",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/xUdtJiLO.png",
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
          columnId: "role-1",
        },
        {
          heroId: 533,
          heroName: "Agudo",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/TYN9rh81.png",
          heroExperience: "Easy",
          heroRoles: [
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
          heroId: 167,
          heroName: "Wukong",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/Go3mMeu4.png",
          heroExperience: "Easy",
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
          heroId: 178,
          heroName: "Yang Jian",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/LntokS4z.png",
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
        {
          heroId: 107,
          heroName: "Zilong",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/9xqbsAQC.png",
          heroExperience: "Easy",
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
          heroId: 121,
          heroName: "Mi Yue",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/eHvcCJb0.png",
          heroExperience: "Easy",
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
          heroId: 120,
          heroName: "Bai Qi",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/uY7c38Tt.png",
          heroExperience: "Easy",
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
          ],
          columnId: "role-1",
        },
        {
          heroId: 190,
          heroName: "Kongming",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/XDnXeq3x.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
          ],
          columnId: "role-2",
        },
        {
          heroId: 538,
          heroName: "Ying",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/diRuUQDV.png",
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
          heroId: 556,
          heroName: "Ata",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/eafz1moy.png",
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
        {
          heroId: 193,
          heroName: "Kaizer",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/xUdtJiLO.png",
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
        {
          heroId: 150,
          heroName: "Han Xin",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/QTcSGEgM.png",
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
          heroId: 148,
          heroName: "Ziya",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/km2HzQ71.png",
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
          heroId: 582,
          heroName: "Flowborn (Mage)",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/66xErXNs.jpeg",
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
          heroId: 141,
          heroName: "Diaochan",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/qFBebEbk.png",
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
          heroId: 196,
          heroName: "Shouyue",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/4bUKKH66.png",
          heroExperience: "Intermediate",
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
          heroId: 142,
          heroName: "Angela",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/wjaExUFU.png",
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
          heroId: 173,
          heroName: "Fang",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/6dGNjKTe.png",
          heroExperience: "Easy",
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
          heroId: 563,
          heroName: "Heino",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/YO6iwLAg.jpg",
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
          heroId: 115,
          heroName: "Gao",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/QWFCuWNn.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-3",
        },
        {
          heroId: 113,
          heroName: "Zhuangzi",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/UZC54GWu.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 507,
          heroName: "Li Xin",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/mWSBbpVr.png",
          heroExperience: "Easy",
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
          heroId: 117,
          heroName: "Wuyan",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/D1f9UN1O.png",
          heroExperience: "Easy",
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
          heroId: 105,
          heroName: "Lian Po",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/csLOp1dL.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
          ],
          columnId: "role-1",
        },
        {
          heroId: 556,
          heroName: "Ata",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/eafz1moy.png",
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
          columnId: "role-1",
        },
        {
          heroId: 178,
          heroName: "Yang Jian",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/LntokS4z.png",
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
          columnId: "role-1",
        },
        {
          heroId: 126,
          heroName: "Dun",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/23rrkYYy.png",
          heroExperience: "Easy",
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
          ],
          columnId: "role-1",
        },
        {
          heroId: 508,
          heroName: "Garo",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/g0jHNDf6.png",
          heroExperience: "Easy",
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
          heroId: 126,
          heroName: "Dun",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/23rrkYYy.png",
          heroExperience: "Easy",
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
          ],
          columnId: "role-5",
        },
        {
          heroId: 184,
          heroName: "Cai Yan",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/kQXkW7ab.png",
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
          heroId: 175,
          heroName: "Kui",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/wRGzV266.png",
          heroExperience: "Intermediate",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
          ],
          columnId: "role-5",
        },
      ],
    },
    {
      label: "T4",
      color: "#76f8f8",
      heroes: [
        {
          heroId: 113,
          heroName: "Zhuangzi",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/UZC54GWu.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-1",
        },
        {
          heroId: 129,
          heroName: "Dian Wei",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/y6IMFSlI.png",
          heroExperience: "Easy",
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
          heroId: 170,
          heroName: "Liu Bei",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/argPlTxR.png",
          heroExperience: "Easy",
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
          heroId: 646,
          heroName: "Butterfly",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/FPq2P4ew.png",
          heroExperience: "Easy",
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
          heroId: 192,
          heroName: "Huang Zhong",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/LNECT7PW.png",
          heroExperience: "Easy",
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
          heroId: 131,
          heroName: "Li Bai",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/k3w1wjDA.png",
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
          heroId: 153,
          heroName: "Gao Changgong",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/hwk1ad6d.png",
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
          heroId: 137,
          heroName: "Sima Yi",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/sU3BsR6P.png",
          heroExperience: "Easy",
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
          heroId: 162,
          heroName: "Nakoruru",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/H9WAmWdN.png",
          heroExperience: "Easy",
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
          columnId: "role-5",
        },
        {
          heroId: 152,
          heroName: "Wang Zhaojun",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/lhZtGJlg.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 119,
          heroName: "Dr Bian",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/YmpeG9H2.png",
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
          heroId: 504,
          heroName: "Milady",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/orlOit3f.png",
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
          heroId: 513,
          heroName: "Shangguan",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/zyA68GFr.png",
          heroExperience: "Advanced",
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
          columnId: "role-1",
        },
        {
          heroId: 505,
          heroName: "Yaria",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/uHnzeJbu.png",
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
          heroId: 191,
          heroName: "Da Qiao",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/IEPtzR5z.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 524,
          heroName: "Meng Ya",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/vhBTA9jh.png",
          heroExperience: "Easy",
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
          heroId: 112,
          heroName: "Luban No.7",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/0VBMiUN5.png",
          heroExperience: "Easy",
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
          heroId: 547,
          heroName: "Luara",
          heroImage:
            "https://camp.honorofkings.com/camp/admin/hero/head_128-128/znRnu3kt.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 4,
              role: "Farm Lane",
              icon: "/asset/role/farm-lane.png",
            },
          ],
          columnId: "role-4",
        },
      ],
    },
    {
      label: "T5",
      color: "#c084fc",
      heroes: [
        {
          heroId: 149,
          heroName: "Liu Bang",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/bVHGeH45.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
            {
              id: 1,
              role: "Class Lane",
              icon: "/asset/role/class-lane.png",
            },
          ],
          columnId: "role-1",
        },
        {
          heroId: 506,
          heroName: "Cirrus",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/bwygx1aS.png",
          heroExperience: "Easy",
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
          heroId: 116,
          heroName: "Arke",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/IUMPYUy4.png",
          heroExperience: "Easy",
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
          heroId: 183,
          heroName: "Athena",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/BEh6QC3Q.png",
          heroExperience: "Easy",
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
          heroId: 189,
          heroName: "Guiguzi",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/AXjJlMvi.png",
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
          heroId: 191,
          heroName: "Da Qiao",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/IEPtzR5z.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 5,
              role: "Roamer",
              icon: "/asset/role/roamer.png",
            },
            {
              id: 3,
              role: "Mid Lane",
              icon: "/asset/role/mid-lane.png",
            },
          ],
          columnId: "role-3",
        },
        {
          heroId: 545,
          heroName: "Alessio",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/nnafEHV0.png",
          heroExperience: "Easy",
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
          columnId: "role-5",
        },
        {
          heroId: 148,
          heroName: "Ziya",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/km2HzQ71.png",
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
          columnId: "role-5",
        },
        {
          heroId: 183,
          heroName: "Athena",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/BEh6QC3Q.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 2,
              role: "Jungle",
              icon: "/asset/role/jungle.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 501,
          heroName: "Ming",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/ubeT1R84.png",
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
          heroId: 514,
          heroName: "Allain",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/Ek9OHopQ.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 1,
              role: "Class Lane",
              icon: "/asset/role/class-lane.png",
            },
          ],
          columnId: "role-5",
        },
        {
          heroId: 155,
          heroName: "Erin",
          heroImage:
            "https://camp.honorofkings.com/social/game/src/image_hero_head_128*128/joVNQWhw.png",
          heroExperience: "Easy",
          heroRoles: [
            {
              id: 4,
              role: "Farm Lane",
              icon: "/asset/role/farm-lane.png",
            },
          ],
          columnId: "role-3",
        },
      ],
    },
  ],
} as const;
