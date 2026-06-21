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
  setCoverFile
}) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      {/* Внедряем стили для iOS-анимаций */}
      <style>{iosAnimationStyles}</style>
      
      {/* Класс ios-modal-animate отвечает за плавный вылет */}
      <div 
        style={styles.modal} 
        className="ios-modal-animate" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button style={styles.close} onClick={onClose}>×</button>

        <h2 style={styles.modalTitle}>Додати трек</h2>

        <form onSubmit={onSubmit} style={styles.form}>
          {/* Поле ввода названия */}
          <div style={styles.inputWrapper}>
            <input
              placeholder="Назва треку"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Поле ввода автора */}
          <div style={styles.inputWrapper}>
            <input
              placeholder="Автор"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* Контейнер для выбора Mp3 файла */}
          <div style={styles.fileRow}>
            <span style={styles.fileLabel}>Виберіть Mp3 трек:</span>
            <label style={styles.customFileButton}>
              Обзорити...
              <input
                type="file"
                accept="audio/mp3"
                onChange={(e) => setFile(e.target.files[0])}
                style={styles.hiddenFileInput}
              />
            </label>
          </div>

          {/* Контейнер для выбора изображения обложки */}
          <div style={styles.fileRow}>
            <span style={styles.fileLabel}>Обкладинка треку:</span>
            <label style={styles.customFileButton}>
              Обрати фото
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setCoverFile(e.target.files[0])}
                style={styles.hiddenFileInput}
              />
            </label>
          </div>

          {/* Розово-синяя глянцевая кнопка */}
          <button type="submit" style={styles.btn}>Завантажити</button>
        </form>
      </div>
    </div>
  );
}

// CSS Анимация в стиле Apple (плавное появление фона + вылет окна со "пружиной")
const iosAnimationStyles = `
  @keyframes iosFadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes iosSlideUp {
    0% {
      transform: translateY(100px) scale(0.92);
      opacity: 0;
    }
    /* Легкий эластичный отскок в конце, как на айфоне */
    80% {
      transform: translateY(-4px) scale(1.01);
      opacity: 1;
    }
    100% {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
  }

  .ios-modal-animate {
    animation: iosSlideUp 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  }
`;

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.35)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    // Анимация плавного затемнения заднего фона
    animation: 'iosFadeIn 0.3s ease-out forwards'
  },

  modal: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.35) 100%)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    boxShadow: `
      0 4px 30px rgba(0, 0, 0, 0.08), 
      inset 0 1px 1px rgba(255, 255, 255, 0.6), 
      inset 0 -1px 2px rgba(0, 0, 0, 0.04),
      0 25px 50px rgba(0, 0, 0, 0.15)
    `,
    padding: '34px 24px 28px 24px',
    borderRadius: '32px', // Еще более мягкие углы, типичные для iOS-карточек
    width: '380px',
    position: 'relative',
    boxSizing: 'border-box',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    border: '1px solid rgba(255, 255, 255, 0.45)',
    willChange: 'transform, opacity' // Оптимизация производительности анимации
  },

  modalTitle: {
    marginTop: 0,
    marginBottom: 24,
    fontSize: '22px',
    fontWeight: '700',
    color: '#1d1d1f',
    textAlign: 'center',
    letterSpacing: '-0.5px'
  },

  close: {
    position: 'absolute',
    top: 16,
    right: 18,
    border: 'none',
    background: 'rgba(0, 0, 0, 0.05)',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#666',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },

  inputWrapper: {
    position: 'relative',
  },

  input: {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255, 255, 255, 0.45)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.04), inset 0 -1px 0 rgba(255,255,255,0.6)',
    border: '1px solid rgba(0, 0, 0, 0.06)',
    borderRadius: '16px',
    boxSizing: 'border-box',
    fontSize: '15px',
    color: '#1d1d1f',
    outline: 'none',
  },

  fileRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.03)',
    boxSizing: 'border-box'
  },

  fileLabel: {
    fontSize: '14px',
    color: '#3a3a3c',
    fontWeight: '500'
  },

  customFileButton: {
    padding: '7px 14px',
    background: 'rgba(255, 255, 255, 0.85)',
    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    border: '1px solid rgba(0,0,0,0.08)',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#2575fc',
    cursor: 'pointer',
  },

  hiddenFileInput: {
    display: 'none'
  },

  btn: {
    width: '100%',
    padding: '15px',
    background: 'linear-gradient(135deg, #ff007f 0%, #2575fc 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '18px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(255, 0, 127, 0.25), inset 0 1.5px 0 rgba(255,255,255,0.35)',
    marginTop: '12px',
    outline: 'none',
  }
};