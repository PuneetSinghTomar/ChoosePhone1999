"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function Trending() {
  const categories = [
    "All",
    "Technology",
    "Phones",
    "Laptop",
    "Tablet",
    "SmartWatch",
    "Camera",
    "Television",
  ];

  const [trending, setTrending] = useState([]);
  const [filteredTrending, setFilteredTrending] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/blogs`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();

        // ✅ Sort blogs by views (fall back to 0 if undefined)
        const topTrending = data
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, 10)
          .map((blog, index) => ({
            id: blog._id,
            rank: index + 1,
            title: blog.title,
            author: blog.author,
            category: blog.category || "Uncategorized",
          }));

        setTrending(topTrending);
        setFilteredTrending(topTrending);
      } catch (err) {
        console.error("Error loading trending blogs", err);
      }
    };

    fetchTrending();
  }, []);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    if (cat === "All") {
      setFilteredTrending(trending);
    } else {
      const filtered = trending.filter(
        (blog) => blog.category?.toLowerCase() === cat.toLowerCase()
      );
      setFilteredTrending(filtered);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-2">Stories from all interests</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`text-sm px-3 py-1 rounded-full border transition ${
                activeCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Blogs */}
      <div>
        <h3 className="font-semibold mb-2">Trending ↗</h3>
        {filteredTrending.length === 0 ? (
          <p className="text-sm text-gray-500">
            No blogs found in &quot;{activeCategory}&quot;
          </p>
        ) : (
          <div className="space-y-3">
            {filteredTrending.map((t) => (
              <Link
                key={t.id}
                href={`/Trends/Blog/${t.id}`}
                className="flex items-start gap-2 hover:bg-gray-50 p-1 rounded cursor-pointer"
              >
                <span className="text-lg font-bold w-6">
                  {String(t.rank).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-sm text-gray-600">{t.author}</p>
                  <p className="text-sm font-medium">{t.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
