import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminBlogForm = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    date: '',
    category: '',
    excerpt: '',
    content: '',
    mainImage: '',
    blogImage_one: '',
    blogImage_two: '',
    blogImage_three: '',
    blogImage_four: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setForm({ ...form, content: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure date is in correct ISO format for MongoDB
    const payload = {
      ...form,
      date: form.date ? new Date(form.date) : new Date(), // Default to now if empty
    };

    try {
      const res = await axios.post('http://localhost:4001/api/blog/blogs', payload);
      if (res.status === 201) {
        alert('Blog Posted Successfully');
        setForm({
          title: '',
          author: '',
          date: '',
          category: '',
          excerpt: '',
          content: '',
          mainImage: '',
          blogImage_one: '',
          blogImage_two: '',
          blogImage_three: '',
          blogImage_four: '',
        });
      }
    } catch (error) {
      console.error('Error while creating Blog:', error.response?.data || error.message);
      alert(`Error posting Blog: ${error.response?.data?.error || error.message}`);
    }
  };

  const wordCount = form.content
    .replace(/<[^>]+>/g, '') // Strip HTML
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image',
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        {/* Author */}
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Date */}
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Excerpt */}
        <input
          type="text"
          name="excerpt"
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Main Image */}
        <input
          type="text"
          name="mainImage"
          placeholder="Main Image URL"
          value={form.mainImage}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Blog Content */}
        <ReactQuill
          theme="snow"
          value={form.content}
          onChange={handleContentChange}
          modules={quillModules}
          formats={quillFormats}
          placeholder="Write your blog content here..."
          className="bg-white"
          style={{ height: '300px', marginBottom: '50px' }}
        />

        <p className="text-sm text-gray-600">Word count: {wordCount}</p>

        {/* Additional Images */}
        {[1, 2, 3, 4].map((num) => {
          const key = `blogImage_${['one', 'two', 'three', 'four'][num - 1]}`;
          return (
            <input
              key={num}
              type="text"
              name={key}
              placeholder={`Image URL ${num}`}
              value={form[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          );
        })}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default AdminBlogForm;
