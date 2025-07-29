export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blogs`, {
    next: { revalidate: 3600 },
  });
  const blogs = await res.json();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://choosephone.in";
  const routes = blogs.map((b) => {
    return `<url>
      <loc>${baseUrl}/Trends/Blog/${b.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`;
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${routes.join("\n")}
     </urlset>`,
    {
      headers: {
        "Content-Type": "application/xml",
      },
    }
  );
}
