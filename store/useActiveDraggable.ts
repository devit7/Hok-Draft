import { create } from "zustand";
import type { DefaultDataDraggable } from "../types/dragable.type";

interface ActiveDraggableState {
  activeDraggable: DefaultDataDraggable | undefined;
  setActiveDraggable: (draggable: DefaultDataDraggable | undefined) => void;
}

const useActiveDraggable = create<ActiveDraggableState>((set) => ({
  activeDraggable: undefined,
  setActiveDraggable: (draggable: DefaultDataDraggable | undefined) =>
    set({ activeDraggable: draggable }),
}));

export default useActiveDraggable;
