import { type ReactNode } from "react";
import Navbar from "~/components/navbar";
import SiteFooter from "~/components/site-footer";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <SiteFooter />
    </div>
  );
}
