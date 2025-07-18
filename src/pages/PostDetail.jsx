import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await axios.delete(`/posts/${id}`);
      navigate('/');
    }
  };

  if (!post) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 sm:p-10 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left">
          {post.title}
        </h2>

        {post.image && (
          <img
            src={post.image}
            alt="post"
            className="w-full max-h-[400px] object-cover rounded-lg shadow"
          />
        )}

        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {post.content}
        </p>

        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition w-full sm:w-auto"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition w-full sm:w-auto"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
