import { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ src, title, author, isDarkMode }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hover, setHover] = useState(false);

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

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setProgress(Number(e.target.value));
  };

  const format = (t) => {
    if (!t || Number.isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const percent = duration ? (progress / duration) * 100 : 0;

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 14,
        padding: "10px 4px 4px",
        transition: "background 0.2s ease",
      }}
    >
      {/* Scoped styling for the range input thumb/track — repeated injection is harmless/idempotent */}
      <style>{rangeStyles}</style>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoaded}
        onEnded={handleEnded}
      />

      <div style={{ marginBottom: 12, minWidth: 0 }}>
        <div
          style={{
            color: isDarkMode ? "#ffffff" : "#121212",
            fontWeight: 600,
            fontSize: 15,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: isDarkMode ? "#9b9b9b" : "#777",
            fontSize: 12.5,
            marginTop: 2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {author}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Пауза" : "Грати"}
          style={{
            flexShrink: 0,
            width: 38,
            height: 38,
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(135deg, #ff007f 0%, #2575fc 100%)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            boxShadow: hover
              ? "0 6px 16px rgba(255,0,127,0.35)"
              : "0 3px 10px rgba(255,0,127,0.22)",
            transform: hover ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.15s ease, box-shadow 0.15s ease",
          }}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <input
            className="vp-range"
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            style={{
              flex: 1,
              "--vp-percent": `${percent}%`,
              "--vp-track-bg": isDarkMode ? "#3a3a3a" : "#dfe2e6",
            }}
          />

          <div
            style={{
              color: isDarkMode ? "#9b9b9b" : "#777",
              fontSize: 11.5,
              fontVariantNumeric: "tabular-nums",
              flexShrink: 0,
            }}
          >
            {format(progress)} / {format(duration)}
          </div>
        </div>
      </div>
    </div>
  );
}

const rangeStyles = `
  input.vp-range {
    -webkit-appearance: none;
    appearance: none;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(
      to right,
      #ff007f 0%,
      #2575fc var(--vp-percent, 0%),
      var(--vp-track-bg, #ddd) var(--vp-percent, 0%),
      var(--vp-track-bg, #ddd) 100%
    );
    cursor: pointer;
    outline: none;
  }

  input.vp-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #2575fc;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    margin-top: -4px;
    cursor: pointer;
    transition: transform 0.15s ease;
  }

  input.vp-range::-webkit-slider-thumb:hover {
    transform: scale(1.2);
  }

  input.vp-range::-webkit-slider-runnable-track {
    height: 4px;
    border-radius: 2px;
  }

  input.vp-range::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid #2575fc;
    cursor: pointer;
  }

  input.vp-range::-moz-range-track {
    height: 4px;
    border-radius: 2px;
    background: var(--vp-track-bg, #ddd);
  }

  input.vp-range::-moz-range-progress {
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(to right, #ff007f, #2575fc);
  }
`;