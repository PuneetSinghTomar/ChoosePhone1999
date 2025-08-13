import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    excerpt: String,
    content: String,
    category: String,
    author: String,
    views: { type: Number, default: 0 },
    date: { type: Date }, // store as Date instead of string
    mainImage: String,
    blogImage_one: String,
    blogImage_two: String,
    blogImage_three: String,
    blogImage_four: String,
    slug: { type: String },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

// Auto-generate slug if not provided
blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
