// visit.controller.js (unchanged as per your request)
import mongoose from 'mongoose';
import Blog from '../model/blogModel.js';
import Visit from '../model/visit.model.js';

export const recordVisit = async (req, res) => {
  try {
    const { blogId } = req.body;
    const ip = req.ip;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      return res.status(400).json({ message: 'Invalid blog ID' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // ✅ Save the visit
    await Visit.create({ blogId, ip });

    // ✅ Increment the view count directly in DB to avoid validation issues
    blog.views = (blog.views || 0) + 1;
    await Blog.updateOne({ _id: blogId }, { views: blog.views });

    res.status(200).json({ message: 'Visit recorded', views: blog.views });
  } catch (error) {
    console.error('Error recording visit:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
