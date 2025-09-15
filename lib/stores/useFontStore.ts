// import { create } from "zustand";
// // import * as THREE from "three";
// import type { Font } from "three/examples/jsm/loaders/FontLoader.js";

// interface FontStore {
//   font: Font | null;
//   setFont: (font: Font) => void;
// }

// export const useFontStore = create<FontStore>((set) => ({
//   font: null,
//   setFont: (font) => set({ font }),
// }));

"use client";

import { create } from "zustand";

interface FontState {
  font: any | null;
  isLoading: boolean;
  setFont: (font: any) => void;
  setLoading: (loading: boolean) => void;
}

export const useFontStore = create<FontState>((set) => ({
  font: null,
  isLoading: false,
  setFont: (font) => set({ font }),
  setLoading: (isLoading) => set({ isLoading }),
}));
