import { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';

export default function Hero({ item, onPlay, onInfo }) {
    if (!item) return null;

    return (
        <div className="hero">
            <div
                className="hero-backdrop"
                style={{ backgroundImage: `url(${item.poster})` }}
            ></div>
            <div className="hero-overlay"></div>

            <div className="container hero-content">
                <h1 className="hero-title">{item.title}</h1>
                <div className="hero-meta">
                    {item.rating && <span className="rating">⭐ {item.rating}</span>}
                    {item.year && <span>{item.year}</span>}
                    <span className="quality">HD</span>
                </div>
                <p className="hero-desc line-clamp-3">
                    {/* Description not available in list item, usually */}
                    Trending now on StreamFlix. Watch the latest blockbuster movies and series.
                </p>

                <div className="hero-buttons">
                    <button className="btn btn-primary" onClick={() => onPlay(item)}>
                        <Play fill="currentColor" size={20} />
                        Play Now
                    </button>
                    <button className="btn btn-secondary" onClick={() => onInfo(item)}>
                        <Info size={20} />
                        More Info
                    </button>
                </div>
            </div>

            <style>{`
        .hero {
          position: relative;
          height: 80vh;
          min-height: 500px;
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
        }

        .hero-backdrop {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(0.7);
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, var(--bg-dark) 0%, transparent 60%),
                      linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 60%);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 600px;
          width: 100%;
          padding-top: 60px;
        }

        .hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 1;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }

        .hero-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          font-size: 1.1rem;
          color: var(--text-secondary);
        }

        .rating {
          color: #ffd700;
        }

        .quality {
          border: 1px solid var(--text-secondary);
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.8rem;
        }

        .hero-desc {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn {
          padding: 0.8rem 2rem;
          border-radius: 4px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.2s, opacity 0.2s;
        }

        .btn:hover {
          transform: scale(1.05);
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-secondary {
          background: rgba(109, 109, 110, 0.7);
          color: white;
        }
      `}</style>
        </div>
    );
}
