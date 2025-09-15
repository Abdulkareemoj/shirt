import type { ReactNode } from "react";
import Navbar from "~/components/shared/navbar";
import SiteFooter from "~/components/shared/site-footer";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <Navbar />
      {children}
      <SiteFooter />
    </div>
  );
}
