import { create } from "zustand";

/**
 * Curtain lifecycle for page transitions:
 * intro (first paint) → idle → covering (link clicked) → covered (route ready) → lifting → idle
 */
export type CurtainState = "intro" | "idle" | "covering" | "covered" | "lifting";

type UiState = {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  curtain: CurtainState;
  setCurtain: (state: CurtainState) => void;
};

export const useUi = create<UiState>((set) => ({
  menuOpen: false,
  setMenuOpen: (menuOpen) => set({ menuOpen }),
  curtain: "intro",
  setCurtain: (curtain) => set({ curtain }),
}));
