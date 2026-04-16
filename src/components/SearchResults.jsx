import React, { useState, useEffect, useRef } from 'react';
import { Search, Settings, Grid, X } from 'lucide-react';
import { prepare, layout } from '@chenglou/pretext';
import './SearchResults.css';

const renderBold = (text) => {
  if (typeof text !== 'string') return text;
  return text.split(/(\*\*.*?\*\*)/g).map((chunk, i) => {
    if (chunk.startsWith('**') && chunk.endsWith('**')) {
      return <strong key={i} style={{color: '#202124'}}>{chunk.slice(2, -2)}</strong>;
    }
    return chunk;
  });
};

// A creative use of @chenglou/pretext to measure text blocks and dynamically add an ellipses
// or "Read more" styling if the text exceeds certain pixel width without relying on slow DOM paints.
const MeasuredText = ({ text, font = '14px Inter', maxWidth = 600, maxLines = 2 }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    try {
      const prepared = prepare(text, font);
      const { lines } = layout(prepared, maxWidth);
      
      if (lines && lines.length > maxLines) {
        // Find where the max line ends roughly
        let charAcc = 0;
        for(let i=0; i<maxLines; i++){
          charAcc += lines[i].text.length;
        }
        // Trim back a bit to add ellipsis safely
        setDisplayText(text.slice(0, charAcc - 10) + '...');
      }
    } catch(e) {
      // fallback in development if canvas isn't supported in some context
    }
  }, [text, font, maxWidth, maxLines]);

  return <span>{renderBold(displayText)}</span>;
};

const SearchResults = ({ query, searchTrigger, data, onReturnHome, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    if (!query) return;
    
    const lowerQuery = query.toLowerCase();
    let targetId = null;
    
    if (lowerQuery.includes('skill')) targetId = 'skills-section';
    else if (lowerQuery.includes('education')) targetId = 'education-section';
    else if (lowerQuery.includes('experience')) targetId = 'experience-section';
    else if (lowerQuery.includes('project')) targetId = 'projects-section';

    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.remove('highlight-pulse');
          // small delay to restart animation
          setTimeout(() => {
            element.classList.add('highlight-pulse');
            setTimeout(() => {
              element.classList.remove('highlight-pulse');
            }, 1500);
          }, 50);
        }
      }, 100);
    }
  }, [query, searchTrigger]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(localQuery);
    }
  };

  return (
    <div className="serp-container">
      {/* Header section with smaller logo and search bar */}
      <header className="serp-header">
        <div className="serp-top-bar fade-in">
          <div className="serp-logo-container" onClick={onReturnHome} style={{cursor: 'pointer'}}>
            <h1 className="google-logo serp-logo">
              <span className="g-blue">T</span>
              <span className="g-red">a</span>
              <span className="g-yellow">n</span>
              <span className="g-blue">a</span>
              <span className="g-green">y</span>
            </h1>
          </div>
          
          <div className="serp-search-box-container">
            <div className="serp-search-box">
              <input 
                type="text" 
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="serp-search-input"
              />
              <div className="serp-search-icons">
                {localQuery && (
                  <span className="clear-icon" onClick={() => setLocalQuery('')}>
                    <X size={20} color="#70757a" />
                    <span className="divider"></span>
                  </span>
                )}
                <Search size={22} color="#4285f4" className="serp-mag-icon" onClick={() => onSearch(localQuery)} />
              </div>
            </div>
          </div>
          
          <div className="serp-header-actions">
            <Settings size={22} className="serp-action-icon" />
            <Grid size={22} className="serp-action-icon" />
            <div className="profile-icon">T</div>
          </div>
        </div>
        
        {/* Navigation tabs */}
        <div className="serp-nav-tabs">
          <div className="tab active">
            <Search size={16} /> All
          </div>
          <div className="tab">News</div>
          <div className="tab">Images</div>
          <div className="tab">Videos</div>
          <div className="tab">Maps</div>
          <div className="tab">More</div>
        </div>
      </header>

      {/* Main Results Section */}
      <main className="serp-main fade-in stagger-1">
        <div className="serp-stats">
          About {data.experience.length + data.projects.length + data.skills.length * 10} results (0.34 seconds) 
        </div>

        <div className="results-wrapper">
          <div className="main-results">
            {/* Professional Summary */}
            <div className="result-item">
              <div className="result-url">linkedin.com › in › tanaysarkar0408</div>
              <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="result-title link">
                <h3>{data.name} - {data.title} - LinkedIn</h3>
              </a>
              <div className="result-desc">
                {renderBold(data.summary)}
              </div>
            </div>

            {/* Experience */}
            <div className="serp-section-title" id="experience-section" style={{padding: '10px', margin: '15px -10px 5px -10px'}}>
              <h2>Experience</h2>
            </div>
            {data.experience.map(exp => (
              <div className="result-item" key={exp.id}>
                <div className="result-url">{exp.urlDisplay}</div>
                <a href={exp.url} target="_blank" rel="noreferrer" className="result-title link">
                  <h3>{exp.title} at {exp.company}</h3>
                </a>
                <div className="result-date">{exp.date} · {exp.location}</div>
                <div className="result-desc">
                  {exp.points.map((point, index) => (
                    <div key={index} className="bullet-point">
                      • <MeasuredText text={point} maxLines={2} />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Projects */}
            <div className="serp-section-title" id="projects-section" style={{padding: '10px', margin: '15px -10px 5px -10px'}}>
              <h2>Projects & Open Source</h2>
            </div>
            {data.projects.map(proj => (
              <div className="result-item" key={proj.id}>
                <div className="result-url">{proj.urlDisplay}</div>
                <a href={proj.url} target="_blank" rel="noreferrer" className="result-title link">
                  <h3>{proj.title} - {proj.company}</h3>
                </a>
                <div className="result-date">Created in {proj.date}</div>
                <div className="result-desc">
                  {proj.points.map((point, i) => (
                    <div key={i} className="bullet-point">
                      • <MeasuredText text={point} maxLines={2} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {/* Education */}
            <div className="serp-section-title" id="education-section" style={{padding: '10px', margin: '15px -10px 5px -10px'}}>
              <h2>Education</h2>
            </div>
            {data.education.map(edu => (
              <div className="result-item" key={edu.id}>
                <div className="result-url">{edu.urlDisplay}</div>
                <a href={edu.url} target="_blank" rel="noreferrer" className="result-title link">
                  <h3>{edu.school} - {edu.degree}</h3>
                </a>
                <div className="result-desc">
                  Graduated {edu.date} from {edu.location}.<br/>
                  Active participation in various clubs and communities.
                </div>
              </div>
            ))}

            {/* Achievements */}
            <div className="serp-section-title" id="achievements-section" style={{padding: '10px', margin: '15px -10px 5px -10px'}}>
              <h2>Achievements</h2>
            </div>
            <div className="result-item">
              <div className="result-desc">
                {data.achievements.map((achieve, i) => (
                  <div key={i} className="bullet-point">
                    • {renderBold(achieve)}
                  </div>
                ))}
              </div>
            </div>

            {/* Related Searches */}
            <div className="related-searches">
              <h3>Related searches</h3>
              <div className="related-grid">
                <div className="related-item"><Search size={16} /> hire tanay sarkar</div>
                <div className="related-item"><Search size={16} /> tanay sarkar hackerrank</div>
                <div className="related-item"><Search size={16} /> leetcode top 7% global</div>
                <div className="related-item"><Search size={16} /> tanay AI agent projects</div>
              </div>
            </div>
          </div>

          {/* Right side Info Panel (Knowledge panel) */}
          <aside className="knowledge-panel fade-in stagger-2">
            <div className="panel-header">
              <h2>{data.name}</h2>
              <div className="panel-subtitle">{data.title}</div>
            </div>
            
            <div className="panel-images">
              <div className="image-placeholder">Code</div>
              <div className="image-placeholder">AI</div>
              <div className="image-placeholder">Backend</div>
            </div>

            <div className="panel-content">
              <p className="panel-desc">
                Passionate software engineer specializing in AI-powered backend systems, LLMs, and multi-agent architectures.
              </p>
              
              <div className="panel-stat">
                <span className="stat-label">Location:</span> Noida, India
              </div>
              <div className="panel-stat">
                <span className="stat-label">Email:</span> <a href={`mailto:${data.contact.email}`} className="link">{data.contact.email}</a>
              </div>
              <div className="panel-stat">
                <span className="stat-label">Phone:</span> {data.contact.phone}
              </div>

              <div className="panel-divider"></div>
              
              <h3>Profiles</h3>
              <div className="social-profiles">
                <a href={data.contact.github} target="_blank" rel="noreferrer" className="profile-link">
                  <div className="profile-icon-circle">GH</div>
                  <span>GitHub</span>
                </a>
                <a href={data.contact.linkedin} target="_blank" rel="noreferrer" className="profile-link">
                  <div className="profile-icon-circle" style={{background: '#0a66c2'}}>in</div>
                  <span>LinkedIn</span>
                </a>
                <a href={data.contact.leetcode} target="_blank" rel="noreferrer" className="profile-link">
                  <div className="profile-icon-circle" style={{background: '#ffa116', color: 'black'}}>LC</div>
                  <span>LeetCode</span>
                </a>
              </div>

              <div className="panel-divider"></div>
              
              <h3 id="skills-section" style={{padding: '10px', margin: '0 -10px 2px -10px'}}>Technical Skills</h3>
              <div className="skills-tags">
                {data.skills.map(skillGroup => (
                  <div key={skillGroup.id} className="skill-section">
                    <div className="skill-label">{skillGroup.category}</div>
                    <div className="skill-details">{skillGroup.details}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
