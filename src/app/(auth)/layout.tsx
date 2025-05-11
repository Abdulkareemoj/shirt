import { type ReactNode } from "react";
import Navbar from "~/components/navbar";
import SiteFooter from "~/components/site-footer";

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
