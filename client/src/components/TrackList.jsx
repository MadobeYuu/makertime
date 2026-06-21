export default function TrackList({ tracks, isDarkMode, onTrackSelect, activeTrackId }) {
  return (
    <div style={{ padding: 20, paddingRight: activeTrackId ? 20 : 20 }}>
      <h2
        style={{
          color: isDarkMode ? "#ffffff" : "#121212",
          transition: "color 0.3s ease",
          marginTop: 0,
          marginBottom: 25,
        }}
      >
        Список треків
      </h2>

      <style>{`
        .track-card:hover .track-play-overlay {
          opacity: 1 !important;
        }
      `}</style>

      {tracks.length === 0 ? (
        <p style={{ color: isDarkMode ? "#888" : "#666" }}>
          Нічого не знайдено
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 250px))",
            justifyContent: "start",
            gap: 20,
          }}
        >
          {tracks.map((track) => {
            const coverUrl = track.cover_name
              ? `http://localhost:5000/covers/${track.cover_name}`
              : null;
            const isActive = track.id === activeTrackId;

            return (
              <div
                key={track.id}
                onClick={() =>
                  onTrackSelect &&
                  onTrackSelect({
                    id: track.id,
                    title: track.title,
                    author: track.author,
                    coverUrl,
                    src: `http://localhost:5000/music/${track.id}`,
                  })
                }
                className="track-card"
                style={{
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: isDarkMode
                    ? "0 10px 25px rgba(0,0,0,0.4)"
                    : "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "background 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease",
                  border: isActive
                    ? "1px solid #ff007f"
                    : isDarkMode
                    ? "1px solid transparent"
                    : "1px solid #eef0f2",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: 12,
                    overflow: "hidden",
                    background: isDarkMode ? "#282828" : "#e9ecef",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.3s ease",
                  }}
                >
                  {coverUrl ? (
                    <img
                      src={coverUrl}
                      alt={track.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: 48,
                        color: isDarkMode ? "#555" : "#ccc",
                      }}
                    >
                      🎵
                    </span>
                  )}

                  {/* Іконка плей поверх обкладинки при наведенні */}
                  <div
                    className="track-play-overlay"
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "rgba(0,0,0,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.15s ease",
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #ff007f 0%, #2575fc 100%)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                      }}
                    >
                      {isActive ? "♪" : "▶"}
                    </div>
                  </div>
                </div>

                <div style={{ minWidth: 0 }}>
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
                    {track.title}
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
                    {track.author}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}