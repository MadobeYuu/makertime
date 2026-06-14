import React from 'react';

export default function UploadModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  setTitle,
  author,
  setAuthor,
  setFile,
  setCoverFile // Добавили новый проп для установки файла обложки
}) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Кнопка закрытия (крестик) */}
        <button style={styles.close} onClick={onClose}>×</button>

        <h2 style={styles.modalTitle}>Додати трек</h2>

        <form onSubmit={onSubmit}>
          {/* Поле ввода названия */}
          <input
            placeholder="Назва"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          {/* Поле ввода автора */}
          <input
            placeholder="Автор"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={styles.input}
          />

          {/* Контейнер для выбора Mp3 файла */}
          <div style={styles.fileRow}>
            <span style={styles.fileLabel}>Виберіть Mp3 трек:</span>
            <input
              type="file"
              accept="audio/mp3"
              onChange={(e) => setFile(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>

          {/* НОВОЕ ПОЛЕ: Контейнер для выбора изображения обложки */}
          <div style={styles.fileRow}>
            <span style={styles.fileLabel}>Обкладинка треку:</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
              style={styles.fileInput}
            />
          </div>

          {/* Кнопка отправки формы */}
          <button type="submit" style={styles.btn}>Завантажити</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000 /* Чтобы модалка точно была поверх всего */
  },

  modal: {
    background: '#fff',
    padding: 20,
    borderRadius: 12,
    width: 350,
    position: 'relative',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif'
  },

  modalTitle: {
    marginTop: 0,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold'
  },

  close: {
    position: 'absolute',
    top: 10,
    right: 15,
    border: 'none',
    background: 'none',
    fontSize: 22,
    cursor: 'pointer',
    color: '#333'
  },

  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    border: '1px solid #ccc',
    borderRadius: 6,
    boxSizing: 'border-box', /* Защищает от вылезания инпутов за границы модалки */
    fontSize: 14
  },

  /* Стили для строки с выбором файла (то, что вы отметили на скриншоте image_45e229.png) */
  fileRow: {
    display: 'flex',
    alignItems: 'center',     // Выравнивает текст и кнопку по вертикали по центру
    gap: '10px',              // Расстояние между текстом "Виберіть Mp3 трек:" и кнопкой
    marginTop: 5,
    marginBottom: 15,         // Отступ вниз до зеленой кнопки
    boxSizing: 'border-box'
  },

  fileLabel: {
    fontSize: '14px',
    color: '#333',
    whiteSpace: 'nowrap'      // Запрещает тексту переноситься на вторую строку
  },

  fileInput: {
    cursor: 'pointer',
    fontSize: '14px'
  },

  btn: {
    width: '100%',
    padding: 12,
    background: '#1db954',    // Фирменный зеленый цвет Spotify
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s'
  }
};