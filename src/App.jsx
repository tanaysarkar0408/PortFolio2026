import React, { useState } from 'react';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import { resumeData } from './data';

function App() {
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0);

  const handleSearch = (query) => {
    setSearchQuery(query || 'Tanay Sarkar Resume');
    setHasSearched(true);
    setSearchTrigger(prev => prev + 1);
  };

  const handleReturnHome = () => {
    setHasSearched(false);
    setSearchQuery('');
  };

  return (
    <div className="app-container">
      {!hasSearched ? (
        <Home onSearch={handleSearch} />
      ) : (
        <SearchResults 
          query={searchQuery} 
          searchTrigger={searchTrigger}
          data={resumeData} 
          onReturnHome={handleReturnHome} 
          onSearch={handleSearch} 
        />
      )}
    </div>
  );
}

export default App;
