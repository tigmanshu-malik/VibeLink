import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Tech background image */}
      <div className="tech-background"></div>
      
      {/* Navbar */}
      

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">
          Connect Your <span className="highlight">Digital Vibes</span>
        </h1>
        <p className="hero-subtitle">
          The next generation platform for sharing and connecting with like-minded tech enthusiasts
        </p>
        <div className="cta-buttons">
          <a href="#get-started" className="primary-button">Get Started</a>
          <a href="#learn-more" className="secondary-button">Learn More</a>
        </div>
      </div>

      {/* Features Preview */}
      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon">
            <i className="icon-connect"></i>
          </div>
          <h3 className="feature-title">Smart Connections</h3>
          <p className="feature-description">AI-powered matching connects you with people who share your tech interests.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="icon-collaborate"></i>
          </div>
          <h3 className="feature-title">Fast Collaboration</h3>
          <p className="feature-description">Build projects together with real-time collaboration tools and shared workspaces.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <i className="icon-secure"></i>
          </div>
          <h3 className="feature-title">Secure Sharing</h3>
          <p className="feature-description">End-to-end encryption ensures your projects and data remain private and secure.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 VibeLink. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;