import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import MovieGrid from '../components/MovieGrid';
import { api } from '../services/api';

export default function Home({ activeCategory, searchQuery }) {
    const [items, setItems] = useState([]);
    const [heroItem, setHeroItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleSelect = (item) => {
        // Navigate to detail page with encoded path
        if (item.detailPath) {
            const encodedPath = encodeURIComponent(item.detailPath);
            navigate(`/detail/${encodedPath}`);
        }
    };

    const fetchContent = async (category, pageNum = 1) => {
        setLoading(true);
        try {
            if (category === 'search' && searchQuery) {
                const data = await api.search(searchQuery);
                setItems(data.items || data.results || []);
                setHeroItem(null);
                setLoading(false);
                return;
            }

            let data;
            switch (category) {
                case 'home':
                    data = await api.getTrending(pageNum);
                    break;
                case 'movie':
                    data = await api.getMovies(pageNum);
                    break;
                case 'series':
                    data = await api.getSeries(pageNum);
                    break;
                case 'anime':
                    data = await api.getAnime(pageNum);
                    break;
                case 'kdrama':
                    data = await api.getKDrama(pageNum);
                    break;
                default:
                    data = { results: [] };
            }

            const content = data.items || data.results || [];

            if (pageNum === 1) {
                setItems(content);
                if (content.length > 0) setHeroItem(content[0]);
            } else {
                setItems(prev => [...prev, ...content]);
            }
        } catch (err) {
            console.error("Fetch error", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent(activeCategory, 1);
    }, [activeCategory]);

    return (
        <div className="home-page">
            {activeCategory === 'home' && heroItem && (
                <Hero item={heroItem} onPlay={handleSelect} onInfo={handleSelect} />
            )}

            {!heroItem || activeCategory !== 'home' ? <div style={{ height: '100px' }}></div> : null}

            <MovieGrid
                title={activeCategory === 'home' ? 'Trending Now' :
                    `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}`}
                items={items}
                onSelect={handleSelect}
            />

            {loading && (
                <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>
                    <div className="spinner"></div>
                </div>
            )}

            <style>{`
        .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid rgba(255,255,255,0.1);
          border-left-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
