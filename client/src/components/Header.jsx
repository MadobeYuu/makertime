import { useState } from 'react';

export default function Header({ onSearch, isDarkMode, toggleTheme }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <header style={{
            ...styles.header,
            background: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: isDarkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)'
        }}>
            <style>{animationStyles}</style>

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
                        background: isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                        color: isDarkMode ? '#fff' : '#121212',
                        border: 'none'
                    }}
                />
            </div>

            <div style={styles.right}>
                <button 
                    onClick={toggleTheme} 
                    style={{
                        ...styles.themeBtn,
                        color: isDarkMode ? '#FFD700' : '#FF8C00'
                    }}
                    type="button"
                    className="theme-toggle-btn"
                >
                    {isDarkMode ? (
                        /* Ідеальний очищений Місяць без артефактів */
                        <svg className="icon-moon" style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                        </svg>
                    ) : (
                        /* Ідеалне Сонце з геометрично рівними променями */
                        <svg className="icon-sun" style={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5"/>
                            <line x1="12" y1="1" x2="12" y2="3"/>
                            <line x1="12" y1="21" x2="12" y2="23"/>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                            <line x1="1" y1="12" x2="3" y2="12"/>
                            <line x1="21" y1="12" x2="23" y2="12"/>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
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
        padding: '12px 24px',
        zIndex: 1000,
        transition: 'background 0.3s ease, border-color 0.3s ease',
    },
    logoImg: {
        height: 36,
        objectFit: 'contain'
    },
    logo: {
        fontSize: 20,
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center'
    },
    searchBox: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center'
    },
    input: {
        width: '80%',
        maxWidth: 440,
        padding: '10px 16px',
        borderRadius: 99,
        outline: 'none',
        fontSize: '14px',
        transition: 'all 0.3s ease'
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '16px',
        minWidth: 60
    },
    themeBtn: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
        borderRadius: '50%',
        transition: 'background 0.2s ease',
    },
    icon: {
        width: '24px',
        height: '24px',
        pointerEvents: 'none',
    }
};

const animationStyles = `
  .icon-sun {
    animation: sunAppear 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .icon-moon {
    animation: moonAppear 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .theme-toggle-btn {
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .theme-toggle-btn:hover {
    transform: scale(1.1);
  }
  .theme-toggle-btn:active {
    transform: scale(0.95);
  }

  @keyframes sunAppear {
    0% { transform: rotate(-60deg) scale(0.3); opacity: 0; }
    100% { transform: rotate(0deg) scale(1); opacity: 1; }
  }

  @keyframes moonAppear {
    0% { transform: rotate(30deg) scale(0.5); opacity: 0; }
    100% { transform: rotate(0deg) scale(1); opacity: 1; }
  }
`;