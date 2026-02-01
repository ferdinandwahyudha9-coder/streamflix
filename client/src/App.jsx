import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Detail from './pages/Detail';

function AppContent() {
  const [activeCategory, setActiveCategory] = useState('home');
  const navigate = useNavigate();

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    navigate('/');
  };

  const handleSearch = (query) => {
    setActiveCategory('search');
    // In a real router app, you might navigate to /search?q=...
    // But for now, we pass the "search" category to Home which handles fetching
    navigate('/');
    // To properly support search as a category in Home, we need to pass the query
    // This is a simplification. Home handles "search" based on activeCategory state, 
    // but without query in URL it's tricky.
    // Let's refactor Navbar to pass query to Home via state or context if we stay on /
    // For now, let's keep it simple: Home component needs to know the query.
    // We will pass the query to Home via prop if activeCategory is search.
  };

  // State lifting for search query
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="app">
      <Navbar
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        onSearch={(q) => {
          setSearchQuery(q);
          setActiveCategory('search');
          navigate('/');
        }}
      />

      <Routes>
        <Route path="/" element={<Home activeCategory={activeCategory} searchQuery={searchQuery} />} />
        <Route path="/detail/:path" element={<Detail />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
