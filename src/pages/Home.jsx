import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center mb-8 px-2">
        <h1 className="text-3xl font-bold text-gray-800 text-center sm:text-left">
          Latest Posts
        </h1>
        {token && (
          <Link
            to="/create"
            className="mt-4 sm:mt-0 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            + Create New Post
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {post.content.length > 100
                    ? `${post.content.substring(0, 100)}...`
                    : post.content}
                </p>
                <Link
                  to={`/post/${post._id}`}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
