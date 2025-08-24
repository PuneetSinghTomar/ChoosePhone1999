// frontend/pages/sitemap-blog.xml.js
export async function getServerSideProps({ res }) {
  const response = await fetch("http://localhost:4001/sitemapBlogs/sitemap-blog.xml"); // ✅ fixed
  const xml = await response.text();

  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function SitemapBlog() {
  return null;
}
