import { create } from "zustand";
import * as THREE from "three";
import { Font } from "three/examples/jsm/loaders/FontLoader";

interface FontStore {
  font: Font | null;
  setFont: (font: Font) => void;
}

export const useFontStore = create<FontStore>((set) => ({
  font: null,
  setFont: (font) => set({ font }),
}));
