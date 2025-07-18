import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/posts', {
      title: form.title,
      content: form.content,
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white p-6 md:p-10 rounded-xl shadow-lg space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
          Create New Post
        </h2>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            placeholder="Write your content here..."
            required
            rows="6"
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
