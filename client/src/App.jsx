import { useState, useEffect } from 'react';
import axios from 'axios';

import TrackList from './components/TrackList';
import UploadModal from './components/UploadModal';
import FabButton from './components/FabButton';
import Header from './components/Header';
import NowPlayingSidebar from "./components/NowPlayingSidebar"; // Путь исправлен :)

function App() {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeView, setActiveView] = useState('all'); // Добавили состояние навигации

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [file, setFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null); 

  const [search, setSearch] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Вычисляем индекс текущего трека
  const currentIndex = tracks.findIndex(t => t.id === currentTrack?.id);

  // Фильтрация треков по поиску
  const filteredTracks = tracks.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.author.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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
      alert('Заповни всі обов\'язкові поля!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('musicFile', file);
    
    if (coverFile) {
      formData.append('coverFile', coverFile);
    }

    try {
      await axios.post(
        'http://localhost:5000/api/music/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setTitle('');
      setAuthor('');
      setFile(null);
      setCoverFile(null);
      setIsModalOpen(false);

      fetchTracks();
    } catch (err) {
      console.error(err);
      alert('Помилка завантаження');
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: isDarkMode ? '#121212' : '#f8f9fa',
      transition: 'background 0.3s ease'
    }}>

      {/* ШАПКА */}
      <Header 
        onSearch={setSearch} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme} 
      />

      {/* СТРАНИЦЯ */}
      <div style={{ flex: 1, display: 'flex', position: 'relative' }}>

        {/* СПИСОК ТРЕКІВ */}
        <div style={{ flex: 1 }}>
          {/* Здесь при необходимости можно фильтровать треки в зависимости от activeView, например: activeView === 'favorites' */}
          <TrackList
            tracks={filteredTracks}
            isDarkMode={isDarkMode}
            onTrackSelect={setCurrentTrack}
            activeTrackId={currentTrack?.id}
          />
        </div>

        {/* ПЛЕЕР / САЙДБАР */}
        <NowPlayingSidebar
          track={currentTrack}
          isDarkMode={isDarkMode}
          onClose={() => setCurrentTrack(null)}
          onPrev={() => setCurrentTrack(tracks[currentIndex - 1])}
          onNext={() => setCurrentTrack(tracks[currentIndex + 1])}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex >= 0 && currentIndex < tracks.length - 1}
        />

        {/* МОДАЛКА */}
        <UploadModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCoverFile(null);
          }}
          onSubmit={handleUpload}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          setFile={setFile}
          setCoverFile={setCoverFile}
        />

        {/* КНОПКА + И НАВИГАЦИЯ (Обновлено) */}
        <FabButton
          isDarkMode={isDarkMode}
          activeView={activeView}
          onNavigate={setActiveView}
          onAddClick={() => setIsModalOpen(true)}
        />

      </div>
    </div>
  );
}

export default App;