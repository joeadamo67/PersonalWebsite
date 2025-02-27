import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3 className="footer-heading">About Me</h3>
            <p>
              I'm a web developer passionate about creating beautiful, 
              functional, and user-friendly websites and applications.
            </p>
            <div className="contact">
              <p><i className="icon-email"></i> your.email@example.com</p>
              <p><i className="icon-location"></i> City, Country</p>
            </div>
    </footer>
  );
};

export default Footer;>
          </div>
          
          <div className="footer-section links">
            <h3 className="footer-heading">Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/resume">Resume</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          
          <div className="footer-section social">
            <h3 className="footer-heading">Connect</h3>
            <div className="social-icons">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <i className="icon-github"></i> GitHub
              </a>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <i className="icon-linkedin"></i> LinkedIn
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                <i className="icon-twitter"></i> Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Your Name. All rights reserved.</p>
        </div>
      </div