import { create } from "zustand";
import type { FamilyPhoto } from "@/types/content";

/** Full-screen photo viewer shared by the home photo wall and the families page. */
type ViewerState = {
  photos: FamilyPhoto[];
  index: number | null;
  open: (photos: FamilyPhoto[], index: number) => void;
  close: () => void;
  step: (delta: number) => void;
};

export const useViewer = create<ViewerState>((set, get) => ({
  photos: [],
  index: null,
  open: (photos, index) => set({ photos, index }),
  close: () => set({ index: null }),
  step: (delta) => {
    const { index, photos } = get();
    if (index === null || photos.length === 0) return;
    set({ index: (index + delta + photos.length) % photos.length });
  },
}));
