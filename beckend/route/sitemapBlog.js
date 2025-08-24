import express from "express";
import Blog from "../model/blogModel.js"; // adjust path if needed

const router = express.Router();

router.get("/sitemap-blog.xml", async (req, res) => {
  try {
    res.header("Content-Type", "application/xml");

    const blogs = await Blog.find({}, "slug updatedAt"); // fetch slugs + updated dates

    const urls = blogs.map(blog => `
      <url>
        <loc>https://choosephone.co.in/Trends/Blog/${blog.slug}</loc>
        <lastmod>${blog.updatedAt.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `).join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
      </urlset>
    `;

    res.send(sitemap);
  } catch (err) {
    console.error("Error generating blog sitemap:", err);
    res.status(500).send("Error generating sitemap");
  }
});

export default router;
