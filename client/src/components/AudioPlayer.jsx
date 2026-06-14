import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ src, title, author, isDarkMode }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    setProgress(audioRef.current.currentTime);
  };

  const handleLoaded = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setProgress(e.target.value);
  };

  const format = (t) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="player-card">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
      />

      <div className="player-header">
        {/* Цвет названия меняется в зависимости от темы */}
        <div className="title" style={{ color: isDarkMode ? "white" : "#121212", fontWeight: "bold" }}>
          {title}
        </div>
        {/* Цвет автора меняется в зависимости от темы */}
        <div className="author" style={{ color: isDarkMode ? "gray" : "#666", fontSize: 12, marginTop: 2 }}>
          {author}
        </div>
      </div>

      <div className="controls" style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
        <button 
          className="play-btn" 
          onClick={togglePlay}
          style={{
            background: "none",
            border: "none",
            color: isDarkMode ? "white" : "#121212",
            fontSize: 16,
            cursor: "pointer",
            padding: 0
          }}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>

        <input
          className="progress"
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
          style={{ flex: 1, accentColor: "#1db954", cursor: "pointer" }}
        />

        <div className="time" style={{ color: isDarkMode ? "gray" : "#666", fontSize: 12, fontVariantNumeric: "tabular-nums" }}>
          {format(progress)} / {format(duration)}
        </div>
      </div>
    </div>
  );
}