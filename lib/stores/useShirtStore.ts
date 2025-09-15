// // stores/useShirtStore.ts
// import { create } from "zustand";

// interface ShirtStoreState {
//   shirtColor: string;
//   accentColor1: string;
//   accentColor2: string;
//   logoFile: File | null;
//   logoPreview: string | null;
//   logoPosition: string;
//   textContent: string;
//   textContent2: string;
//   textColor: string;
//   textStyle: string;
//   hasOutline: boolean;
//   outlineColor: string;
//   isRotating: boolean;
//   isLoading: boolean;
//   currentView: string;
//   animateShirt: boolean;
//   lastColorChange: number;
//   showBackdrop: boolean;
//   activeSheet: string | null;
//   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
//   setField: (field: keyof ShirtStoreState, value: any) => void;
//   setMultiple: (values: Partial<ShirtStoreState>) => void;
// }

// export const useShirtStore = create<ShirtStoreState>((set) => ({
//   shirtColor: "#ffffff",
//   accentColor1: "#4a90e2",
//   accentColor2: "#e74c3c",
//   logoFile: null,
//   logoPreview: null,
//   logoPosition: "chest",
//   textContent: "3",
//   textContent2: "ABCDEFGH",
//   textColor: "#000000",
//   textStyle: "curved",
//   hasOutline: false,
//   outlineColor: "#ffffff",
//   isRotating: true,
//   isLoading: false,
//   animateShirt: false,
//   lastColorChange: Date.now(),
//   showBackdrop: true,
//   activeSheet: null,
//   currentView: "front",

//   // biome-ignore lint/suspicious/noExplicitAny: <explanation>
//   setField: (key, value) => set({ [key]: value } as any),
//   setMultiple: (updates) => set(updates),
// }));

// export const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { setField, setMultiple } = useShirtStore.getState();

//   if (e.target.files?.[0]) {
//     const file = e.target.files[0];
//     setField("logoFile", file);

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       if (e.target?.result) {
//         setField("logoPreview", e.target.result as string);
//         // Trigger animation when logo changes
//         setField("animateShirt", true);
//         setTimeout(() => setField("animateShirt", false), 800);
//       }
//     };
//     reader.readAsDataURL(file);
//   }
// };

// export const handleDownload = (
//   canvasRef: React.RefObject<HTMLCanvasElement>
// ) => {
//   const { setField } = useShirtStore.getState();
//   // In a real app, this would capture the canvas and download the image
//   setField("isLoading", true);

//   setTimeout(() => {
//     if (canvasRef.current) {
//       // This is a simplified version - in a real app you would use proper canvas capture
//       const link = document.createElement("a");
//       link.download = "shirt-design.png";
//       link.href = canvasRef.current.toDataURL("image/png");
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//     setField("isLoading", false);
//   }, 1000);
// };

// export const handleSaveDesign = () => {
//   // In a real app, this would save the design to a database
//   const state = useShirtStore.getState();
//   const { setField } = state;

//   setField("isLoading", true);

//   // Create a design object with all customization parameters

//   const designData = {
//     shirtColor: state.shirtColor,
//     accentColor1: state.accentColor1,
//     accentColor2: state.accentColor2,
//     logoPosition: state.logoPosition,
//     textContent: state.textContent,
//     textContent2: state.textContent2,
//     textColor: state.textColor,
//     textStyle: state.textStyle,
//     hasOutline: state.hasOutline,
//     outlineColor: state.outlineColor,
//     timestamp: new Date().toISOString(),
//   };

//   // Simulate saving to database
//   setTimeout(() => {
//     console.log("Design saved:", designData);
//     localStorage.setItem("savedDesign", JSON.stringify(designData));
//     setField("isLoading", false);
//     alert("Design saved successfully!");
//   }, 1000);
// };

// export const handleViewChange = (view: string) => {
//   const { currentView, setField, setMultiple } = useShirtStore.getState();

//   if (view === currentView) return;

//   // Trigger animation when view changes
//   setMultiple({ isRotating: false, currentView: view, animateShirt: true });
//   setTimeout(() => setField("animateShirt", false), 800);
// };

// // Handle color changes with animation triggers
// export const handleColorChange = (
//   key: keyof ShirtStoreState,
//   color: string
// ) => {
//   const { setMultiple } = useShirtStore.getState();
//   setMultiple({ [key]: color, lastColorChange: Date.now() });
// };

// // Toggle sheet visibility
// export const toggleSheet = (sheetId: string) => {
//   const { activeSheet, setField } = useShirtStore.getState();
//   setField("activeSheet", activeSheet === sheetId ? null : sheetId);
// };

"use client";

import type React from "react";

import { create } from "zustand";

interface ShirtState {
  // Colors
  shirtColor: string;
  accentColor1: string;
  accentColor2: string;

  // Logo
  logoFile: File | null;
  logoPosition: string;
  logoPreview: string | null;

  // Text
  textContent: string;
  textContent2: string;
  textColor: string;
  textStyle: string;
  hasOutline: boolean;
  outlineColor: string;

  // UI State
  isLoading: boolean;
  isRotating: boolean;
  currentView: string;
  animateShirt: boolean;
  lastColorChange: number;
  showBackdrop: boolean;
  activeSheet: string | null;

  // Actions
  setField: (field: keyof ShirtState, value: any) => void;
}

export const useShirtStore = create<ShirtState>((set) => ({
  // Initial state
  shirtColor: "#ffffff",
  accentColor1: "#4a90e2",
  accentColor2: "#e74c3c",
  logoFile: null,
  logoPosition: "chest",
  logoPreview: null,
  textContent: "23",
  textContent2: "PLAYER",
  textColor: "#000000",
  textStyle: "straight",
  hasOutline: false,
  outlineColor: "#ffffff",
  isLoading: false,
  isRotating: true,
  currentView: "front",
  animateShirt: false,
  lastColorChange: Date.now(),
  showBackdrop: true,
  activeSheet: null,

  // Generic setter for any field
  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
      lastColorChange: field.includes("Color")
        ? Date.now()
        : state.lastColorChange,
    })),
}));

// Helper functions
export const handleLogoUpload = (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      useShirtStore.getState().setField("logoPreview", result);
      useShirtStore.getState().setField("logoFile", file);
    };
    reader.readAsDataURL(file);
  }
};

export const handleSaveDesign = () => {
  const state = useShirtStore.getState();
  const design = {
    colors: {
      shirt: state.shirtColor,
      accent1: state.accentColor1,
      accent2: state.accentColor2,
    },
    text: {
      content: state.textContent,
      content2: state.textContent2,
      color: state.textColor,
      style: state.textStyle,
      hasOutline: state.hasOutline,
      outlineColor: state.outlineColor,
    },
    logo: {
      position: state.logoPosition,
      preview: state.logoPreview,
    },
  };

  // Save to localStorage for now
  const savedDesigns = JSON.parse(localStorage.getItem("savedDesigns") || "[]");
  savedDesigns.push({
    ...design,
    id: Date.now(),
    timestamp: new Date().toISOString(),
  });
  localStorage.setItem("savedDesigns", JSON.stringify(savedDesigns));

  console.log("Design saved:", design);
};

export const handleViewChange = (view: string) => {
  useShirtStore.getState().setField("currentView", view);
};

export const toggleSheet = (sheetId: string) => {
  const currentSheet = useShirtStore.getState().activeSheet;
  useShirtStore
    .getState()
    .setField("activeSheet", currentSheet === sheetId ? null : sheetId);
};
