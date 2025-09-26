const site_url = process.env.NEXT_PUBLIC_APP_URL;

export const siteConfig = {
  name: "onashirt",
  description:
    "Put something interesting on a shirt and share with your friends.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  keywords: [
    "custom shirts",
    "funny t-shirts",
    "design your shirt",
    "print on demand",
    "onashirt",
  ],
  author: "Onashirt Team",
  locale: "en_US",
  canonical: site_url,
  links: {
    twitter: "https://twitter.com/abdulkareemoj",
    github: "https://github.com/abdulkareemoj/shirt",
  },
  mailSupport: "support@onashirt.com",
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
      { title: "Roadmap", href: "/roadmap" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "/changelog" },
    ],
  },
];
