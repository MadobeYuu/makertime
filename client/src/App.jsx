import { useState, useEffect } from 'react';
import axios from 'axios';

import TrackList from './components/TrackList';
import UploadModal from './components/UploadModal';
import FabButton from './components/FabButton';
import Header from './components/Header';

function App() {
  const [tracks, setTracks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);

  const [search, setSearch] = useState('');

  const fetchTracks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/music');
      setTracks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title || !author) {
      alert('Заповни всі поля!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('musicFile', file);

    try {
      await axios.post(
        'http://localhost:5000/api/music/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setTitle('');
      setAuthor('');
      setFile(null);
      setIsModalOpen(false);

      fetchTracks();
    } catch (err) {
      console.error(err);
      alert('Помилка завантаження');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#0f0f0f', minHeight: '100vh', color: 'white' }}>

      {/* HEADER */}
      <Header onSearch={setSearch} />

      {/* СТАНИЦЯ */}
      <div style={{ padding: 20 }}>

        {/* СПИСОК ТРЕКІВ */}
        <TrackList
          tracks={tracks.filter(t =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.author.toLowerCase().includes(search.toLowerCase())
          )}
        />

        {/* МОДАЛКА */}
        <UploadModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpload}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          setFile={setFile}
        />

        {/* КНОПКА + */}
        <FabButton onClick={() => setIsModalOpen(true)} />

      </div>
    </div>
  );
}

export default App;