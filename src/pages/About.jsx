import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/about.css';

// Import about page image
import aboutImage from '../assets/images/forest-path.jpg'; // This assumes you've saved Image 4 as forest-path.jpg

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About Me</h1>
          <p className="lead">
            Learn more about my journey, skills, and what drives me as a developer.
          </p>
        </div>
      </section>
      
      <section className="about-content section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image">
              <img src={aboutImage} alt="Nature path representing my journey" />
            </div>
            
            <div className="about-text">
              <h2>My Story</h2>
              <p>
                Hello! I'm [Your Name], a passionate web developer with a 
                background in [your background]. My journey in web development 
                began when [brief story about how you started].
              </p>
              <p>
                I specialize in building responsive, user-friendly websites 
                and applications using modern technologies. My approach combines 
                clean code with thoughtful design to create digital experiences 
                that are both functional and beautiful.
              </p>
              <p>
                When I'm not coding, you can find me [your hobbies/interests], 
                which helps me maintain creativity and a fresh perspective.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="skills section">
        <div className="container">
          <h2>Skills & Expertise</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul className="skill-list">
                <li>React.js</li>
                <li>JavaScript (ES6+)</li>
                <li>HTML5 & CSS3</li>
                <li>Responsive Design</li>
                <li>Tailwind CSS</li>
                <li>Styled Components</li>
              </ul>
            </div>
            
            <div className="skill-category">
              <h3>Backend</h3>
              <ul className="skill-list">
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>Firebase</li>
                <li>RESTful APIs</li>
                <li>Authentication & Security</li>
              </ul>
            </div>
            
            <div className="skill-category">
              <h3>Tools & Others</h3>
              <ul className="skill-list">
                <li>Git & GitHub</li>
                <li>Webpack</li>
                <li>Jest</li>
                <li>Figma</li>
                <li>Agile Methodology</li>
                <li>UI/UX Design Principles</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section className="values section">
        <div className="container">
          <h2>My Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality First</h3>
              <p>I believe in writing clean, maintainable code that stands the test of time.</p>
            </div>
            
            <div className="value-card">
              <h3>User-Centered</h3>
              <p>Every line of code I write is with the end user's experience in mind.</p>
            </div>
            
            <div className="value-card">
              <h3>Continuous Learning</h3>
              <p>The tech world evolves rapidly, and I'm committed to growing with it.</p>
            </div>
            
            <div className="value-card">
              <h3>Problem Solving</h3>
              <p>I enjoy tackling complex challenges and finding elegant solutions.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="cta section">
        <div className="container">
          <h2>Let's Connect</h2>
          <p>
            Interested in working together or just want to say hello?
            Feel free to reach out!
          </p>
          <div className="social-links">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="social-link">
              LinkedIn
            </a>
            <a href="mailto:your.email@example.com" className="social-link">
              Email
            </a>
          </div>
          <div className="cta-buttons">
            <Link to="/resume" className="btn btn-primary">View Resume</Link>
            <Link to="/blog" className="btn btn-secondary">Read My Blog</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;