import "~/styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3D Shirt Customizer",
  description:
    "Design custom shirts in stunning 3D with our interactive customizer tool",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function ShirtLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="flex min-h-screen flex-col">{children}</div>;
}
