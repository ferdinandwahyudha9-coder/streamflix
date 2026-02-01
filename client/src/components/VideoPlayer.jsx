import { X } from 'lucide-react';

export default function VideoPlayer({ url, onClose, title }) {
    if (!url) return null;

    return (
        <div className="player-overlay">
            <div className="player-header">
                <h2 className="player-title">{title} - Playing</h2>
                <button className="close-btn" onClick={onClose}>
                    <X color="white" size={32} />
                </button>
            </div>
            <div className="iframe-container">
                <iframe
                    src={url}
                    allowFullScreen
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    allow="autoplay; encrypted-media; picture-in-picture"
                ></iframe>
            </div>

            <style>{`
        .player-overlay {
          position: fixed;
          inset: 0;
          background: black;
          z-index: 2000;
          display: flex;
          flex-direction: column;
        }

        .player-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
          z-index: 10;
          pointer-events: none; /* Let clicks pass through except button */
        }

        .player-title {
          color: white;
          text-shadow: 1px 1px 2px black;
        }

        .close-btn {
          pointer-events: auto;
          background: rgba(255, 0, 0, 0.7);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s;
        }

        .close-btn:hover {
          background: red;
        }

        .iframe-container {
          flex: 1;
          width: 100%;
          height: 100%;
        }
      `}</style>
        </div>
    );
}
