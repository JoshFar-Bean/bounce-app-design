import { useRef, useState, useEffect, useMemo, type ReactNode } from "react"

type Screen =
  | "map"
  | "ask"
  | "history"
  | "chat"
  | "saved"
  | "you"
  | "plan"
  | "place"
  | "bounce"
  | "updated"
  | "search-along-route"
type Theme = "dark" | "light"
type IconName =
  | "history"
  | "edit"
  | "close"
  | "send"
  | "bookmark"
  | "check"
  | "pin"
  | "plus"
  | "clock"
  | "shuffle"
  | "route"
  | "share"
  | "chevron"
  | "bell"
  | "more"
  | "search"
  | "users"
  | "mic"
  | "trash"
  | "arrow"
  | "back"
  | "train"
  | "bus"
  | "walk"
  | "sun"
  | "moon"
  | "compass"
  | "lens"
  | "layers"
  | "target"
  | "directions"
  | "restaurants"
  | "petrol"
  | "coffee"
  | "corner-arrow"
  | "pin-filled"
  | "user-plus"
  | "grocery"
  | "restroom"
  | "hotel"
  | "home"
  | "work"
  | "places"
  | "info"

const iconPaths: Record<IconName, ReactNode> = {
  history: (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5M12 7v5l3 2" />
    </>
  ),
  edit: (
    <>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
    </>
  ),
  close: <path d="M18 6 6 18M6 6l12 12" />,
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </>
  ),
  bookmark: <path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />,
  check: <path d="m20 6-11 11-5-5" />,
  pin: (
    <>
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  shuffle: (
    <>
      <path d="M16 3h5v5M4 20l5-5M21 3l-7 7M15 15l6 6M21 16v5h-5M4 4l5 5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M8 19h3a3 3 0 0 0 3-3v-5a3 3 0 0 1 3-3h1" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  mic: (
    <>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  arrow: <path d="M5 12h14M12 5l7 7-7 7" />,
  back: <path d="m15 18-6-6 6-6" />,
  train: (
    <>
      <rect x="4" y="3" width="16" height="15" rx="3" />
      <path d="M8 21l2-3M16 21l-2-3M4 11h16M8 7h.01M16 7h.01" />
    </>
  ),
  bus: (
    <>
      <rect x="4" y="3" width="16" height="16" rx="3" />
      <path d="M4 11h16M8 16h.01M16 16h.01M7 21v-2M17 21v-2" />
    </>
  ),
  walk: (
    <>
      <circle cx="13" cy="4" r="2" />
      <path d="m10 22 1-7-3-3 2-5 5 3 3 1M11 15l4 3 1 4M8 12l-3 3" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  moon: <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2.1 4.9-4.9 2.1 2.1-4.9Z" />
    </>
  ),
  lens: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  layers: (
    <>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="7.5" />
      <line x1="12" y1="2" x2="12" y2="5.5" />
      <line x1="12" y1="18.5" x2="12" y2="22" />
      <line x1="2" y1="12" x2="5.5" y2="12" />
      <line x1="18.5" y1="12" x2="22" y2="12" />
    </>
  ),
  directions: (
    <g transform="translate(12,12) rotate(45) translate(-12,-12)">
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4"
        fill="currentColor"
        stroke="none"
      />
      <path
        d="M8.5 13.5v-2a1.5 1.5 0 0 1 1.5-1.5h4.5m0 0l-2.2-2.2m2.2 2.2l-2.2 2.2"
        stroke="#5ec3c6"
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  ),
  restaurants: (
    <>
      <path d="M18 2v20M21 2v6a3 3 0 0 1-3 3M18 5h3M6 2v20M4 2v5a2 2 0 0 0 4 0V2M6 7v15" />
    </>
  ),
  petrol: (
    <>
      <path d="M3 22h12M4 9h10M4 4h10a1 1 0 0 1 1 1v17H3V5a1 1 0 0 1 1-1Z" />
      <path d="M18 7v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <circle cx="9" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  coffee: (
    <>
      <path d="M17 8h1a4 4 0 0 1 0 8h-1M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8ZM6 2v3M10 2v3M14 2v3" />
    </>
  ),
  "corner-arrow": (
    <>
      <path d="M9 10 4 15l5 5" />
      <path d="M20 4v7a4 4 0 0 1-4 4H4" />
    </>
  ),
  "pin-filled": (
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
      fill="currentColor"
      stroke="none"
    />
  ),
  "user-plus": (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" y1="8" x2="19" y2="14" />
      <line x1="22" y1="11" x2="16" y2="11" />
    </>
  ),
  grocery: (
    <>
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </>
  ),
  restroom: (
    <>
      <circle cx="9" cy="5" r="2" />
      <path d="M9 9 7 19h4l-2-10Z" />
      <circle cx="15" cy="5" r="2" />
      <path d="M13 19V9h4v10" />
    </>
  ),
  hotel: (
    <>
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </>
  ),
  home: (
    <>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </>
  ),
  work: (
    <>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </>
  ),
  places: (
    <>
      <circle cx="8" cy="12" r="3" />
      <circle cx="16" cy="12" r="3" />
      <path d="M8 9a1.5 1.5 0 0 1 1.5 1.5" />
      <path d="M16 9a1.5 1.5 0 0 1 1.5 1.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </>
  ),
}

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

function AskMark({ size = 26, color }: { size?: number; color?: string }) {
  return (
    <svg
      className="ask-mark"
      viewBox="0 0 28 28"
      width={size}
      height={size}
      style={{ width: size, height: size, flexShrink: 0 }}
      aria-hidden="true"
    >
      <path d="M13 2v7M9.5 5.5h7" stroke={color || "#8AB4F8"} />
      <path
        d="M18 8c-6-4-12 0-12 6s6 9 10 6c3-2 2-5-1-6-2-1-4 2-2 4"
        stroke={color || "#4285F4"}
      />
      <path d="M17 19c3-1 5-4 5-7" stroke="#34A853" />
      <path d="M22 12c0-2-1-3-3-5" stroke="#F9AB00" />
      <path d="M19 7c-1-1-2-1-3-1" stroke="#EA4335" />
    </svg>
  )
}

function AskSparkle({
  size = 24,
  color = "#1a73e8",
}: {
  size?: number
  color?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <circle
        cx="9.5"
        cy="11.5"
        r="5.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M13.5 15.5L18.5 20.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 3L16.8 5.2L19 6L16.8 6.8L16 9L15.2 6.8L13 6L15.2 5.2L16 3Z"
        fill={color}
      />
      <path
        d="M7 3L7.4 4.1L8.5 4.5L7.4 4.9L7 6L6.6 4.9L5.5 4.5L6.6 4.1L7 3Z"
        fill={color}
      />
    </svg>
  )
}

function GooglePin({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M16 2C10.477 2 6 6.477 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.523-4.477-10-10-10z"
        fill="#EA4335"
      />
      <path
        d="M16 2c3.5 0 6.5 1.8 8.2 4.6l-4.5 4.5A4.5 4.5 0 0 0 16 9.5V2z"
        fill="#FBBC04"
      />
      <path
        d="M24.2 6.6C25.3 8.2 26 10 26 12c0 3.2-1.8 7-4.2 10.8l-5.8 7.2V16.5l3.7-3.7a4.5 4.5 0 0 0 .5-6.2z"
        fill="#34A853"
      />
      <path
        d="M16 30S6 19.5 6 12c0-2 .7-3.8 1.8-5.4l5.9 5.9a4.5 4.5 0 0 0 2.3 4V30z"
        fill="#4285F4"
      />
      <circle cx="16" cy="12" r="3.6" fill="#1e2124" />
    </svg>
  )
}

function WeatherIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle cx="8" cy="8" r="4.2" fill="#F9AB00" />
      <path
        d="M9 19h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-5.3-3.9 5.5 5.5 0 0 0-5.2 3.9A4 4 0 0 0 9 19z"
        fill="#FFFFFF"
        opacity="0.95"
      />
    </svg>
  )
}

function MakePlansIllustration() {
  return (
    <svg
      width="68"
      height="54"
      viewBox="0 0 68 54"
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <circle cx="50" cy="18" r="14" fill="#8B5CF6" fillOpacity="0.2" />
      <circle cx="24" cy="34" r="14" fill="#10B981" fillOpacity="0.15" />
      <circle cx="48" cy="40" r="14" fill="#3B82F6" fillOpacity="0.2" />

      {/* Top Figure: Purple shirt, pink bun, binoculars */}
      <g transform="translate(36, 4)">
        <circle cx="20" cy="4" r="5" fill="#EC4899" />
        <circle cx="15" cy="8" r="6" fill="#FBBF24" />
        <path d="M7 24c0-6 4-10 10-10h4c6 0 9 4 9 10H7z" fill="#8B5CF6" />
        <rect x="2" y="6" width="10" height="4" rx="2" fill="#0D9488" />
        <rect x="0" y="5" width="4" height="6" rx="1.5" fill="#14B8A6" />
      </g>

      {/* Left Figure: Green scarf */}
      <g transform="translate(6, 18)">
        <path
          d="M10 2c-5 0-9 4-9 9 0 4 2.5 7.5 6 8.5v3.5h7v-3.5c3.5-1 6-4.5 6-8.5 0-5-4-9-10-9z"
          fill="#059669"
        />
        <circle cx="10" cy="11" r="5" fill="#D97706" />
        <path
          d="M2 32c0-5 3.5-8 8.5-8s8.5 3 8.5 8H2z"
          fill="#F59E0B"
          fillOpacity="0.8"
        />
      </g>

      {/* Bottom Figure: Blue cap, camera */}
      <g transform="translate(32, 24)">
        <path
          d="M12 6c0-3.5 3-6 7-6 3.5 0 6 2 7 4.5l6 1.5H19c-3 0-5 1-7 0z"
          fill="#2563EB"
        />
        <circle cx="18" cy="11" r="5" fill="#FBBF24" />
        <path d="M9 30c0-6 4-10 10-10h2c6 0 10 4 10 10H9z" fill="#1D4ED8" />
        <rect x="3" y="16" width="9" height="6" rx="1.5" fill="#06B6D4" />
      </g>

      {/* Sparkles */}
      <path d="M24 10l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="#67E8F9" />
      <path
        d="M60 30l.8 1.6 1.6.8-1.6.8-.8 1.6-.8-1.6-1.6-.8 1.6-.8.8-1.6z"
        fill="#F472B6"
      />
      <path
        d="M14 44l.6 1.2 1.2.6-1.2.6-.6 1.2-.6-1.2-1.2-.6 1.2-.6.6-1.2z"
        fill="#FDE047"
      />
    </svg>
  )
}

function StatusBar() {
  return (
    <div
      className="status-bar"
      aria-label="1:07, navigation active, cellular signal, Wi-Fi and battery status"
    >
      <div className="status-left">
        <b>1:07</b>
        <span className="status-navigation">▲</span>
      </div>
      <div className="status-right">
        <span className="signal-bars">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="wifi-icon">
          <i />
          <i />
        </span>
        <span className="battery-icon">
          <i />
        </span>
      </div>
    </div>
  )
}

function Tap({
  children,
  label,
  className = "",
  onPress,
  style, // 1. ADD THIS LINE // 2. ADD THIS LINE
}: {
  children?: ReactNode
  label: string
  className?: string
  onPress?: () => void
  style?: React.CSSProperties
}) {
  return (
    <div
      className={`tap ${className}`}
      style={
        style // 3. ADD THIS LINE
      }
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={onPress}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onPress?.()}
    >
      {children}
    </div>
  )
}

function RoundAction({
  icon,
  label,
  onPress,
  accent = false,
}: {
  icon: IconName
  label: string
  onPress?: () => void
  accent?: boolean
}) {
  return (
    <Tap
      label={label}
      className={`round-action ${accent ? "accent" : ""}`}
      onPress={onPress}
    >
      <Icon name={icon} />
    </Tap>
  )
}

function BackButton({
  onPress,
  label = "Back",
  theme,
  style,
}: {
  onPress: () => void
  label?: string
  theme?: Theme
  style?: React.CSSProperties
}) {
  return (
    <Tap
      label={label}
      className="back-button"
      onPress={onPress}
      style={{
        ...(theme === "light"
          ? {
              background: "#ffffff",
              color: "#202124",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
            }
          : theme === "dark"
            ? {
                background: "#252628e8",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
              }
            : {}),
        pointerEvents: "auto",
        ...style,
      }}
    >
      <Icon name="back" size={25} />
    </Tap>
  )
}

function MapControls({
  theme,
  onToggleTheme,
}: {
  theme: Theme
  onToggleTheme: () => void
}) {
  return (
    <div className="map-controls">
      <Tap
        label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="map-control theme-toggle"
        onPress={onToggleTheme}
      >
        <Icon name={theme === "dark" ? "sun" : "moon"} size={21} />
      </Tap>
      <div className="map-control compass-control" aria-label="Compass">
        <Icon name="compass" size={22} />
      </div>
    </div>
  )
}

function AskHeader({
  theme = "dark",
  onHistory,
  onBack,
  onClose,
}: {
  theme?: Theme
  onHistory?: () => void
  onBack?: () => void
  onClose?: () => void
}) {
  const isLight = theme === "light"
  return (
    <div className="ask-header">
      <div className="drag" />
      {onBack && <BackButton onPress={onBack} theme={theme} />}
      <div className="ask-lockup">
        <AskSparkle size={24} color={isLight ? "#1a73e8" : "#8ab4f8"} />
        <span>Ask Maps</span>
      </div>
      <div className="header-actions">
        {onHistory && (
          <RoundAction
            icon="history"
            label="Chat history"
            onPress={onHistory}
          />
        )}
        <RoundAction icon="edit" label="New chat" />
        {onClose && (
          <RoundAction icon="close" label="Close" onPress={onClose} />
        )}
      </div>
    </div>
  )
}

function BottomNav({
  active,
  onYou,
  onExplore,
}: {
  active: "Explore" | "You"
  onYou: () => void
  onExplore: () => void
}) {
  return (
    <div className="bottom-nav">
      <Tap
        label="Explore"
        className={`nav-item ${active === "Explore" ? "active" : ""}`}
        onPress={onExplore}
      >
        <span className="nav-well">
          <Icon name={active === "Explore" ? "pin-filled" : "pin"} />
        </span>
        <span>Explore</span>
      </Tap>
      <Tap
        label="You"
        className={`nav-item ${active === "You" ? "active" : ""}`}
        onPress={onYou}
      >
        <span className="nav-well">
          <Icon name="bookmark" />
          <i />
        </span>
        <span>You</span>
      </Tap>
      <Tap label="Contribute" className="nav-item">
        <span className="nav-well">
          <Icon name="plus" />
        </span>
        <span>Contribute</span>
      </Tap>
    </div>
  )
}

function ReferenceScreen({
  src,
  children,
}: {
  src: string
  children?: ReactNode
}) {
  return (
    <div className="reference-screen">
      <img src={src} alt="" />
      {children}
    </div>
  )
}

function MapScreen({
  saved,
  theme,
  onToggleTheme,
  onAsk,
  onYou,
  onDirections,
  onRecenter,
}: {
  saved: boolean
  theme: Theme
  onToggleTheme: () => void
  onAsk: () => void
  onYou: () => void
  onDirections?: () => void
  onRecenter?: () => void
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* 1. Top Search Bar Area & Category Chips Row (Directly matches Google Maps reference) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          padding: "44px 14px 0",
          pointerEvents: "none",
        }}
      >
        {/* Floating Rounded Search Bar */}
        <div
          onClick={onAsk}
          className="tap"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "var(--control)",
            borderRadius: "9999px",
            padding: "0 8px 0 16px",
            height: "52px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.08)",
            pointerEvents: "auto",
            cursor: "pointer",
          }}
          role="button"
          tabIndex={0}
          aria-label="Search here"
        >
          {/* Authentic Google Maps 4-Color Pin */}
          <GooglePin size={24} />

          {/* Search Placeholder */}
          <span
            style={{
              flex: 1,
              fontSize: "16px",
              color: "var(--text-low)",
              fontWeight: 400,
            }}
          >
            Search here
          </span>

          {/* Right Action Icons: Mic, Lens, Avatar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginRight: "4px",
            }}
          >
            <div
              style={{
                color: "var(--text-high)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="mic" size={21} />
            </div>
            <div
              style={{
                color: "var(--text-high)",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="lens" size={20} />
            </div>

            {/* User Profile Avatar with Blue Ring */}
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#8bc34a",
                color: "#ffffff",
                display: "grid",
                placeItems: "center",
                fontSize: "17px",
                fontWeight: 600,
                fontFamily: "system-ui, -apple-system, sans-serif",
                boxShadow: "0 0 0 2px var(--control), 0 0 0 4px #4285f4",
                flexShrink: 0,
                lineHeight: 1,
              }}
            >
              j
            </div>
          </div>
        </div>

        {/* Quick Filter Chips Row (Horizontally Scrollable) */}
        <div
          className="chips-row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "10px",
            overflowX: "auto",
            paddingBottom: "4px",
            pointerEvents: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* Ask Maps Chip (Active with Blue Accent Outline) */}
          <div
            onClick={onAsk}
            className="tap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0 14px",
              height: "36px",
              borderRadius: "9999px",
              background: theme === "light" ? "#e8f0fe" : "#182536",
              border:
                theme === "light"
                  ? "1.5px solid #1a73e8"
                  : "1.5px solid #4285f4",
              color: theme === "light" ? "#1a73e8" : "#8ab4f8",
              fontSize: "13px",
              fontWeight: 600,
              whiteSpace: "nowrap",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <AskSparkle
              size={18}
              color={theme === "light" ? "#1a73e8" : "#8ab4f8"}
            />
            <span style={{ color: theme === "light" ? "#1a73e8" : "#ffffff" }}>
              Ask Maps
            </span>
          </div>

          {/* Restaurants Chip */}
          <div
            className="tap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0 14px",
              height: "36px",
              borderRadius: "9999px",
              background: "var(--control)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-high)",
              fontSize: "13px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <Icon name="restaurants" size={17} />
            <span>Restaurants</span>
          </div>

          {/* Petrol Chip */}
          <div
            className="tap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0 14px",
              height: "36px",
              borderRadius: "9999px",
              background: "var(--control)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-high)",
              fontSize: "13px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <Icon name="petrol" size={17} />
            <span>Petrol</span>
          </div>

          {/* Coffee Chip */}
          <div
            className="tap"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "0 14px",
              height: "36px",
              borderRadius: "9999px",
              background: "var(--control)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-high)",
              fontSize: "13px",
              fontWeight: 500,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            <Icon name="coffee" size={17} />
            <span>Coffee</span>
          </div>
        </div>
      </div>

      {/* 2. Floating Action Button: Upper Layers Button */}
      <div
        className="tap"
        style={{
          position: "absolute",
          top: "154px",
          right: "14px",
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: "var(--control)",
          color: "var(--text-high)",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 3px 12px rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.08)",
          pointerEvents: "auto",
          zIndex: 15,
          cursor: "pointer",
        }}
        title="Map Layers"
      >
        <Icon name="layers" size={20} />
      </div>

      {/* 3. Lower Floating Action Button Cluster (Compass, Theme Toggle, Directions) */}
      <div
        style={{
          position: "absolute",
          bottom: "312px",
          right: "14px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          pointerEvents: "auto",
          zIndex: 26,
        }}
      >
        {/* Vertical Pill containing Compass + White Sun Theme Toggle */}
        <div
          style={{
            background: "var(--control)",
            borderRadius: "24px",
            padding: "3px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Compass / Recenter Button */}
          <div
            onClick={onRecenter}
            className="tap"
            style={{
              width: "40px",
              height: "38px",
              display: "grid",
              placeItems: "center",
              color: "var(--text-high)",
              cursor: "pointer",
            }}
            title="Recenter Map"
          >
            <Icon name="target" size={20} />
          </div>

          {/* Circular Theme Toggle Button (White Sun in dark mode) */}
          <div
            onClick={onToggleTheme}
            className="tap"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: theme === "dark" ? "#ffffff" : "#202124",
              color: theme === "dark" ? "#202124" : "#ffffff",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              cursor: "pointer",
            }}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={20} />
          </div>
        </div>

        {/* Teal Directions Navigation Button */}
        <div
          onClick={onDirections}
          className="tap"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "16px",
            background: "#5ec3c6",
            color: "#08262a",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
            cursor: "pointer",
          }}
          title="Directions"
        >
          <Icon name="directions" size={24} />
        </div>
      </div>

      {/* 4. Bottom Sheet ("Be in the know") */}
      <div
        className="bottom-sheet"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "var(--canvas)",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          boxShadow: "0 -6px 24px rgba(0,0,0,0.5)",
          zIndex: 25,
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Grab Handle */}
        <div
          style={{
            width: "36px",
            height: "4px",
            borderRadius: "999px",
            background: "#5f6368",
            margin: "10px auto 12px auto",
          }}
        />

        {/* Header Row: "Be in the know" + Weather Badge */}
        <div
          style={{
            padding: "0 16px 12px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Be in the know
          </span>

          {/* Weather Pill (32° • 62 PSI) */}
          <div
            style={{
              background: "var(--raised)",
              borderRadius: "12px",
              padding: "4px 10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "2px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <WeatherIcon size={16} />
              <span
                style={{
                  color: "var(--text)",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                32°
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#4285f4",
                }}
              />
              <span
                style={{
                  color: "var(--text-low)",
                  fontSize: "10px",
                  fontWeight: 500,
                }}
              >
                62 PSI
              </span>
            </div>
          </div>
        </div>

        {/* Promo Card: "Make plans with Ask Maps" */}
        <div
          onClick={onAsk}
          className="tap"
          style={{
            margin: "0 14px 12px",
            background: "var(--raised)",
            borderRadius: "20px",
            padding: "14px 16px 12px",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer",
          }}
        >
          {/* Card Title */}
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <span
              style={{
                color: "var(--text)",
                fontSize: "15px",
                fontWeight: 600,
              }}
            >
              Make plans with
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <AskSparkle
                size={18}
                color={theme === "light" ? "#1a73e8" : "#8ab4f8"}
              />
              <span
                style={{
                  color: theme === "light" ? "#1a73e8" : "#8ab4f8",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Ask Maps
              </span>
            </div>
          </div>

          {/* Interactive Search Chip & Characters Illustration */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                background: "var(--input)",
                borderRadius: "999px",
                padding: "8px 14px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--text-high)",
                fontSize: "13px",
                fontWeight: 500,
                maxWidth: "70%",
              }}
            >
              <Icon name="corner-arrow" size={15} />
              <span
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Things to do this weekend?
              </span>
            </div>

            {/* Stylized Google Characters Illustration */}
            <MakePlansIllustration />
          </div>
        </div>

        {/* 5. Bottom Navigation Bar */}
        <div
          style={{
            height: "62px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            background: "var(--canvas)",
            borderTop:
              theme === "light"
                ? "1px solid #e0e4e6"
                : "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Explore Tab (Active with Teal Pill in Dark Mode, Soft Blue Pill in Light Mode) */}
          <div
            className="tap"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
            }}
          >
            <div
              style={{
                width: "58px",
                height: "30px",
                borderRadius: "999px",
                background: theme === "light" ? "#c2e7ff" : "#004f54",
                color: theme === "light" ? "#001d35" : "#55d0d4",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Icon name="pin-filled" size={18} />
            </div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: theme === "light" ? 700 : 600,
                color: theme === "light" ? "#001d35" : "var(--text)",
              }}
            >
              Explore
            </span>
          </div>

          {/* You Tab */}
          <div
            onClick={onYou}
            className="tap"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "58px",
                height: "30px",
                display: "grid",
                placeItems: "center",
                color: theme === "light" ? "#444746" : "var(--text-low)",
                position: "relative",
              }}
            >
              <Icon name="bookmark" size={20} />
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "18px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: theme === "light" ? "#d93025" : "#f28b82",
                }}
              />
            </div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: theme === "light" ? "#444746" : "var(--text-low)",
              }}
            >
              You
            </span>
          </div>

          {/* Contribute Tab */}
          <div
            className="tap"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "3px",
            }}
          >
            <div
              style={{
                width: "58px",
                height: "30px",
                display: "grid",
                placeItems: "center",
                color: theme === "light" ? "#444746" : "var(--text-low)",
              }}
            >
              <Icon name="plus" size={20} />
            </div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 500,
                color: theme === "light" ? "#444746" : "var(--text-low)",
              }}
            >
              Contribute
            </span>
          </div>
        </div>

        {/* iPhone Bottom Home Indicator */}
        <div
          style={{
            height: "16px",
            background: "var(--canvas)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "2px",
          }}
        >
          <div
            style={{
              width: "134px",
              height: "4.5px",
              borderRadius: "999px",
              background: "#ffffff",
              opacity: 0.8,
            }}
          />
        </div>
      </div>

      {/* 6. Save Confirmation Toast */}
      {saved && (
        <div className="toast" style={{ zIndex: 35, pointerEvents: "none" }}>
          <span className="toast-icon">
            <Icon name="check" size={18} />
          </span>
          <span>
            <b>Plan saved</b>
            <small>Singapore food trail added to Your Plans</small>
          </span>
        </div>
      )}
    </div>
  )
}
function IOSKeyboard({
  theme = "dark",
  onSend,
  onKey,
  onBackspace,
}: {
  theme?: Theme
  onSend: () => void
  onKey?: (char: string) => void
  onBackspace?: () => void
}) {
  const isLight = theme === "light"
  const kbBg = isLight ? "#d1d5db" : "#1c1d1f"
  const keyBg = isLight ? "#ffffff" : "#38393c"
  const keyText = isLight ? "#000000" : "#ffffff"
  const specKeyBg = isLight ? "#b2b8c2" : "#2a2b2e"
  const keyShadow = isLight
    ? "0 1px 0 rgba(0,0,0,0.3)"
    : "0 1px 0 rgba(0,0,0,0.5)"

  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const row3 = ["Z", "X", "C", "V", "B", "N", "M"]

  return (
    <div
      style={{
        background: kbBg,
        padding: "6px 4px 10px",
        userSelect: "none",
        borderTop: isLight ? "1px solid #c4c7c5" : "1px solid #2a2b2e",
      }}
    >
      {/* Predictive text suggestions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: 32,
          marginBottom: 4,
          fontSize: 14,
          color: isLight ? "#3c4043" : "#d1d5db",
          fontWeight: 400,
        }}
      >
        <span style={{ flex: 1, textAlign: "center" }}>I</span>
        <div
          style={{
            width: 1,
            height: 16,
            background: isLight ? "#bdc1c6" : "#444746",
          }}
        />
        <span style={{ flex: 1, textAlign: "center", fontWeight: 500 }}>
          The
        </span>
        <div
          style={{
            width: 1,
            height: 16,
            background: isLight ? "#bdc1c6" : "#444746",
          }}
        />
        <span style={{ flex: 1, textAlign: "center" }}>I’m</span>
      </div>

      {/* Row 1 */}
      <div
        style={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
          marginBottom: 7,
        }}
      >
        {row1.map((char) => (
          <button
            key={char}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onKey?.(char.toLowerCase())}
            style={{
              flex: 1,
              height: 42,
              borderRadius: 6,
              background: keyBg,
              color: keyText,
              border: "none",
              fontSize: 18,
              fontWeight: 400,
              boxShadow: keyShadow,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            {char}
          </button>
        ))}
      </div>

      {/* Row 2 */}
      <div
        style={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
          padding: "0 14px",
          marginBottom: 7,
        }}
      >
        {row2.map((char) => (
          <button
            key={char}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onKey?.(char.toLowerCase())}
            style={{
              flex: 1,
              height: 42,
              borderRadius: 6,
              background: keyBg,
              color: keyText,
              border: "none",
              fontSize: 18,
              fontWeight: 400,
              boxShadow: keyShadow,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            {char}
          </button>
        ))}
      </div>

      {/* Row 3 */}
      <div
        style={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
          marginBottom: 7,
        }}
      >
        {/* Shift */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 6,
            background: specKeyBg,
            color: keyText,
            border: "none",
            display: "grid",
            placeItems: "center",
            boxShadow: keyShadow,
            cursor: "pointer",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M12 4L4 14h5v6h6v-6h5L12 4z" />
          </svg>
        </button>

        {row3.map((char) => (
          <button
            key={char}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onKey?.(char.toLowerCase())}
            style={{
              flex: 1,
              height: 42,
              borderRadius: 6,
              background: keyBg,
              color: keyText,
              border: "none",
              fontSize: 18,
              fontWeight: 400,
              boxShadow: keyShadow,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            {char}
          </button>
        ))}

        {/* Backspace */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onBackspace?.()}
          style={{
            width: 42,
            height: 42,
            borderRadius: 6,
            background: specKeyBg,
            color: keyText,
            border: "none",
            display: "grid",
            placeItems: "center",
            boxShadow: keyShadow,
            cursor: "pointer",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
            <line x1="18" y1="9" x2="12" y2="15" />
            <line x1="12" y1="9" x2="18" y2="15" />
          </svg>
        </button>
      </div>

      {/* Row 4 */}
      <div
        style={{
          display: "flex",
          gap: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 123 */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          style={{
            width: 38,
            height: 42,
            borderRadius: 6,
            background: specKeyBg,
            color: keyText,
            border: "none",
            fontSize: 15,
            fontWeight: 500,
            boxShadow: keyShadow,
            cursor: "pointer",
          }}
        >
          123
        </button>

        {/* Emoji */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          style={{
            width: 38,
            height: 42,
            borderRadius: 6,
            background: specKeyBg,
            color: keyText,
            border: "none",
            fontSize: 18,
            display: "grid",
            placeItems: "center",
            boxShadow: keyShadow,
            cursor: "pointer",
          }}
        >
          😊
        </button>

        {/* Space bar */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onKey?.(" ")}
          style={{
            flex: 1,
            height: 42,
            borderRadius: 6,
            background: keyBg,
            color: isLight ? "#9aa0a6" : "#70757a",
            border: "none",
            fontSize: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 10,
            boxShadow: keyShadow,
            cursor: "pointer",
          }}
        >
          EN
        </button>

        {/* Blue Send Button */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onSend}
          aria-label="Send prompt"
          style={{
            width: 66,
            height: 42,
            borderRadius: 6,
            background: "#007aff",
            color: "#ffffff",
            border: "none",
            display: "grid",
            placeItems: "center",
            boxShadow: "0 1px 2px rgba(0,122,255,0.4)",
            cursor: "pointer",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>

      {/* Bottom utility row (globe & mic) */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 18px 0",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLight ? "#3c4043" : "#9aa0a6"}
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke={isLight ? "#3c4043" : "#9aa0a6"}
          strokeWidth="1.8"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8" />
        </svg>
      </div>
    </div>
  )
}

function AskStart({
  theme = "dark",
  onHistory,
  onSend,
  onClose,
}: {
  theme?: Theme
  onHistory: () => void
  onSend: () => void
  onClose: () => void
}) {
  const [prompt, setPrompt] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const isLight = theme === "light"
  const mapImg = isLight
    ? "/assets/prototype/screen-4.jpg"
    : "/assets/explore-home-map.jpg"
  const sheetBg = isLight ? "#ffffff" : "#1b1f23"
  const textColor = isLight ? "#1f1f1f" : "#e8eaed"
  const subtextColor = isLight ? "#444746" : "#9aa0a6"
  const cardBg = isLight ? "#f0f4f9" : "#25292e"
  const grabberBg = isLight ? "#c4c7c5" : "#444746"
  const inputBg = isLight ? "#ffffff" : "#25292e"
  const inputBorder = isLight
    ? "1.5px solid #dadce0"
    : "1.5px solid transparent"
  const sparkleColor = isLight ? "#1a73e8" : "#8ab4f8"

  const suggestions = [
    "What can Ask Maps help me with today?",
    "Free things to do near me",
    "Help me plan a 2-day food trail in Singapore",
  ]

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: isLight ? "#f0f4f9" : "#121416",
      }}
    >
      {/* 1. Map peek behind sheet */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          overflow: "hidden",
          opacity: 0.85,
        }}
      >
        <img
          src={mapImg}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isLight
              ? "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.6) 100%)"
              : "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* 2. Main Sheet: starts below status bar (top: 48px) to avoid duplicating top bar */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          bottom: 0,
          background: sheetBg,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          boxShadow: isLight
            ? "0 -8px 24px rgba(0,0,0,0.12)"
            : "0 -8px 24px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Grab handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 6,
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: grabberBg,
            }}
          />
        </div>

        {/* Sheet Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 18px 12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <AskSparkle size={24} color={sparkleColor} />
            <span
              style={{
                fontSize: 19,
                fontWeight: 600,
                color: textColor,
                letterSpacing: "-0.01em",
              }}
            >
              Ask Maps
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <RoundAction
              icon="history"
              label="Chat history"
              onPress={onHistory}
            />
            <RoundAction icon="edit" label="New chat" />
            <RoundAction icon="close" label="Close" onPress={onClose} />
          </div>
        </div>

        {/* Content Area */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 18px 12px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Greeting */}
          <div style={{ textAlign: "center", marginTop: 12, marginBottom: 26 }}>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 600,
                color: sparkleColor,
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Hi, joshua
            </h2>
            <p
              style={{
                fontSize: 19,
                fontWeight: 400,
                color: subtextColor,
                margin: "6px 0 0",
              }}
            >
              How can I help you?
            </p>
          </div>

          {/* Suggestion Chips */}
          <div
            style={{
              display: "flex",
              gap: 10,
              overflowX: "auto",
              paddingBottom: 8,
              scrollbarWidth: "none",
            }}
          >
            {suggestions.map((text, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setPrompt(text)
                  onSend()
                }}
                style={{
                  flexShrink: 0,
                  width: 170,
                  minHeight: 88,
                  padding: "14px 16px",
                  borderRadius: 20,
                  background: cardBg,
                  border: "none",
                  color: textColor,
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 1.35,
                  textAlign: "left",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                {text}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Prompt Input Box */}
          <div
            onClick={() => inputRef.current?.focus()}
            style={{
              borderRadius: 18,
              background: inputBg,
              border: inputBorder,
              padding: "12px 16px",
              minHeight: 52,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
              boxShadow: isLight
                ? "0 2px 8px rgba(0,0,0,0.04)"
                : "0 2px 8px rgba(0,0,0,0.2)",
              cursor: "text",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSend()
                }
              }}
              placeholder="Ask a question"
              aria-label="Ask Maps prompt"
              className="ask-prompt-input"
              autoFocus
              style={{
                flex: 1,
                fontSize: 16,
                color: textColor,
                background: "transparent",
                border: "none",
                outline: "none",
                padding: 0,
                margin: 0,
                width: "100%",
                caretColor: sparkleColor,
                fontFamily: "inherit",
              }}
            />
            <span
              style={{
                color: isLight ? "#1f1f1f" : "#e8eaed",
                marginLeft: 8,
                flexShrink: 0,
                pointerEvents: "none",
              }}
            >
              <Icon name="mic" size={20} />
            </span>
          </div>

          {prompt.length > 0 && (
            <div
              style={{
                textAlign: "center",
                fontSize: 12,
                color: sparkleColor,
                marginBottom: 6,
              }}
            >
              Tap the blue arrow on the keyboard to send
            </div>
          )}
        </div>

        {/* iOS Keyboard */}
        <IOSKeyboard
          theme={theme}
          onSend={onSend}
          onKey={(char) => setPrompt((prev) => prev + char)}
          onBackspace={() => setPrompt((prev) => prev.slice(0, -1))}
        />
      </div>
    </div>
  )
}

function HistoryScreen({
  theme = "dark",
  onOpen,
  onClose,
}: {
  theme?: Theme
  onOpen: () => void
  onClose: () => void
}) {
  const isLight = theme === "light"
  const mapImg = isLight
    ? "/assets/prototype/screen-4.jpg"
    : "/assets/explore-home-map.jpg"
  const sheetBg = isLight ? "#ffffff" : "#1b1f23"
  const textColor = isLight ? "#1f1f1f" : "#e8eaed"
  const subtextColor = isLight ? "#444746" : "#9aa0a6"
  const cardBg = isLight ? "#f0f4f9" : "#25292e"
  const grabberBg = isLight ? "#c4c7c5" : "#444746"

  const historySections = [
    {
      heading: "Today",
      items: [
        {
          title: 'organise my pins in the list "Food places t...',
          time: "1 hour ago",
          action: onOpen,
        },
      ],
    },
    {
      heading: "Last seven days",
      items: [
        {
          title: "give me a 2 day plan of food places base...",
          time: "2 days ago",
          action: onOpen,
        },
      ],
    },
  ]

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        background: isLight ? "#f0f4f9" : "#121416",
      }}
    >
      {/* 1. Map peek behind sheet */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          overflow: "hidden",
          opacity: 0.85,
        }}
      >
        <img
          src={mapImg}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 2. Main Sheet: starts at top: 48px to avoid duplicating top bar */}
      <div
        style={{
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          bottom: 0,
          background: sheetBg,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          boxShadow: isLight
            ? "0 -8px 24px rgba(0,0,0,0.12)"
            : "0 -8px 24px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Grab handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 10,
            paddingBottom: 6,
          }}
        >
          <div
            style={{
              width: 36,
              height: 4,
              borderRadius: 2,
              background: grabberBg,
            }}
          />
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 18px 12px",
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: textColor,
              letterSpacing: "-0.01em",
            }}
          >
            Your chat history
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <RoundAction icon="edit" label="New chat" />
            <RoundAction icon="close" label="Close" onPress={onClose} />
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "8px 18px 24px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {historySections.map((sec, sIdx) => (
            <div key={sIdx} style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: subtextColor,
                  marginTop: sIdx === 0 ? 4 : 10,
                  marginBottom: 10,
                }}
              >
                {sec.heading}
              </div>

              {sec.items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={item.action}
                  style={{
                    background: cardBg,
                    borderRadius: 16,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "transform 0.1s ease, background 0.15s ease",
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1, paddingRight: 12 }}>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: textColor,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: subtextColor,
                        marginTop: 4,
                      }}
                    >
                      {item.time}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                    aria-label="Delete history item"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: subtextColor,
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    <Icon name="trash" size={18} />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const chatItinerary = [
  {
    day: "Day 1",
    theme: "Coffee, skyline views and an easy city walk",
    title: "Kahve",
    meta: "4.9 ★ (85) · Cafe",
    status: "Open · Closes 5 pm",
    image: "chat-kahve.jpg",
    recommendation:
      "Start at Kahve for a quiet coffee before the business district gets busy.",
    detail: "Best around 9:00 am · 45 min suggested",
  },
  {
    day: "Day 1",
    theme: "Coffee, skyline views and an easy city walk",
    title: "Suntec City views",
    meta: "4.6 ★ (27) · Landmark",
    status: "Open now",
    image: "chat-city.jpg",
    recommendation:
      "Then walk to Suntec for open-air views and a relaxed late morning.",
    detail: "11 min walk · Mostly sheltered",
  },
  {
    day: "Day 2",
    theme: "Market streets, pastries and a garden break",
    title: "KŌBASHI",
    meta: "4.0 ★ (352) · Bakery",
    status: "Open · Closes 6 pm",
    image: "chat-kobashi.jpg",
    recommendation:
      "Begin day two with KŌBASHI’s sourdough and seasonal pastries.",
    detail: "Best before noon · Popular with locals",
  },
  {
    day: "Day 2",
    theme: "Market streets, pastries and a garden break",
    title: "Green Oasis · CapitaSpring",
    meta: "4.6 ★ (27) · Garden",
    status: "Opens 2:30 pm",
    image: "chat-city.jpg",
    recommendation:
      "After lunch, Green Oasis gives you a calm garden stop above the city.",
    detail: "8 min walk · Allow 40 min",
  },
  {
    day: "Day 2",
    theme: "Market streets, pastries and a garden break",
    title: "Loulouca",
    meta: "4.8 ★ (104) · Dessert",
    status: "Open · Closes 11 pm",
    image: "chat-dessert.jpg",
    recommendation:
      "Finish day two at Loulouca when the evening crowd settles in.",
    detail: "Reserve 7:30 pm · Great for sharing",
  },
]

function ChatScreen({
  theme = "dark",
  onHistory,
  onBack,
  onClose,
  onSave,
}: {
  theme?: Theme
  onHistory: () => void
  onBack?: () => void
  onClose: () => void
  onSave: () => void
}) {
  const dragStart = useRef<number | null>(null)
  const [mapExpanded, setMapExpanded] = useState(
    new URLSearchParams(window.location.search).get("chatmap") === "1",
  )
  const [isScrolled, setIsScrolled] = useState(false)
  const finishDrag = (clientY: number) => {
    if (dragStart.current === null) return
    const distance = clientY - dragStart.current
    setMapExpanded(distance > 24 ? true : distance < -24 ? false : !mapExpanded)
    dragStart.current = null
  }
  const isLight = theme === "light"
  const overviewMapSrc = isLight
    ? "/assets/prototype/chat-overview-map-light.jpg"
    : "/assets/prototype/chat-overview-map.jpg"

  return (
    <div className="chat-screen">
      <div className="chat-overview-map">
        <img
          src={
            isLight ? "/assets/prototype/drawer-down-map.jpg" : overviewMapSrc
          }
          alt="Map behind drawer"
        />
      </div>
      {!isScrolled && (
        <BackButton
          onPress={onBack || onClose}
          theme={theme}
          label="Back to map"
        />
      )}
      <div
        className={`chat-response-sheet ${mapExpanded ? "map-expanded" : ""} ${
          isScrolled ? "scrolled-up" : ""
        }`}
      >
        <div className="chat-sheet-header">
          <div
            className="chat-sheet-grabber"
            role="button"
            tabIndex={0}
            aria-label={
              mapExpanded ? "Expand itinerary" : "Expand Overview Map"
            }
            onPointerDown={(event) => {
              dragStart.current = event.clientY
            }}
            onPointerUp={(event) => finishDrag(event.clientY)}
            onKeyDown={(event) =>
              (event.key === "Enter" || event.key === " ") &&
              setMapExpanded(!mapExpanded)
            }
          >
            <span />
          </div>
          <div className="ask-header-inner">
            <div className="ask-lockup">
              <AskSparkle size={24} color={isLight ? "#1a73e8" : "#8ab4f8"} />
              <span>Ask Maps</span>
            </div>
            <div className="header-actions">
              <RoundAction
                icon="history"
                label="Chat history"
                onPress={onHistory}
              />
              <RoundAction icon="edit" label="New chat" />
              <RoundAction icon="close" label="Close" onPress={onClose} />
            </div>
          </div>
        </div>
        <div
          className="chat-itinerary-scroll"
          onScroll={(e) => {
            const scrolled = e.currentTarget.scrollTop > 10
            setIsScrolled(scrolled)
          }}
        >
          <div className="conversation-user">
            Plan a two-day Singapore food itinerary with cafés, views and local
            desserts.
          </div>
          <div className="conversation-assistant">
            <AskSparkle size={22} color={isLight ? "#1a73e8" : "#8ab4f8"} />
            <span>
              <b>I’ve built a balanced two-day route.</b>
              <small>
                I matched the order in your Saved Plan and kept travel between
                stops practical.
              </small>
            </span>
          </div>
          {chatItinerary.map((place, index) => (
            <div className="chat-place-card" key={`${place.title}-${index}`}>
              {(index === 0 || chatItinerary[index - 1].day !== place.day) && (
                <div className="chat-day-theme">
                  <span>{place.day}</span>
                  <b>{place.theme}</b>
                </div>
              )}
              <div className="place-recommendation">
                <AskSparkle size={20} color={isLight ? "#1a73e8" : "#8ab4f8"} />
                <p>{place.recommendation}</p>
              </div>
              <div className="chat-place-heading">
                <span>
                  <b>{place.title}</b>
                  <small>{place.meta}</small>
                  <em>{place.status}</em>
                </span>
                <RoundAction
                  icon="route"
                  label={`Directions to ${place.title}`}
                  accent
                />
              </div>
              <div className="place-detail-pill">
                <Icon name="clock" size={15} />
                <span>{place.detail}</span>
              </div>
              <div className="chat-place-image">
                <img src={`/assets/prototype/${place.image}`} alt="" />
              </div>
            </div>
          ))}
          <div className="chat-overview-card">
            <div className="section-title">Overview Map</div>
            <img
              src={
                isLight
                  ? "/assets/prototype/overview-map-card-light.jpg"
                  : overviewMapSrc
              }
              alt="Route overview"
            />
            <span>2 days · 5 places · Live route timing</span>
          </div>
          <div className="chat-scroll-spacer" />
        </div>
      </div>
      <div className="response-actions">
        <Tap label="Save plan" className="save-plan" onPress={onSave}>
          <Icon name="bookmark" size={20} />
          <span>Save plan</span>
        </Tap>
      </div>
      <div className="chat-composer">
        <span>Ask a question</span>
        <Icon name="mic" />
      </div>
    </div>
  )
}

const recentPlaces = [
  ["Lau Pa Sat", "Hawker center · Searched · 1h", "7"],
  ["Urban Mix", "Restaurant · Searched · 1h", "7"],
  ["Dungeon by IL Fiore", "Restaurant · Searched · 1h", "7"],
]

function YouScreen({
  onPlan,
  onExplore,
}: {
  onPlan: () => void
  onExplore: () => void
}) {
  return (
    <div className="screen-page you-page">
      <div className="page-top">
        <BackButton onPress={onExplore} />
        <span>You</span>
        <RoundAction icon="bell" label="Notifications" />
      </div>
      <div className="scroll-view you-scroll">
        <section className="page-section">
          <div className="section-title">Your recent places</div>
          <div className="section-subtitle">
            From your Maps history and saves
          </div>
          <div className="filter-row">
            <RoundAction icon="search" label="Search" />
            <span className="filter">Saved⌄</span>
            <span className="filter">Area⌄</span>
            <span className="filter">Category⌄</span>
          </div>
          {recentPlaces.map(([name, meta, img]) => (
            <div className="place-row" key={name}>
              <img src={`/assets/prototype/screen-${img}.jpg`} alt="" />
              <span>
                <b>{name}</b>
                <small>{meta}</small>
              </span>
              <RoundAction icon="bookmark" label={`Save ${name}`} />
              <Icon name="more" />
            </div>
          ))}
        </section>
        <section className="page-section plans-section">
          <div className="section-title">Your Plans</div>
          <div className="section-subtitle">Saved Ask Maps itineraries</div>
          <Tap
            label="Open Singapore food trail"
            className="plan-card"
            onPress={onPlan}
          >
            <div className="plan-thumb">
              <img src="/assets/prototype/screen-4.jpg" alt="" />
            </div>
            <span>
              <b>Singapore food trail</b>
              <small>3 days · 8 places</small>
              <small>Updated 1 hour ago</small>
            </span>
            <Icon name="chevron" />
          </Tap>
        </section>
        <section className="page-section">
          <div className="section-heading-row">
            <div className="section-title">Your lists</div>
            <span className="teal-pill">
              <Icon name="plus" size={17} />
              New list
            </span>
          </div>
          <div className="list-row">
            <span className="emoji">🤤</span>
            <span>
              <b>Food places to explore</b>
              <small>
                <Icon name="users" size={13} /> Shared list · 832 places
              </small>
            </span>
            <em>48</em>
            <Icon name="more" />
          </div>
          <div className="list-row">
            <span className="cyan-avatar">◉</span>
            <span>
              <b>Korea</b>
              <small>Private list · 2 places</small>
            </span>
            <Icon name="more" />
          </div>
        </section>
        <div className="scroll-spacer" />
      </div>
      <BottomNav active="You" onYou={() => {}} onExplore={onExplore} />
    </div>
  )
}

type StopHistoryItem = {
  id: string
  title: string
  meta: string
  past?: boolean
  current?: boolean
  changed?: boolean
  bounceSource?: string
  originalTitle?: string
  originalMeta?: string
}

type TimelineStop = {
  id: string
  time: string
  title: string
  meta: string
  current?: boolean
  past?: boolean
  changed?: boolean
  bounceSource?: string
  originalTitle?: string
  originalMeta?: string
  isReplacement?: boolean
  history?: StopHistoryItem[]
}

const initialStops: TimelineStop[] = [
  {
    id: "kahve",
    time: "9:00 am",
    title: "Kahve",
    meta: "Coffee · Shenton Way",
    past: true,
  },
  {
    id: "suntec",
    time: "11:30 am",
    title: "Suntec City views",
    meta: "Walk · 1.2 km",
    past: true,
  },
  {
    id: "kobashi",
    time: "1:00 pm",
    title: "KŌBASHI",
    meta: "Bakery · South Bridge Road",
    current: true,
  },
  {
    id: "green-oasis",
    time: "3:30 pm",
    title: "Green Oasis · CapitaSpring",
    meta: "Garden · 8 min walk",
  },
  {
    id: "loulouca",
    time: "7:30 pm",
    title: "Loulouca",
    meta: "Dessert · Closes 11 pm",
  },
]

type RouteDetail = {
  icon: IconName
  title: string
  detail: string
  lineClass?: "downtown" | "thomson"
}

function getStopKey(stop: TimelineStop): string {
  const str = ((stop.title || "") + " " + (stop.id || "")).toLowerCase()
  if (str.includes("boat quay") || str.includes("boat-quay")) return "boat-quay"
  if (str.includes("kahve")) return "kahve"
  if (str.includes("suntec")) return "suntec"
  if (str.includes("kobashi") || str.includes("kōbashi")) return "kobashi"
  if (str.includes("maxwell")) return "maxwell"
  if (str.includes("loulouca")) return "loulouca"
  if (str.includes("green") || str.includes("capitaspring"))
    return "green-oasis"
  return stop.id
}

function formatMinutesToTime(totalMins: number): string {
  const hours24 = Math.floor(totalMins / 60) % 24
  const mins = totalMins % 60
  const period = hours24 >= 12 ? "pm" : "am"
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12
  const paddedMins = mins < 10 ? `0${mins}` : `${mins}`
  return `${hours12}:${paddedMins} ${period}`
}

function recalculateStopTimes(stops: TimelineStop[]): TimelineStop[] {
  const kobashiIdx = stops.findIndex((s) => s.id === "kobashi" || s.current)
  if (kobashiIdx < 0) return stops

  const result = stops.map((s) => ({ ...s }))

  // Find added stops between KŌBASHI and Green Oasis (or end of Day 1)
  const greenOasisIdx = result.findIndex(
    (s, idx) =>
      idx > kobashiIdx &&
      !s.changed &&
      !s.bounceSource &&
      (s.id.includes("green") || s.title.toLowerCase().includes("green")),
  )

  const endIdx = greenOasisIdx !== -1 ? greenOasisIdx : result.length - 1
  const addedCount = endIdx - kobashiIdx - 1

  if (addedCount <= 0) {
    if (greenOasisIdx !== -1) {
      result[greenOasisIdx].time = "3:30 pm"
    }
    return result
  }

  if (addedCount === 1) {
    result[kobashiIdx + 1].time = "2:00 pm"
    if (greenOasisIdx !== -1) {
      result[greenOasisIdx].time = "3:30 pm"
    }
  } else if (addedCount === 2) {
    result[kobashiIdx + 1].time = "1:45 pm"
    result[kobashiIdx + 2].time = "2:35 pm"
    if (greenOasisIdx !== -1) {
      result[greenOasisIdx].time = "3:30 pm"
    }
  } else if (addedCount === 3) {
    result[kobashiIdx + 1].time = "1:45 pm"
    result[kobashiIdx + 2].time = "2:30 pm"
    result[kobashiIdx + 3].time = "3:15 pm"
    if (greenOasisIdx !== -1) {
      result[greenOasisIdx].time = "4:00 pm"
    }
  } else {
    const startMins = 13 * 60 + 40 // 1:40 pm
    for (let i = 0; i < addedCount; i++) {
      const mins = startMins + i * 35
      result[kobashiIdx + 1 + i].time = formatMinutesToTime(mins)
    }
    if (greenOasisIdx !== -1) {
      const endMins = startMins + addedCount * 35 + 15
      result[greenOasisIdx].time = formatMinutesToTime(endMins)
    }
  }

  return result
}

function getRouteDetail(
  from: TimelineStop,
  to: TimelineStop,
  index: number,
): RouteDetail {
  const fromKey = getStopKey(from)
  const toKey = getStopKey(to)
  const pair = `${fromKey}->${toKey}`

  switch (pair) {
    case "kahve->suntec":
      return {
        icon: "train",
        title: "Downtown Line",
        detail: "DT17 → DT15 · 12 min",
        lineClass: "downtown",
      }
    case "suntec->kahve":
      return {
        icon: "bus",
        title: "Bus 107",
        detail: "5 stops · 18 min",
      }
    case "suntec->kobashi":
      return {
        icon: "bus",
        title: "Bus 107",
        detail: "5 stops · 18 min",
      }
    case "kobashi->suntec":
      return {
        icon: "bus",
        title: "Bus 107",
        detail: "5 stops · 18 min",
      }
    case "suntec->loulouca":
      return {
        icon: "bus",
        title: "Bus 107",
        detail: "6 stops · 20 min",
      }
    case "loulouca->suntec":
      return {
        icon: "bus",
        title: "Bus 107",
        detail: "6 stops · 20 min",
      }
    case "suntec->maxwell":
      return {
        icon: "train",
        title: "Downtown Line",
        detail: "DT15 → DT18 · 10 min",
        lineClass: "downtown",
      }
    case "maxwell->suntec":
      return {
        icon: "train",
        title: "Downtown Line",
        detail: "DT18 → DT15 · 10 min",
        lineClass: "downtown",
      }
    case "suntec->green-oasis":
      return {
        icon: "train",
        title: "Downtown Line",
        detail: "DT15 → DT18 · 10 min",
        lineClass: "downtown",
      }
    case "kobashi->maxwell":
      return { icon: "walk", title: "Walk", detail: "350 m · 4 min" }
    case "kobashi->boat-quay":
      return { icon: "walk", title: "Walk", detail: "800 m · 11 min" }
    case "boat-quay->kobashi":
      return { icon: "walk", title: "Walk", detail: "800 m · 11 min" }
    case "boat-quay->green-oasis":
      return { icon: "bus", title: "Bus 80", detail: "4 stops · 16 min" }
    case "green-oasis->boat-quay":
      return { icon: "bus", title: "Bus 80", detail: "4 stops · 16 min" }
    case "boat-quay->loulouca":
      return { icon: "bus", title: "Bus 80", detail: "4 stops · 16 min" }
    case "boat-quay->maxwell":
      return { icon: "walk", title: "Walk", detail: "600 m · 8 min" }
    case "maxwell->boat-quay":
      return { icon: "bus", title: "Bus 80", detail: "4 stops · 16 min" }
    case "maxwell->kobashi":
      return { icon: "walk", title: "Walk", detail: "350 m · 4 min" }
    case "kobashi->loulouca":
      return { icon: "bus", title: "Bus 80", detail: "4 stops · 9 min" }
    case "loulouca->kobashi":
      return { icon: "walk", title: "Walk", detail: "450 m · 6 min" }
    case "kobashi->kahve":
      return { icon: "walk", title: "Walk", detail: "750 m · 10 min" }
    case "kahve->kobashi":
      return { icon: "walk", title: "Walk", detail: "750 m · 10 min" }
    case "kobashi->green-oasis":
      return { icon: "walk", title: "Walk", detail: "600 m · 8 min" }
    case "kahve->loulouca":
      return { icon: "bus", title: "Bus 80", detail: "4 stops · 9 min" }
    case "loulouca->kahve":
      return { icon: "walk", title: "Walk", detail: "700 m · 9 min" }
    case "kahve->maxwell":
      return { icon: "walk", title: "Walk", detail: "650 m · 8 min" }
    case "maxwell->kahve":
      return { icon: "walk", title: "Walk", detail: "650 m · 8 min" }
    case "kahve->green-oasis":
      return { icon: "walk", title: "Walk", detail: "600 m · 8 min" }
    case "maxwell->loulouca":
      return { icon: "walk", title: "Walk", detail: "350 m · 5 min" }
    case "loulouca->maxwell":
      return { icon: "walk", title: "Walk", detail: "350 m · 5 min" }
    case "maxwell->green-oasis":
      return { icon: "walk", title: "Walk", detail: "750 m · 11 min" }
    case "loulouca->green-oasis":
      return { icon: "walk", title: "Walk", detail: "750 m · 11 min" }
  }

  if (fromKey === "green-oasis") {
    return {
      icon: "train",
      title: "Thomson–East Coast Line",
      detail: "TE19 → TE18 · 14 min",
      lineClass: "thomson",
    }
  }

  return index % 2 === 0
    ? { icon: "walk", title: "Walk", detail: "450 m · 6 min" }
    : { icon: "bus", title: "Bus 80", detail: "4 stops · 16 min" }
}

type SwipeableTimelineRowProps = {
  stop: TimelineStop
  isRemovable: boolean
  onPlace: () => void
  onDelete: () => void
  onUndo?: () => void
  currentRef?: React.Ref<HTMLDivElement>
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  isAddExpanded?: boolean
  onToggleAdd?: () => void
  actionsRef?: (el: HTMLDivElement | null) => void
  onBounce?: () => void
  onSearch?: () => void
  isTimeAdjustable?: boolean
  onTimeClick?: () => void
  isDraggable?: boolean
  isFloating?: boolean
  isGliding?: boolean
  cardRef?: (el: HTMLDivElement | null) => void
  cardStyle?: React.CSSProperties
  onDragStart?: (startY: number) => void
  onDragMove?: (clientY: number) => void
  onDragEnd?: () => void
  onDragCancel?: () => void
}

function SwipeableTimelineRow({
  stop,
  isRemovable,
  onPlace,
  onDelete,
  onUndo,
  currentRef,
  isOpen,
  onOpen,
  onClose,
  isAddExpanded = false,
  onToggleAdd,
  actionsRef,
  onBounce,
  onSearch,
  isTimeAdjustable = false,
  onTimeClick,
  isDraggable = false,
  isFloating = false,
  isGliding = false,
  cardRef,
  cardStyle,
  onDragStart,
  onDragMove,
  onDragEnd,
  onDragCancel,
}: SwipeableTimelineRowProps) {
  const [offsetX, setOffsetX] = useState(0)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const startY = useRef(0)
  const hasLockedDirection = useRef(false)
  const isHorizontalDrag = useRef(false)
  const isVerticalDrag = useRef(false)
  const justDragged = useRef(false)
  const currentOffset = useRef(0)

  const isReplacedLocation = Boolean(
    stop.isReplacement ||
      (stop.history && stop.history.length > 0) ||
      Boolean(stop.originalTitle) ||
      (stop.changed &&
        Boolean(
          stop.meta &&
            (stop.meta.includes("Replaced") ||
              stop.meta.includes("Bounce replacement")),
        )),
  )
  const hasUndo = Boolean(onUndo && isReplacedLocation)
  const openOffset = hasUndo ? -152 : -76
  const rubberOffset = hasUndo ? -180 : -90
  const openThreshold = hasUndo ? -45 : -38
  const closeThreshold = hasUndo ? -105 : -38
  const deleteThreshold = hasUndo ? -260 : -160

  useEffect(() => {
    if (!isDragging.current) {
      const target = isOpen ? openOffset : 0
      setOffsetX(target)
      currentOffset.current = target
    }
  }, [isOpen, openOffset])

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isRemovable && !isDraggable) return
    isDragging.current = true
    startX.current = e.clientX
    startY.current = e.clientY
    hasLockedDirection.current = false
    isHorizontalDrag.current = false
    isVerticalDrag.current = false
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {}
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const diffX = e.clientX - startX.current
    const diffY = e.clientY - startY.current

    if (!hasLockedDirection.current) {
      if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
        hasLockedDirection.current = true
        if (Math.abs(diffX) > Math.abs(diffY)) {
          if (isRemovable) {
            isHorizontalDrag.current = true
            isVerticalDrag.current = false
          }
        } else {
          if (isDraggable) {
            isVerticalDrag.current = true
            isHorizontalDrag.current = false
            justDragged.current = true
            onDragStart?.(startY.current)
          }
        }
      }
    }

    if (isVerticalDrag.current) {
      onDragMove?.(e.clientY)
      return
    }

    if (!isHorizontalDrag.current) return
    justDragged.current = true

    const base = isOpen ? openOffset : 0
    let target = base + diffX

    if (target > 0) {
      target = target * 0.15
    } else if (target < rubberOffset) {
      target = rubberOffset + (target - rubberOffset) * 0.25
    }

    currentOffset.current = target
    setOffsetX(target)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {}

    if (isVerticalDrag.current) {
      isVerticalDrag.current = false
      setTimeout(() => {
        justDragged.current = false
      }, 100)
      onDragEnd?.()
      return
    }

    if (!isHorizontalDrag.current) {
      if (isOpen) {
        onClose()
        setOffsetX(0)
        currentOffset.current = 0
      } else {
        if (!justDragged.current) {
          onPlace()
        }
      }
      setTimeout(() => {
        justDragged.current = false
      }, 100)
      return
    }

    setTimeout(() => {
      justDragged.current = false
    }, 100)

    const finalOffset = currentOffset.current
    if (finalOffset < deleteThreshold) {
      onDelete()
      return
    }

    if (isOpen) {
      if (finalOffset > closeThreshold) {
        onClose()
        setOffsetX(0)
        currentOffset.current = 0
      } else {
        onOpen()
        setOffsetX(openOffset)
        currentOffset.current = openOffset
      }
    } else {
      if (finalOffset < openThreshold) {
        onOpen()
        setOffsetX(openOffset)
        currentOffset.current = openOffset
      } else {
        onClose()
        setOffsetX(0)
        currentOffset.current = 0
      }
    }
  }

  const handlePointerCancel = () => {
    isDragging.current = false
    if (isVerticalDrag.current) {
      isVerticalDrag.current = false
      onDragCancel?.()
    }
    const target = isOpen ? openOffset : 0
    setOffsetX(target)
    currentOffset.current = target
    setTimeout(() => {
      justDragged.current = false
    }, 100)
  }

  return (
    <div
      className={`timeline-row ${stop.current ? "current" : ""} ${
        stop.past ? "past" : ""
      } ${stop.changed ? "changed" : ""}`}
      ref={currentRef}
    >
      <span
        className={`time ${isTimeAdjustable ? "adjustable" : ""}`}
        onClick={isTimeAdjustable ? onTimeClick : undefined}
        title={isTimeAdjustable ? "Tap to adjust time" : undefined}
        role={isTimeAdjustable ? "button" : undefined}
        tabIndex={isTimeAdjustable ? 0 : undefined}
      >
        {stop.time}
      </span>
      <i className="timeline-dot" />

      <div
        className={`timeline-card-col ${isDraggable ? "is-draggable" : ""} ${
          isFloating ? "is-floating" : ""
        } ${isGliding ? "is-gliding" : ""}`}
        ref={cardRef}
        style={cardStyle}
      >
        {isRemovable ? (
          <div className="swipeable-pill-container">
            <div
              className="swipe-actions-group"
              style={{
                opacity: offsetX < 0 ? 1 : 0,
                visibility: offsetX < 0 ? "visible" : "hidden",
                pointerEvents: offsetX < 0 ? "auto" : "none",
              }}
            >
              {hasUndo && (
                <button
                  type="button"
                  className="swipe-undo-action"
                  onPointerDown={(e) => e.stopPropagation()}
                  onPointerUp={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onTouchEnd={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation()
                    setOffsetX(0)
                    currentOffset.current = 0
                    onClose()
                    onUndo?.()
                  }}
                  aria-label={`Undo changes to ${stop.title}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="undo-icon"
                  >
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  <span className="swipe-undo-text">Undo</span>
                </button>
              )}

              <button
                type="button"
                className="swipe-delete-action"
                onPointerDown={(e) => e.stopPropagation()}
                onPointerUp={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete()
                }}
                aria-label={`Delete ${stop.title}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="currentColor"
                  className="delete-bin-icon"
                >
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
                <span className="swipe-delete-text">Delete</span>
              </button>
            </div>

            <div
              className="time-pill swipable-pill"
              style={{
                transform: `translate3d(${offsetX}px, 0, 0)`,
                transition: isDragging.current
                  ? "none"
                  : "transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",
                touchAction: isDraggable ? "none" : "pan-y",
                cursor: isDraggable
                  ? isFloating
                    ? "grabbing"
                    : "grab"
                  : "pointer",
              }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <span>
                <b>{stop.title}</b>
                <small>{stop.meta}</small>
              </span>
              <Icon name="chevron" />
            </div>
          </div>
        ) : (
          <Tap
            label={`Open ${stop.title}`}
            className="time-pill"
            onPress={onPlace}
          >
            <span>
              <b>{stop.title}</b>
              <small>{stop.meta}</small>
            </span>
            <Icon name="chevron" />
          </Tap>
        )}

        {/* Button connected to the bottom of the location button (removed for past locations) */}
        {!stop.past && (
          <>
            <button
              type="button"
              className={`timeline-connected-plus-btn ${
                isAddExpanded ? "active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation()
                onToggleAdd?.()
              }}
              aria-label={`Add stop after ${stop.title}`}
              aria-expanded={isAddExpanded}
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="plus-icon-svg"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* Slide-Down Action Buttons ("Bounce" and "Search") */}
            <div
              ref={actionsRef}
              className={`timeline-insert-actions ${
                isAddExpanded ? "expanded" : "collapsed"
              }`}
            >
              <button
                type="button"
                className="insert-action-btn bounce-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onBounce?.()
                }}
                aria-label={`Bounce options after ${stop.title}`}
              >
                <Icon name="shuffle" size={17} />
                <span>Bounce</span>
              </button>

              <button
                type="button"
                className="insert-action-btn search-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onSearch?.()
                }}
                aria-label={`Search places to add after ${stop.title}`}
              >
                <Icon name="search" size={17} />
                <span>Search</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function PlanHeader({ updated = false }: { updated?: boolean }) {
  return (
    <div className="plan-title-block">
      <div className="eyebrow">{updated ? "UPDATED PLAN" : "SAVED PLAN"}</div>
      <div className="plan-title">Singapore food trail</div>
      <div className="plan-meta">3 days · 8 places · Ask Maps</div>
    </div>
  )
}

type DropUpOption = {
  index: number
  title: string
  meta: string
  type: string
  route: {
    icon: IconName
    duration: string
    label: string
    badge?: string
    badgeClass?: string
  }
}

function CollapsedDrawerRoute({
  fromTitle,
  fromMeta,
  fromKicker = "CURRENT LOCATION",
  isCurrent = true,
  onFromPress,
  toTitle,
  toMeta,
  toKicker = "NEXT STOP",
  isNew = false,
  onToPress,
  routeIcon = "walk" as IconName,
  routeDuration = "4 min",
  routeSub = "350 m",
  routeBadge,
  routeBadgeClass,
  dropUpOptions,
  onSelectDropUpOption,
  isDropUpOpen = false,
  onCloseDropUp,
  arrowDirection,
}: {
  fromTitle: string
  fromMeta: string
  fromKicker?: string
  isCurrent?: boolean
  onFromPress?: () => void
  toTitle: string
  toMeta: string
  toKicker?: string
  isNew?: boolean
  onToPress?: () => void
  routeIcon?: IconName
  routeDuration?: string
  routeSub?: string
  routeBadge?: string | null
  routeBadgeClass?: string
  dropUpOptions?: DropUpOption[]
  onSelectDropUpOption?: (index: number) => void
  isDropUpOpen?: boolean
  onCloseDropUp?: () => void
  arrowDirection?: "up" | "right"
}) {
  const isUpArrow =
    arrowDirection === "up" ||
    Boolean(dropUpOptions && dropUpOptions.length > 0)
  const chevronTransform = isUpArrow
    ? isDropUpOpen
      ? "rotate(90deg)"
      : "rotate(-90deg)"
    : isDropUpOpen
      ? "rotate(-90deg)"
      : "rotate(0deg)"

  return (
    <div className="collapsed-drawer-route">
      {/* 1. Left Box: Current Location (e.g. KŌBASHI) */}
      <Tap
        label={`Location: ${fromTitle}`}
        className="collapsed-box current-box"
        onPress={onFromPress}
      >
        <div className="box-header">
          {isCurrent && <span className="current-pulse-dot" />}
          <span className="box-kicker">{fromKicker}</span>
        </div>
        <b className="box-title">{fromTitle}</b>
        <small className="box-meta">{fromMeta}</small>
      </Tap>

      {/* 2. Middle: Transport Mode & Travel Time */}
      <div className="collapsed-connector">
        <div className="connector-mode">
          <div className="connector-icon-wrap">
            <Icon name={routeIcon} size={15} />
          </div>
          <span className="connector-time">{routeDuration}</span>
        </div>
        <div className="connector-arrow-line">
          <span className="line-segment" />
          <span className="arrow-glyph">›</span>
        </div>
        {routeBadge ? (
          <span
            className={`transit-badge ${routeBadgeClass || ""}`}
            style={{
              minWidth: "22px",
              height: "16px",
              fontSize: "9px",
              padding: "0 4px",
              borderRadius: "4px",
            }}
          >
            {routeBadge}
          </span>
        ) : (
          <small className="connector-sub">{routeSub}</small>
        )}
      </div>

      {/* 3. Right Box: Next Location Details with Drop-Up Menu */}
      <div className="collapsed-box-anchor">
        {isDropUpOpen && dropUpOptions && dropUpOptions.length > 0 && (
          <>
            <div
              className="dropup-backdrop"
              onClick={(e) => {
                e.stopPropagation()
                onCloseDropUp?.()
              }}
            />
            <div
              className="bounce-dropup-menu"
              role="menu"
              aria-label="Other bounce options"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dropup-list">
                {dropUpOptions.map((opt) => (
                  <div
                    key={opt.title}
                    className="dropup-option-item"
                    role="menuitem"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectDropUpOption?.(opt.index)
                    }}
                  >
                    {/* Left: Mode of transport and travel duration */}
                    <div className="dropup-mode-col">
                      <div className="dropup-icon-wrap">
                        <Icon name={opt.route.icon} size={15} />
                      </div>
                      <span className="dropup-duration">
                        {opt.route.duration}
                      </span>
                      {opt.route.badge ? (
                        <span
                          className={`transit-badge ${opt.route.badgeClass || ""}`}
                          style={{
                            minWidth: "22px",
                            height: "16px",
                            fontSize: "9px",
                            padding: "0 4px",
                            borderRadius: "4px",
                          }}
                        >
                          {opt.route.badge}
                        </span>
                      ) : (
                        <small className="dropup-mode-label">
                          {opt.route.label}
                        </small>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="dropup-divider" />

                    {/* Right: Same formatting as the box */}
                    <div className="dropup-info-col">
                      <div className="dropup-top-line">
                        <span
                          className={`box-kicker ${
                            opt.index === 1 ? "is-new-kicker" : "next-kicker"
                          }`}
                        >
                          {opt.type}
                        </span>
                        <span className="dropup-option-number">
                          0{opt.index + 1}
                        </span>
                      </div>
                      <b className="box-title">{opt.title}</b>
                      <small className="box-meta">{opt.meta}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Tap
          label={`Destination: ${toTitle}`}
          className={`collapsed-box next-box ${isNew ? "is-new" : ""}`}
          onPress={onToPress}
        >
          <div className="box-header">
            <span
              className={`box-kicker ${
                isNew ? "is-new-kicker" : "next-kicker"
              }`}
            >
              {toKicker}
            </span>
            <span
              className="dropup-chevron-wrap"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "14px",
                height: "14px",
                transform: chevronTransform,
                transformOrigin: "center center",
                transition: "transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)",
                color: "var(--text-low, #5f6368)",
              }}
            >
              <Icon name="chevron" size={12} />
            </span>
          </div>
          <b className="box-title">{toTitle}</b>
          <small className="box-meta">{toMeta}</small>
        </Tap>
      </div>
    </div>
  )
}

function ListOptionsMenu({
  isOpen,
  theme,
  onClose,
  onShare,
  onInvite,
  onToast,
}: {
  isOpen: boolean
  theme: Theme
  onClose: () => void
  onShare: () => void
  onInvite: () => void
  onToast?: (msg: string) => void
}) {
  if (!isOpen) return null

  const isLight = theme === "light"

  const items = [
    {
      label: "Hide on your map",
      action: () => onToast?.("Plan hidden on your map"),
    },
    { label: "Edit list", action: () => onToast?.("Editing list") },
    { label: "Invite collaborators", action: onInvite },
    { label: "Share list", action: onShare },
    { label: "Sharing options", action: onInvite },
    {
      label: "Delete list",
      action: () => onToast?.("Default plan cannot be deleted"),
      isDestructive: true,
    },
    { label: "Cancel", action: onClose },
  ]

  return (
    <div
      className="list-options-modal-root"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 140,
        pointerEvents: "auto",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.62)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          animation: "menuFadeIn 0.2s ease-out",
        }}
      />

      {/* Centered Modal Card */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "calc(100% - 44px)",
          maxWidth: "320px",
          background: isLight ? "#ffffff" : "#222527",
          borderRadius: "26px",
          padding: "16px 14px",
          boxShadow: isLight
            ? "0 14px 40px rgba(0,0,0,0.22)"
            : "0 16px 44px rgba(0,0,0,0.65)",
          border: isLight
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          animation: "menuPop 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
          boxSizing: "border-box",
        }}
      >
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            style={{
              height: "46px",
              borderRadius: "999px",
              background: isLight ? "#f1f3f4" : "#363a3d",
              border: "none",
              color: item.isDestructive
                ? isLight
                  ? "#d93025"
                  : "#f28b82"
                : isLight
                  ? "#202124"
                  : "#ffffff",
              fontSize: "14.5px",
              fontWeight: 500,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              transition: "background-color 0.15s ease, transform 0.1s ease",
              userSelect: "none",
              outline: "none",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.98)"
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function InviteDrawer({
  isOpen,
  theme,
  title = "Invite to edit",
  onClose,
  onCopy,
}: {
  isOpen: boolean
  theme: Theme
  title?: string
  onClose: () => void
  onCopy: () => void
}) {
  if (!isOpen) return null

  return (
    <div
      className="invite-drawer-root"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 150,
        pointerEvents: "auto",
      }}
    >
      {/* Backdrop */}
      <div
        className="invite-backdrop"
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.55)",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          animation: "inviteFadeIn 0.22s ease-out",
        }}
      />

      {/* Drawer Card */}
      <div
        className={`invite-sheet ${theme === "light" ? "light" : "dark"}`}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: "84%",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          background: theme === "light" ? "#f2f2f7" : "#1c1c1e",
          color: theme === "light" ? "#000000" : "#ffffff",
          boxShadow: "0 -10px 40px rgba(0,0,0,0.45)",
          overflow: "hidden",
          animation: "inviteSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Grab Handle */}
        <div
          style={{
            width: "36px",
            height: "5px",
            borderRadius: "999px",
            background: theme === "light" ? "#c7c7cc" : "#48484a",
            margin: "8px auto 6px",
            cursor: "pointer",
          }}
          onClick={onClose}
        />

        {/* Header Line: "Invite to edit" or "Share to view" */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 18px 12px",
            borderBottom:
              theme === "light"
                ? "1px solid rgba(0,0,0,0.06)"
                : "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            style={{
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              color: theme === "light" ? "#1c1c1e" : "#ffffff",
            }}
          >
            {title}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background:
                theme === "light"
                  ? "rgba(0,0,0,0.06)"
                  : "rgba(255,255,255,0.12)",
              border: "none",
              color: theme === "light" ? "#636366" : "#ffffff",
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
            }}
          >
            <Icon name="close" size={15} />
          </button>
        </div>

        {/* Scrollable Sheet Content */}
        <div
          style={{
            overflowY: "auto",
            padding: "14px 16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {/* 1. Preview Card */}
          <div
            style={{
              background: theme === "light" ? "#ffffff" : "#2c2c2e",
              borderRadius: "14px",
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              boxShadow:
                theme === "light"
                  ? "0 1px 3px rgba(0,0,0,0.08)"
                  : "0 2px 8px rgba(0,0,0,0.25)",
              border:
                theme === "light"
                  ? "1px solid rgba(0,0,0,0.04)"
                  : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Map Thumbnail */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "10px",
                overflow: "hidden",
                flexShrink: 0,
                background: "#4285f4",
                position: "relative",
              }}
            >
              <img
                src="/assets/prototype/screen-4.jpg"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: theme === "light" ? "#1c1c1e" : "#ffffff",
                }}
              >
                Singapore food trail · Ask Maps
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: theme === "light" ? "#8e8e93" : "#98989d",
                  marginTop: "2px",
                }}
              >
                maps.google.com
              </div>
            </div>
          </div>

          {/* 2. Contacts Row */}
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "8px",
                justifyItems: "center",
                paddingBottom: "2px",
              }}
            >
              {/* Contact 1: MacBook Air (replaced "Joshy & Beany's") */}
              <div
                onClick={onCopy}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: theme === "light" ? "#ffffff" : "#2c2c2e",
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                    boxShadow:
                      theme === "light"
                        ? "0 2px 6px rgba(0,0,0,0.12)"
                        : "0 2px 6px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* Laptop Icon Graphic */}
                  <svg width="34" height="28" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="12"
                      rx="2"
                      fill={theme === "light" ? "#e2e8f0" : "#3a3a3c"}
                      stroke={theme === "light" ? "#94a3b8" : "#71717a"}
                      strokeWidth="1.5"
                    />
                    <rect
                      x="5"
                      y="6"
                      width="14"
                      height="8"
                      rx="1"
                      fill="#38bdf8"
                      fillOpacity="0.85"
                    />
                    <path
                      d="M1 18h22"
                      stroke={theme === "light" ? "#94a3b8" : "#71717a"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* AirDrop Badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      right: "-2px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "#007aff",
                      border:
                        theme === "light"
                          ? "2px solid #f2f2f7"
                          : "2px solid #1c1c1e",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M5 18a10 10 0 0 1 0-12" />
                      <path d="M8.5 15a5.5 5.5 0 0 1 0-6" />
                      <circle
                        cx="12"
                        cy="12"
                        r="1.5"
                        fill="#ffffff"
                        stroke="none"
                      />
                    </svg>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                    marginTop: "6px",
                    textAlign: "center",
                    lineHeight: "1.2",
                    maxWidth: "80px",
                  }}
                >
                  MacBook Air
                </span>
              </div>

              {/* Contact 2: Alex Chen (replaced "Joshua Wang") */}
              <div
                onClick={onCopy}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: theme === "light" ? "#e5e5ea" : "#3a3a3c",
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                    color: theme === "light" ? "#636366" : "#aeaeb2",
                  }}
                >
                  <Icon name="users" size={26} />
                  {/* Discord Badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      right: "-2px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "#5865F2",
                      border:
                        theme === "light"
                          ? "2px solid #f2f2f7"
                          : "2px solid #1c1c1e",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                    >
                      <path d="M20.3 4.4A19.6 19.6 0 0 0 15.4 3a.1.1 0 0 0-.1 0c-.2.4-.4.9-.6 1.3A18 18 0 0 0 9.3 4.3C9.1 3.9 8.9 3.4 8.7 3a.1.1 0 0 0-.1 0 19.6 19.6 0 0 0-4.9 1.4.1.1 0 0 0 0 0C.7 9 .1 13.5.3 17.9a.1.1 0 0 0 0 0 19.7 19.7 0 0 0 6 3 .1.1 0 0 0 .1 0c.5-.7.9-1.4 1.3-2.1a.1.1 0 0 0-.1-.1 13 13 0 0 1-1.8-.9.1.1 0 0 1 0-.2c.1-.1.3-.2.4-.3a14 14 0 0 0 12 0c.1.1.3.2.4.3a.1.1 0 0 1 0 .2 13 13 0 0 1-1.8.9.1.1 0 0 0-.1.1c.4.7.8 1.4 1.3 2.1a.1.1 0 0 0 .1 0 19.7 19.7 0 0 0 6-3 .1.1 0 0 0 0 0c.3-5-.9-9.5-3.5-13.5zM8.5 15c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2z" />
                    </svg>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                    marginTop: "6px",
                    textAlign: "center",
                    lineHeight: "1.2",
                    maxWidth: "80px",
                  }}
                >
                  Alex Chen
                </span>
              </div>

              {/* Contact 3: Marcus Lim (replaced "Chip Dong Lim" with generic avatar) */}
              <div
                onClick={onCopy}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #0284c7 0%, #0d9488 100%)",
                    display: "grid",
                    placeItems: "center",
                    position: "relative",
                    color: "#ffffff",
                    boxShadow:
                      theme === "light"
                        ? "0 2px 6px rgba(0,0,0,0.12)"
                        : "0 2px 6px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* Generic Avatar Icon */}
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {/* LinkedIn Badge */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      right: "-2px",
                      width: "22px",
                      height: "22px",
                      borderRadius: "50%",
                      background: "#0A66C2",
                      border:
                        theme === "light"
                          ? "2px solid #f2f2f7"
                          : "2px solid #1c1c1e",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#ffffff"
                    >
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                    </svg>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "11px",
                    color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                    marginTop: "6px",
                    textAlign: "center",
                    lineHeight: "1.2",
                    maxWidth: "80px",
                  }}
                >
                  Marcus Lim
                </span>
              </div>
            </div>
          </div>

          {/* 3. Apps Row (AirDrop, Messages, Mail, Notes) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              justifyItems: "center",
              paddingBottom: "16px",
              borderBottom:
                theme === "light"
                  ? "1px solid rgba(0,0,0,0.08)"
                  : "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* AirDrop */}
            <div
              onClick={onCopy}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <img
                src="/assets/share/airdrop.png"
                alt="AirDrop"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  borderRadius: "14px",
                  filter:
                    theme === "light"
                      ? "drop-shadow(0 2px 5px rgba(0,0,0,0.12))"
                      : "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  marginTop: "6px",
                  textAlign: "center",
                  color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                }}
              >
                AirDrop
              </span>
            </div>

            {/* Messages */}
            <div
              onClick={onCopy}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <img
                src="/assets/share/messages.png"
                alt="Messages"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  borderRadius: "14px",
                  filter:
                    theme === "light"
                      ? "drop-shadow(0 2px 5px rgba(0,0,0,0.12))"
                      : "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  marginTop: "6px",
                  textAlign: "center",
                  color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                }}
              >
                Messages
              </span>
            </div>

            {/* Mail */}
            <div
              onClick={onCopy}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <img
                src="/assets/share/mail.png"
                alt="Mail"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  borderRadius: "14px",
                  filter:
                    theme === "light"
                      ? "drop-shadow(0 2px 5px rgba(0,0,0,0.12))"
                      : "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  marginTop: "6px",
                  textAlign: "center",
                  color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                }}
              >
                Mail
              </span>
            </div>

            {/* Notes */}
            <div
              onClick={onCopy}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <img
                src="/assets/share/notes.png"
                alt="Notes"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  borderRadius: "14px",
                  filter:
                    theme === "light"
                      ? "drop-shadow(0 2px 5px rgba(0,0,0,0.12))"
                      : "drop-shadow(0 2px 6px rgba(0,0,0,0.35))",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  marginTop: "6px",
                  textAlign: "center",
                  color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                }}
              >
                Notes
              </span>
            </div>
          </div>

          {/* 4. Actions Row (Copy, Add to New Quick Note, Ask Gemini, View More) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              justifyItems: "center",
            }}
          >
            {/* Copy */}
            <div
              onClick={onCopy}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <img
                src="/assets/share/copy.png"
                alt="Copy"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  filter:
                    theme === "light"
                      ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                      : "drop-shadow(0 2px 5px rgba(0,0,0,0.3))",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  marginTop: "6px",
                  textAlign: "center",
                  color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                  lineHeight: "1.2",
                }}
              >
                Copy
              </span>
            </div>

            {/* Add to New Quick Note */}
            <div
              onClick={onCopy}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <img
                src="/assets/share/quick-note.png"
                alt="Add to New Quick Note"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  filter:
                    theme === "light"
                      ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                      : "drop-shadow(0 2px 5px rgba(0,0,0,0.3))",
                }}
              />
              <span
                style={{
                  fontSize: "10.5px",
                  marginTop: "6px",
                  textAlign: "center",
                  color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                  lineHeight: "1.2",
                  maxWidth: "74px",
                }}
              >
                Add to New Quick Note
              </span>
            </div>

            {/* Ask Gemini */}
            <div
              onClick={onCopy}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <img
                src="/assets/share/gemini.png"
                alt="Ask Gemini"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  filter:
                    theme === "light"
                      ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                      : "drop-shadow(0 2px 5px rgba(0,0,0,0.3))",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  marginTop: "6px",
                  textAlign: "center",
                  color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                  lineHeight: "1.2",
                }}
              >
                Ask Gemini
              </span>
            </div>

            {/* View More */}
            <div
              onClick={onCopy}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                cursor: "pointer",
              }}
            >
              <img
                src="/assets/share/view-more.png"
                alt="View More"
                style={{
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  borderRadius: "50%",
                  filter:
                    theme === "light"
                      ? "drop-shadow(0 2px 4px rgba(0,0,0,0.1))"
                      : "drop-shadow(0 2px 5px rgba(0,0,0,0.3))",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  marginTop: "6px",
                  textAlign: "center",
                  color: theme === "light" ? "#1c1c1e" : "#f2f2f7",
                  lineHeight: "1.2",
                }}
              >
                View More
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function parseTimeString(timeStr: string): {
  hour: number
  minute: number
  period: "AM" | "PM"
} {
  const clean = (timeStr || "").trim().toLowerCase()
  const match = clean.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/)
  if (match) {
    let h = parseInt(match[1], 10)
    let m = parseInt(match[2], 10)
    const p: "AM" | "PM" = match[3] === "pm" ? "PM" : "AM"
    if (h < 1 || h > 12) h = 12
    if (m < 0 || m > 59) m = 0
    return { hour: h, minute: m, period: p }
  }
  return { hour: 8, minute: 0, period: "PM" }
}

function timeToMinutes(
  hour: number,
  minute: number,
  period: "AM" | "PM",
): number {
  let h24 = hour
  if (period === "PM" && h24 < 12) h24 += 12
  if (period === "AM" && h24 === 12) h24 = 0
  return h24 * 60 + minute
}

function WheelColumn<T extends string | number>({
  items,
  value,
  onChange,
  itemHeight = 38,
}: {
  items: T[]
  value: T
  onChange: (val: T) => void
  itemHeight?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const hasMovedRef = useRef(false)
  const dragStartYRef = useRef(0)
  const dragStartScrollTopRef = useRef(0)
  const lastYRef = useRef(0)
  const lastTimeRef = useRef(0)
  const velocityRef = useRef(0)
  const scrollTimeout = useRef<number | null>(null)

  useEffect(() => {
    if (isDraggingRef.current) return
    const index = items.indexOf(value)
    if (index >= 0 && containerRef.current) {
      const target = index * itemHeight
      if (Math.abs(containerRef.current.scrollTop - target) > 1) {
        containerRef.current.scrollTo({
          top: target,
          behavior: "smooth",
        })
      }
    }
  }, [value, items, itemHeight])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    isDraggingRef.current = true
    hasMovedRef.current = false
    dragStartYRef.current = e.clientY
    dragStartScrollTopRef.current = containerRef.current
      ? containerRef.current.scrollTop
      : 0
    lastYRef.current = e.clientY
    lastTimeRef.current = performance.now()
    velocityRef.current = 0
    setIsDragging(true)

    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = "none"
      try {
        containerRef.current.setPointerCapture(e.pointerId)
      } catch {}
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return
    const deltaY = e.clientY - dragStartYRef.current
    if (Math.abs(deltaY) > 3) {
      hasMovedRef.current = true
    }

    const now = performance.now()
    const dt = now - lastTimeRef.current
    if (dt >= 8) {
      const dy = e.clientY - lastYRef.current
      const instantVelocity = Math.max(-2, Math.min(2, dy / dt))
      velocityRef.current = 0.6 * instantVelocity + 0.4 * velocityRef.current
      lastYRef.current = e.clientY
      lastTimeRef.current = now
    }

    const maxScroll = (items.length - 1) * itemHeight
    let newScrollTop = dragStartScrollTopRef.current - deltaY
    if (newScrollTop < 0) {
      newScrollTop = newScrollTop * 0.35
    } else if (newScrollTop > maxScroll) {
      newScrollTop = maxScroll + (newScrollTop - maxScroll) * 0.35
    }

    containerRef.current.scrollTop = newScrollTop

    const activeIdx = Math.max(
      0,
      Math.min(items.length - 1, Math.round(newScrollTop / itemHeight)),
    )
    const activeItem = items[activeIdx]
    if (activeItem !== undefined && activeItem !== value) {
      onChange(activeItem)
    }
  }

  const finishDrag = (pointerId?: number) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)

    if (containerRef.current) {
      containerRef.current.style.scrollSnapType = "y mandatory"
      if (pointerId !== undefined) {
        try {
          containerRef.current.releasePointerCapture(pointerId)
        } catch {}
      }

      if (hasMovedRef.current) {
        const momentumDistance = Math.max(
          -itemHeight * 2,
          Math.min(itemHeight * 2, velocityRef.current * 40),
        )
        const targetScroll = containerRef.current.scrollTop - momentumDistance
        const snapIndex = Math.max(
          0,
          Math.min(items.length - 1, Math.round(targetScroll / itemHeight)),
        )
        const finalScrollTop = snapIndex * itemHeight
        containerRef.current.scrollTo({
          top: finalScrollTop,
          behavior: "smooth",
        })
        onChange(items[snapIndex])
        setTimeout(() => {
          hasMovedRef.current = false
        }, 60)
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(e.pointerId)
  }

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    finishDrag(e.pointerId)
  }

  const handleScroll = () => {
    if (isDraggingRef.current || !containerRef.current) return
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current)

    scrollTimeout.current = window.setTimeout(() => {
      if (!containerRef.current || isDraggingRef.current) return
      const scrollTop = containerRef.current.scrollTop
      const selectedIndex = Math.round(scrollTop / itemHeight)
      const clampedIndex = Math.max(
        0,
        Math.min(items.length - 1, selectedIndex),
      )
      const selectedItem = items[clampedIndex]
      if (selectedItem !== undefined && selectedItem !== value) {
        onChange(selectedItem)
      }
    }, 40)
  }

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`time-picker-wheel-col ${isDragging ? "is-dragging" : ""}`}
      style={{
        height: itemHeight * 5,
        overflowY: "auto",
        scrollSnapType: "y mandatory",
        scrollbarWidth: "none",
        paddingTop: itemHeight * 2,
        paddingBottom: itemHeight * 2,
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      {items.map((item) => {
        const isSelected = item === value
        const displayLabel =
          typeof item === "number" && items.length > 20
            ? item < 10
              ? `0${item}`
              : String(item)
            : String(item)
        return (
          <div
            key={String(item)}
            onClick={(e) => {
              if (hasMovedRef.current) {
                e.preventDefault()
                e.stopPropagation()
                return
              }
              onChange(item)
              if (containerRef.current) {
                const idx = items.indexOf(item)
                containerRef.current.scrollTo({
                  top: idx * itemHeight,
                  behavior: "smooth",
                })
              }
            }}
            className={`wheel-item ${isSelected ? "selected" : ""}`}
            style={{
              height: itemHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              scrollSnapAlign: "center",
              cursor: isDragging ? "grabbing" : "pointer",
              fontSize: isSelected ? 21 : 16,
              fontWeight: isSelected ? 700 : 400,
              opacity: isSelected ? 1 : 0.35,
              transition: "all 0.12s ease",
              userSelect: "none",
              WebkitUserSelect: "none",
            }}
          >
            {displayLabel}
          </div>
        )
      })}
    </div>
  )
}

const HOURS_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const MINUTES_LIST = Array.from({ length: 60 }, (_, i) => i)
const PERIODS_LIST: ("AM" | "PM")[] = ["AM", "PM"]

function TimePickerDrawer({
  isOpen,
  stop,
  index,
  stops,
  theme,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean
  stop: TimelineStop
  index: number
  stops: TimelineStop[]
  theme: Theme
  onConfirm: (newTime: string) => void
  onCancel: () => void
}) {
  const initial = useMemo(() => parseTimeString(stop.time), [stop.time])
  const [hour, setHour] = useState<number>(initial.hour)
  const [minute, setMinute] = useState<number>(initial.minute)
  const [period, setPeriod] = useState<"AM" | "PM">(initial.period)

  const prevHourRef = useRef<number>(initial.hour)
  const prevMinuteRef = useRef<number>(initial.minute)

  useEffect(() => {
    const p = parseTimeString(stop.time)
    setHour(p.hour)
    setMinute(p.minute)
    setPeriod(p.period)
    prevHourRef.current = p.hour
    prevMinuteRef.current = p.minute
  }, [stop.time])

  const handleHourChange = (newHour: number) => {
    const prevHour = prevHourRef.current
    setHour(newHour)

    // AM/PM automatic update when touching 12:00PM or 12:00AM
    // 1) Crossing forward into 12 from 11 (or morning/evening hours >= 8):
    if (newHour === 12 && prevHour !== 12) {
      if (prevHour === 11 || (prevHour >= 8 && prevHour <= 11)) {
        if (period === "AM") {
          setPeriod("PM")
        } else if (period === "PM") {
          setPeriod("AM")
        }
      }
    }
    // 2) Crossing backward from 12 into 11 (or earlier hours >= 8):
    else if (prevHour === 12 && newHour !== 12) {
      if (newHour === 11 || (newHour >= 8 && newHour <= 11)) {
        if (period === "PM") {
          setPeriod("AM")
        } else if (period === "AM") {
          setPeriod("PM")
        }
      }
    }

    prevHourRef.current = newHour
  }

  const handleMinuteChange = (newMinute: number) => {
    setMinute(newMinute)
    prevMinuteRef.current = newMinute
  }

  const selectedMinutes = useMemo(
    () => timeToMinutes(hour, minute, period),
    [hour, minute, period],
  )

  const formattedDisplayTime = useMemo(() => {
    const paddedMinute = minute < 10 ? `0${minute}` : `${minute}`
    return `${hour}:${paddedMinute} ${period}`
  }, [hour, minute, period])

  // Validation:
  // "Ensure that the time selected does not exceed travel time to next location + time of next location
  // (e.g travel time to location 8 mins, time of next location 7.30pm. time selected for previous destination should not be more than 7.12pm).
  // If time exceeds, blur out and disable the 'confirm' button and have a red note appear above the time picker slider
  // with text 'insufficient time to next stop' like the reference 'red text.png', tapping confirm will update the timing in the the itinerary plan."
  const nextStop = index < stops.length - 1 ? stops[index + 1] : null

  const isExceeded = useMemo(() => {
    if (!nextStop) return false
    const nextParsed = parseTimeString(nextStop.time)
    const nextStopMinutes = timeToMinutes(
      nextParsed.hour,
      nextParsed.minute,
      nextParsed.period,
    )

    let travelMins = 8
    if (stop.meta && /garden\s*·\s*8\s*min/i.test(stop.meta)) {
      travelMins = 8
    } else {
      const route = getRouteDetail(stop, nextStop, index)
      const match = route?.detail?.match(/(\d+)\s*min/i)
      if (match) {
        travelMins = parseInt(match[1], 10)
      }
    }

    // 8 mins travel + 10 mins minimum stop visit buffer = 18 mins
    // (7:30 pm - 18 mins = 7:12 pm)
    const maxAllowedMinutes = nextStopMinutes - (travelMins + 10)
    return selectedMinutes > maxAllowedMinutes
  }, [nextStop, stop, index, selectedMinutes])

  if (!isOpen) return null

  return (
    <div
      className="time-picker-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onCancel()
        }
      }}
    >
      <div className="time-picker-container">
        {/* Top Card: Picker + Confirm */}
        <div
          className={`time-picker-card ${
            theme === "dark" ? "theme-dark" : ""
          }`}
        >
          {/* Header Row */}
          <div className="time-picker-header">
            <span className="time-picker-title">Time</span>
            <div className="time-picker-badge-pill">{formattedDisplayTime}</div>
          </div>

          {/* Red Warning Note (if exceeded) */}
          {isExceeded && (
            <div className="time-picker-warning-banner">
              <svg
                className="warning-icon-svg"
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>insufficient time to next stop</span>
            </div>
          )}

          {/* 3-Column Wheels with Center Selection Bar */}
          <div className="time-picker-wheels-wrapper">
            <div className="time-picker-selection-highlight" />
            <WheelColumn
              items={HOURS_LIST}
              value={hour}
              onChange={handleHourChange}
              itemHeight={38}
            />
            <WheelColumn
              items={MINUTES_LIST}
              value={minute}
              onChange={handleMinuteChange}
              itemHeight={38}
            />
            <WheelColumn
              items={PERIODS_LIST}
              value={period}
              onChange={setPeriod}
              itemHeight={38}
            />
          </div>

          {/* Divider */}
          <div className="time-picker-divider" />

          {/* Confirm Button */}
          <button
            type="button"
            disabled={isExceeded}
            className={`time-picker-action-btn confirm-btn ${
              isExceeded ? "disabled" : ""
            }`}
            onClick={() => {
              if (!isExceeded) {
                const finalPaddedMin =
                  minute < 10 ? `0${minute}` : `${minute}`
                const finalTime = `${hour}:${finalPaddedMin} ${period.toLowerCase()}`
                onConfirm(finalTime)
              }
            }}
          >
            Confirm
          </button>
        </div>

        {/* Bottom Card: Cancel Button */}
        <div
          className={`time-picker-cancel-wrapper ${
            theme === "dark" ? "theme-dark" : ""
          }`}
        >
          <button
            type="button"
            className="time-picker-action-btn cancel-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

function PlanScreen({
  stops,
  theme,
  onToggleTheme,
  onCurrent,
  onPlace,
  onBack,
  updateMessage,
  selectedLegIndex,
  onHighlightLeg,
  onResetHighlight,
  onToggleDrawer,
  onDeleteStop,
  onUndoStop,
  onRevisit,
  onReplaceStop,
  onBounce,
  onSearch,
  onUpdateTime,
  onReorderStops,
}: {
  stops: TimelineStop[]
  theme: Theme
  onToggleTheme: () => void
  onCurrent?: () => void
  onPlace: (stop: TimelineStop) => void
  onBack: () => void
  updateMessage?: string
  selectedLegIndex?: number | null
  onHighlightLeg?: (index: number) => void
  onResetHighlight?: () => void
  onToggleDrawer?: (down: boolean) => void
  onDeleteStop?: (id: string) => void
  onUndoStop?: (id: string) => void
  onRevisit?: (afterId: string, customStop?: TimelineStop) => void
  onReplaceStop?: (replaceId: string, customStop?: TimelineStop) => void
  onBounce?: (stop: TimelineStop) => void
  onSearch?: (stop: TimelineStop) => void
  onUpdateTime?: (stopId: string, newTime: string) => void
  onReorderStops?: (newStops: TimelineStop[]) => void
}) {
  const currentRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<Record<string, HTMLDivElement | null>>({})
  const [expandedAddStopId, setExpandedAddStopId] = useState<string | null>(
    null,
  )
  const [editingTimeStop, setEditingTimeStop] = useState<{
    stop: TimelineStop
    index: number
  } | null>(null)

  // Drag and drop state for future locations ONLY
  const [draggedStopId, setDraggedStopId] = useState<string | null>(null)
  const [dragDeltaY, setDragDeltaY] = useState(0)
  const [hoverSlotIndex, setHoverSlotIndex] = useState<number | null>(null)
  const [isSettling, setIsSettling] = useState(false)
  const [settleDeltaY, setSettleDeltaY] = useState(0)

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const slotRectsRef = useRef<
    Array<{ top: number; height: number; center: number }>
  >([])
  const initialSlotIndexRef = useRef(0)
  const hoverSlotIndexRef = useRef(0)
  const originalSlotTimesRef = useRef<string[]>([])
  const isDraggingStopRef = useRef(false)
  const dragStartClientY = useRef(0)

  const handleStartDrag = (stopId: string, startY: number) => {
    setExpandedAddStopId(null)
    setSwipedStopId(null)

    const future = stops.filter((s) => !s.past && !s.current)
    const initialIndex = future.findIndex((s) => s.id === stopId)
    if (initialIndex === -1) return

    const rects: Array<{ top: number; height: number; center: number }> = []
    future.forEach((s) => {
      const el = cardRefs.current[s.id]
      if (el) {
        const r = el.getBoundingClientRect()
        rects.push({
          top: r.top,
          height: r.height,
          center: r.top + r.height / 2,
        })
      } else {
        rects.push({ top: 0, height: 0, center: 0 })
      }
    })

    slotRectsRef.current = rects
    initialSlotIndexRef.current = initialIndex
    hoverSlotIndexRef.current = initialIndex
    originalSlotTimesRef.current = future.map((s) => s.time)
    dragStartClientY.current = startY
    isDraggingStopRef.current = true

    setDraggedStopId(stopId)
    setDragDeltaY(0)
    setHoverSlotIndex(initialIndex)
    setIsSettling(false)
    setSettleDeltaY(0)
  }

  const handleMoveDrag = (clientY: number) => {
    if (!isDraggingStopRef.current) return
    const rawDiffY = clientY - dragStartClientY.current
    const rects = slotRectsRef.current
    const initialIndex = initialSlotIndexRef.current
    const futureCount = rects.length
    if (futureCount === 0) return

    if (scrollContainerRef.current) {
      const containerRect = scrollContainerRef.current.getBoundingClientRect()
      if (clientY < containerRect.top + 50) {
        scrollContainerRef.current.scrollBy({ top: -6, behavior: "auto" })
      } else if (clientY > containerRect.bottom - 50) {
        scrollContainerRef.current.scrollBy({ top: 6, behavior: "auto" })
      }
    }

    const minDiff = rects[0].top - rects[initialIndex].top - 20
    const maxDiff = rects[futureCount - 1].top - rects[initialIndex].top + 20
    let clamped = rawDiffY
    if (clamped < minDiff) {
      clamped = minDiff + (clamped - minDiff) * 0.2
    } else if (clamped > maxDiff) {
      clamped = maxDiff + (clamped - maxDiff) * 0.2
    }
    setDragDeltaY(clamped)

    const draggedCenter = rects[initialIndex].center + clamped

    let newHover = initialIndex
    if (clamped > 0) {
      for (let k = initialIndex + 1; k < futureCount; k++) {
        if (draggedCenter > rects[k].center) {
          newHover = k
        }
      }
    } else if (clamped < 0) {
      for (let k = initialIndex - 1; k >= 0; k--) {
        if (draggedCenter < rects[k].center) {
          newHover = k
        }
      }
    }

    if (newHover !== hoverSlotIndexRef.current) {
      hoverSlotIndexRef.current = newHover
      setHoverSlotIndex(newHover)
    }
  }

  const handleEndDrag = () => {
    if (!isDraggingStopRef.current) return
    isDraggingStopRef.current = false

    const rects = slotRectsRef.current
    const initialIndex = initialSlotIndexRef.current
    const targetIndex = hoverSlotIndexRef.current
    const future = stops.filter((s) => !s.past && !s.current)

    if (
      targetIndex !== initialIndex &&
      rects[targetIndex] &&
      rects[initialIndex]
    ) {
      const targetDeltaY = rects[targetIndex].top - rects[initialIndex].top
      setSettleDeltaY(targetDeltaY)
      setIsSettling(true)

      setTimeout(() => {
        const reordered = [...future]
        const [moved] = reordered.splice(initialIndex, 1)
        reordered.splice(targetIndex, 0, moved)

        // Assign the timing of that specific space
        const times = originalSlotTimesRef.current
        const updatedFuture = reordered.map((stop, i) => ({
          ...stop,
          time: times[i] || stop.time,
        }))

        const startIdx = stops.findIndex((s) => !s.past && !s.current)
        const nextStops = [...stops]
        nextStops.splice(startIdx, updatedFuture.length, ...updatedFuture)

        onReorderStops?.(nextStops)

        setDraggedStopId(null)
        setDragDeltaY(0)
        setHoverSlotIndex(null)
        setIsSettling(false)
        setSettleDeltaY(0)
      }, 220)
    } else {
      setSettleDeltaY(0)
      setIsSettling(true)
      setTimeout(() => {
        setDraggedStopId(null)
        setDragDeltaY(0)
        setHoverSlotIndex(null)
        setIsSettling(false)
        setSettleDeltaY(0)
      }, 200)
    }
  }

  const handleCancelDrag = () => {
    if (!isDraggingStopRef.current) return
    isDraggingStopRef.current = false
    setDraggedStopId(null)
    setDragDeltaY(0)
    setHoverSlotIndex(null)
    setIsSettling(false)
    setSettleDeltaY(0)
  }

  const getCardStyle = (
    stopId: string,
    futureIndex: number,
  ): React.CSSProperties | undefined => {
    if (!draggedStopId) return undefined

    const rects = slotRectsRef.current
    const initialIndex = initialSlotIndexRef.current
    const targetIndex = hoverSlotIndex ?? initialIndex

    if (stopId === draggedStopId) {
      const currentY = isSettling ? settleDeltaY : dragDeltaY
      return {
        transform: `translate3d(0, ${currentY}px, 0) scale(1.025)`,
        zIndex: 100,
        transition: isSettling
          ? "transform 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)"
          : "none",
      }
    }

    if (rects.length === 0) return undefined

    let glideY = 0
    if (targetIndex > initialIndex) {
      if (futureIndex > initialIndex && futureIndex <= targetIndex) {
        const prevTop = rects[futureIndex - 1]?.top ?? 0
        const currentTop = rects[futureIndex]?.top ?? 0
        glideY = -(currentTop - prevTop)
      }
    } else if (targetIndex < initialIndex) {
      if (futureIndex >= targetIndex && futureIndex < initialIndex) {
        const nextTop = rects[futureIndex + 1]?.top ?? 0
        const currentTop = rects[futureIndex]?.top ?? 0
        glideY = +(nextTop - currentTop)
      }
    }

    return {
      transform:
        glideY !== 0 ? `translate3d(0, ${glideY}px, 0)` : "translate3d(0, 0, 0)",
      transition: "transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)",
      zIndex: 1,
    }
  }
  const [mapExpanded, setMapExpanded] = useState(
    new URLSearchParams(window.location.search).get("expanded") === "1",
  )
  const [activeLeg, setActiveLeg] = useState<number | null>(
    selectedLegIndex ?? null,
  )
  const [swipedStopId, setSwipedStopId] = useState<string | null>(null)

  useEffect(() => {
    if (expandedAddStopId) {
      const timer = setTimeout(() => {
        const el = actionsRef.current[expandedAddStopId]
        const container = scrollContainerRef.current
        if (el && container) {
          const containerRect = container.getBoundingClientRect()
          const elRect = el.getBoundingClientRect()
          const targetBottom = Math.max(elRect.bottom, elRect.top + 58)
          const bottomPadding = 32
          const delta = targetBottom - (containerRect.bottom - bottomPadding)
          if (delta > -20) {
            container.scrollBy({
              top: Math.max(delta, 0) + 16,
              behavior: "smooth",
            })
          }
        }
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [expandedAddStopId])
  const [menuOpen, setMenuOpen] = useState(false)
  const [revisitModalStop, setRevisitModalStop] = useState<TimelineStop | null>(
    () => {
      const isRevisit =
        new URLSearchParams(window.location.search).get("revisit") === "1"
      const reqScreen = new URLSearchParams(window.location.search).get(
        "screen",
      )
      if (isRevisit && (reqScreen === "plan" || !reqScreen)) {
        return stops.find((s) => s.past) || stops[0]
      }
      return null
    },
  )
  const [drawerMode, setDrawerMode] = useState<"invite" | "share" | null>(
    () => {
      const p = new URLSearchParams(window.location.search)
      if (p.get("invite") === "1") return "invite"
      if (p.get("share") === "1") return "share"
      return null
    },
  )
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleCopyLink = () => {
    try {
      navigator.clipboard?.writeText(
        "https://maps.app.goo.gl/SingaporeFoodTrail",
      )
    } catch {}
    const isShare = drawerMode === "share"
    setDrawerMode(null)
    setToastMessage(
      isShare ? "Link copied to clipboard" : "Invite link copied to clipboard",
    )
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Drawer Drag & Tap State
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const isDragging = useRef(false)
  const dragStartY = useRef(0)
  const totalDragDistance = useRef(0)

  useEffect(() => {
    onToggleDrawer?.(mapExpanded)
  }, [mapExpanded, onToggleDrawer])

  useEffect(() => {
    if (selectedLegIndex !== undefined) {
      setActiveLeg(selectedLegIndex)
    }
  }, [selectedLegIndex])

  const jump = () => {
    currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    onCurrent?.()
  }

  const handleRouteClick = (index: number) => {
    if (activeLeg === index && index !== 2) {
      setActiveLeg(null)
      onResetHighlight?.()
    } else {
      setActiveLeg(index)
      setMapExpanded(true)
      onHighlightLeg?.(index)
    }
  }

  const handleExpandDrawer = () => {
    setMapExpanded(false)
    setActiveLeg(null)
    onResetHighlight?.()
  }

  const currentStop = stops.find((stop) => stop.current) ?? stops[0]
  const currentIndex = stops.findIndex((stop) => stop.id === currentStop.id)

  const legIndex =
    activeLeg !== null
      ? activeLeg
      : currentIndex >= 0 && currentIndex < stops.length - 1
        ? currentIndex
        : 0

  const fromStop = stops[legIndex] || currentStop
  const nextStop = stops[legIndex + 1] || stops[stops.length - 1]
  const legRoute = getRouteDetail(fromStop, nextStop, legIndex)

  const badge =
    legRoute.lineClass === "downtown"
      ? "DTL"
      : legRoute.lineClass === "thomson"
        ? "TEL"
        : legRoute.icon === "bus"
          ? legRoute.title.replace("Bus ", "")
          : null

  let duration = "4 min"
  let sub = "Walk"
  if (legRoute.detail) {
    if (legRoute.detail.includes("·")) {
      const parts = legRoute.detail.split("·").map((s) => s.trim())
      if (parts[1].includes("min") || parts[1].includes("hr")) {
        duration = parts[1]
        sub = parts[0]
      } else {
        duration = parts[0]
        sub = parts[1]
      }
    } else {
      duration = legRoute.detail
      sub = legRoute.title
    }
  }

  // Interactive Drag & Tap Handler
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    dragStartY.current = e.clientY
    totalDragDistance.current = 0
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {}
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const diff = e.clientY - dragStartY.current
    totalDragDistance.current = diff

    if (!mapExpanded) {
      // Drawer is up (expanded). Pulling down has diff > 0.
      const clamped = diff < 0 ? diff * 0.15 : diff
      setDragOffsetY(clamped)
    } else {
      // Drawer is down (collapsed). Pulling up has diff < 0.
      const clamped = diff > 0 ? diff * 0.15 : diff
      setDragOffsetY(clamped)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {}

    const dist = totalDragDistance.current
    setDragOffsetY(0)

    // Check if it's a tap (< 8px movement)
    if (Math.abs(dist) < 8) {
      if (mapExpanded) {
        handleExpandDrawer()
      } else {
        setMapExpanded(true)
      }
      return
    }

    // It was a drag:
    if (!mapExpanded) {
      if (dist > 35) {
        setMapExpanded(true)
      }
    } else {
      if (dist < -35) {
        handleExpandDrawer()
      }
    }
  }

  const handlePointerCancel = () => {
    isDragging.current = false
    setDragOffsetY(0)
  }

  return (
    <div className="screen-page plan-page">
      {/* 1. Top Left Back Button (Cleanly isolated, zero overlap) */}
      <BackButton onPress={onBack} theme={theme} />

      {/* 2. Floating Action Buttons: Light/Dark Toggle and Compass directly above drawer on right side at all times */}
      <div
        className="plan-fab-cluster"
        style={{
          bottom: mapExpanded ? "165px" : "calc(100% - 345px)",
          transform:
            dragOffsetY !== 0
              ? `translate3d(0, ${dragOffsetY}px, 0)`
              : undefined,
          transition: isDragging.current
            ? "none"
            : "bottom 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s ease",
        }}
      >
        {/* Vertical Pill matching Main Screen */}
        <div
          style={{
            background: theme === "dark" ? "var(--control)" : "#ffffff",
            borderRadius: "24px",
            padding: "3px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            boxShadow:
              theme === "dark"
                ? "0 4px 14px rgba(0,0,0,0.35)"
                : "0 4px 14px rgba(0,0,0,0.12)",
            border:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* Compass / Recenter */}
          <div
            onClick={() => onCurrent?.()}
            className="tap"
            style={{
              width: "40px",
              height: "38px",
              display: "grid",
              placeItems: "center",
              color: theme === "dark" ? "var(--text-high)" : "#202124",
              cursor: "pointer",
            }}
            title="Compass heading"
          >
            <Icon name="compass" size={20} />
          </div>

          {/* Circular Theme Toggle Button matching Main Screen */}
          <div
            onClick={onToggleTheme}
            className="tap"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: theme === "dark" ? "#ffffff" : "#202124",
              color: theme === "dark" ? "#202124" : "#ffffff",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
              cursor: "pointer",
            }}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={20} />
          </div>
        </div>
      </div>

      {/* 3. Interactive Drawer (Supports touch/mouse drag up & down and tap) */}
      <div
        className={`plan-sheet ${mapExpanded ? "map-expanded" : ""}`}
        style={{
          transform:
            dragOffsetY !== 0
              ? `translate3d(0, ${dragOffsetY}px, 0)`
              : undefined,
          transition: isDragging.current
            ? "none"
            : "top 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s ease",
        }}
      >
        <div
          className="sheet-grabber"
          role="button"
          tabIndex={0}
          aria-label={
            mapExpanded ? "Slide up for full plan" : "Slide down to expand map"
          }
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: "none", cursor: "ns-resize" }}
        >
          <span />
          <small>
            {mapExpanded
              ? "Slide up for full plan"
              : "Slide down to expand map"}
          </small>
        </div>
        {mapExpanded ? (
          <div className="expanded-current-wrapper">
            <CollapsedDrawerRoute
              fromTitle={fromStop.title}
              fromMeta={fromStop.meta}
              fromKicker={
                fromStop.current ? "CURRENT LOCATION" : fromStop.time || "START"
              }
              isCurrent={Boolean(fromStop.current)}
              onFromPress={() => onPlace(fromStop)}
              toTitle={nextStop.title}
              toMeta={nextStop.meta}
              toKicker={
                nextStop.changed ? "NEW ADDITION" : nextStop.time || "NEXT STOP"
              }
              isNew={Boolean(nextStop.changed || nextStop.bounceSource)}
              onToPress={() => onPlace(nextStop)}
              routeIcon={legRoute.icon}
              routeDuration={duration}
              routeSub={sub}
              routeBadge={badge}
              routeBadgeClass={
                legRoute.lineClass ??
                (legRoute.icon === "bus" ? "bus" : undefined)
              }
            />
          </div>
        ) : (
          <div className="plan-sheet-scroll" ref={scrollContainerRef}>
            <PlanHeader updated={Boolean(updateMessage)} />
            {updateMessage && (
              <div className="updated-banner">
                <Icon name="check" />
                <span>
                  <b>Plan updated</b>
                  <small>{updateMessage}</small>
                </span>
              </div>
            )}
            <div className="plan-toolbar">
              <Tap
                label="Jump to current time"
                className="current-time"
                onPress={jump}
              >
                <Icon name="clock" size={18} />
                Current time
              </Tap>
              <Tap
                label="Invite collaborators"
                className="invite-button"
                onPress={() => setDrawerMode("invite")}
              >
                <Icon name="user-plus" size={17} />
                Invite
              </Tap>
              <RoundAction
                icon="share"
                label="Share plan"
                onPress={() => setDrawerMode("share")}
              />
              <RoundAction
                icon="more"
                label="More options"
                onPress={() => setMenuOpen(true)}
              />
            </div>
            <div className="day-heading">
              <span>Day 1</span>
              <small>Shenton Way Coffee & Suntec Views</small>
            </div>
            <div className="timeline">
              {stops.map((stop, index) => {
                const isRemovable = true
                const currentIdx = stops.findIndex((s) => s.current)
                const isTimeAdjustable = currentIdx !== -1 && index > currentIdx
                const isDraggable =
                  currentIdx !== -1 &&
                  index > currentIdx &&
                  !stop.past &&
                  !stop.current
                const futureIndex = isDraggable
                  ? index - (currentIdx + 1)
                  : -1
                const isFloating = stop.id === draggedStopId
                const isGliding = Boolean(
                  draggedStopId && stop.id !== draggedStopId && isDraggable,
                )
                const cardStyle = isDraggable
                  ? getCardStyle(stop.id, futureIndex)
                  : undefined

                return (
                  <div className="timeline-stop-group" key={stop.id}>
                    <SwipeableTimelineRow
                      stop={stop}
                      currentRef={stop.current ? currentRef : undefined}
                      isRemovable={isRemovable}
                      isDraggable={isDraggable}
                      isFloating={isFloating}
                      isGliding={isGliding}
                      cardRef={(el) => {
                        cardRefs.current[stop.id] = el
                      }}
                      cardStyle={cardStyle}
                      onDragStart={(startY) =>
                        handleStartDrag(stop.id, startY)
                      }
                      onDragMove={handleMoveDrag}
                      onDragEnd={handleEndDrag}
                      onDragCancel={handleCancelDrag}
                      isTimeAdjustable={isTimeAdjustable}
                      onTimeClick={() =>
                        setEditingTimeStop({ stop, index })
                      }
                      isOpen={swipedStopId === stop.id}
                      onOpen={() => setSwipedStopId(stop.id)}
                      onClose={() => {
                        if (swipedStopId === stop.id) setSwipedStopId(null)
                      }}
                      onDelete={() => {
                        setSwipedStopId(null)
                        onDeleteStop?.(stop.id)
                      }}
                      onUndo={() => {
                        setSwipedStopId(null)
                        onUndoStop?.(stop.id)
                      }}
                      onPlace={() => onPlace(stop)}
                      isAddExpanded={expandedAddStopId === stop.id}
                      onToggleAdd={() => {
                        setExpandedAddStopId((prev) =>
                          prev === stop.id ? null : stop.id,
                        )
                      }}
                      actionsRef={(el) => {
                        actionsRef.current[stop.id] = el
                      }}
                      onBounce={() => {
                        if (onBounce) {
                          onBounce(stop)
                        } else {
                          onPlace(stop)
                        }
                      }}
                      onSearch={() => {
                        if (onSearch) {
                          onSearch(stop)
                        }
                      }}
                    />
                    {index < stops.length - 1 &&
                      (() => {
                        const route = getRouteDetail(
                          stop,
                          stops[index + 1],
                          index,
                        )
                        const badge =
                          route.lineClass === "downtown"
                            ? "DTL"
                            : route.lineClass === "thomson"
                              ? "TEL"
                              : route.icon === "bus"
                                ? route.title.replace("Bus ", "")
                                : null
                        const isSelected = activeLeg === index
                        return (
                          <div
                            className={`route-detail ${
                              isSelected ? "selected-route" : ""
                            }`}
                            onClick={() => handleRouteClick(index)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Highlight route from ${stop.title} to ${stops[index + 1].title}`}
                          >
                            <span
                              className={`route-icon ${route.lineClass ?? ""}`}
                            >
                              <Icon name={route.icon} size={17} />
                            </span>
                            <span>
                              <b>{route.title}</b>
                              <small>{route.detail}</small>
                            </span>
                            {badge && (
                              <span
                                className={`transit-badge ${route.lineClass ?? "bus"}`}
                              >
                                {badge}
                              </span>
                            )}
                          </div>
                        )
                      })()}
                  </div>
                )
              })}
            </div>
            <div className="day-heading">
              <span>Day 2</span>
              <small>Market Street & Chinatown</small>
            </div>
            <div className="scroll-spacer" />
          </div>
        )}
      </div>

      {/* 3. Three Dots Options Menu */}
      <ListOptionsMenu
        isOpen={menuOpen}
        theme={theme}
        onClose={() => setMenuOpen(false)}
        onInvite={() => {
          setMenuOpen(false)
          setDrawerMode("invite")
        }}
        onShare={() => {
          setMenuOpen(false)
          setDrawerMode("share")
        }}
        onToast={(msg) => {
          setMenuOpen(false)
          setToastMessage(msg)
          setTimeout(() => setToastMessage(null), 3000)
        }}
      />

      {/* 4. Invite / Share Drawer (iOS Share Sheet) */}
      <InviteDrawer
        isOpen={drawerMode !== null}
        theme={theme}
        title={drawerMode === "share" ? "Share to view" : "Invite to edit"}
        onClose={() => setDrawerMode(null)}
        onCopy={handleCopyLink}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast" style={{ zIndex: 160, pointerEvents: "auto" }}>
          <span className="toast-icon">
            <Icon name="check" size={18} />
          </span>
          <span>
            <b>Success</b>
            <small>{toastMessage}</small>
          </span>
        </div>
      )}

      {/* 5. Revisit Sheet (if opened on PlanScreen) */}
      {revisitModalStop && (
        <RevisitSheet
          stop={revisitModalStop}
          fullItinerary={stops}
          onAddAfter={(afterId) => {
            setRevisitModalStop(null)
            onRevisit?.(afterId, revisitModalStop)
          }}
          onReplace={(replaceId) => {
            setRevisitModalStop(null)
            onReplaceStop?.(replaceId, revisitModalStop)
          }}
          onClose={() => setRevisitModalStop(null)}
        />
      )}

      {/* 6. Time Picker Drawer */}
      {editingTimeStop && (
        <TimePickerDrawer
          isOpen={Boolean(editingTimeStop)}
          stop={editingTimeStop.stop}
          index={editingTimeStop.index}
          stops={stops}
          theme={theme}
          onConfirm={(newTime) => {
            onUpdateTime?.(editingTimeStop.stop.id, newTime)
            setEditingTimeStop(null)
          }}
          onCancel={() => setEditingTimeStop(null)}
        />
      )}
    </div>
  )
}

function RevisitSheet({
  stop,
  fullItinerary,
  onAddAfter,
  onReplace,
  onClose,
}: {
  stop: TimelineStop
  fullItinerary: TimelineStop[]
  onAddAfter: (afterId: string) => void
  onReplace: (replaceId: string) => void
  onClose: () => void
}) {
  // Option 1: Recommendation of where to add after
  const recommendedStop =
    fullItinerary.find((s) => s.current) ||
    fullItinerary.find((s) => !s.past && s.id !== stop.id) ||
    fullItinerary[0]

  // Option 2: Suggest replacing something on the itinerary to fit the schedule
  const replaceTargetStop =
    fullItinerary.find((s) => !s.past && !s.current && s.id !== stop.id) ||
    fullItinerary.find((s) => !s.past && s.id !== stop.id) ||
    fullItinerary[fullItinerary.length - 1]

  // Option 3: Dropdown list of all places on full itinerary
  const [selectedDropdownId, setSelectedDropdownId] = useState<string>(
    recommendedStop ? recommendedStop.id : fullItinerary[0]?.id || "",
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const selectedStopItem =
    fullItinerary.find((s) => s.id === selectedDropdownId) || fullItinerary[0]

  return (
    <div className="revisit-overlay">
      <Tap
        label="Close revisit options"
        className="revisit-backdrop"
        onPress={onClose}
      />
      <div
        className="revisit-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`Revisit ${stop.title}`}
      >
        <div className="sheet-grip" />
        <div className="revisit-kicker">REVISIT {stop.title.toUpperCase()}</div>
        <div className="revisit-title">Add back to your itinerary</div>
        <p className="revisit-desc">
          Choose where or how {stop.title} fits into your Singapore plan:
        </p>

        <div className="revisit-options-container">
          {/* OPTION 1: Recommendation of where to add after */}
          {recommendedStop && (
            <div
              className="revisit-option-card option-recommendation"
              onClick={() => onAddAfter(recommendedStop.id)}
              role="button"
              tabIndex={0}
              aria-label={`Recommended: Add after ${recommendedStop.title}`}
            >
              <div className="revisit-card-top">
                <span className="revisit-badge badge-recommended">
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    fill="currentColor"
                    style={{ marginRight: 4 }}
                  >
                    <path d="M12 2l2.4 7.4h7.6l-6.1 4.5 2.3 7.1-6.2-4.5-6.2 4.5 2.3-7.1-6.1-4.5h7.6z" />
                  </svg>
                  RECOMMENDED
                </span>
                <span className="revisit-timing">
                  AFTER · {recommendedStop.time}
                </span>
              </div>
              <div className="revisit-card-body">
                <div className="revisit-card-text">
                  <b className="revisit-card-title">
                    Add after {recommendedStop.title}
                  </b>
                  <small className="revisit-card-meta">
                    Optimal route timing · Adds ~45 min near Chinatown without
                    extra transit
                  </small>
                </div>
                <div className="revisit-action-icon add">
                  <Icon name="plus" size={18} />
                </div>
              </div>
            </div>
          )}

          {/* OPTION 2: Suggest replacing something on the itinerary to fit schedule */}
          {replaceTargetStop && (
            <div
              className="revisit-option-card option-replace"
              onClick={() => onReplace(replaceTargetStop.id)}
              role="button"
              tabIndex={0}
              aria-label={`Replace ${replaceTargetStop.title} to fit schedule`}
            >
              <div className="revisit-card-top">
                <span className="revisit-badge badge-replace">
                  <svg
                    viewBox="0 0 24 24"
                    width="12"
                    height="12"
                    fill="currentColor"
                    style={{ marginRight: 4 }}
                  >
                    <path d="M16 3h5v5M4 20l5-5M21 3l-7 7M15 15l6 6M21 16v5h-5M4 4l5 5" />
                  </svg>
                  FIT SCHEDULE · SWAP
                </span>
                <span className="revisit-timing">
                  SWAP · {replaceTargetStop.time}
                </span>
              </div>
              <div className="revisit-card-body">
                <div className="revisit-card-text">
                  <b className="revisit-card-title">
                    Replace {replaceTargetStop.title}
                  </b>
                  <small className="revisit-card-meta">
                    Swaps {replaceTargetStop.time} slot · Keeps your 7:30 pm
                    dinner finish on time
                  </small>
                </div>
                <div className="revisit-action-icon swap">
                  <Icon name="shuffle" size={18} />
                </div>
              </div>
            </div>
          )}

          {/* OPTION 3: Select from a dropdown list of all places on full itinerary */}
          <div className="revisit-option-card option-dropdown">
            <div className="revisit-card-top">
              <span className="revisit-badge badge-custom">
                <svg
                  viewBox="0 0 24 24"
                  width="12"
                  height="12"
                  fill="currentColor"
                  style={{ marginRight: 4 }}
                >
                  <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
                </svg>
                FULL ITINERARY LIST
              </span>
              <span className="revisit-timing">
                {fullItinerary.length} PLACES
              </span>
            </div>
            <div className="revisit-card-text" style={{ marginBottom: 8 }}>
              <b className="revisit-card-title">Choose from full itinerary</b>
              <small className="revisit-card-meta">
                Select any place in your schedule to insert {stop.title} after:
              </small>
            </div>
            <div className="revisit-dropdown-control-row">
              <div className="revisit-select-container">
                {isDropdownOpen && (
                  <div
                    className="revisit-dropup-backdrop"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsDropdownOpen(false)
                    }}
                  />
                )}

                {isDropdownOpen && (
                  <div
                    className="revisit-dropup-menu"
                    role="listbox"
                    aria-label="Full itinerary places"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="revisit-dropup-list">
                      {fullItinerary.map((item) => {
                        const isSelected = item.id === selectedDropdownId
                        const tag = item.current
                          ? " · Current"
                          : item.past
                            ? " · Visited"
                            : ""
                        return (
                          <div
                            key={item.id}
                            className={`revisit-dropup-item ${
                              isSelected ? "selected" : ""
                            }`}
                            role="option"
                            aria-selected={isSelected}
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedDropdownId(item.id)
                              setIsDropdownOpen(false)
                            }}
                          >
                            <span className="revisit-dropup-item-text">
                              After {item.title} ({item.time}
                              {tag})
                            </span>
                            {isSelected && (
                              <svg
                                className="revisit-dropup-check"
                                viewBox="0 0 24 24"
                                width="14"
                                height="14"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className={`revisit-dropdown-trigger ${
                    isDropdownOpen ? "open" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDropdownOpen(!isDropdownOpen)
                  }}
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <span className="revisit-dropdown-trigger-label">
                    After {selectedStopItem?.title} ({selectedStopItem?.time}
                    {selectedStopItem?.current
                      ? " · Current"
                      : selectedStopItem?.past
                        ? " · Visited"
                        : ""}
                    )
                  </span>
                  <div
                    className={`revisit-select-arrow ${
                      isDropdownOpen ? "open" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <Icon name="chevron" size={14} />
                  </div>
                </button>
              </div>
              <button
                type="button"
                className="revisit-dropdown-confirm-btn"
                onClick={() => {
                  setIsDropdownOpen(false)
                  onAddAfter(selectedDropdownId)
                }}
                aria-label="Confirm insertion after selected place"
              >
                <Icon name="plus" size={14} />
                <span>Insert</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlaceScreen({
  stop,
  nextStop,
  placementOptions,
  fullItinerary = [],
  onBounce,
  onRevisit,
  onReplaceStop,
  onRevert,
  onBack,
}: {
  stop: TimelineStop
  nextStop?: TimelineStop
  placementOptions: TimelineStop[]
  fullItinerary?: TimelineStop[]
  onBounce: () => void
  onRevisit: (afterId: string) => void
  onReplaceStop?: (replaceId: string) => void
  onRevert: () => void
  onBack: () => void
}) {
  const [showRevisit, setShowRevisit] = useState(
    new URLSearchParams(window.location.search).get("revisit") === "1",
  )
  const actionLabel = stop.past ? "Revisit" : "Bounce"
  const heroImage = stop.title === "KŌBASHI" || stop.past ? "5" : "6"
  return (
    <div className="screen-page place-page">
      <div className="place-hero">
        <img src={`/assets/prototype/screen-${heroImage}.jpg`} alt="" />
        <BackButton onPress={onBack} label="Back to saved plan" />
      </div>
      <div className="place-content">
        <div className={`current-label ${stop.past ? "visited" : ""}`}>
          <span />
          {stop.past
            ? `VISITED · ${stop.time}`
            : stop.current
              ? "YOU ARE HERE · 1:05 PM"
              : `UP NEXT · ${stop.time}`}
        </div>
        <div className="location-title-row">
          <div>
            <div className="location-title">{stop.title}</div>
            <div className="location-meta">
              4.0 <span>★</span> (352) · {stop.meta.split(" · ")[0]}
            </div>
          </div>
        </div>
        <div className="status-line">
          <b>Open</b> · Closes 6 pm
        </div>
        <div className="place-actions">
          <span className="teal-pill">
            <Icon name="route" />
            Directions
          </span>
          <span className="teal-pill">
            <Icon name="bookmark" />
            Saved
          </span>
          <span className="teal-pill">
            <Icon name="share" />
            Share
          </span>
          <Tap
            label={`${actionLabel} ${stop.title}`}
            className={`teal-pill inline-action ${stop.past ? "revisit" : ""}`}
            onPress={stop.past ? () => setShowRevisit(true) : onBounce}
          >
            <Icon name={stop.past ? "history" : "shuffle"} />
            {actionLabel}
          </Tap>
        </div>
        {stop.originalTitle && (
          <Tap
            label={`Revert to ${stop.originalTitle}`}
            className="revert-plan"
            onPress={onRevert}
          >
            <Icon name="history" size={18} />
            <span>
              <b>Revert to original plan</b>
              <small>Restore {stop.originalTitle}</small>
            </span>
          </Tap>
        )}
        <div className="location-section-title">What's after this</div>
        <div className="next-stop">
          <Icon name="clock" />
          <span>
            <small>
              {nextStop ? `NEXT · ${nextStop.time}` : "END OF PLAN"}
            </small>
            <b>{nextStop?.title ?? "No more planned stops"}</b>
            <em>
              {nextStop
                ? nextStop.meta
                : "You’ve reached the end of this itinerary"}
            </em>
          </span>
        </div>
        <p>
          {stop.past
            ? "This stop remains part of your saved itinerary and can be revisited at any time."
            : "You have time to stay, swap in something nearby, or pull forward a later saved place."}
        </p>
      </div>
      {showRevisit && (
        <RevisitSheet
          stop={stop}
          fullItinerary={
            fullItinerary.length > 0 ? fullItinerary : placementOptions
          }
          onAddAfter={(afterId) => {
            setShowRevisit(false)
            onRevisit(afterId)
          }}
          onReplace={(replaceId) => {
            setShowRevisit(false)
            onReplaceStop ? onReplaceStop(replaceId) : onRevisit(replaceId)
          }}
          onClose={() => setShowRevisit(false)}
        />
      )}
    </div>
  )
}

const bounceOptions = [
  {
    type: "STICK TO PLAN",
    title: "Green Oasis · CapitaSpring",
    meta: "Original next stop · 8 min walk",
    detail: "Best if you want a calm afternoon view.",
    action: "Keep original",
  },
  {
    type: "NEARBY ALTERNATIVE",
    title: "Maxwell Food Centre",
    meta: "4 min walk · Busy now",
    detail: "Closer, lively, and open with 20+ food stalls.",
    action: "Replace",
  },
  {
    type: "PULL FORWARD",
    title: "Loulouca",
    meta: "Saved for 7:30 pm · 9 min ride",
    detail: "Dessert now; the garden moves later.",
    action: "Replace",
  },
]

function getBounceOptions(stop: TimelineStop) {
  if (stop.id === "green-oasis")
    return [
      {
        type: "STICK TO PLAN",
        title: stop.title,
        meta: "Original stop · 8 min walk",
        detail: "Keep the garden visit at its planned time.",
        action: "Keep original",
      },
      {
        type: "NEARBY ALTERNATIVE",
        title: "National Gallery Singapore",
        meta: "6 min walk · Open now",
        detail: "Indoor galleries and a quieter afternoon pace.",
        action: "Replace",
      },
      {
        type: "REAL-TIME PICK",
        title: "Marina Bay SkyPark",
        meta: "12 min ride · Clear views",
        detail: "Swap the garden for skyline views while weather is clear.",
        action: "Replace",
      },
    ]
  if (stop.id === "loulouca")
    return [
      {
        type: "STICK TO PLAN",
        title: stop.title,
        meta: "Original dessert stop · 7:30 pm",
        detail: "Keep your planned late-night dessert.",
        action: "Keep original",
      },
      {
        type: "NEARBY ALTERNATIVE",
        title: "Birds of Paradise",
        meta: "5 min walk · Open now",
        detail: "A closer dessert stop with a short queue.",
        action: "Replace",
      },
      {
        type: "REAL-TIME PICK",
        title: "Nesuto",
        meta: "9 min ride · Tables available",
        detail: "Swap in a relaxed patisserie with seating.",
        action: "Replace",
      },
    ]
  return bounceOptions
}

function getBounceRoute(
  option: { meta: string },
  index: number,
  sourceStop: TimelineStop,
) {
  const duration = option.meta.match(/\d+\smin/)?.[0] ?? "8 min"
  if (option.meta.includes("walk"))
    return { icon: "walk" as IconName, label: "Walk", duration }
  if (index === 2 && sourceStop.id === "green-oasis")
    return {
      icon: "train" as IconName,
      label: "Downtown Line",
      duration,
      badge: "DTL",
      badgeClass: "downtown",
    }
  if (index === 2)
    return {
      icon: "bus" as IconName,
      label: "Bus 80",
      duration,
      badge: "80",
      badgeClass: "bus",
    }
  return { icon: "walk" as IconName, label: "Walk", duration }
}

function BounceScreen({
  sourceStop,
  theme,
  onToggleTheme,
  onRecenter,
  onSelect,
  onClose,
  selectedOption,
  onSelectOption,
  onToggleDrawer,
}: {
  sourceStop: TimelineStop
  theme: Theme
  onToggleTheme: () => void
  onRecenter?: () => void
  onSelect: (place: string) => void
  onClose: () => void
  selectedOption: number
  onSelectOption: (index: number) => void
  onToggleDrawer?: (drawerDown: boolean) => void
}) {
  const options = getBounceOptions(sourceStop)
  const insertsAfterCurrent = sourceStop.id === "kobashi"
  const confirmSelection = () =>
    selectedOption === 0 ? onClose() : onSelect(options[selectedOption].title)

  const [drawerDown, setDrawerDown] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return (
      params.get("collapsed") === "1" ||
      params.get("expanded") === "1" ||
      params.get("dropup") === "1"
    )
  })
  const [isDropUpOpen, setIsDropUpOpen] = useState(() => {
    return new URLSearchParams(window.location.search).get("dropup") === "1"
  })
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const isDragging = useRef(false)
  const dragStartY = useRef(0)
  const totalDragDistance = useRef(0)

  const handleToggleDrawer = (down: boolean) => {
    setDrawerDown(down)
    if (!down) {
      setIsDropUpOpen(false)
    }
    onToggleDrawer?.(down)
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDropUpOpen(false)
    isDragging.current = true
    dragStartY.current = e.clientY
    totalDragDistance.current = 0
    try {
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    } catch {}
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    const diff = e.clientY - dragStartY.current
    totalDragDistance.current = diff

    if (!drawerDown) {
      // Drawer is up. Pulling down has diff > 0.
      const clamped = diff < 0 ? diff * 0.15 : diff
      setDragOffsetY(clamped)
    } else {
      // Drawer is down. Pulling up has diff < 0.
      const clamped = diff > 0 ? diff * 0.15 : diff
      setDragOffsetY(clamped)
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return
    isDragging.current = false
    try {
      ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
    } catch {}

    const dist = totalDragDistance.current
    setDragOffsetY(0)

    // Tap (< 8px movement)
    if (Math.abs(dist) < 8) {
      handleToggleDrawer(!drawerDown)
      return
    }

    // Drag:
    if (!drawerDown) {
      if (dist > 35) {
        handleToggleDrawer(true)
      }
    } else {
      if (dist < -35) {
        handleToggleDrawer(false)
      }
    }
  }

  const handlePointerCancel = () => {
    isDragging.current = false
    setDragOffsetY(0)
  }

  return (
    <div className="screen-page bounce-page">
      {/* 1. Top Left Back Button (Cleanly isolated, zero overlap) */}
      <BackButton
        onPress={onClose}
        theme={theme}
        label="Back to place details"
      />

      {/* 2. Floating Action Controls: Theme toggle and compass on right side */}
      <div
        style={{
          position: "absolute",
          top: "52px",
          right: "14px",
          zIndex: 30,
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            background: theme === "dark" ? "var(--control)" : "#ffffff",
            borderRadius: "24px",
            padding: "3px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "4px",
            boxShadow:
              theme === "dark"
                ? "0 4px 14px rgba(0,0,0,0.35)"
                : "0 4px 14px rgba(0,0,0,0.12)",
            border:
              theme === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* Compass / Recenter */}
          <div
            onClick={() => onRecenter?.()}
            className="tap"
            style={{
              width: "40px",
              height: "38px",
              display: "grid",
              placeItems: "center",
              color: theme === "dark" ? "var(--text-high)" : "#202124",
              cursor: "pointer",
            }}
            title="Compass heading"
          >
            <Icon name="compass" size={20} />
          </div>

          {/* Theme Toggle Button */}
          <div
            onClick={onToggleTheme}
            className="tap"
            style={{
              width: "40px",
              height: "38px",
              display: "grid",
              placeItems: "center",
              color: theme === "dark" ? "var(--text-high)" : "#202124",
              cursor: "pointer",
            }}
            title="Toggle theme"
          >
            <Icon name={theme === "dark" ? "sun" : "moon"} size={20} />
          </div>
        </div>
      </div>

      <div
        className={`bounce-sheet ${drawerDown ? "drawer-down" : ""}`}
        style={{
          transform:
            dragOffsetY !== 0
              ? `translate3d(0, ${dragOffsetY}px, 0)`
              : undefined,
          transition: isDragging.current
            ? "none"
            : "top 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s ease",
          pointerEvents: "auto",
        }}
      >
        <div
          className="bounce-grabber"
          role="button"
          tabIndex={0}
          aria-label={
            drawerDown ? "Slide up for all options" : "Slide down to expand map"
          }
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: "none", cursor: "ns-resize" }}
        >
          <span />
          <small>
            {drawerDown
              ? "Slide up for all options"
              : "Slide down to expand map"}
          </small>
        </div>

        {drawerDown ? (
          <div className="bounce-collapsed-content">
            {(() => {
              const option = options[selectedOption] || options[0]
              const route = getBounceRoute(option, selectedOption, sourceStop)
              const otherOptions = options
                .map((opt, idx) => ({
                  index: idx,
                  title: opt.title,
                  meta: opt.meta,
                  type: opt.type,
                  route: getBounceRoute(opt, idx, sourceStop),
                }))
                .filter((opt) => opt.index !== selectedOption)

              return (
                <CollapsedDrawerRoute
                  fromTitle={sourceStop.title}
                  fromMeta={sourceStop.meta}
                  fromKicker="CURRENT LOCATION"
                  isCurrent={true}
                  onFromPress={() => onClose()}
                  toTitle={option.title}
                  toMeta={option.meta}
                  toKicker={option.type}
                  isNew={selectedOption === 1}
                  onToPress={() => setIsDropUpOpen((prev) => !prev)}
                  routeIcon={route.icon}
                  routeDuration={route.duration}
                  routeSub={route.label}
                  routeBadge={route.badge}
                  routeBadgeClass={route.badgeClass}
                  dropUpOptions={otherOptions}
                  onSelectDropUpOption={(idx) => {
                    onSelectOption(idx)
                    setIsDropUpOpen(false)
                  }}
                  isDropUpOpen={isDropUpOpen}
                  onCloseDropUp={() => setIsDropUpOpen(false)}
                  arrowDirection="up"
                />
              )
            })()}

            <div className="bounce-action-bar compact">
              <Tap
                label={
                  selectedOption === 0
                    ? options[0].action
                    : insertsAfterCurrent
                      ? "Add selected place after KŌBASHI"
                      : "Confirm Bounce"
                }
                className="confirm-bounce"
                onPress={confirmSelection}
              >
                {selectedOption === 0
                  ? options[0].action
                  : insertsAfterCurrent
                    ? "Add after KŌBASHI"
                    : "Confirm Bounce"}
                <Icon
                  name={
                    selectedOption === 0
                      ? "check"
                      : insertsAfterCurrent
                        ? "plus"
                        : "shuffle"
                  }
                  size={19}
                />
              </Tap>
            </div>
          </div>
        ) : (
          <>
            <div className="bounce-scroll">
              <div className="bounce-intro">
                <AskMark />
                <div>
                  <span>
                    {sourceStop.time} • {sourceStop.title}
                  </span>
                  <div>What should we do next?</div>
                  <p>
                    {insertsAfterCurrent
                      ? "Choose an additional stop to add after KŌBASHI."
                      : `Choose an option to replace ${sourceStop.title}.`}
                  </p>
                </div>
              </div>
              <div className="option-stack">
                {options.map((option, index) => {
                  const route = getBounceRoute(option, index, sourceStop)
                  return (
                    <Tap
                      label={`Select ${option.title}`}
                      className={`option-pill option-${index} ${
                        selectedOption === index ? "selected" : ""
                      }`}
                      onPress={() => onSelectOption(index)}
                      key={option.title}
                    >
                      <div className="option-top">
                        <span className="option-type">{option.type}</span>
                        <span className="option-number">0{index + 1}</span>
                      </div>
                      <div className="option-title-row">
                        <div>
                          <b>{option.title}</b>
                          <small>{option.meta}</small>
                        </div>
                        <span className="route-mode-icon">
                          <Icon name={route.icon} size={20} />
                        </span>
                      </div>
                      <p>{option.detail}</p>
                      {option.type === "NEARBY ALTERNATIVE" && (
                        <div className="option-saved-note">
                          <b>
                            This is a Saved Place from your{" "}
                            <span style={{ fontStyle: "normal" }}>🤤</span>{" "}
                            <i
                              style={{
                                fontStyle: "italic",
                                marginRight: "3px",
                              }}
                            >
                              Food places to explore
                            </i>{" "}
                            List
                          </b>
                        </div>
                      )}
                      <div className="route-summary">
                        <span className="route-mode-label">{route.label}</span>
                        {route.badge && (
                          <span className={`transit-badge ${route.badgeClass}`}>
                            {route.badge}
                          </span>
                        )}
                        <strong>{route.duration}</strong>
                        <span className="selection-check">
                          <Icon name="check" size={16} />
                        </span>
                      </div>
                    </Tap>
                  )
                })}
              </div>
            </div>
            <div className="bounce-action-bar">
              <Tap
                label={
                  selectedOption === 0
                    ? options[0].action
                    : insertsAfterCurrent
                      ? "Add selected place after KŌBASHI"
                      : "Confirm Bounce"
                }
                className="confirm-bounce"
                onPress={confirmSelection}
              >
                {selectedOption === 0
                  ? options[0].action
                  : insertsAfterCurrent
                    ? "Add after KŌBASHI"
                    : "Confirm Bounce"}
                <Icon
                  name={
                    selectedOption === 0
                      ? "check"
                      : insertsAfterCurrent
                        ? "plus"
                        : "shuffle"
                  }
                  size={19}
                />
              </Tap>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function SearchAlongRouteScreen({
  theme,
  targetStop,
  existingStops = [],
  onBack,
  onSelectPlace,
}: {
  theme: Theme
  targetStop?: TimelineStop | null
  existingStops?: TimelineStop[]
  onBack: () => void
  onSelectPlace: (placeName: string, targetStop?: TimelineStop | null) => void
}) {
  const [query, setQuery] = useState("")
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(true) // Starts open like "Search 1.jpeg"
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus real input when opened
    const timer = setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const categories = [
    { id: "gas", name: "Gas stations", icon: "petrol" as IconName },
    { id: "restaurants", name: "Restaurants", icon: "restaurants" as IconName },
    { id: "coffee", name: "Coffee shops", icon: "coffee" as IconName },
    { id: "grocery", name: "Grocery stores", icon: "grocery" as IconName },
    { id: "reststops", name: "Rest stops", icon: "restroom" as IconName },
    { id: "hotels", name: "Hotels", icon: "hotel" as IconName },
  ]

  const recents = [
    {
      id: "r1",
      title: "239 Alexandra Road",
      meta: "Singapore",
    },
    {
      id: "r2",
      title: "Holiday Inn Singapore Atrium by I...",
      meta: "Outram Road, Singapore",
    },
    {
      id: "r3",
      title: "Singapore Polo Club",
      meta: "Mount Pleasant Road, Singapore",
      status: "Open · Closes 10 pm",
      statusColor: "green",
    },
    {
      id: "r4",
      title: "Social Smoker",
      meta: "Jalan Kuras, Singapore",
      status: "Closed · Opens 4 pm Fri",
      statusColor: "red",
    },
    {
      id: "r5",
      title: "En Ramen",
      meta: "Toh Guan Road, Singapore",
      status: "Closes soon · 7:55 pm · Opens 11:30 a...",
      statusColor: "orange",
    },
    {
      id: "r6",
      title: "Busan Pork Soup - Jurong 505",
      meta: "Jurong West Street 52, #01-35, Singa...",
      status: "Closed · Opens 10:30 am",
      statusColor: "red",
    },
    {
      id: "r7",
      title: "Te Anau Lakeview Holiday Park &...",
      meta: "Manapouri Te Anau Highway, Te Anau,...",
    },
    {
      id: "r8",
      title: "Marina One West Tower",
      meta: "Straits View, Marina One Show Gallery,...",
    },
  ]

  // Dynamic autofill suggestions when text is typed:
  // "Whatever letter is typed, give autofill responses in a list below. I want to have 'Boat Quay' as the first option and another one or two based on the existing locations in the itinerary plan."
  const suggestions = [
    {
      id: "boat-quay",
      title: "Boat Quay",
      meta: "Historic riverfront · Singapore River · 4.5 ★ (1,240)",
      badge: "Along route",
      isPrimary: true,
    },
    {
      id: "kobashi",
      title: "KŌBASHI",
      meta: "Bakery & sourdough · South Bridge Road",
      badge: "On plan",
      isPrimary: false,
    },
    {
      id: "green-oasis",
      title: "Green Oasis · CapitaSpring",
      meta: "Sky botanical garden · 88 Market St",
      badge: "On plan",
      isPrimary: false,
    },
    {
      id: "lau-pa-sat",
      title: "Lau Pa Sat",
      meta: "Historic Victorian hawker market · 18 Raffles Quay",
      badge: "Near route",
      isPrimary: false,
    },
  ]

  const handleKeyPress = (key: string) => {
    if (key === "backspace") {
      setQuery((prev) => prev.slice(0, -1))
    } else if (key === "space") {
      setQuery((prev) => prev + " ")
    } else if (key === "return" || key === "search") {
      setIsKeyboardOpen(false)
    } else {
      setQuery((prev) => prev + key)
    }
  }

  return (
    <div
      className={`screen-page search-along-route-page ${
        theme === "light" ? "theme-light" : "theme-dark"
      }`}
    >
      {/* Top Header / Search Bar */}
      <div className="search-route-header">
        <button
          type="button"
          className="search-route-back-btn"
          onClick={onBack}
          aria-label="Back to saved plan"
        >
          <Icon name="back" size={20} />
        </button>

        <div
          className="search-route-input-bar"
          onClick={() => {
            setIsKeyboardOpen(true)
            inputRef.current?.focus()
          }}
        >
          <input
            ref={inputRef}
            type="text"
            className="search-route-real-input"
            value={query}
            placeholder="Search along route"
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsKeyboardOpen(true)}
            autoComplete="off"
            spellCheck="false"
          />
          {query.length > 0 && (
            <button
              type="button"
              className="search-route-clear-btn"
              onClick={(e) => {
                e.stopPropagation()
                setQuery("")
                inputRef.current?.focus()
              }}
              aria-label="Clear search text"
            >
              <Icon name="close" size={16} />
            </button>
          )}
          <div className="search-route-mic-btn">
            <Icon name="mic" size={19} />
          </div>
        </div>
      </div>

      {/* Main Content Scroll Area */}
      <div
        className="search-route-scroll"
        onClick={() => {
          // If tapping in scroll content while keyboard is open, dismiss keyboard (Search 2.jpeg)
          if (isKeyboardOpen) setIsKeyboardOpen(false)
        }}
      >
        {query.trim().length === 0 ? (
          /* Empty query: Category Grid + Choose on Map + Quick Places + Recents */
          <>
            <div className="search-categories-grid">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="search-category-card"
                  onClick={(e) => {
                    e.stopPropagation()
                    setQuery(cat.name)
                  }}
                >
                  <div className="search-category-icon">
                    <Icon name={cat.icon} size={22} />
                  </div>
                  <span className="search-category-name">{cat.name}</span>
                </div>
              ))}
            </div>

            <div
              className="search-choose-map-row"
              onClick={(e) => {
                e.stopPropagation()
                onBack()
              }}
            >
              <div className="search-choose-map-icon">
                <Icon name="pin" size={20} />
              </div>
              <span>Choose on map</span>
            </div>

            <div className="search-quick-places-row">
              <div
                className="search-quick-place-item"
                onClick={(e) => {
                  e.stopPropagation()
                  setQuery("Home")
                }}
              >
                <div className="search-quick-place-icon">
                  <Icon name="home" size={18} />
                </div>
                <div className="search-quick-place-info">
                  <b>Home</b>
                  <small>600317</small>
                </div>
              </div>
              <div
                className="search-quick-place-item"
                onClick={(e) => {
                  e.stopPropagation()
                  setQuery("Work")
                }}
              >
                <div className="search-quick-place-icon">
                  <Icon name="work" size={18} />
                </div>
                <div className="search-quick-place-info">
                  <b>Work</b>
                  <small>Set location</small>
                </div>
              </div>
              <div
                className="search-quick-place-item"
                onClick={(e) => {
                  e.stopPropagation()
                  setQuery("Saved places")
                }}
              >
                <div className="search-quick-place-icon">
                  <Icon name="places" size={18} />
                </div>
                <div className="search-quick-place-info">
                  <b>Places</b>
                  <small>282 places</small>
                </div>
              </div>
            </div>

            <div className="search-recents-section">
              <div className="search-recents-header">
                <span>Recent</span>
                <Icon name="info" size={16} />
              </div>
              <div className="search-recents-list">
                {recents.map((item) => (
                  <div
                    key={item.id}
                    className="search-recent-item"
                    onClick={(e) => {
                      e.stopPropagation()
                      setQuery(item.title)
                    }}
                  >
                    <div className="search-recent-clock">
                      <Icon name="clock" size={16} />
                    </div>
                    <div className="search-recent-info">
                      <div className="search-recent-title">{item.title}</div>
                      <div className="search-recent-meta">{item.meta}</div>
                      {item.status && (
                        <div
                          className={`search-recent-status ${item.statusColor}`}
                        >
                          {item.status}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Text is typed: Autofill responses */
          <div className="search-autofill-container">
            <div className="search-autofill-heading">Suggestions along route</div>
            <div className="search-autofill-list">
              {suggestions.map((item) => (
                <div
                  key={item.id}
                  className={`search-autofill-item ${
                    item.isPrimary ? "primary" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectPlace(item.title, targetStop)
                  }}
                >
                  <div className="search-autofill-pin">
                    <Icon name="pin" size={19} />
                  </div>
                  <div className="search-autofill-info">
                    <div className="search-autofill-title">{item.title}</div>
                    <div className="search-autofill-meta">{item.meta}</div>
                  </div>
                  {item.badge && (
                    <span className="search-autofill-badge">{item.badge}</span>
                  )}
                  <div className="search-autofill-add">
                    <Icon name="plus" size={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* iOS Keyboard Drawer (Search 1.jpeg vs Search 2.jpeg) */}
      <div
        className={`ios-keyboard-drawer ${
          isKeyboardOpen ? "drawer-open" : "drawer-closed"
        }`}
      >
        <div
          className="keyboard-drag-handle"
          onClick={() => setIsKeyboardOpen(!isKeyboardOpen)}
          title={
            isKeyboardOpen
              ? "Tap or swipe down to hide keyboard"
              : "Tap to show keyboard"
          }
        >
          <span />
        </div>
        <div className="ios-keyboard-keys">
          {/* Row 1: q w e r t y u i o p */}
          <div className="keyboard-row">
            {["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"].map((k) => (
              <button
                key={k}
                type="button"
                className="key-btn"
                onClick={() => handleKeyPress(k)}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Row 2: a s d f g h j k l */}
          <div className="keyboard-row indent-row">
            {["a", "s", "d", "f", "g", "h", "j", "k", "l"].map((k) => (
              <button
                key={k}
                type="button"
                className="key-btn"
                onClick={() => handleKeyPress(k)}
              >
                {k}
              </button>
            ))}
          </div>

          {/* Row 3: Shift, z x c v b n m, Backspace */}
          <div className="keyboard-row">
            <button
              type="button"
              className="key-btn key-special key-shift"
              aria-label="Shift"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4 4 14h5v6h6v-6h5z" />
              </svg>
            </button>
            {["z", "x", "c", "v", "b", "n", "m"].map((k) => (
              <button
                key={k}
                type="button"
                className="key-btn"
                onClick={() => handleKeyPress(k)}
              >
                {k}
              </button>
            ))}
            <button
              type="button"
              className="key-btn key-special key-backspace"
              onClick={() => handleKeyPress("backspace")}
              aria-label="Backspace"
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 9-6 6M12 9l6 6M21 4H8l-6 8 6 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
              </svg>
            </button>
          </div>

          {/* Row 4: 123, emoji, spacebar, Search / Return */}
          <div className="keyboard-row bottom-row">
            <button type="button" className="key-btn key-special key-num">
              123
            </button>
            <button
              type="button"
              className="key-btn key-special key-emoji"
              aria-label="Emoji"
            >
              😊
            </button>
            <button
              type="button"
              className="key-btn key-space"
              onClick={() => handleKeyPress("space")}
              aria-label="Space"
            >
              <span className="space-lang">EN</span>
            </button>
            <button
              type="button"
              className="key-btn key-return"
              onClick={() => handleKeyPress("return")}
              aria-label="Search or hide keyboard"
            >
              <Icon name="search" size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

type DeviceMode = "local" | "figma"

const isRunningInIframe = (() => {
  if (typeof window === "undefined") return false
  try {
    return window.self !== window.top
  } catch {
    return true
  }
})()

function getInitialDeviceMode(): DeviceMode {
  if (typeof window === "undefined") return "local"

  // 1. Explicit query parameter override
  const searchParams = new URLSearchParams(window.location.search)
  if (
    searchParams.get("mode") === "figma" ||
    searchParams.get("figma") === "1" ||
    searchParams.get("figma") === "true" ||
    searchParams.get("frame") === "0" ||
    searchParams.get("island") === "0"
  ) {
    return "figma"
  }
  if (
    searchParams.get("mode") === "local" ||
    searchParams.get("local") === "1" ||
    searchParams.get("local") === "true" ||
    searchParams.get("frame") === "1" ||
    searchParams.get("island") === "1"
  ) {
    return "local"
  }

  // 2. User manual toggle stored in sessionStorage
  try {
    const saved = window.sessionStorage?.getItem("bounce_device_mode")
    if (saved === "figma" || saved === "local") {
      return saved
    }
  } catch {
    // ignore
  }

  // 3. Figma Make environment detection:
  // In Figma Make, preview is inside an iframe, or hosted on figma domain, or FIGMA_DEV_SERVER_HOST / FIGMA_PUBLIC_URL is active
  const inIframe = (() => {
    try {
      return window.self !== window.top
    } catch {
      return true
    }
  })()

  const isFigmaHost =
    window.location.hostname.includes("figma") ||
    (typeof document !== "undefined" && document.referrer.includes("figma"))

  const isFigmaBuild =
    typeof __IS_FIGMA_ENV__ !== "undefined" && Boolean(__IS_FIGMA_ENV__)

  if (inIframe || isFigmaHost || isFigmaBuild) {
    return "figma"
  }

  return "local"
}

function App() {
  const requestedScreen = new URLSearchParams(window.location.search).get(
    "screen",
  )
  const initialScreen: Screen = [
    "map",
    "ask",
    "history",
    "chat",
    "saved",
    "you",
    "plan",
    "place",
    "bounce",
    "updated",
    "search-along-route",
  ].includes(requestedScreen ?? "")
    ? (requestedScreen as Screen)
    : "map"
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams()
  const prototypeParam =
    searchParams.get("prototype") || searchParams.get("default")
  const themeParam = searchParams.get("theme")
  const savedPrototype =
    typeof window !== "undefined"
      ? window.sessionStorage?.getItem("bounce_prototype_theme")
      : null

  const initialPrototype: "light" | "dark" =
    prototypeParam === "light" || themeParam === "light"
      ? "light"
      : prototypeParam === "dark" || themeParam === "dark"
        ? "dark"
        : savedPrototype === "light"
          ? "light"
          : "dark"

  const [prototypeMode, setPrototypeMode] = useState<"light" | "dark">(
    initialPrototype,
  )
  const [theme, setTheme] = useState<Theme>(initialPrototype)
  const initialMapTheme = useRef<Theme>(initialPrototype).current
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const [routeSearchTargetStop, setRouteSearchTargetStop] = useState<TimelineStop | null>(null)
  const [planStops, setPlanStops] = useState<TimelineStop[]>(() => {
    const isMaxwellPreset =
      new URLSearchParams(window.location.search).get("preset") === "maxwell" ||
      new URLSearchParams(window.location.search).get("demo") === "1" ||
      new URLSearchParams(window.location.search).get("multi") === "2"
    if (isMaxwellPreset) {
      const stops = [...initialStops]
      const idx = stops.findIndex((s) => s.id === "kobashi")
      if (idx >= 0) {
        stops.splice(
          idx + 1,
          0,
          {
            id: "bounce-maxwell",
            time: "1:45 pm",
            title: "Maxwell Food Centre",
            meta: "Bounce addition · Nearby now",
            changed: true,
            bounceSource: "kobashi",
          },
          {
            id: "place-boat-quay",
            time: "2:35 pm",
            title: "Boat Quay",
            meta: "Historic riverfront · Singapore River",
            changed: true,
            bounceSource: "kobashi",
          },
        )
        return recalculateStopTimes(stops)
      }
    }

    const isMulti =
      new URLSearchParams(window.location.search).get("multi") === "1"
    const isReplaceParam =
      new URLSearchParams(window.location.search).get("replace") === "1" ||
      new URLSearchParams(window.location.search).get("swap") === "1"
    if (isMulti || requestedScreen === "updated") {
      const stops = [...initialStops]
      if (isReplaceParam) {
        const greenIdx = stops.findIndex((s) => s.id === "green-oasis")
        if (greenIdx >= 0) {
          const orig = stops[greenIdx]
          stops[greenIdx] = {
            id: "revisit-kahve-replaced",
            time: "2:00 pm",
            title: "Kahve",
            meta: `Coffee · Replaced ${orig.title}`,
            changed: true,
            isReplacement: true,
            bounceSource: "kobashi",
            originalTitle: orig.title,
            originalMeta: orig.meta,
            history: [
              {
                id: orig.id,
                title: orig.title,
                meta: orig.meta,
                past: orig.past,
                current: orig.current,
                changed: false,
              },
            ],
          }
        }
        return recalculateStopTimes(stops)
      }
      const idx = stops.findIndex((s) => s.id === "kobashi")
      if (idx >= 0) {
        if (isMulti) {
          stops.splice(
            idx + 1,
            0,
            {
              id: "revisit-suntec",
              time: "1:45 pm",
              title: "Suntec City views",
              meta: "Walk · Added back",
              changed: true,
              bounceSource: "kobashi",
            },
            {
              id: "revisit-kahve",
              time: "2:30 pm",
              title: "Kahve",
              meta: "Coffee · Added back",
              changed: true,
              bounceSource: "kobashi",
            },
            {
              id: "bounce-loulouca",
              time: "3:15 pm",
              title: "Loulouca",
              meta: "Bounce addition · Nearby now",
              changed: true,
              bounceSource: "kobashi",
            },
          )
          return recalculateStopTimes(stops)
        }

        const bounceParam =
          new URLSearchParams(window.location.search)
            .get("bounce")
            ?.toLowerCase() || ""
        const isLoulouca = bounceParam.includes("loulouca")
        stops.splice(idx + 1, 0, {
          id: isLoulouca ? "bounce-loulouca" : "bounce-maxwell",
          time: "2:00 pm",
          title: isLoulouca ? "Loulouca" : "Maxwell Food Centre",
          meta: "Bounce addition · Nearby now",
          changed: true,
          bounceSource: "kobashi",
        })
        return recalculateStopTimes(stops)
      }
      return stops
    }
    return initialStops
  })
  const [updateMessage, setUpdateMessage] = useState(() => {
    const isMulti =
      new URLSearchParams(window.location.search).get("multi") === "1"
    const isReplaceParam =
      new URLSearchParams(window.location.search).get("replace") === "1" ||
      new URLSearchParams(window.location.search).get("swap") === "1"
    if (isReplaceParam) {
      return "Kahve replaced Green Oasis · CapitaSpring to fit your schedule."
    }
    if (isMulti) {
      return "3 places added after KŌBASHI."
    }
    if (requestedScreen === "updated") {
      const bounceParam =
        new URLSearchParams(window.location.search)
          .get("bounce")
          ?.toLowerCase() || ""
      return bounceParam.includes("loulouca")
        ? "Loulouca was added after KŌBASHI."
        : "Maxwell Food Centre was added after KŌBASHI."
    }
    return ""
  })
  const requestedStop = new URLSearchParams(window.location.search).get("stop")
  const [selectedStop, setSelectedStop] = useState<TimelineStop>(
    requestedStop
      ? (initialStops.find((stop) =>
          stop.title.toLowerCase().includes(requestedStop.toLowerCase()),
        ) ?? initialStops[2])
      : initialStops[2],
  )
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [selectedLegIndex, setSelectedLegIndex] = useState<number | null>(null)
  const [bounceOptionIndex, setBounceOptionIndex] = useState(1)
  const [deviceMode, setDeviceMode] = useState<DeviceMode>(getInitialDeviceMode)

  useEffect(() => {
    if (deviceMode === "figma") {
      document.documentElement.classList.add("figma-device-mode")
      document.body.classList.add("figma-device-mode")
    } else {
      document.documentElement.classList.remove("figma-device-mode")
      document.body.classList.remove("figma-device-mode")
    }
  }, [deviceMode])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: "WINDOW_RESIZE" },
          "*",
        )
      }
    }, 120)
    return () => clearTimeout(timer)
  }, [deviceMode])

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: "WINDOW_RESIZE" },
          "*",
        )
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSelectPrototype = (mode: "light" | "dark") => {
    setPrototypeMode(mode)
    setTheme(mode)
    try {
      window.sessionStorage?.setItem("bounce_prototype_theme", mode)
      const url = new URL(window.location.href)
      url.searchParams.set("prototype", mode)
      url.searchParams.set("theme", mode)
      window.history.replaceState({}, "", url.toString())
    } catch {}
  }

  const highlightRouteLeg = (index: number) => {
    setSelectedLegIndex(index)
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "HIGHLIGHT_LEG", index },
        "*",
      )
    }
  }

  const resetRouteHighlight = () => {
    setSelectedLegIndex(null)
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "RESET_HIGHLIGHT" },
        "*",
      )
    }
  }

  const handleSelectBounceOption = (index: number) => {
    setBounceOptionIndex(index)
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "SET_BOUNCE_SELECTED",
          index,
        },
        "*",
      )
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "THEME_TOGGLE", isDark: theme === "dark" },
        "*",
      )
    }
  }, [theme])

  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      if (screen === "bounce") {
        iframeRef.current.contentWindow.postMessage(
          {
            type: "SET_MODE",
            mode: "bounce",
            selectedIndex: bounceOptionIndex,
          },
          "*",
        )
      } else {
        const isItinerary = screen === "plan" || screen === "updated"
        const isExpanded =
          new URLSearchParams(window.location.search).get("expanded") === "1"
        iframeRef.current.contentWindow.postMessage(
          {
            type: "SET_MODE",
            mode: isItinerary ? "itinerary" : "explore",
            stops: planStops,
            drawerDown: isExpanded,
          },
          "*",
        )
      }
    }
  }, [screen, planStops, bounceOptionIndex])

  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "ROUTE_CLICKED") {
        setSelectedLegIndex(event.data.index)
      }
      if (event.data && event.data.type === "BOUNCE_ROUTE_CLICKED") {
        setBounceOptionIndex(event.data.index)
      }
    }
    window.addEventListener("message", handleIframeMessage)
    return () => window.removeEventListener("message", handleIframeMessage)
  }, [])
  const handleDeleteStop = (stopId: string) => {
    const stopToDelete = planStops.find((s) => s.id === stopId)
    const nextStops = planStops.filter((s) => s.id !== stopId)
    const recalculated = recalculateStopTimes(nextStops)
    setPlanStops(recalculated)
    setSelectedLegIndex(null)
    if (stopToDelete) {
      setUpdateMessage(`${stopToDelete.title} was removed from the plan.`)
    }
  }

  const applyBounce = (place: string) => {
    let sourceIndex = planStops.findIndex((stop) => stop.id === selectedStop.id)
    if (sourceIndex < 0) return
    let next = [...planStops]
    if (selectedStop.id === "kobashi") {
      const lower = place.toLowerCase()
      const slug = lower.includes("maxwell")
        ? "maxwell"
        : lower.includes("loulouca")
          ? "loulouca"
          : lower.includes("green") || lower.includes("capitaspring")
            ? "green-oasis"
            : lower.replace(/[^a-z0-9]+/g, "-")

      let insertIndex = sourceIndex
      while (
        insertIndex + 1 < next.length &&
        (next[insertIndex + 1].bounceSource === "kobashi" ||
          next[insertIndex + 1].changed)
      ) {
        insertIndex++
      }

      next.splice(insertIndex + 1, 0, {
        id: `bounce-${slug}-${Date.now()}`,
        time: "2:00 pm",
        title: place,
        meta: "Bounce addition · Nearby now",
        changed: true,
        bounceSource: "kobashi",
      })
      next = recalculateStopTimes(next)
      setUpdateMessage(`${place} was added after ${next[insertIndex].title}.`)
    } else {
      const prevHistory: StopHistoryItem[] = selectedStop.history
        ? [...selectedStop.history]
        : []
      prevHistory.push({
        id: selectedStop.id,
        title: selectedStop.title,
        meta: selectedStop.meta,
        past: selectedStop.past,
        current: selectedStop.current,
        changed: selectedStop.changed,
        bounceSource: selectedStop.bounceSource,
        originalTitle: selectedStop.originalTitle,
        originalMeta: selectedStop.originalMeta,
      })
      next[sourceIndex] = {
        ...selectedStop,
        id: `bounce-${place.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
        title: place,
        meta: `Bounce replacement · Replaced ${selectedStop.title}`,
        changed: true,
        isReplacement: true,
        originalTitle: selectedStop.originalTitle ?? selectedStop.title,
        originalMeta: selectedStop.originalMeta ?? selectedStop.meta,
        history: prevHistory,
      }
      setUpdateMessage(`${place} replaced ${selectedStop.title}.`)
    }
    setPlanStops(next)
    setScreen("updated")
  }
  const applyRevisit = (afterId: string, customStop?: TimelineStop) => {
    const stopToUse = customStop || selectedStop
    const targetIndex = planStops.findIndex((stop) => stop.id === afterId)
    if (targetIndex < 0) return
    const kobashiIdx = planStops.findIndex((s) => s.id === "kobashi")
    const isAfterKobashi =
      afterId === "kobashi" || (kobashiIdx >= 0 && targetIndex >= kobashiIdx)
    const revisitedStop: TimelineStop = {
      ...stopToUse,
      id: `revisit-${stopToUse.id}-${Date.now()}`,
      time: isAfterKobashi ? "2:00 pm" : "Revisit",
      past: false,
      current: false,
      changed: true,
      meta: `${stopToUse.meta.split(" · ")[0]} · Added back`,
      bounceSource: isAfterKobashi ? "kobashi" : undefined,
    }
    let next = [...planStops]
    next.splice(targetIndex + 1, 0, revisitedStop)
    next = recalculateStopTimes(next)
    setPlanStops(next)
    setUpdateMessage(
      `${stopToUse.title} was added after ${planStops[targetIndex].title}.`,
    )
    setScreen("updated")
  }
  const applyRevisitReplace = (
    replaceId: string,
    customStop?: TimelineStop,
  ) => {
    const stopToUse = customStop || selectedStop
    const targetIndex = planStops.findIndex((stop) => stop.id === replaceId)
    if (targetIndex < 0) return
    const replacedStop = planStops[targetIndex]
    const prevHistory: StopHistoryItem[] = replacedStop.history
      ? [...replacedStop.history]
      : []
    prevHistory.push({
      id: replacedStop.id,
      title: replacedStop.title,
      meta: replacedStop.meta,
      past: replacedStop.past,
      current: replacedStop.current,
      changed: replacedStop.changed,
      bounceSource: replacedStop.bounceSource,
      originalTitle: replacedStop.originalTitle,
      originalMeta: replacedStop.originalMeta,
    })

    const revisitedStop: TimelineStop = {
      ...stopToUse,
      id: `revisit-${stopToUse.id}-${Date.now()}`,
      time: replacedStop.time,
      past: false,
      current: false,
      changed: true,
      isReplacement: true,
      meta: `${stopToUse.meta.split(" · ")[0]} · Replaced ${replacedStop.title}`,
      bounceSource: "kobashi",
      originalTitle: replacedStop.originalTitle ?? replacedStop.title,
      originalMeta: replacedStop.originalMeta ?? replacedStop.meta,
      history: prevHistory,
    }
    let next = [...planStops]
    next[targetIndex] = revisitedStop
    next = recalculateStopTimes(next)
    setPlanStops(next)
    setUpdateMessage(
      `${stopToUse.title} replaced ${replacedStop.title} to fit your schedule.`,
    )
    setScreen("updated")
  }
  const handleUndoStop = (stopId: string) => {
    const targetIndex = planStops.findIndex((s) => s.id === stopId)
    if (targetIndex < 0) return
    const current = planStops[targetIndex]

    if (!current.history || current.history.length === 0) {
      if (current.originalTitle) {
        let next = [...planStops]
        next[targetIndex] = {
          ...current,
          title: current.originalTitle,
          meta: current.originalMeta || "",
          changed: false,
          isReplacement: false,
          originalTitle: undefined,
          originalMeta: undefined,
          history: [],
        }
        next = recalculateStopTimes(next)
        setPlanStops(next)
        setUpdateMessage(`${current.originalTitle} was restored to the plan.`)
        if (selectedStop.id === stopId) {
          setSelectedStop(next[targetIndex])
        }
      }
      return
    }

    const newHistory = [...current.history]
    const lastState = newHistory.pop()!
    const isBackToOriginal = newHistory.length === 0

    let next = [...planStops]
    next[targetIndex] = {
      ...current,
      id: lastState.id || current.id,
      title: lastState.title,
      meta: lastState.meta,
      past: lastState.past,
      current: lastState.current,
      changed: !isBackToOriginal,
      isReplacement: !isBackToOriginal,
      bounceSource: lastState.bounceSource,
      originalTitle: isBackToOriginal
        ? undefined
        : (current.originalTitle ?? lastState.originalTitle),
      originalMeta: isBackToOriginal
        ? undefined
        : (current.originalMeta ?? lastState.originalMeta),
      history: isBackToOriginal ? [] : newHistory,
    }
    next = recalculateStopTimes(next)
    setPlanStops(next)
    setUpdateMessage(`${lastState.title} was restored to the plan.`)
    if (selectedStop.id === stopId) {
      setSelectedStop(next[targetIndex])
    }
  }

  const handleUpdateStopTime = (stopId: string, newTime: string) => {
    setPlanStops((prev) =>
      prev.map((s) => (s.id === stopId ? { ...s, time: newTime } : s)),
    )
  }

  const handleReorderStops = (nextStops: TimelineStop[]) => {
    setPlanStops(nextStops)
  }
  const revertSelectedStop = () => {
    if (!selectedStop.originalTitle || !selectedStop.originalMeta) return
    const next = planStops.map((stop) =>
      stop.id === selectedStop.id
        ? {
            ...stop,
            title: selectedStop.originalTitle!,
            meta: selectedStop.originalMeta!,
            changed: false,
            originalTitle: undefined,
            originalMeta: undefined,
          }
        : stop,
    )
    setPlanStops(next)
    setUpdateMessage(
      `${selectedStop.originalTitle} was restored to the original plan.`,
    )
    setSelectedStop(
      next.find((stop) => stop.id === selectedStop.id) ?? selectedStop,
    )
    setScreen("updated")
  }
  const handleSelectSearchPlace = (
    placeName: string,
    targetStop?: TimelineStop | null,
  ) => {
    const afterStop = targetStop || selectedStop || planStops[0]
    const targetIndex = planStops.findIndex((s) => s.id === afterStop.id)
    const insertIdx = targetIndex >= 0 ? targetIndex + 1 : 1

    const prevStop = planStops[targetIndex >= 0 ? targetIndex : 0]

    let timeStr = "10:15 am"
    if (prevStop) {
      if (prevStop.id === "kahve" || prevStop.title.includes("Kahve")) {
        timeStr = "10:15 am"
      } else if (prevStop.id === "suntec" || prevStop.title.includes("Suntec")) {
        timeStr = "12:15 pm"
      } else if (prevStop.id === "kobashi" || prevStop.title.includes("KŌBASHI")) {
        timeStr = "1:45 pm"
      } else if (prevStop.id === "green-oasis" || prevStop.title.includes("Green Oasis")) {
        timeStr = "4:30 pm"
      } else if (prevStop.id === "loulouca" || prevStop.title.includes("Loulouca")) {
        timeStr = "8:30 pm"
      } else {
        timeStr = "Along route"
      }
    }

    const newStop: TimelineStop = {
      id: `place-${placeName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      time: timeStr,
      title: placeName,
      meta:
        placeName === "Boat Quay"
          ? "Historic riverfront · Singapore River"
          : "Added to route",
      past: false,
      current: false,
      changed: true,
      isNew: true,
      bounceSource: "search",
    }

    let next = [...planStops]
    next.splice(insertIdx, 0, newStop)
    next = recalculateStopTimes(next)
    setPlanStops(next)
    setUpdateMessage(`${placeName} was added after ${prevStop ? prevStop.title : "stop"}.`)
    setScreen("plan")
  }
  const selectedIndex = planStops.findIndex(
    (stop) => stop.id === selectedStop.id,
  )
  const nextSelectedStop =
    selectedIndex >= 0 ? planStops[selectedIndex + 1] : undefined

  return (
    <main
      className={`app-shell ${
        theme === "light" ? "light-shell" : "dark-shell"
      } ${deviceMode === "figma" ? "figma-device-mode" : ""}`}
    >
      {/* iPhone 18 Pro Black Chassis (flattened / full-bleed in Figma Make mode) */}
      <div className="iphone-pro-chassis">
        {/* Hardware buttons on chassis - hidden in Figma Make mode */}
        {deviceMode !== "figma" && (
          <>
            <div className="hardware-btn action-btn" title="Action Button" />
            <div className="hardware-btn vol-up-btn" title="Volume Up" />
            <div className="hardware-btn vol-down-btn" title="Volume Down" />
            <div className="hardware-btn power-btn" title="Side Button" />
            <div className="antenna-notch top-left" />
            <div className="antenna-notch top-right" />
            <div className="antenna-notch bot-left" />
            <div className="antenna-notch bot-right" />
          </>
        )}

        <div className="iphone-pro-inner-bezel">
          {/* Dynamic Island: shown ONLY in local preview, hidden in Figma Make mode */}
          {deviceMode !== "figma" && (
            <div className="dynamic-island-cutout">
              <div className="island-lens-element" />
            </div>
          )}

          {/* 1. Phone Container (Wraps the Map to strictly bound it to the iPhone edges) */}
          <div
            className={`phone theme-${theme}`}
            aria-live="polite"
            style={{
              position: "relative",
              overflow: "hidden",
              background: "transparent",
            }}
          >
            {/* Failsafe: Forces the native status bar and phone gradients to remain completely transparent */}
            <style>{`
          .status-bar, .phone::before { background: transparent !important; box-shadow: none !important; }
        `}</style>

            {/* 2. Global Background Map (Now strictly contained within the phone) */}
            <iframe
              ref={iframeRef}
              src={`/map-prototype.html?theme=${initialMapTheme}`}
              onLoad={() => {
                if (iframeRef.current && iframeRef.current.contentWindow) {
                  iframeRef.current.contentWindow.postMessage(
                    { type: "THEME_TOGGLE", isDark: theme === "dark" },
                    "*",
                  )
                  iframeRef.current.contentWindow.postMessage(
                    {
                      type: "SET_MODE",
                      mode:
                        screen === "plan" || screen === "updated"
                          ? "itinerary"
                          : screen === "bounce"
                            ? "bounce"
                            : "explore",
                      stops: planStops,
                    },
                    "*",
                  )
                }
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                border: "none",
                width: "100%",
                height: "100%",
                zIndex: 0,
              }}
              title="Live Routing Map"
            />

            {/* 3. React Screen Overlays (pointerEvents: 'none' ensures the background map is fully interactive) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              <StatusBar />

              {screen === "map" && (
                <MapScreen
                  saved={false}
                  theme={theme}
                  onToggleTheme={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  onAsk={() => setScreen("ask")}
                  onYou={() => setScreen("you")}
                  onDirections={() => setScreen("plan")}
                  onRecenter={() => {
                    if (iframeRef.current && iframeRef.current.contentWindow) {
                      iframeRef.current.contentWindow.postMessage(
                        { type: "RECENTER" },
                        "*",
                      )
                    }
                  }}
                />
              )}

              {/* The rest of the screens are wrapped in pointerEvents: 'auto' so they behave like solid pages when active */}
              {screen === "ask" && (
                <div
                  style={{
                    pointerEvents: "auto",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <AskStart
                    theme={theme}
                    onHistory={() => setScreen("history")}
                    onSend={() => setScreen("chat")}
                    onClose={() => setScreen("map")}
                  />
                </div>
              )}
              {screen === "history" && (
                <div
                  style={{
                    pointerEvents: "auto",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <HistoryScreen
                    theme={theme}
                    onOpen={() => setScreen("chat")}
                    onClose={() => setScreen("ask")}
                  />
                </div>
              )}
              {screen === "chat" && (
                <div
                  style={{
                    pointerEvents: "auto",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <ChatScreen
                    theme={theme}
                    onHistory={() => setScreen("history")}
                    onBack={() => setScreen("ask")}
                    onClose={() => setScreen("map")}
                    onSave={() => setScreen("saved")}
                  />
                </div>
              )}
              {screen === "saved" && (
                <MapScreen
                  saved
                  theme={theme}
                  onToggleTheme={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  onAsk={() => setScreen("ask")}
                  onYou={() => setScreen("you")}
                  onDirections={() => setScreen("plan")}
                  onRecenter={() => {
                    if (iframeRef.current && iframeRef.current.contentWindow) {
                      iframeRef.current.contentWindow.postMessage(
                        { type: "RECENTER" },
                        "*",
                      )
                    }
                  }}
                />
              )}
              {screen === "you" && (
                <div
                  style={{
                    pointerEvents: "auto",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <YouScreen
                    onPlan={() => setScreen("plan")}
                    onExplore={() => setScreen("map")}
                  />
                </div>
              )}
              {screen === "plan" && (
                <div
                  style={{
                    pointerEvents: "none",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <PlanScreen
                    stops={planStops}
                    theme={theme}
                    onToggleTheme={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    onCurrent={() => {
                      if (
                        iframeRef.current &&
                        iframeRef.current.contentWindow
                      ) {
                        iframeRef.current.contentWindow.postMessage(
                          { type: "RECENTER" },
                          "*",
                        )
                      }
                    }}
                    onBack={() => setScreen("you")}
                    onPlace={(stop) => {
                      setSelectedStop(stop)
                      setScreen("place")
                    }}
                    selectedLegIndex={selectedLegIndex}
                    onHighlightLeg={highlightRouteLeg}
                    onResetHighlight={resetRouteHighlight}
                    onToggleDrawer={(down) => {
                      if (
                        iframeRef.current &&
                        iframeRef.current.contentWindow
                      ) {
                        iframeRef.current.contentWindow.postMessage(
                          { type: "ITINERARY_DRAWER_TOGGLE", drawerDown: down },
                          "*",
                        )
                      }
                    }}
                    onDeleteStop={handleDeleteStop}
                    onUndoStop={handleUndoStop}
                    onRevisit={applyRevisit}
                    onReplaceStop={applyRevisitReplace}
                    onBounce={(stop) => {
                      setSelectedStop(stop)
                      setScreen("bounce")
                    }}
                    onSearch={(stop) => {
                      setRouteSearchTargetStop(stop)
                      setScreen("search-along-route")
                    }}
                    onUpdateTime={handleUpdateStopTime}
                    onReorderStops={handleReorderStops}
                  />
                </div>
              )}
              {screen === "place" && (
                <div
                  style={{
                    pointerEvents: "auto",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <PlaceScreen
                    stop={selectedStop}
                    nextStop={nextSelectedStop}
                    placementOptions={planStops.filter((stop) => !stop.past)}
                    fullItinerary={planStops}
                    onBounce={() => setScreen("bounce")}
                    onRevisit={applyRevisit}
                    onReplaceStop={applyRevisitReplace}
                    onRevert={revertSelectedStop}
                    onBack={() => setScreen("plan")}
                  />
                </div>
              )}
              {screen === "bounce" && (
                <div
                  style={{
                    pointerEvents: "none",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <BounceScreen
                    sourceStop={selectedStop}
                    theme={theme}
                    onToggleTheme={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    onRecenter={() => {
                      if (
                        iframeRef.current &&
                        iframeRef.current.contentWindow
                      ) {
                        iframeRef.current.contentWindow.postMessage(
                          { type: "RECENTER_BOUNCE" },
                          "*",
                        )
                      }
                    }}
                    onClose={() => setScreen("place")}
                    onSelect={(place) => {
                      applyBounce(place)
                      setScreen("updated")
                    }}
                    selectedOption={bounceOptionIndex}
                    onSelectOption={handleSelectBounceOption}
                    onToggleDrawer={(down) => {
                      if (
                        iframeRef.current &&
                        iframeRef.current.contentWindow
                      ) {
                        iframeRef.current.contentWindow.postMessage(
                          { type: "BOUNCE_DRAWER_TOGGLE", drawerDown: down },
                          "*",
                        )
                      }
                    }}
                  />
                </div>
              )}
              {screen === "updated" && (
                <div
                  style={{
                    pointerEvents: "none",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <PlanScreen
                    stops={planStops}
                    theme={theme}
                    onToggleTheme={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    onCurrent={() => {
                      if (
                        iframeRef.current &&
                        iframeRef.current.contentWindow
                      ) {
                        iframeRef.current.contentWindow.postMessage(
                          { type: "RECENTER" },
                          "*",
                        )
                      }
                    }}
                    updateMessage={updateMessage}
                    onBack={() => setScreen("you")}
                    onPlace={(stop) => {
                      setSelectedStop(stop)
                      setScreen("place")
                    }}
                    selectedLegIndex={selectedLegIndex}
                    onHighlightLeg={highlightRouteLeg}
                    onResetHighlight={resetRouteHighlight}
                    onToggleDrawer={(down) => {
                      if (
                        iframeRef.current &&
                        iframeRef.current.contentWindow
                      ) {
                        iframeRef.current.contentWindow.postMessage(
                          { type: "ITINERARY_DRAWER_TOGGLE", drawerDown: down },
                          "*",
                        )
                      }
                    }}
                    onDeleteStop={handleDeleteStop}
                    onUndoStop={handleUndoStop}
                    onRevisit={applyRevisit}
                    onReplaceStop={applyRevisitReplace}
                    onBounce={(stop) => {
                      setSelectedStop(stop)
                      setScreen("bounce")
                    }}
                    onSearch={(stop) => {
                      setRouteSearchTargetStop(stop)
                      setScreen("search-along-route")
                    }}
                    onUpdateTime={handleUpdateStopTime}
                    onReorderStops={handleReorderStops}
                  />
                </div>
              )}
              {screen === "search-along-route" && (
                <div
                  style={{
                    pointerEvents: "auto",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <SearchAlongRouteScreen
                    theme={theme}
                    targetStop={routeSearchTargetStop}
                    existingStops={planStops}
                    onBack={() => setScreen("plan")}
                    onSelectPlace={(placeName, target) => {
                      handleSelectSearchPlace(placeName, target)
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Localhost Preview Mode & Prototype Switcher */}
      {!isRunningInIframe && (
        <div
          style={{
            position: "fixed",
            bottom: 14,
            right: 14,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(18, 22, 26, 0.94)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(255, 255, 255, 0.16)",
            borderRadius: 999,
            padding: "5px 6px 5px 12px",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.45)",
            color: "#e8eaed",
            fontSize: 12,
            fontFamily: "var(--font)",
            userSelect: "none",
          }}
        >
          {/* Prototype Selector */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ opacity: 0.75, fontWeight: 500, fontSize: 11 }}>
              Prototype:
            </span>
            <div
              style={{
                display: "inline-flex",
                background: "rgba(0, 0, 0, 0.35)",
                borderRadius: 999,
                padding: 2,
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <button
                type="button"
                onClick={() => handleSelectPrototype("light")}
                style={{
                  background:
                    prototypeMode === "light" ? "#ffffff" : "transparent",
                  color: prototypeMode === "light" ? "#1a202c" : "#9aa0a6",
                  border: "none",
                  borderRadius: 999,
                  padding: "3px 8px",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  transition: "all 0.15s ease",
                }}
                title="Prototype 1: Default Light Mode (Dark mode optional)"
              >
                <span>☀️</span> Light
              </button>
              <button
                type="button"
                onClick={() => handleSelectPrototype("dark")}
                style={{
                  background:
                    prototypeMode === "dark" ? "#3c4043" : "transparent",
                  color: prototypeMode === "dark" ? "#ffffff" : "#9aa0a6",
                  border: "none",
                  borderRadius: 999,
                  padding: "3px 8px",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  transition: "all 0.15s ease",
                }}
                title="Prototype 2: Default Dark Mode (Light mode optional)"
              >
                <span>🌙</span> Dark
              </button>
            </div>
          </div>

          <div
            style={{
              width: 1,
              height: 18,
              background: "rgba(255, 255, 255, 0.15)",
            }}
          />

          <span style={{ opacity: 0.75, fontWeight: 500, fontSize: 11 }}>
            View:
          </span>
          <button
            type="button"
            onClick={() => {
              const nextMode = deviceMode === "local" ? "figma" : "local"
              setDeviceMode(nextMode)
              try {
                window.sessionStorage?.setItem("bounce_device_mode", nextMode)
              } catch {}
            }}
            style={{
              background: deviceMode === "figma" ? "#00796b" : "#2b3036",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              borderRadius: 999,
              padding: "4px 10px",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              transition: "all 0.15s ease",
            }}
            title="Toggle between Localhost iPhone Chassis + Island and Figma Make Responsive Fit"
          >
            {deviceMode === "local" ? (
              <>
                <span>📱</span> Local (iPhone + Island)
              </>
            ) : (
              <>
                <span>📐</span> Figma Make (Device Fit, No Island)
              </>
            )}
          </button>
        </div>
      )}
    </main>
  )
}

export default App
