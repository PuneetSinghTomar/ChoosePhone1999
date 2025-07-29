import React, { useState } from "react";

const AdminAddAuthorForm = () => {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    instagram: "",
    LinkedIn: "",
  });
  const [avatar, setAvatar] = useState(null); // ✅ file object
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("bio", form.bio);
    formData.append("LinkedIn", form.LinkedIn);
    formData.append("instagram", form.instagram);
    if (avatar) {
      formData.append("avatar", avatar); // ✅ attach file
    }

    try {
      const res = await fetch("http://localhost:4001/Author", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Author added successfully!");
        setForm({
          name: "",
          bio: "",
          instagram: "",
          LinkedIn: "",
        });
        setAvatar(null);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Failed to add author");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-lg mt-10">
      <h2 className="text-xl font-bold mb-4">Add New Author</h2>

      {message && (
        <p className="mb-4 text-sm font-medium text-center text-blue-600">
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Author Name *"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="LinkedIn"
          value={form.LinkedIn}
          onChange={handleChange}
          type="text"
          placeholder="Author LinkedIn"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="avatar"
          type="file"
          onChange={handleFileChange}
          className="w-full border px-4 py-2 rounded"
          accept="image/*"
        />
        <input
          name="instagram"
          value={form.instagram}
          onChange={handleChange}
          type="text"
          placeholder="Instagram Link"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Short Bio"
          className="w-full border px-4 py-2 rounded resize-none"
          rows={3}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Author"}
        </button>
      </form>
    </div>
  );
};

export default AdminAddAuthorForm;
