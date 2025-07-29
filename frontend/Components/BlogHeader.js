// components/BlogHeader.js
"use client";

import Link from "next/link";

export default function BlogHeader() {
  return (
    <div className="bg-gray-100 p-4 rounded shadow-sm mb-6 flex justify-between items-center">
      <h2 className="text-xl font-bold">📖 Blog</h2>
      <Link href="/Trends/Home">
        <button className="text-sm bg-blue-700 px-4 py-2 rounded text-white">⬅ Back</button>
      </Link>
    </div>
  );
}
