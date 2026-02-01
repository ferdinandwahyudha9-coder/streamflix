import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Calendar, Star } from 'lucide-react';
import { api } from '../services/api';
import VideoPlayer from '../components/VideoPlayer';

export default function Detail() {
    const { path } = useParams();
    const navigate = useNavigate();
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [playerUrl, setPlayerUrl] = useState(null);
    const [playingTitle, setPlayingTitle] = useState('');

    useEffect(() => {
        async function fetchDetail() {
            if (!path) return;
            setLoading(true);
            try {
                const decodedPath = decodeURIComponent(path);
                const res = await api.getDetail(decodedPath);
                setDetail(res);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchDetail();
    }, [path]);

    const handlePlay = (url, title) => {
        if (!url) {
            alert('Source not available');
            return;
        }
        setPlayingTitle(title);
        setPlayerUrl(url);
    };

    const getEpisodes = () => {
        if (!detail) return [];
        if (detail.episodes) return detail.episodes;
        if (detail.data?.episodes) return detail.data.episodes;
        if (detail.episodeList) return detail.episodeList;
        if (detail.seasons && Array.isArray(detail.seasons)) {
            return detail.seasons.flatMap(s => s.episodes || []);
        }
        if (detail.data?.seasons && Array.isArray(detail.data.seasons)) {
            return detail.data.seasons.flatMap(s => s.episodes || []);
        }
        return [];
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    if (playerUrl) {
        return <VideoPlayer url={playerUrl} title={playingTitle} onClose={() => setPlayerUrl(null)} />;
    }

    // Fallback if detail is null after loading
    if (!detail) return <div className="error">Failed to load content</div>;

    const posterUrl = detail.poster || detail.data?.poster || '';
    const title = detail.title || detail.data?.title || '';
    const backgroundStyle = {
        backgroundImage: `url(${posterUrl})`
    };

    return (
        <div className="detail-page">
            <div className="detail-header" style={backgroundStyle}>
                <div className="header-overlay"></div>

                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft /> Back
                </button>

                <div className="container header-content">
                    <div className="poster-wrapper">
                        <img src={posterUrl} alt={title} />
                    </div>

                    <div className="info-wrapper">
                        <h1>{title}</h1>
                        <div className="meta">
                            {detail.rating && <span className="meta-item"><Star className="icon" size={16} fill="#ffd700" color="#ffd700" /> {detail.rating}</span>}
                            {detail.year && <span className="meta-item"><Calendar className="icon" size={16} /> {detail.year}</span>}
                            <span className="meta-item tag">{detail.type === 'tv' ? 'Series' : 'Movie'}</span>
                        </div>

                        {detail.genres && (
                            <div className="genres">
                                {detail.genres.map((g, i) => <span key={i} className="genre-pill">{g}</span>)}
                            </div>
                        )}

                        <div className="actions">
                            {(detail.playerUrl || detail.streamUrl || detail.data?.playerUrl || detail.data?.streamUrl) && (
                                <button className="btn btn-primary btn-lg" onClick={() => handlePlay(detail.playerUrl || detail.streamUrl || detail.data?.playerUrl || detail.data?.streamUrl, title)}>
                                    <Play fill="currentColor" /> Watch Movie
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container detail-body">
                <div className="section">
                    <h3>Synopsis</h3>
                    <p className="synopsis">{detail.description}</p>
                </div>

                {getEpisodes().length > 0 && (
                    <div className="section">
                        <h3>Episodes ({getEpisodes().length})</h3>
                        <div className="episode-grid">
                            {getEpisodes().map((ep, i) => (
                                <button
                                    key={i}
                                    className="episode-card"
                                    onClick={() => handlePlay(ep.playerUrl || ep.url, `${title} - ${ep.title || 'Ep ' + (i + 1)}`)}
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

            <style>{`
         .detail-page {
            min-height: 100vh;
            background: var(--bg-dark);
            padding-bottom: 4rem;
         }

         .loading-screen {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
         }

         .detail-header {
            position: relative;
            min-height: 500px;
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: flex-end;
            padding-bottom: 3rem;
         }

         .header-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, var(--bg-dark) 0%, rgba(20,20,20,0.7) 100%);
         }

         .back-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 100;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(0,0,0,0.5);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            backdrop-filter: blur(5px);
            font-weight: 500;
         }

         .back-btn:hover {
            background: rgba(255,255,255,0.1);
         }

         .header-content {
            position: relative;
            z-index: 10;
            display: flex;
            gap: 3rem;
            align-items: flex-end;
            width: 100%;
         }

         .poster-wrapper {
            width: 250px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            flex-shrink: 0;
         }

         .poster-wrapper img {
            width: 100%;
            height: auto;
            display: block;
         }

         .info-wrapper {
            flex: 1;
            padding-bottom: 1rem;
         }

         .info-wrapper h1 {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 4rem;
            margin-bottom: 1rem;
            line-height: 1;
         }

         .meta {
            display: flex;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
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
            padding: 0.5rem 1.2rem;
            border-radius: 20px;
         }

         .detail-body {
            margin-top: 3rem;
         }

         .section {
            margin-bottom: 4rem;
         }

         .section h3 {
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 1px;
            border-left: 4px solid var(--primary);
            padding-left: 1rem;
         }

         .synopsis {
            font-size: 1.1rem;
            line-height: 1.8;
            color: #ccc;
            max-width: 800px;
         }

         .episode-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 1rem;
         }

         .episode-card {
            background: var(--bg-card);
            padding: 1rem;
            border-radius: 8px;
            text-align: left;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            transition: all 0.2s;
            border: 1px solid transparent;
         }

         .episode-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary);
            background: #2a2a2a;
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

         @media (max-width: 768px) {
            .detail-header {
               padding-bottom: 2rem;
            }
            
            .header-content {
               flex-direction: column;
               align-items: center;
               text-align: center;
               gap: 1.5rem;
            }

            .poster-wrapper {
               width: 180px;
               margin-top: -50px; /* Pull up slightly */
            }

            .info-wrapper h1 {
               font-size: 2.5rem;
            }

            .meta, .genres {
               justify-content: center;
            }
            
            .back-btn {
               top: 10px;
               left: 10px;
            }
         }
      `}</style>
        </div >
    );
}
