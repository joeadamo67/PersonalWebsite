import React from 'react';
import { Link } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import '../assets/styles/home.css';

// Import the cloud/sunset image for the hero section
import heroImage from '../assets/images/cloud-sunset.jpg'; // This assumes you've saved Image 1 as cloud-sunset.jpg

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-content">
          <h1>Welcome to My Personal Website</h1>
          <p>Web Developer • Designer • Writer</p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">Learn About Me</Link>
            <Link to="/blog" className="btn btn-secondary">Read My Blog</Link>
          </div>
        </div>
      </section>
      
      <section className="intro section">
        <div className="container">
          <h2>Hi, I'm [Your Name]</h2>
          <p>
            I'm a passionate web developer focused on creating beautiful, 
            functional, and user-friendly websites. I specialize in React 
            and modern JavaScript frameworks to build responsive web applications.
          </p>
          <Link to="/about" className="btn btn-outline">More About Me</Link>
        </div>
      </section>
      
      <section className="featured-work section">
        <div className="container">
          <h2>Featured Work</h2>
          <p className="section-description">
            Check out some highlights from my portfolio and recent projects.
          </p>
          
          <div className="work-grid">
            {/* You can replace these with your actual projects */}
            <div className="work-item">
              <div className="work-image">
                {/* Use Image 3 (sunset with clouds) as a placeholder */}
                <img src="/path/to/sunset-image.jpg" alt="Project 1" />
              </div>
              <h3>Project Title 1</h3>
              <p>Short description of this amazing project.</p>
            </div>
            
            <div className="work-item">
              <div className="work-image">
                {/* Use Image 2 (moon) as a placeholder */}
                <img src="/path/to/moon-image.jpg" alt="Project 2" />
              </div>
              <h3>Project Title 2</h3>
              <p>Brief overview of another fantastic project.</p>
            </div>
            
            <div className="work-item">
              <div className="work-image">
                {/* Use Image 4 (forest path) as a placeholder */}
                <img src="/path/to/forest-path.jpg" alt="Project 3" />
              </div>
              <h3>Project Title 3</h3>
              <p>Description of a third impressive project.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="latest-posts section">
        <div className="container">
          <h2>Latest Blog Posts</h2>
          <p className="section-description">
            Thoughts, tutorials, and insights on web development and design.
          </p>
          
          <div className="posts-grid">
            {/* These would be dynamically populated from your blog data */}
            <div className="post-card">
              <h3>Post Title 1</h3>
              <p className="post-date">February 20, 2025</p>
              <p>A short excerpt from the blog post goes here...</p>
              <Link to="/blog/1" className="read-more">Read More</Link>
            </div>
            
            <div className="post-card">
              <h3>Post Title 2</h3>
              <p className="post-date">February 15, 2025</p>
              <p>Another excerpt from a different blog post...</p>
              <Link to="/blog/2" className="read-more">Read More</Link>
            </div>
          </div>
          
          <div className="section-footer">
            <Link to="/blog" className="btn btn-outline">View All Posts</Link>
          </div>
        </div>
      </section>
      
      <section className="image-gallery-section section">
        <div className="container">
          <h2>Gallery</h2>
          <p className="section-description">
            Some of my favorite moments captured through the lens.
          </p>
          <ImageGallery />
        </div>
      </section>
    </div>
  );
};

export default Home;