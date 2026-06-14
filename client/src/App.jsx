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
  const [coverFile, setCoverFile] = useState(null); // Новое состояние для обложки

  const [search, setSearch] = useState('');

  // Состояние темы (по умолчанию темная — true)
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Синхронизируем класс на теге body для глобального фона сайта
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
    formData.append('musicFile', file); // Ключ совпадает с серверным обработчиком
    
    if (coverFile) {
      formData.append('coverFile', coverFile); // Передаем обложку, если она выбрана
    }

    try {
      await axios.post(
        'http://localhost:5000/api/music/upload',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      // Полная очистка полей после успешной отправки
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
      <div style={{ flex: 1 }}>

        {/* СПИСОК ТРЕКІВ */}
        <TrackList
          tracks={tracks.filter(t =>
            t.title.toLowerCase().includes(search.toLowerCase()) ||
            t.author.toLowerCase().includes(search.toLowerCase())
          )}
          isDarkMode={isDarkMode}
        />

        {/* МОДАЛКА */}
        <UploadModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setCoverFile(null); // Очищаем обложку при закрытии
          }}
          onSubmit={handleUpload}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          setFile={setFile}
          setCoverFile={setCoverFile} // Передаем сеттер обложки в модалку
        />

        {/* КНОПКА + */}
        <FabButton onClick={() => setIsModalOpen(true)} />

      </div>
    </div>
  );
}

export default App;