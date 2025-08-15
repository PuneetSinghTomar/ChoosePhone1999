import express from "express";
import Blog from "../model/blogModel.js";

const router = express.Router();

router.get("/sitemap-blog.xml", async (req, res) => {
  try {
    res.header("Content-Type", "application/xml");

    const blogs = await Blog.find({}, "slug date createdAt updatedAt").lean();

    const blogUrls = blogs.map((blog) => {
      let dateValue = blog.updatedAt || blog.createdAt || blog.date;

      // Ensure dateValue is a Date object
      if (!(dateValue instanceof Date)) {
        const parsed = new Date(dateValue);
        dateValue = isNaN(parsed) ? new Date() : parsed;
      }

      return `
        <url>
          <loc>https://choosephone.co.in/Trends/Blog/${blog.slug}</loc>
          <lastmod>${dateValue.toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${blogUrls.join("")}
      </urlset>
    `;

    res.send(sitemap);
  } catch (err) {
    console.error("Sitemap generation error:", err);
    res.status(500).send("Error generating blog sitemap");
  }
});

export default router;
