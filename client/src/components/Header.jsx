import { useState } from 'react';

export default function Header({ onSearch, onUploadCover }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    // Функція, яка спрацьовує при виборі файлу
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && onUploadCover) {
            // Передаємо файл у батьківський компонент
            onUploadCover(file); 
        }
    };

    return (
        <header style={styles.header}>
            <div style={styles.logo}>
                <img
                    src="/NewLogo.png"
                    alt="VOLT AUDIO"
                    style={styles.logoImg}
                />
            </div>

            <div style={styles.searchBox}>
                <input
                    value={query}
                    onChange={handleSearch}
                    placeholder="Пошук треків..."
                    style={styles.input}
                />
            </div>

            {/* Оновлена права частина із кнопкою завантаження */}
            <div style={styles.right}>
                <label style={styles.uploadBtn}>
                    Додати обкладинку
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        style={styles.hiddenInput} 
                    />
                </label>
            </div>
        </header>
    );
}

const styles = {
    header: {
        position: 'sticky',
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        background: '#121212',
        borderBottom: '1px solid #222',
        zIndex: 1000,
    },
    logoImg: {
        height: 40,
        objectFit: 'contain'
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    searchBox: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        width: '60%',
        maxWidth: 400,
        padding: '8px 12px',
        borderRadius: 20,
        border: 'none',
        outline: 'none',
        background: '#242424', // трохи світліший колір для фону інпуту
        color: '#fff'
    },
    right: {
        display: 'flex',
        justifyContent: 'flex-end',
        minWidth: 150 // трохи збільшив, щоб помістився текст кнопки
    },
    uploadBtn: {
        padding: '8px 14px',
        background: '#1DB954', // зелений колір у стилі Spotify
        color: '#fff',
        borderRadius: 20,
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'background 0.2s',
        textAlign: 'center'
    },
    hiddenInput: {
        display: 'none' // ховаємо стандартний сірий інпут для файлів
    }
};