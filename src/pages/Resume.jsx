import React from 'react';
import '../assets/styles/resume.css';

// You might want to import a PDF version of your resume
import resumePDF from '../assets/documents/resume.pdf';

const Resume = () => {
  return (
    <div className="resume-page">
      <section className="resume-hero">
        <div className="container">
          <h1>My Resume</h1>
          <p className="lead">
            A summary of my professional experience, skills, and education.
          </p>
          <a 
            href={resumePDF} 
            download="YourName-Resume.pdf" 
            className="btn btn-primary"
          >
            Download PDF
          </a>
        </div>
      </section>
      
      <section className="resume-content section">
        <div className="container">
          <div className="resume-header">
            <h2>[Your Full Name]</h2>
            <p className="resume-title">Full Stack Web Developer</p>
            <div className="resume-contact">
              <p>your.email@example.com | (555) 123-4567</p>
              <p>City, State | <a href="https://yourportfolio.com">yourportfolio.com</a></p>
            </div>
          </div>
          
          <div className="resume-section">
            <h3>Summary</h3>
            <p>
              Passionate and detail-oriented Full Stack Developer with [X years] of experience 
              building responsive web applications. Proficient in modern JavaScript frameworks, 
              particularly React. Strong problem-solving abilities and commitment to writing clean, 
              maintainable code.
            </p>
          </div>
          
          <div className="resume-section">
            <h3>Professional Experience</h3>
            
            <div className="resume-item">
              <div className="resume-item-header">
                <h4>Company Name</h4>
                <p className="resume-date">January 2023 - Present</p>
              </div>
              <p className="resume-position">Senior Frontend Developer</p>
              <ul className="resume-bullets">
                <li>Developed and maintained responsive web applications using React and TypeScript</li>
                <li>Implemented state management solutions with Redux and Context API</li>
                <li>Collaborated with UX/UI designers to translate wireframes into functional interfaces</li>
                <li>Led a team of 3 junior developers, providing code reviews and mentorship</li>
                <li>Improved application performance by 40% through code optimization and lazy loading</li>
              </ul>
            </div>
            
            <div className="resume-item">
              <div className="resume-item-header">
                <h4>Previous Company</h4>
                <p className="resume-date">June 2020 - December 2022</p>
              </div>
              <p className="resume-position">Web Developer</p>
              <ul className="resume-bullets">
                <li>Built and maintained client websites using JavaScript, HTML, and CSS</li>
                <li>Implemented responsive designs to ensure optimal viewing across all devices</li>
                <li>Integrated RESTful APIs to connect frontend interfaces with backend services</li>
                <li>Participated in Agile development cycles, including daily standups and sprint planning</li>
              </ul>
            </div>
          </div>
          
          <div className="resume-section">
            <h3>Education</h3>
            
            <div className="resume-item">
              <div className="resume-item-header">
                <h4>University Name</h4>
                <p className="resume-date">2016 - 2020</p>
              </div>
              <p className="resume-degree">Bachelor of Science in Computer Science</p>
              <p>Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems</p>
            </div>
          </div>
          
          <div className="resume-section">
            <h3>Skills</h3>
            
            <div className="skills-container">
              <div className="skill-group">
                <h4>Programming Languages & Frameworks</h4>
                <p>JavaScript (ES6+), TypeScript, React, Node.js, Express</p>
              </div>
              
              <div className="skill-group">
                <h4>Frontend Technologies</h4>
                <p>HTML5, CSS3, SASS, Tailwind CSS, Bootstrap, Responsive Design</p>
              </div>
              
              <div className="skill-group">
                <h4>Tools & Platforms</h4>
                <p>Git, GitHub, VS Code, Webpack, Jest, Firebase, Heroku, Netlify</p>
              </div>
              
              <div className="skill-group">
                <h4>Databases</h4>
                <p>MongoDB, MySQL, PostgreSQL, Firebase Firestore</p>
              </div>
            </div>
          </div>
          
          <div className="resume-section">
            <h3>Projects</h3>
            
            <div className="resume-item">
              <div className="resume-item-header">
                <h4>Project Name</h4>
                <p className="resume-links">
                  <a href="https://projectdemo.com" target="_blank" rel="noopener noreferrer">Live Demo</a> | 
                  <a href="https://github.com/yourusername/project" target="_blank" rel="noopener noreferrer">GitHub</a>
                </p>
              </div>
              <p>
                A description of your project, the technologies used, and your role in its development.
                Highlight any challenges you overcame or notable features you implemented.
              </p>
            </div>
            
            <div className="resume-item">
              <div className="resume-item-header">
                <h4>Another Project</h4>
                <p className="resume-links">
                  <a href="https://anotherproject.com" target="_blank" rel="noopener noreferrer">Live Demo</a> | 
                  <a href="https://github.com/yourusername/anotherproject" target="_blank" rel="noopener noreferrer">GitHub</a>
                </p>
              </div>
              <p>
                A description of your second project, focusing on the technical aspects and your contributions.
              </p>
            </div>
          </div>
          
          <div className="resume-section">
            <h3>Certifications</h3>
            
            <div className="resume-item">
              <div className="resume-item-header">
                <h4>Certification Name</h4>
                <p className="resume-date">Issued: September 2022</p>
              </div>
              <p>Issuing Organization</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resume;