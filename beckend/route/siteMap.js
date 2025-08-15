import express from "express";
import Blog from "../model/blogModel.js";

const router = express.Router();

// Safe date formatter
function safeDateISO(value) {
  if (!value) return new Date().toISOString(); // if null/undefined/empty string
  const d = new Date(value);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

router.get("/sitemap-blog.xml", async (req, res) => {
  try {
    res.header("Content-Type", "application/xml");

    // Get only required fields from DB
    const blogs = await Blog.find({}, "slug date createdAt updatedAt").lean();

    // If no blogs exist, still return valid sitemap XML
    const blogUrls = (blogs || []).map(blog => {
      const lastmod = safeDateISO(blog.updatedAt || blog.createdAt || blog.date);
      return `
        <url>
          <loc>https://choosephone.co.in/Trends/Blog/${blog.slug}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogUrls.join("")}
</urlset>`;

    res.send(sitemap);
  } catch (err) {
    console.error("Error generating blog sitemap:", err);
    res.status(500).send("Error generating blog sitemap");
  }
});

export default router;
