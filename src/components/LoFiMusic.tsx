// LoFiMusic.tsx
import React, { useEffect, useState } from 'react';
import '../styles/LoFiMusic.css'; // We'll define CSS below

// Note: For a real implementation, get a YouTube API key from https://developers.google.com/youtube/v3
// and use it to search/fetch lo-fi playlists. Here, we use a simple embed example with a static playlist.
// For dynamic API, replace with fetch to YouTube Data API v3 endpoint: https://www.googleapis.com/youtube/v3/search?part=snippet&q=lofi+relaxation&type=video&key=YOUR_API_KEY

const LoFiMusic: React.FC = () => {
  const [playlistId] = useState('PL4fGSI1pDJn6jXS_Tv_N9B8Z0HTRVJE0m'); // Example lo-fi playlist ID from YouTube
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Embed YouTube player logic can be extended with YouTube IFrame API for play/pause control
    // For now, simple embed
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In full impl, use YouTube Player API to control playback
  };

  return (
    <div className="lofi-container">
      <h2>Relaxation Lo-Fi Music</h2>
      <p>Chill out with soothing lo-fi beats to ease menstrual stress.</p>
      <div className="player-wrapper">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=${isPlaying ? 1 : 0}`}
          title="Lo-Fi Playlist"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button onClick={togglePlay}>
        {isPlaying ? 'Pause' : 'Play'} Music 🎵
      </button>
      <p>
        <small>
          Powered by YouTube API. Get your own key for custom searches at{' '}
          <a href="https://developers.google.com/youtube/v3" target="_blank" rel="noopener noreferrer">
            YouTube Developers
          </a>
          .
        </small>
      </p>
    </div>
  );
};

export default LoFiMusic;