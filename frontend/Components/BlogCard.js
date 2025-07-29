"use client";

import Link from "next/link";

export default function BlogCard({
  _id,
  title,
  author,
  date,
  category,
  excerpt,
  likes = 0,
  blogImage_one,
  onAuthorClick,
}) {
  return (
    <div className="flex justify-between gap-4 border-b pb-4">
      <div className="flex-1">
        <p className="text-sm text-gray-500">
          🖊{" "}
          <span
            onClick={(e) => {
              e.preventDefault();
              if (onAuthorClick) onAuthorClick();
            }}
            className="text-blue-600 cursor-pointer underline"
          >
            {author}
          </span>{" "}
          • {date}
        </p>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-600 mb-2">
          {excerpt}{" "}
          <Link
            href={`/Trends/Blog/${_id}`}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Read more
          </Link>
        </p>
        <div className="flex gap-3 text-sm text-gray-500">
          {category && (
            <span className="text-sm border font-semibold rounded-full px-3 py-1 bg-gray-100">
              {category}
            </span>
          )}
        </div>
      </div>

      {blogImage_one && (
        <img
          src={blogImage_one}
          alt={title}
          className="w-20 h-20 object-cover rounded"
        />
      )}
    </div>
  );
}
