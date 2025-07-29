"use client";

import React, { useEffect, useState } from "react";

const AuthorModal = ({ show, onClose, authorName }) => {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (!authorName || !show) return;

    const fetchAuthor = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/Author/${authorName}`);
        if (!res.ok) throw new Error("Author not found");
        const data = await res.json();
        setAuthor(data);
      } catch (err) {
        console.error("Error fetching author:", err.message);
        setAuthor(null);
      }
    };

    fetchAuthor();
  }, [authorName, show]);

  if (!show || !author) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-80 p-6 rounded-xl shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-black text-lg"
          onClick={onClose}
        >
          ✖
        </button>

        <div className="flex flex-col items-center text-center">
          <img
            src={author?.avatar ? `http://localhost:4001${author.avatar}` : "/default-avatar.jpeg"}
            alt={author?.name || "Author"}
            className="w-24 h-24 rounded-full border-2 border-blue-600 object-cover mb-3"
          />
          <h2 className="text-xl font-bold">{author?.name || authorName}</h2>
          <p className="text-sm text-gray-600 mb-3">{author?.bio || "No bio available."}</p>

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
