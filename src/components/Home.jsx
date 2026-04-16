import React, { useState } from 'react';
import { Search, Mic, Camera } from 'lucide-react';
import './Home.css';

const Home = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className="home-wrapper fade-in">
      {/* Top Navbar */}
      <nav className="home-nav">
        <a href="https://linkedin.com/in/tanaysarkar0408" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com/tanaysarkar0408" target="_blank" rel="noreferrer">GitHub</a>
        <div className="nav-icon-container">
          <div className="grid-icon"></div>
        </div>
        <div className="profile-icon">T</div>
      </nav>

      {/* Main Content */}
      <main className="home-main">
        <div className="logo-container">
          <h1 className="google-logo home-logo">
            <span className="g-blue">T</span>
            <span className="g-red">a</span>
            <span className="g-yellow">n</span>
            <span className="g-blue">a</span>
            <span className="g-green">y</span>
            <span className="g-red" style={{marginLeft: '15px'}}>S</span>
            <span className="g-blue">a</span>
            <span className="g-yellow">r</span>
            <span className="g-blue">k</span>
            <span className="g-green">a</span>
            <span className="g-red">r</span>
          </h1>
        </div>

        <div className="search-container">
          <div className="search-box">
            <Search className="search-icon left-icon" size={20} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for experiences, skills, or projects..."
              className="search-input"
              autoFocus
            />
            {/* The microphone and camera icons add authenticity */}
            <div className="right-icons">
              <Mic className="action-icon" size={20} color="#4285f4" />
              <Camera className="action-icon" size={20} color="#ea4335" />
            </div>
          </div>
          
          <div className="search-buttons stagger-1 fade-in">
            <button onClick={() => onSearch(query)}>Google Search</button>
            <button onClick={() => window.open('https://linkedin.com/in/tanaysarkar0408', '_blank')}>I'm Feeling Lucky</button>
          </div>
        </div>

        <div className="languages-offered stagger-2 fade-in">
          Google offered in: <a href="#">हिन्दी</a>
        </div>
      </main>

      {/* Footer */}
      <footer className="home-footer stagger-3 fade-in">
        <div className="footer-top">Noida, India</div>
        <div className="footer-bottom">
          <div className="footer-links-left">
            <a href="#">About</a>
            <a href="#">Advertising</a>
            <a href="#">Business</a>
            <a href="#">How Search works</a>
          </div>
          <div className="footer-links-right">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
