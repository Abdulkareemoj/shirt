import { useEffect } from "react";
import { useShirtStore } from "~/lib/stores/useShirtStore";

export function useColorAnimation() {
  const { shirtColor, accentColor1, accentColor2, setField } = useShirtStore();

  useEffect(() => {
    setField("lastColorChange", Date.now());
    setField("animateShirt", true);

    const timer = setTimeout(() => setField("animateShirt", false), 800);
    return () => clearTimeout(timer);
  }, [shirtColor, accentColor1, accentColor2, setField]);
}
