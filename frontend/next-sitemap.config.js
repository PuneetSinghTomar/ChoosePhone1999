/** @type {import('next-sitemap').IConfig} */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choosephone.co.in";

async function additionalPaths() {
  return [
    { loc: `${siteUrl}/Trends/Home`, lastmod: new Date().toISOString() },
    { loc: `${siteUrl}/Trends/Blog/6870ca7e6e1123eb7f6ee993`, lastmod: new Date().toISOString() },
    // Add more blog URLs here if you want
  ];
}

export default {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/admin", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
    ],
  },
  additionalPaths,
};
