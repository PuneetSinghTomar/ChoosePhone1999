// routes/sitemapBlog.js
import express from "express";
import  Blog  from "../model/blogModel.js"; // adjust path if needed

const router = express.Router();

router.get("/sitemap-blog.xml", async (req, res) => {
  try {
    res.header("Content-Type", "application/xml");

    const blogs = await Blog.find({}, "_id updatedAt"); // Only get ID and date

    let urls = blogs
      .map(
        (b) => `
      <url>
        <loc>https://choosephone.co.in/Trends/Blog/${b._id}</loc>
        <lastmod>${new Date(b.updatedAt).toISOString()}</lastmod>
        <priority>0.8</priority>
      </url>
    `
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

    res.send(xml);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating blog sitemap");
  }
});

export default router;
