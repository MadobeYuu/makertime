import { useState } from 'react';

export default function Header({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
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

            <div style={styles.right}></div>
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
        outline: 'none'
    },

    right: {
        width: 120
    }
};