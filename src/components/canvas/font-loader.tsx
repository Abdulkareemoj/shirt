import { useEffect } from "react";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

interface FontLoaderComponentProps {
  fontUrl: string;
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
      (font: any) => {
        console.log("Font loaded:", font);
        onLoad?.(font); // Call callback if needed
      },
      undefined,
      (err) => {
        console.error("Error loading font", err);
      }
    );
  }, [fontUrl, onLoad]);

  return null;
}
