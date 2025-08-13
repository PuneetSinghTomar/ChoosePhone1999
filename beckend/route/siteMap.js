// routes/sitemapBlog.js
import express from "express";
import Blog from "../model/blogModel.js";

const router = express.Router();

router.get("/sitemap-blog.xml", async (req, res) => {
  try {
    res.header("Content-Type", "application/xml");

    const blogs = await Blog.find({}, "_id slug updatedAt");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${blogs
  .map((blog) => {
    if (!blog.slug) {
      console.warn(`Skipping blog ${blog._id}: missing slug`);
      return "";
    }

    // Use updatedAt if valid, otherwise use a fallback date
    const lastmod = blog.updatedAt ? new Date(blog.updatedAt) : null;
    const lastmodIso = lastmod && !isNaN(lastmod.getTime())
      ? lastmod.toISOString()
      : new Date().toISOString(); // fallback: current date

    return `<url>
  <loc>https://choosephone.co.in/Trends/Blog/${blog.slug}</loc>
  <lastmod>${lastmodIso}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`;
  })
  .join("")}
</urlset>`;

    res.send(sitemap);
  } catch (err) {
    console.error("Error generating sitemap-blog.xml:", err);
    res.status(500).send("Error generating sitemap");
  }
});

export default router;
