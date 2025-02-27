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
              Hello! I’m Joe Adamo, a passionate developer with a background in coding and technology.
               While I'm currently working toward becoming a Radiology Tech, my love for building, 
               problem-solving, and breaking free from the rat race led me to explore software 
               development as a creative and entrepreneurial path.
              </p>
              <p>
              I specialize in crafting smooth, intuitive, and user-friendly applications, 
              with a current focus on mobile game development and web applications. 
              My approach blends technical precision with creativity, ensuring that everything 
              I build is not only functional but also unique and meaningful.
              </p>
              <p>
              When I’m not coding, you can find me playing MTG Commander, "researching" 
              (playing) other games, and diving into books!
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
        <h3>Tech</h3>
        <ul className="skill-list">
          <li>Coding & AI-assisted development</li>
          <li>Building & optimizing PCs</li>
          <li>Web development (React.js, Node.js)</li>
          <li>Game development (Unity, Godot, C#)</li>
          <li>Firebase & RESTful APIs</li>
          <li>HTML, CSS, Tailwind</li>
        </ul>
      </div>
      
      <div className="skill-category">
        <h3>Personal</h3>
        <ul className="skill-list">
          <li>Self-motivated & independent learner</li>
          <li>Strong communicator & problem solver</li>
          <li>Game balancing & mechanics design</li>
          <li>Adaptability & research-driven approach</li>
          <li>Time management & project planning</li>
          <li>Strategic thinking (MTG, game design, philosophy)</li>
        </ul>
      </div>
      
      <div className="skill-category">
        <h3>Miscellaneous</h3>
        <ul className="skill-list">
          <li>Philosophy & psychology enthusiast</li>
          <li>Reading & continuous learning</li>
          <li>Building and maintaining PCs</li>
          <li>Tech automation & workflow optimization</li>
          <li>Pushing up the ranked ladder</li>
          <li>MTG deck-building & gameplay strategy</li>
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
        <h3>Efficiency Over Perfection</h3>
        <p>I believe in getting things done <em>the smart way</em>—clean, maintainable, and optimized for results, rather than obsessing over unnecessary details.  
        But I do love to really get into the <strong>nitty gritty</strong> and take things to <strong>110%</strong>.</p>
      </div>
      
      <div className="value-card">
        <h3>User Experience First</h3>
        <p>Whether it's a game, an app, or a conversation, I always think about <em>how it feels</em> from the other side—intuitive, engaging, and smooth.</p>
      </div>
      
      <div className="value-card">
        <h3>Always Learning, Always Adapting</h3>
        <p>From <strong>tech</strong> to <strong>strategy games</strong> to <strong>philosophy</strong>, I'm constantly learning. The world moves fast, and I make sure I move with it.</p>
      </div>
      
      <div className="value-card">
        <h3>Creative Problem-Solving</h3>
        <p>I love <em>breaking things down</em>, finding the optimal path, and solving challenges in ways others might not see—whether in <strong>code, games, or life</strong>.</p>
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