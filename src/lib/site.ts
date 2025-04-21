import { env } from "~/env";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig = {
  name: "ImgSaaS",
  description:
    "Get your project off to an explosive start with SaaS Starter! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui and Stripe to build your next big thing.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://twitter.com/miickasmt",
    github: "https://github.com/mickasmt/next-saas-stripe-starter",
  },
  mailSupport: "support@saas-starter.com",
};

export const footerLinks = [
  {
    title: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Contact", href: "/contact" },
      { title: "Terms", href: "/terms-of-service" },
      { title: "Privacy", href: "/privacy-policy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Features", href: "#" },
      { title: "Gallery", href: "/roadmap" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];
