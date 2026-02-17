import { create } from "zustand";
import type { TierItem } from "../types/item.type";

interface TierListState {
  activeItem: TierItem | undefined;
  setActiveItem: (item: TierItem | undefined) => void;
}

const useTierListStore = create<TierListState>((set) => ({
  activeItem: undefined,
  setActiveItem: (item: TierItem | undefined) => set({ activeItem: item }),
}));

export default useTierListStore;
