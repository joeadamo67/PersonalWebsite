import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { AuthContext } from '../context/AuthContext';
import EditBlogForm from '../components/EditBlogForm';
import '../assets/styles/dashboard.css';

// Dashboard home component
const DashboardHome = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(
          collection(db, 'posts'),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(postsQuery);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        }));
        
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Function to format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Function to handle post deletion
  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'posts', id));
        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Failed to delete post. Please try again.');
      }
    }
  };
  
  if (loading) {
    return <div className="loading">Loading your posts...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  return (
    <div className="dashboard-home">
      <div className="dashboard-header">
        <h2>Manage Blog Posts</h2>
        <Link to="/dashboard/new" className="btn btn-primary">
          Create New Post
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>You haven't created any posts yet.</p>
          <Link to="/dashboard/new" className="btn btn-primary">
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="posts-table-container">
          <table className="posts-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>{formatDate(post.createdAt)}</td>
                  <td>{post.published ? 'Published' : 'Draft'}</td>
                  <td className="actions">
                    <button 
                      onClick={() => navigate(`/dashboard/edit/${post.id}`)}
                      className="btn btn-sm btn-edit"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="btn btn-sm btn-delete"
                    >
                      Delete
                    </button>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="btn btn-sm btn-view"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Main Dashboard component with routing
const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h3>Admin Dashboard</h3>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/dashboard">Dashboard Home</Link>
            </li>
            <li>
              <Link to="/dashboard/new">Create New Post</Link>
            </li>
            <li>
              <Link to="/blog" target="_blank" rel="noopener noreferrer">
                View Blog
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="logout-link">
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <p>Logged in as: {currentUser?.email}</p>
        </div>
      </div>
      
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/new" element={<EditBlogForm />} />
          <Route path="/edit/:id" element={<EditBlogForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;