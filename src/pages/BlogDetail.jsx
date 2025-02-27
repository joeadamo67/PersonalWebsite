import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import '../assets/styles/blog-detail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postDoc = doc(db, 'posts', id);
        const postSnapshot = await getDoc(postDoc);
        
        if (postSnapshot.exists()) {
          setPost({
            id: postSnapshot.id,
            ...postSnapshot.data(),
            createdAt: postSnapshot.data().createdAt?.toDate?.() || new Date()
          });
        } else {
          setError('Post not found');
          navigate('/blog', { replace: true });
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id, navigate]);
  
  // Function to format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="loading">Loading post...</div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="blog-detail-page">
        <div className="container">
          <div className="error">{error}</div>
          <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="blog-detail-page">
      <article className="blog-post">
        <div className="container">
          <header className="post-header">
            <h1 className="post-title">{post.title}</h1>
            
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
          </header>
          
          {post.featuredImage && (
            <div className="post-featured-image">
              <img src={post.featuredImage} alt={post.title} />
            </div>
          )}
          
          <div className="post-body">
            {/* Render content - in a real app, you might use a markdown parser here */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          <footer className="post-footer">
            <div className="post-navigation">
              <Link to="/blog" className="btn btn-outline">
                ← Back to All Posts
              </Link>
            </div>
            
            {post.authorName && (
              <div className="author-section">
                <h3>About the Author</h3>
                <div className="author-info">
                  {post.authorImage && (
                    <img 
                      src={post.authorImage} 
                      alt={post.authorName} 
                      className="author-image" 
                    />
                  )}
                  <div className="author-bio">
                    <h4>{post.authorName}</h4>
                    <p>{post.authorBio || 'Web Developer and blogger.'}</p>
                  </div>
                </div>
              </div>
            )}
          </footer>
          
          <div className="related-posts-section">
            <h3>You might also like</h3>
            <div className="related-posts">
              {/* In a real app, you would fetch related posts based on tags or category */}
              <div className="related-post-placeholder">
                <p>Related posts would appear here...</p>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;