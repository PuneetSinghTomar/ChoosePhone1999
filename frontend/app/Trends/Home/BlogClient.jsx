"use client";

import { useState, useEffect } from "react";
import BlogCard from "@/Components/BlogCard";
import AuthorModal from "@/Components/AuthorModal";
import Trending from "@/Components/Trending";
import Link from "next/link";

export default function BlogClient({ blogs, trendingBlogs }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [authorData, setAuthorData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;

  const categories = [
    "All", "Technology", "Phones", "Laptop", "Tablet", "SmartWatch", "Camera", "Television",
  ];

  useEffect(() => {
    const uniqueAuthors = [...new Set(blogs.map((b) => b.author))];
    uniqueAuthors.forEach((name) => {
      if (!authorData[name]) {
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Author/${name}`)
          .then((res) => res.json())
          .then((data) =>
            setAuthorData((prev) => ({ ...prev, [name]: data }))
          )
          .catch(() => {
            setAuthorData((prev) => ({
              ...prev,
              [name]: { name, bio: "Author info not available." },
            }));
          });
      }
    });
  }, [blogs]);

  // ✅ Sort blogs newest first BEFORE filtering
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // ✅ Then filter them
  const filteredBlogs = sortedBlogs.filter((blog) => {
    const matchCategory =
      activeCategory === "All" ||
      blog.category?.toLowerCase() === activeCategory.toLowerCase();
    const query = searchTerm.toLowerCase();
    const matchSearch =
      blog.title?.toLowerCase().includes(query) ||
      blog.author?.toLowerCase().includes(query) ||
      blog.category?.toLowerCase().includes(query) ||
      blog.content?.toLowerCase().includes(query);
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const goToPage = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-6 pb-24">
      {/* Header */}
      <div className="bg-gray-100 p-4 rounded shadow-sm mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            📈 Blog Trends
            <span className="text-sm text-gray-600">
              {blogs.reduce((sum, b) => sum + (b.views || 0), 0)} Visitors
            </span>
          </h2>
          <Link href="/">
            <button className="text-sm bg-blue-700 px-4 py-2 rounded text-white">⬅ Back</button>
          </Link>
        </div>
      </div>

      {/* Search + Filters + Author Info */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6">
        <div className="flex items-center gap-6 flex-wrap w-full">
          <span className="text-sm font-medium">{filteredBlogs.length} Blogs</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search blogs..."
            className="border px-4 py-2 rounded-md w-full sm:w-1/2"
          />
        </div>

        {filteredBlogs.length > 0 && authorData[filteredBlogs[0].author] && (
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <img
              src={
                authorData[filteredBlogs[0].author]?.avatar
                  ? `http://localhost:4001${authorData[filteredBlogs[0].author]?.avatar}`
                  : "/default-avatar.jpeg"
              }
              alt={authorData[filteredBlogs[0].author]?.name}
              className="w-10 h-10 rounded-full border"
            />

            <div>
              <button
                className="text-sm font-medium text-gray-800 hover:underline flex items-center gap-1"
                onClick={() => {
                  setSelectedAuthor(filteredBlogs[0].author);
                  setShowAuthorModal(true);
                }}
              >
                {authorData[filteredBlogs[0].author]?.name}
                <span>▼</span>
              </button>
              <p className="text-xs text-gray-500 max-w-xs">
                {authorData[filteredBlogs[0].author]?.bio || "No bio available"}
              </p>

              {(authorData[filteredBlogs[0].author]?.instagram ||
                authorData[filteredBlogs[0].author]?.LinkedIn) && (
                <div className="flex gap-3 mt-2">
                  {authorData[filteredBlogs[0].author]?.instagram && (
                    <a
                      href={authorData[filteredBlogs[0].author].instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Instagram"
                      className="hover:opacity-80"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                        alt="Instagram"
                        className="w-5 h-5"
                      />
                    </a>
                  )}
                  {authorData[filteredBlogs[0].author]?.LinkedIn && (
                    <a
                      href={authorData[filteredBlogs[0].author].LinkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      className="hover:opacity-80"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                        alt="LinkedIn"
                        className="w-5 h-5"
                      />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Layout */}
      <main className="flex flex-col-reverse lg:flex-row gap-8">
        {/* Blog Feed */}
        <section className="w-full lg:w-2/3 space-y-6">
          {/* Category Buttons */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Filter by Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`text-sm px-3 py-1 rounded-full border ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog List */}
          {filteredBlogs.length > 0 ? (
            <>
              {currentBlogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  {...blog}
                  onAuthorClick={() => {
                    setSelectedAuthor(blog.author);
                    setShowAuthorModal(true);
                  }}
                />
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => goToPage(i + 1)}
                      className={`px-3 py-1 border rounded-full text-sm ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10 text-gray-500">
              No blogs found.
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("All");
                  setCurrentPage(1);
                }}
                className="block mt-4 text-blue-600 underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        {/* Sidebar */}
        <aside className="w-full lg:w-1/3">
          <Trending blogs={trendingBlogs} />
        </aside>
      </main>

      {/* Author Modal */}
      <AuthorModal
        show={showAuthorModal}
        onClose={() => setShowAuthorModal(false)}
        authorName={selectedAuthor}
      />
    </div>
  );
}
