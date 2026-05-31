import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tracks, setTracks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);

  // 1. Отримуємо список треків при завантаженні сторінки
  const fetchTracks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/music');
      setTracks(response.data);
    } catch (error) {
      console.error("Помилка при завантаженні музики", error);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  // 2. Функція завантаження файлу
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title || !author) {
      alert("Заповни всі поля!");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('musicFile', file); // 'musicFile' має збігатися з назвою в multer на сервері

    try {
      await axios.post('http://localhost:5000/api/music/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Трек успішно завантажено!");
      // Очищуємо форму та оновлюємо список
      setTitle('');
      setAuthor('');
      fetchTracks();
    } catch (error) {
      console.error("Помилка при завантаженні", error);
      alert("Не вдалося завантажити файл");
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Music MakerTime</h1>

      {/* ФОРМА ЗАВАНТАЖЕННЯ */}
      <section style={{ marginBottom: '40px', border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
        <h2>Додати новий трек</h2>
        <form onSubmit={handleUpload}>
          <input type="text" placeholder="Назва треку" value={title} onChange={(e) => setTitle(e.target.value)} /><br /><br />
          <input type="text" placeholder="Автор" value={author} onChange={(e) => setAuthor(e.target.value)} /><br /><br />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} /><br /><br />
          <button type="submit">Опублікувати</button>
        </form>
      </section>

      {/* СПИСОК ТРЕКІВ */}
      <section>
        <h2>Список треків</h2>
        {tracks.length === 0 ? <p>Треків поки немає</p> : (
          <ul>
            {tracks.map(track => (
              <li key={track.id} style={{ marginBottom: '10px' }}>
                <strong>{track.title}</strong> — {track.author} 
                <br />
                <small style={{ color: '#666' }}>Файл: {track.file_name}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;