import { useEffect, useRef, useState } from "react";

/**
 * Правий сайдбар "Зараз грає" у стилі Liquid Glass iOS.
 * З'являється, коли передано track (track !== null), виїжджаючи справа.
 */
export default function NowPlayingSidebar({
  track,
  isDarkMode,
  onClose,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // Автоплей при зміні треку
  useEffect(() => {
    if (!track) return;
    const audio = audioRef.current;
    if (!audio) return;
    setProgress(0);
    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [track?.src]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

  const handleSeek = (e) => {
    const val = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
    setProgress(val);
  };

  const handleEnded = () => {
    if (hasNext && onNext) onNext();
    else setIsPlaying(false);
  };

  const format = (t) => {
    if (!t || Number.isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration ? (progress / duration) * 100 : 0;
  const isOpen = !!track;

  // Стилі ефекту Liquid Glass
  const glassBg = isDarkMode 
    ? "rgba(22, 22, 22, 0.55)" 
    : "rgba(255, 255, 255, 0.6)";
  
  const glassBorder = isDarkMode 
    ? "1px solid rgba(255, 255, 255, 0.08)" 
    : "1px solid rgba(0, 0, 0, 0.06)";

  const glassHighlight = isDarkMode
    ? "inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.4)"
    : "inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 1px rgba(0,0,0,0.05)";

  const textPrimary = isDarkMode ? "#ffffff" : "#121212";
  const textSecondary = isDarkMode ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        height: "100vh",
        width: 330,
        background: glassBg,
        backdropFilter: "blur(25px) saturate(190%)",
        WebkitBackdropFilter: "blur(25px) saturate(190%)",
        borderLeft: glassBorder,
        boxShadow: isOpen 
          ? (isDarkMode ? "-10px 0 40px rgba(0,0,0,0.5)" : "-10px 0 40px rgba(0,0,0,0.08)") 
          : "none",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        zIndex: 900,
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: "24px 24px 32px",
      }}
    >
      <style>{rangeStyles}</style>

      {track && (
        <audio
          ref={audioRef}
          src={track.src}
          onTimeUpdate={() => setProgress(audioRef.current ? audioRef.current.currentTime : 0)}
          onLoadedMetadata={() => setDuration(audioRef.current ? audioRef.current.duration : 0)}
          onEnded={handleEnded}
        />
      )}

      {/* Шапка */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            color: textSecondary,
          }}
        >
          Зараз грає
        </span>
        <button
          onClick={onClose}
          aria-label="Закрити"
          className="liquid-btn"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "none",
            background: isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
            color: textPrimary,
            boxShadow: glassHighlight,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          ✕
        </button>
      </div>

      {track && (
        <>
          {/* Обкладинка з 3D ефектом */}
          <div
            style={{
              width: "100%",
              aspectRatio: "1 / 1",
              borderRadius: 20,
              overflow: "hidden",
              background: isDarkMode ? "#262626" : "#eef0f2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
              position: "relative",
              boxShadow: isDarkMode
                ? "0 16px 36px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.1)"
                : "0 16px 36px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.4)",
            }}
          >
            {track.coverUrl ? (
              <img
                src={track.coverUrl}
                alt={track.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ fontSize: 56 }}>🎵</span>
            )}
            {/* Глянцевий відблиск */}
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, height: "50%",
              background: "linear-gradient(to bottom, rgba(255,255,255,0.12), transparent)",
              pointerEvents: "none"
            }} />
          </div>

          {/* Метадані треку */}
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div
              style={{
                color: textPrimary,
                fontWeight: 700,
                fontSize: 19,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {track.title}
            </div>
            <div
              style={{
                color: textSecondary,
                fontSize: 14,
                marginTop: 4,
              }}
            >
              {track.author}
            </div>
          </div>

          {/* Слайдер Прогресу (Рідке Скло) */}
          <input
            className="np-range liquid-slider"
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            style={{
              width: "100%",
              "--np-percent": `${progressPercent}%`,
              "--np-track-bg": isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
              "--np-fill": isDarkMode ? "#fff" : "#121212"
            }}
          />
          
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: textSecondary,
              fontSize: 12,
              fontVariantNumeric: "tabular-nums",
              marginTop: 6,
              marginBottom: 26,
            }}
          >
            <span>{format(progress)}</span>
            <span>{format(duration)}</span>
          </div>

          {/* Кнопки Керування */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              marginBottom: 32,
            }}
          >
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              style={iconBtnStyle(textPrimary, !hasPrev, glassHighlight)}
              className="liquid-btn"
              aria-label="Попередній трек"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6L18 6v12z"/>
              </svg>
            </button>

            <button
              onClick={togglePlay}
              className="play-btn-liquid"
              aria-label={isPlaying ? "Пауза" : "Грати"}
              style={{
                width: 58,
                height: 58,
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                background: isDarkMode ? "#ffffff" : "#121212",
                color: isDarkMode ? "#121212" : "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isDarkMode 
                  ? "0 8px 24px rgba(255,255,255,0.12)" 
                  : "0 8px 24px rgba(0,0,0,0.18)",
              }}
            >
              {isPlaying ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}>
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>

            <button
              onClick={onNext}
              disabled={!hasNext}
              style={iconBtnStyle(textPrimary, !hasNext, glassHighlight)}
              className="liquid-btn"
              aria-label="Наступний трек"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6zm10-12h2v12h-2z"/>
              </svg>
            </button>
          </div>

          {/* Гучність */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
            <span style={{ color: textSecondary, fontSize: 14 }}>🔉</span>
            <input
              className="np-range liquid-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              style={{
                flex: 1,
                "--np-percent": `${volume * 100}%`,
                "--np-track-bg": isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                "--np-fill": isDarkMode ? "#fff" : "#121212"
              }}
            />
            <span style={{ color: textSecondary, fontSize: 14 }}>🔊</span>
          </div>
        </>
      )}
    </aside>
  );
}

const iconBtnStyle = (color, disabled, highlight) => ({
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  background: disabled ? "transparent" : "rgba(255,255,255,0.02)",
  boxShadow: disabled ? "none" : highlight,
  color: color,
  opacity: disabled ? 0.25 : 0.85,
  cursor: disabled ? "default" : "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const rangeStyles = `
  input.np-range {
    -webkit-appearance: none;
    appearance: none;
    height: 6px;
    border-radius: 99px;
    background: var(--np-track-bg, #ddd);
    position: relative;
    cursor: pointer;
    outline: none;
    transition: height 0.2s ease;
  }

  /* Рідкий ефект еволюції iOS: розширюється при взаємодії */
  input.np-range:hover, input.np-range:active {
    height: 10px;
  }

  input.np-range::before {
    content: '';
    position: absolute;
    top: 0; left: 0; bottom: 0;
    width: var(--np-percent, 0%);
    background: var(--np-fill, #121212);
    border-radius: 99px;
    pointer-events: none;
  }

  /* Чистий скляний слайдер без випираючого великого кола */
  input.np-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0px;
    height: 0px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    transition: width 0.15s, height 0.15s;
  }

  input.np-range:hover::-webkit-slider-thumb, input.np-range:active::-webkit-slider-thumb {
    width: 12px;
    height: 12px;
  }

  input.np-range::-moz-range-thumb {
    width: 0px;
    height: 0px;
    border: none;
    border-radius: 50%;
    background: #fff;
  }
  
  input.np-range:hover::-moz-range-thumb, input.np-range:active::-moz-range-thumb {
    width: 12px;
    height: 12px;
  }

  .liquid-btn {
    transition: transform 0.2s, background 0.2s;
  }
  .liquid-btn:hover:not(:disabled) {
    transform: scale(1.05);
    background: rgba(255,255,255,0.15) !important;
  }
  .liquid-btn:active:not(:disabled) {
    transform: scale(0.95);
  }
  .play-btn-liquid {
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .play-btn-liquid:hover {
    transform: scale(1.06);
  }
  .play-btn-liquid:active {
    transform: scale(0.94);
  }
`;