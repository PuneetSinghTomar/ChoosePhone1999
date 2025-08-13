// routes/sitemapBlog.js
import express from "express";
import Blog from "../model/blogModel.js"; // adjust path if needed

const router = express.Router();

router.get("/sitemap-blog.xml", async (req, res) => {
  try {
    const blogs = await Blog.find({}, "_id updatedAt").lean();

    // Static page URL
    const staticUrls = `
      <url>
        <loc>https://choosephone.co.in/Trends/Home</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <priority>1.0</priority>
      </url>
    `;

    // Dynamic blog URLs
    const blogUrls = blogs
      .map((b) => {
        let lastmod;
        if (b.updatedAt) {
          try {
            lastmod = new Date(b.updatedAt).toISOString();
          } catch {
            lastmod = new Date().toISOString();
          }
        } else {
          lastmod = new Date().toISOString();
        }

        return `
          <url>
            <loc>https://choosephone.co.in/Trends/Blog/${b._id}</loc>
            <lastmod>${lastmod}</lastmod>
            <priority>0.8</priority>
          </url>
        `;
      })
      .join("");

    // Build XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticUrls}
      ${blogUrls}
    </urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    console.error("Error generating blog sitemap:", error);
    res.status(500).send("Error generating blog sitemap");
  }
});

export default router;
