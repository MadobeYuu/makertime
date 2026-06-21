import { useState } from "react";

/**
 * Нижній докований сайдбар замість колишньої FAB-кнопки.
 */
export default function FabButton({ isDarkMode, activeView = "all", onNavigate, onAddClick }) {
  const [hoveredKey, setHoveredKey] = useState(null);

  const items = [
    { key: "all", label: "Усі треки", icon: AllTracksIcon },
    { key: "playlist", label: "Плейлист", icon: PlaylistIcon },
    { key: "add", label: "Додати треки", icon: AddIcon, isAction: true },
    { key: "genres", label: "Жанри", icon: GenresIcon },
    { key: "profile", label: "Профіль", icon: ProfileIcon },
  ];

  const dockBg = isDarkMode ? "rgba(24,24,24,0.75)" : "rgba(255,255,255,0.75)";
  const border = isDarkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const inactiveColor = isDarkMode ? "#8a8a8a" : "#8a8d92";
  const activeColor = isDarkMode ? "#ffffff" : "#121212";

  return (
    <nav style={styles.wrapper}>
      <div
        style={{
          ...styles.dock,
          background: dockBg,
          border: `1px solid ${border}`,
          boxShadow: isDarkMode
            ? "0 12px 32px rgba(0,0,0,0.5)"
            : "0 12px 32px rgba(0,0,0,0.14)",
        }}
      >
        {items.map(({ key, label, icon: Icon, isAction }) => {
          const isActive = activeView === key && !isAction;
          const isHovered = hoveredKey === key;

          if (isAction) {
            return (
              <button
                key={key}
                onClick={onAddClick}
                onMouseEnter={() => setHoveredKey(key)}
                onMouseLeave={() => setHoveredKey(null)}
                aria-label={label}
                style={styles.actionItem}
              >
                <div
                  style={{
                    ...styles.actionCircle,
                    border: `3px solid ${isDarkMode ? "#181818" : "#ffffff"}`,
                    transform: isHovered ? "scale(1.08) translateY(-2px)" : "scale(1)",
                  }}
                >
                  <Icon size={22} color="#fff" />
                </div>
                <span
                  style={{
                    ...styles.label,
                    color: isHovered ? activeColor : inactiveColor,
                  }}
                >
                  {label}
                </span>
              </button>
            );
          }

          return (
            <button
              key={key}
              onClick={() => onNavigate && onNavigate(key)}
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              style={styles.navItem}
            >
              <div
                style={{
                  ...styles.iconWrap,
                  background: isActive
                    ? "linear-gradient(135deg, rgba(255,0,127,0.16) 0%, rgba(37,117,252,0.16) 100%)"
                    : "transparent",
                }}
              >
                <Icon
                  size={20}
                  color={
                    isActive
                      ? "#ff007f"
                      : isHovered
                      ? activeColor
                      : inactiveColor
                  }
                />
              </div>
              <span
                style={{
                  ...styles.label,
                  color: isActive ? activeColor : inactiveColor,
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ---------- Іконки (inline SVG) ---------- */

function AllTracksIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h16M4 18h10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function AddIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function PlaylistIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 6h12M4 12h12M4 18h7" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="19" cy="16" r="2.2" stroke={color} strokeWidth="2" />
      <path d="M21.2 16V7l-3.2 1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GenresIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" stroke={color} strokeWidth="2" />
    </svg>
  );
}

function ProfileIcon({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" />
    </svg>
  );
}

/* ---------- Стилі ---------- */

const styles = {
  wrapper: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 22,
    display: "flex",
    justifyContent: "center",
    zIndex: 1000,
    pointerEvents: "none",
  },
  dock: {
    pointerEvents: "auto",
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "10px 14px",
    borderRadius: 28,
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px 10px",
    outline: "none",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.18s ease",
  },
  label: {
    fontSize: 10.5,
    letterSpacing: 0.1,
    transition: "color 0.15s ease",
    whiteSpace: "nowrap",
  },
  actionItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0 10px",
    outline: "none",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  },
  actionCircle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    marginTop: -22,
    background: "linear-gradient(135deg, #ff007f 0%, #2575fc 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 22px rgba(255,0,127,0.35)",
    transition: "transform 0.18s ease",
  },
};