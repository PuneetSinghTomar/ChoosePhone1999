// Run: node scripts/generateSlugs.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import slugify from "slugify";
import Blog from "../model/blogModel.js"; // Adjust path if needed

dotenv.config();

async function generateSlugs() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB ✅");

    const blogsWithoutSlug = await Blog.find({ slug: { $exists: false } });

    for (const blog of blogsWithoutSlug) {
      blog.slug = slugify(blog.title, { lower: true, strict: true });
      await blog.save();
      console.log(`✔ Slug generated for: ${blog.title} -> ${blog.slug}`);
    }

    console.log("🎉 All missing slugs generated.");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err);
    mongoose.disconnect();
  }
}

generateSlugs();
