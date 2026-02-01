import { useState, useEffect } from 'react';
import { X, Play, Calendar, Star, Clock } from 'lucide-react';
import { api } from '../services/api';
import VideoPlayer from './VideoPlayer';

export default function DetailView({ item, onClose }) {
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [playerUrl, setPlayerUrl] = useState(null);
    const [playingTitle, setPlayingTitle] = useState('');

    useEffect(() => {
        async function fetchDetail() {
            setLoading(true);
            try {
                const res = await api.getDetail(item.detailPath);
                setDetail(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchDetail();
    }, [item]);

    const handlePlay = (url, title) => {
        if (!url) {
            alert('Source not available');
            return;
        }
        setPlayingTitle(title);
        setPlayerUrl(url);
    };

    const getEpisodes = () => {
        // Adapter for different API response structures
        if (!detail) return [];
        return detail.episodes || detail.data?.episodes || detail.episodeList || [];
    };

    if (playerUrl) {
        return <VideoPlayer url={playerUrl} title={playingTitle} onClose={() => setPlayerUrl(null)} />;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <button className="modal-close" onClick={onClose}>
                    <X />
                </button>

                {loading ? (
                    <div className="loading-state">Loading details...</div>
                ) : (
                    <div className="modal-content">
                        <div
                            className="modal-header"
                            style={{ backgroundImage: `url(${item.poster})` }}
                        >
                            <div className="modal-header-overlay"></div>
                            <div className="modal-poster">
                                <img src={item.poster} alt={item.title} />
                            </div>
                            <div className="modal-info">
                                <h1>{item.title}</h1>
                                <div className="modal-meta">
                                    <span className="meta-item"><Star size={16} fill="#ffd700" color="#ffd700" /> {item.rating}</span>
                                    <span className="meta-item"><Calendar size={16} /> {item.year}</span>
                                    <span className="meta-item tag">{item.type === 'tv' ? 'Series' : 'Movie'}</span>
                                </div>
                                {detail?.genres && (
                                    <div className="genres">
                                        {detail.genres.map((g, i) => <span key={i} className="genre-pill">{g}</span>)}
                                    </div>
                                )}

                                {/* Direct Play button if movie player url exists */}
                                {(detail?.playerUrl || detail?.streamUrl) && (
                                    <button className="btn btn-primary btn-lg" onClick={() => handlePlay(detail.playerUrl || detail.streamUrl, item.title)}>
                                        <Play fill="currentColor" /> Watch Movie
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="modal-body">
                            {detail?.description && (
                                <div className="section">
                                    <h3>Synopsis</h3>
                                    <p>{detail.description}</p>
                                </div>
                            )}

                            {getEpisodes().length > 0 && (
                                <div className="section">
                                    <h3>Episodes ({getEpisodes().length})</h3>
                                    <div className="episode-grid">
                                        {getEpisodes().map((ep, i) => (
                                            <button
                                                key={i}
                                                className="episode-card"
                                                onClick={() => handlePlay(ep.playerUrl || ep.url, `${item.title} - ${ep.title || 'Ep ' + (i + 1)}`)}
                                            >
                                                <div className="ep-num">#{ep.number || i + 1}</div>
                                                <div className="ep-title">{ep.title || `Episode ${i + 1}`}</div>
                                                <Play size={16} className="ep-icon" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          z-index: 1500;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          overflow-y: auto;
          backdrop-filter: blur(5px);
          padding: 2rem;
        }

        .modal-container {
          background: var(--bg-card);
          width: 100%;
          max-width: 1000px;
          border-radius: 12px;
          position: relative;
          min-height: 500px;
          margin-top: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          overflow: hidden;
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          z-index: 20;
          background: rgba(0,0,0,0.5);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .modal-close:hover {
          background: var(--primary);
        }

        .modal-header {
          position: relative;
          min-height: 400px;
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: flex-end;
          padding: 3rem;
          gap: 2rem;
        }

        .modal-header-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--bg-card) 0%, rgba(20,20,20,0.8) 100%);
        }

        .modal-poster {
          position: relative;
          z-index: 10;
          width: 200px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.5);
          flex-shrink: 0;
        }

        .modal-poster img {
          width: 100%;
          height: auto;
          display: block;
        }

        .modal-info {
          position: relative;
          z-index: 10;
          flex: 1;
        }

        .modal-info h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          margin-bottom: 1rem;
          line-height: 1;
        }

        .modal-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tag {
          border: 1px solid var(--text-secondary);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.8rem;
          text-transform: uppercase;
        }

        .genres {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .genre-pill {
          background: rgba(255,255,255,0.1);
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
        }

        .modal-body {
          padding: 3rem;
        }

        .section {
          margin-bottom: 3rem;
        }

        .section h3 {
          font-size: 1.2rem;
          margin-bottom: 1rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .episode-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }

        .episode-card {
          background: rgba(255,255,255,0.05);
          padding: 1rem;
          border-radius: 6px;
          text-align: left;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          transition: all 0.2s;
          border: 1px solid transparent;
        }

        .episode-card:hover {
          background: rgba(255,255,255,0.1);
          border-color: var(--primary);
        }

        .ep-num {
          font-size: 0.8rem;
          color: var(--primary);
          font-weight: 600;
        }

        .ep-title {
          font-weight: 500;
        }

        .ep-icon {
          margin-top: auto;
          align-self: flex-end;
          opacity: 0.5;
        }

        .loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 400px;
          font-size: 1.2rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .modal-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 2rem;
          }
          
          .modal-poster {
            width: 160px;
          }

          .modal-meta, .genres {
            justify-content: center;
          }

          .modal-overlay {
            padding: 0;
            margin: 0;
          }

          .modal-container {
            border-radius: 0;
            min-height: 100vh;
            margin: 0;
          }
        }
      `}</style>
        </div>
    );
}
