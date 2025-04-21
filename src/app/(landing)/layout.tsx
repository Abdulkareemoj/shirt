import Navbar from "~/components/navbar";
import { SiteFooter } from "~/components/site-footer";

export default function LandingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <SiteFooter />
    </div>
  );
}
