import { useState, useEffect } from 'react';
import { Search, Menu, X, MonitorPlay } from 'lucide-react';

export default function Navbar({ onSearch, onCategoryChange, activeCategory }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery);
            setIsMobileMenuOpen(false);
        }
    };

    const categories = [
        { id: 'home', label: 'Home' },
        { id: 'movie', label: 'Movies' },
        { id: 'series', label: 'Series' },
        { id: 'anime', label: 'Anime' },
        { id: 'kdrama', label: 'K-Drama' },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <div className="logo" onClick={() => onCategoryChange('home')}>
                    <MonitorPlay className="logo-icon" />
                    <span>STREAMFLIX</span>
                </div>

                <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`nav-link ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => {
                                onCategoryChange(cat.id);
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                <div className="nav-actions">
                    <form className="search-box" onSubmit={handleSearchSubmit}>
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: linear-gradient(180deg, rgba(20, 20, 20, 0.7) 0%, transparent 100%);
          transition: background 0.3s, padding 0.3s;
          padding: 1.5rem 0;
        }

        .navbar.scrolled {
          background: rgba(20, 20, 20, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .nav-content {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .logo {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
          margin-right: auto;
        }

        .nav-link {
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          transition: color 0.3s;
        }

        .nav-link:hover, .nav-link.active {
          color: white;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .search-box {
          position: relative;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.3s;
        }

        .search-box:focus-within {
          background: rgba(255,255,255,0.15);
          border: 1px solid var(--text-secondary);
        }

        .search-box input {
          background: transparent;
          border: none;
          color: white;
          width: 200px;
          outline: none;
        }

        .search-icon {
          color: var(--text-secondary);
        }

        .mobile-toggle {
          display: none;
        }

        @media (max-width: 768px) {
          .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: var(--bg-card);
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem;
            transform: translateY(-150%);
            transition: transform 0.3s;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }

          .nav-links.active {
            transform: translateY(0);
          }

          .mobile-toggle {
            display: block;
          }

          .search-box input {
            width: 120px;
          }
        }
      `}</style>
        </nav>
    );
}
