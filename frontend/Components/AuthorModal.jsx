"use client";

import React, { useEffect, useState } from "react";

const AuthorModal = ({ show, onClose, authorName }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (!authorName || !show) return;

    const fetchAuthor = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/author/${encodeURIComponent(authorName)}`
        );
        if (!res.ok) throw new Error("Author not found");
        const data = await res.json();

        console.log("Author API response:", data);

        setAuthor(data);
      } catch (err) {
        console.error("Error fetching author:", err.message);
        setAuthor(null);
      }
    };

    fetchAuthor();
  }, [authorName, show]);

  if (!show || !author) return null;

  // Function to handle avatar URL properly
  const getAvatarUrl = () => {
    if (!author?.avatar) return "/default-avatar.jpeg";

    // If avatar is already a full URL
    if (author.avatar.startsWith("https")) {
      return author.avatar;
    }

    // Ensure single slash between base URL and path
    const base = process.env.NEXT_PUBLIC_API_BASE_URL.replace(/\/$/, "");
    const path = author.avatar.replace(/^\//, "");
    return `${base}/${path}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-80 p-6 rounded-xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-black text-lg"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Author Info */}
        <div className="flex flex-col items-center text-center">
          <img
            src={getAvatarUrl()}
            alt={author?.name || "Author"}
            className="w-24 h-24 rounded-full border-2 border-blue-600 object-cover mb-3"
          />

          <h2 className="text-xl font-bold">{author?.name || authorName}</h2>
          <p className="text-sm text-gray-600 mb-3">
            {author?.bio || "No bio available."}
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-2">
            {author?.instagram && (
              <a href={author.instagram} target="_blank" rel="noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg"
                  alt="Instagram"
                  className="w-5 h-5"
                />
              </a>
            )}
            {author?.LinkedIn && (
              <a href={author.LinkedIn} target="_blank" rel="noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                  alt="LinkedIn"
                  className="w-5 h-5"
                />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorModal;
