import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [originalImage, setOriginalImage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/posts/${id}`);
      setForm({ title: res.data.title, content: res.data.content, image: null });
      setOriginalImage(res.data.image);
    };
    fetchPost();
  }, [id]);

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('file', form.image);
    const res = await axios.post('/upload', formData);
    return res.data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = originalImage;
    if (form.image) {
      imageUrl = await handleImageUpload();
    }

    await axios.put(`/posts/${id}`, {
      title: form.title,
      content: form.content,
      image: imageUrl,
    });

    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-6 md:p-10 rounded-2xl shadow-md space-y-6"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">Edit Post</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={form.content}
            rows="6"
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {originalImage && (
          <div>
            <span className="text-sm text-gray-600">Current Image:</span>
            <img
              src={originalImage}
              alt="current"
              className="w-32 h-32 object-cover rounded mt-2 border"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Change Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
