import AudioPlayer from "./AudioPlayer";

export default function TrackList({ tracks }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Список треків</h2>

      {tracks.length === 0 ? (
        <p>Нічого не знайдено</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20
          }}
        >
          {tracks.map(track => (
            <div
              key={track.id}
              style={{
                background: "#181818",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
              }}
            >
              <AudioPlayer
                title={track.title}
                author={track.author}
                src={`http://localhost:5000/music/${track.id}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}