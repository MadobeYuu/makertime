import { useState } from 'react';

export default function Header({ onSearch, onUploadCover, isDarkMode, toggleTheme }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && onUploadCover) {
            onUploadCover(file); 
        }
    };

    return (
        <header style={{
            ...styles.header,
            background: isDarkMode ? '#121212' : '#ffffff',
            borderBottom: isDarkMode ? '1px solid #222' : '1px solid #e0e0e0'
        }}>
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
                    style={{
                        ...styles.input,
                        background: isDarkMode ? '#242424' : '#f1f3f5',
                        color: isDarkMode ? '#fff' : '#121212',
                        border: isDarkMode ? 'none' : '1px solid #ced4da'
                    }}
                />
            </div>

            <div style={styles.right}>
                {/* КНОПКА ПЕРЕКЛЮЧЕНИЯ ТЕМЫ */}
                <button 
                    onClick={toggleTheme} 
                    style={{
                        ...styles.themeBtn,
                        color: isDarkMode ? '#f5c518' : '#ff8c00'
                    }}
                    type="button"
                >
                    {isDarkMode ? (
                        // Луна
                        <svg style={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.5-8.9 8.2-9.8.5-.1 1 .2 1.2.7.2.5 0 1.1-.4 1.4-2.8 1.9-4.2 5.4-3.5 8.8.7 3.2 3.3 5.8 6.5 6.5 3.4.7 6.9-.7 8.8-3.5.3-.4.9-.6 1.4-.4.5.2.8.7.7 1.2-.9 4.7-5 8.2-9.8 8.2z"/>
                        </svg>
                    ) : (
                        // Солнце
                        <svg style={styles.icon} viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-12c.55 0 1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1v1c0 .55.45 1 1 1zm0 16c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1s1-.45 1-1v-1c0-.55-.45-1-1-1zm9-7h-1c-.55 0-1 .45-1 1s.45 1 1 1h1c.55 0 1-.45 1-1s-.45-1-1-1zM4 12c0-.55-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1h1c.55 0 1-.45 1-1zm14.44-6.34c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-.7.7c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l.7-.7zM6.66 16.64c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l.7.7c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-.7-.7zm11.08 1.41c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-.7-.7c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l.7.7zM6.66 6.66l.7-.7c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-.7.7c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0z"/>
                        </svg>
                    )}
                </button>

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
        zIndex: 1000,
        transition: 'background 0.3s ease, border-color 0.3s ease',
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
        outline: 'none',
        transition: 'background 0.3s ease, color 0.3s ease, border-color 0.3s ease'
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '15px',
        minWidth: 200 
    },
    themeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
    },
    icon: {
        width: '24px',
        height: '24px',
        animation: 'fadeInSpin 0.4s ease-out'
    },
    uploadBtn: {
        padding: '8px 14px',
        background: '#1DB954', 
        color: '#fff',
        borderRadius: 20,
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'background 0.2s',
        textAlign: 'center',
        whiteSpace: 'nowrap'
    },
    hiddenInput: {
        display: 'none' 
    }
};