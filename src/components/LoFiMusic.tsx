import React, { useState, useRef, useEffect } from 'react';
import '../styles/LoFiMusic.css';

const LoFiMusic: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Dummy lo-fi tracks with free audio URLs (replace with actual free music URLs)
  const tracks = [
    {
      id: 1,
      title: 'ChilledCow - Lofi Hip Hop Radio',
      artist: 'ChilledCow',
      description: 'Beats to relax/study to',
      thumbnail: 'https://i.ytimg.com/vi/Jn8s5k8rH3c/maxresdefault.jpg',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Replace with actual lo-fi track URL
    },
    {
      id: 2,
      title: 'Lofi Girl - Late Night Vibes',
      artist: 'Lofi Girl',
      description: 'Perfect for late night studying and relaxation',
      thumbnail: 'https://i.ytimg.com/vi/5qap5aO4i9A/maxresdefault.jpg',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Replace with actual lo-fi track URL
    },
    {
      id: 3,
      title: 'Chillhop Music - Essential Mix',
      artist: 'Chillhop Music',
      description: 'Smooth jazzhop and chillhop beats',
      thumbnail: 'https://i.ytimg.com/vi/7NOSDKb0HlM/maxresdefault.jpg',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Replace with actual lo-fi track URL
    },
    {
      id: 4,
      title: 'Lofi Rainy Mood - Study & Relax',
      artist: 'Lofi Rainy Mood',
      description: 'Lo-fi beats with rain sounds for deep focus',
      thumbnail: 'https://i.ytimg.com/vi/5yx6BWlEVcY/maxresdefault.jpg',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Replace with actual lo-fi track URL
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(e => console.error('Playback failed:', e));
    } else {
      audio.pause();
    }
  }, [isPlaying, selectedTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener('ended', () => {
        // Auto-play next track or loop current one
        setSelectedTrack((prev) => (prev + 1) % tracks.length);
        setIsPlaying(true);
      });
    }

    return () => {
      if (audio) {
        audio.removeEventListener('ended', () => {});
      }
    };
  }, [tracks.length]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const currentTrack = tracks[selectedTrack];

  return (
    <div className="lofi-container">
      <h2 className="lofi-title">Relaxation Lo-Fi Music</h2>
      <p className="lofi-subtitle">Chill out with soothing lo-fi beats to ease menstrual stress</p>
      
      <div className="playlist-selector">
        <h3>Select Your Vibe:</h3>
        <div className="playlist-grid">
          {tracks.map((track, index) => (
            <div
              key={index}
              className={`playlist-card ${selectedTrack === index ? 'active' : ''}`}
              onClick={() => {
                setSelectedTrack(index);
                setIsPlaying(false); // Pause when changing track
              }}
            >
              <img src={track.thumbnail} alt={track.title} className="playlist-thumbnail" />
              <h4>{track.title}</h4>
              <p className="track-artist">{track.artist}</p>
              <p>{track.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="player-section">
        <div className="current-playlist">
          <h3>Now Playing: {currentTrack.title}</h3>
          <p className="track-artist">by {currentTrack.artist}</p>
          <p>{currentTrack.description}</p>
        </div>
        
        <audio
          ref={audioRef}
          src={currentTrack.audioUrl}
          preload="metadata"
          className="audio-player"
        >
          Your browser does not support the audio element.
        </audio>

        <div className="player-controls">
          <button 
            onClick={togglePlay} 
            className={`play-button ${isPlaying ? 'playing' : ''}`}
            disabled={!currentTrack.audioUrl}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'} Music
          </button>
          <div className="audio-progress">
            <span className="current-time">0:00</span>
            <input
              type="range"
              min="0"
              max="100"
              value={0}
              className="progress-slider"
              disabled
            />
            <span className="duration">0:00</span>
          </div>
        </div>
      </div>

      <div className="lofi-decoration">
        <div className="floating-note">🎵</div>
        <div className="floating-heart">💖</div>
        <div className="floating-note">🎶</div>
      </div>

      <p className="api-note">
        <small>
          Free lo-fi music for relaxation. All tracks are for personal use.
        </small>
      </p>
    </div>
  );
};

export default LoFiMusic;
