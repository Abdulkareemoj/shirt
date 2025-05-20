"use client";

import MobileView from "./mobile-view";
import DesktopView from "./desktop-view";
import { useMediaQuery } from "~/hooks/use-mobile-customizer";

export default function ShirtCustomizer() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? <MobileView /> : <DesktopView />;
}
