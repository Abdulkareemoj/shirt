import { useEffect } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

interface FontLoaderComponentProps {
  fontUrl: string;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onLoad?: (font: any) => void;
}

export default function FontLoaderComponent({
  fontUrl,
  onLoad,
}: FontLoaderComponentProps) {
  useEffect(() => {
    const loader = new FontLoader();
    loader.load(
      fontUrl,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (font: any) => {
        console.log("Font loaded:", font);
        onLoad?.(font); // Call callback if needed
      },
      undefined,
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      (err: any) => {
        console.error("Error loading font", err);
      }
    );
  }, [fontUrl, onLoad]);

  return null;
}
