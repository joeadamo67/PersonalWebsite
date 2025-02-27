import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../utils/firebase';
import '../assets/styles/blog.css';

// Import blog header image
import blogHeaderImage from '../assets/images/pink-clouds.jpg'; // This assumes you've saved Image 3 as pink-clouds.jpg

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
  
  // Function to create excerpt from content
  const createExcerpt = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    
    return content.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="blog-page">
      <section 
        className="blog-hero" 
        style={{ backgroundImage: `url(${blogHeaderImage})` }}
      >
        <div className="container">
          <h1>My Blog</h1>
          <p className="lead">
            Thoughts, tutorials, and insights on web development and design.
          </p>
        </div>
      </section>
      
      <section className="blog-content section">
        <div className="container">
          {loading ? (
            <div className="loading">Loading posts...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : posts.length === 0 ? (
            <div className="no-posts">
              <p>No posts found. Check back later for updates!</p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map(post => (
                <article key={post.id} className="post-card">
                  {post.featuredImage && (
                    <div className="post-image">
                      <img src={post.featuredImage} alt={post.title} />
                    </div>
                  )}
                  
                  <div className="post-content">
                    <h2 className="post-title">
                      <Link to={`/blog/${post.id}`}>{post.title}</Link>
                    </h2>
                    
                    <div className="post-meta">
                      <span className="post-date">{formatDate(post.createdAt)}</span>
                      {post.tags && post.tags.length > 0 && (
                        <div className="post-tags">
                          {post.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="post-excerpt">
                      <p>{createExcerpt(post.content)}</p>
                    </div>
                    
                    <Link to={`/blog/${post.id}`} className="read-more">
                      Read More
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;