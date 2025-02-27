import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/blog-post.css';

const BlogPost = ({ post }) => {
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
    <article className="blog-post-card">
      {post.featuredImage && (
        <div className="post-image">
          <Link to={`/blog/${post.id}`}>
            <img src={post.featuredImage} alt={post.title} />
          </Link>
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
  );
};

export default BlogPost;