import { create } from "zustand";
import { TierItem } from "../types/item.type";

export type DraftMode = "ranked" | "tournament";
export type Team = "A" | "B";
export type SlotType = "ban" | "pick";

export interface DraftSlot {
  hero: TierItem | null;
  order?: number; // Order in the sequence if we want to enforce it later
}

export interface MatchState {
  id: string; // unique match id
  name?: string; // custom match name
  firstPickTeam: Team; // Which team has first pick
  blue: {
    bans: DraftSlot[];
    picks: DraftSlot[];
  };
  red: {
    bans: DraftSlot[];
    picks: DraftSlot[];
  };
}

export interface DraftConfig {
  mode: DraftMode;
  bestOf: number; // 1, 3, 5, 7
  banCount: number; // 3, 4, 5, 6
}

interface DraftStoreState {
  config: DraftConfig;
  matches: MatchState[];
  currentMatchIndex: number;
  teamAName: string;
  teamBName: string;

  // Selection State
  isHeroPoolOpen: boolean;
  selectingSlot: {
    matchIndex: number;
    team: Team;
    type: SlotType;
    index: number;
  } | null;

  // Actions
  updateConfig: (config: Partial<DraftConfig>) => void;
  resetDraft: () => void;
  updateTeamName: (team: Team, name: string) => void;
  toggleFirstPick: (matchIndex: number) => void;

  openHeroSelection: (
    matchIndex: number,
    team: Team,
    type: SlotType,
    index: number,
  ) => void;
  closeHeroSelection: () => void;
  selectHero: (hero: TierItem | null) => void;
  resetMatch: (matchIndex: number) => void;
  updateMatchName: (matchIndex: number, name: string) => void;

  setCurrentMatchIndex: (index: number) => void;
}

const createEmptyMatch = (
  banCount: number,
  pickCount: number = 5,
): MatchState => ({
  id: crypto.randomUUID(),
  firstPickTeam: "A",
  blue: {
    bans: Array(banCount)
      .fill(null)
      .map(() => ({ hero: null })),
    picks: Array(pickCount)
      .fill(null)
      .map(() => ({ hero: null })),
  },
  red: {
    bans: Array(banCount)
      .fill(null)
      .map(() => ({ hero: null })),
    picks: Array(pickCount)
      .fill(null)
      .map(() => ({ hero: null })),
  },
});

const useDraftStore = create<DraftStoreState>((set, get) => ({
  config: {
    mode: "ranked",
    bestOf: 1,
    banCount: 3,
  },
  matches: [createEmptyMatch(3)],
  currentMatchIndex: 0,
  teamAName: "Team A",
  teamBName: "Team B",

  isHeroPoolOpen: false,
  selectingSlot: null,

  updateConfig: (newConfig) => {
    set((state) => {
      const config = { ...state.config, ...newConfig };
      // Regenerate matches based on new config
      const matches = Array(config.bestOf)
        .fill(null)
        .map(() => createEmptyMatch(config.banCount));

      return {
        config,
        matches,
        currentMatchIndex: 0,
        isHeroPoolOpen: false,
        selectingSlot: null,
      };
    });
  },

  resetDraft: () => {
    const { config } = get();
    set({
      matches: Array(config.bestOf)
        .fill(null)
        .map(() => createEmptyMatch(config.banCount)),
      currentMatchIndex: 0,
      isHeroPoolOpen: false,
      selectingSlot: null,
    });
  },

  updateTeamName: (team, name) => {
    if (team === "A") {
      set({ teamAName: name });
    } else {
      set({ teamBName: name });
    }
  },

  toggleFirstPick: (matchIndex) => {
    const { matches } = get();
    const newMatches = [...matches];
    const match = { ...newMatches[matchIndex] };
    match.firstPickTeam = match.firstPickTeam === "A" ? "B" : "A";
    newMatches[matchIndex] = match;
    set({ matches: newMatches });
  },

  openHeroSelection: (matchIndex, team, type, index) => {
    set({
      isHeroPoolOpen: true,
      selectingSlot: { matchIndex, team, type, index },
    });
  },

  closeHeroSelection: () => {
    set({ isHeroPoolOpen: false, selectingSlot: null });
  },

  selectHero: (hero) => {
    const { selectingSlot, matches } = get();
    if (!selectingSlot) return;

    const { matchIndex, team, type, index } = selectingSlot;

    // Create new matches array to ensure immutability
    const newMatches = [...matches];
    const match = { ...newMatches[matchIndex] };
    const teamKey = team === "A" ? "blue" : "red";
    const teamData = { ...match[teamKey] };
    const slots = [...teamData[type === "ban" ? "bans" : "picks"]];

    slots[index] = { ...slots[index], hero };

    // Assign back
    teamData[type === "ban" ? "bans" : "picks"] = slots;
    match[teamKey] = teamData;
    newMatches[matchIndex] = match;

    set({
      matches: newMatches,
      isHeroPoolOpen: false,
      selectingSlot: null,
    });
  },

  setCurrentMatchIndex: (index) => set({ currentMatchIndex: index }),

  resetMatch: (matchIndex) => {
    const { matches, config } = get();
    const newMatches = [...matches];
    newMatches[matchIndex] = createEmptyMatch(config.banCount);
    set({ matches: newMatches });
  },

  updateMatchName: (matchIndex, name) => {
    const { matches } = get();
    const newMatches = [...matches];
    newMatches[matchIndex] = { ...newMatches[matchIndex], name };
    set({ matches: newMatches });
  },
}));

export default useDraftStore;
