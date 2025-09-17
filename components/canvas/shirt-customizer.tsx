"use client";

import MobileView from "./mobile-view";
import DesktopView from "./desktop-view";
import { useIsMobile } from "~/hooks/use-mobile";

export default function ShirtCustomizer() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileView />;
  }

  return <DesktopView />;
}
