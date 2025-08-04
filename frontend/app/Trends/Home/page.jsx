import BlogClient from "./BlogClient";

export default async function BlogHomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/blogs`, {
    cache: "no-store", // disables caching (similar to SSR)
  });
  const blogs = await res.json();

  // Sort trending blogs
  const trendingBlogs = [...blogs]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 10)
    .map((blog, i) => ({ ...blog, trendingPoints: 10 - i }));

  return <BlogClient blogs={blogs} trendingBlogs={trendingBlogs} />;
}
