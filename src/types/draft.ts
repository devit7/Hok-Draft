export type DraftPhase = 
  | "config"
  | "blueBan1" | "redBan1" 
  | "blueBan2" | "redBan2"
  | "blueBan3" | "redBan3"
  | "blueBan4" | "redBan4" 
  | "blueBan5" | "redBan5"
  | "bluePick1" | "redPick1" 
  | "bluePick2" | "redPick2" 
  | "bluePick3" | "redPick3" 
  | "bluePick4" | "redPick4" 
  | "bluePick5" | "redPick5"
  | "complete";

export type Team = "blue" | "red";

export type DraftConfiguration = {
  useTimer: boolean;
  timerDuration: number;
  banCount: number;
  pickCount: number;
  draftSequence: DraftPhase[];
  heroes: string[];
};

export type DraftSlot = {
  hero: string | null;
  status: "active" | "pending" | "completed";
  phase: DraftPhase;
};
