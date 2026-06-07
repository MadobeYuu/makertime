export default function UploadModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  setTitle,
  author,
  setAuthor,
  setFile
}) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.close} onClick={onClose}>×</button>

        <h2>Додати трек</h2>

        <form onSubmit={onSubmit}>
          <input
            placeholder="Назва"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Автор"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            style={styles.input}
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.input}
          />

          <button style={styles.btn}>Завантажити</button>
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
    alignItems: 'center'
  },

  modal: {
    background: '#fff',
    padding: 20,
    borderRadius: 12,
    width: 350,
    position: 'relative'
  },

  close: {
    position: 'absolute',
    top: 10,
    right: 15,
    border: 'none',
    background: 'none',
    fontSize: 22,
    cursor: 'pointer'
  },

  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10
  },

  btn: {
    width: '100%',
    padding: 10,
    background: '#1db954',
    color: '#fff',
    border: 'none',
    borderRadius: 8
  }
};