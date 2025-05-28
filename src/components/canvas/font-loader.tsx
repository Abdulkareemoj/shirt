"use client";

import { useEffect } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { useFontStore } from "~/lib/stores/useFontStore";

export default function FontLoaderComponent() {
  const setFont = useFontStore((state) => state.setFont);

  useEffect(() => {
    const loader = new FontLoader();
    loader.load("/fonts/helvetiker_regular.typeface.json", (loadedFont) => {
      setFont(loadedFont);
    });
  }, [setFont]);

  return null; // no visual output
}
