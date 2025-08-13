import express from "express";
import Blog from "../model/blogModel.js";

const router = express.Router();

router.get("/sitemap-blog.xml", async (req, res) => {
  try {
    const blogs = await Blog.find({}, "_id slug updatedAt").lean();
    
    if (!blogs || blogs.length === 0) {
      return res.status(404).send("No blogs found");
    }

    const validBlogs = blogs.filter(blog => blog.slug && blog.updatedAt);

    if (validBlogs.length === 0) {
      return res.status(404).send("No valid blogs found");
    }

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${validBlogs.map(blog => `
  <url>
    <loc>https://choosephone.co.in/Trends/Blog/${encodeURIComponent(blog.slug)}</loc>
    <lastmod>${blog.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
).join("")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.header("Cache-Control", "public, max-age=86400");
    res.send(sitemap);

  } catch (err) {
    console.error("Error generating sitemap-blog.xml:", err);
    res.status(500).send("Error generating sitemap");
  }
});

export default router;