import { Play } from 'lucide-react';

export default function MovieGrid({ title, items, onSelect }) {
    if (!items || items.length === 0) return null;

    return (
        <section className="container movie-section">
            {title && <h2 className="section-title">{title}</h2>}

            <div className="grid">
                {items.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="card" onClick={() => onSelect(item)}>
                        <div className="card-image">
                            <img src={item.poster} alt={item.title} loading="lazy" />
                            <div className="card-overlay">
                                <button className="play-btn">
                                    <Play fill="currentColor" />
                                </button>
                            </div>
                        </div>
                        <div className="card-content">
                            <h3 className="card-title">{item.title}</h3>
                            <div className="card-meta">
                                <span>{item.year || 'N/A'}</span>
                                {item.rating && <span className="card-rating">⭐ {item.rating}</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
        .movie-section {
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          border-left: 4px solid var(--primary);
          padding-left: 1rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 2rem 1.5rem;
        }

        .card {
          group: cursor-pointer;
          background: var(--bg-card);
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s;
          cursor: pointer;
        }

        .card:hover {
          transform: translateY(-8px);
          z-index: 2;
        }

        .card-image {
          position: relative;
          aspect-ratio: 2/3;
          width: 100%;
        }

        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }

        .card:hover .card-overlay {
          opacity: 1;
        }

        .play-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transform: scale(0);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card:hover .play-btn {
          transform: scale(1);
        }

        .card-content {
          padding: 1rem;
        }

        .card-title {
          font-size: 0.95rem;
          margin-bottom: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-meta {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: flex;
          justify-content: space-between;
        }

        .card-rating {
          color: #ffd700;
        }

        @media (max-width: 480px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
      `}</style>
        </section>
    );
}
