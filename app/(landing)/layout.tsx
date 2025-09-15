import Navbar from "~/components/shared/navbar";
import SiteFooter from "~/components/shared/site-footer";

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
