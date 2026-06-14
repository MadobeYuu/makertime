import AudioPlayer from "./AudioPlayer";

export default function TrackList({ tracks, isDarkMode }) {
  return (
    <div style={{ padding: 20 }}>
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

      {tracks.length === 0 ? (
        <p style={{ color: isDarkMode ? "#888" : "#666" }}>
          Нічого не знайдено
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {tracks.map((track) => {
            const coverUrl = track.cover_name
              ? `http://localhost:5000/covers/${track.cover_name}`
              : null;

            return (
              <div
                key={track.id}
                style={{
                  background: isDarkMode ? "#181818" : "#ffffff",
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: isDarkMode
                    ? "0 10px 25px rgba(0,0,0,0.4)"
                    : "0 10px 25px rgba(0,0,0,0.08)",
                  transition: "background 0.3s ease, box-shadow 0.3s ease",
                  border: isDarkMode ? "none" : "1px solid #eef0f2",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                <div
                  style={{
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
                </div>

                <AudioPlayer
                  title={track.title}
                  author={track.author}
                  src={`http://localhost:5000/music/${track.id}`}
                  isDarkMode={isDarkMode}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}