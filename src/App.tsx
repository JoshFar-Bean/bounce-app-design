import { useRef, useState, useEffect, type ReactNode } from "react"

type Screen = "map" | "ask" | "history" | "chat" | "saved" | "you" | "plan" | "place" | "bounce" | "updated"
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
      <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor" stroke="none" />
      <path d="M8.5 13.5v-2a1.5 1.5 0 0 1 1.5-1.5h4.5m0 0l-2.2-2.2m2.2 2.2l-2.2 2.2" stroke="#5ec3c6" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" fill="currentColor" stroke="none" />
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

function AskMark({ size = 26 }: { size?: number }) {
  return (
    <svg className="ask-mark" viewBox="0 0 28 28" width={size} height={size} style={{ width: size, height: size, flexShrink: 0 }} aria-hidden="true">
      <path d="M13 2v7M9.5 5.5h7" stroke="#8AB4F8" />
      <path
        d="M18 8c-6-4-12 0-12 6s6 9 10 6c3-2 2-5-1-6-2-1-4 2-2 4"
        stroke="#4285F4"
      />
      <path d="M17 19c3-1 5-4 5-7" stroke="#34A853" />
      <path d="M22 12c0-2-1-3-3-5" stroke="#F9AB00" />
      <path d="M19 7c-1-1-2-1-3-1" stroke="#EA4335" />
    </svg>
  )
}

function GooglePin({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
      <path d="M16 2C10.477 2 6 6.477 6 12c0 7.5 10 18 10 18s10-10.5 10-18c0-5.523-4.477-10-10-10z" fill="#EA4335" />
      <path d="M16 2c3.5 0 6.5 1.8 8.2 4.6l-4.5 4.5A4.5 4.5 0 0 0 16 9.5V2z" fill="#FBBC04" />
      <path d="M24.2 6.6C25.3 8.2 26 10 26 12c0 3.2-1.8 7-4.2 10.8l-5.8 7.2V16.5l3.7-3.7a4.5 4.5 0 0 0 .5-6.2z" fill="#34A853" />
      <path d="M16 30S6 19.5 6 12c0-2 .7-3.8 1.8-5.4l5.9 5.9a4.5 4.5 0 0 0 2.3 4V30z" fill="#4285F4" />
      <circle cx="16" cy="12" r="3.6" fill="#1e2124" />
    </svg>
  )
}

function WeatherIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
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
    <svg width="68" height="54" viewBox="0 0 68 54" fill="none" style={{ flexShrink: 0 }}>
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
        <path d="M10 2c-5 0-9 4-9 9 0 4 2.5 7.5 6 8.5v3.5h7v-3.5c3.5-1 6-4.5 6-8.5 0-5-4-9-10-9z" fill="#059669" />
        <circle cx="10" cy="11" r="5" fill="#D97706" />
        <path d="M2 32c0-5 3.5-8 8.5-8s8.5 3 8.5 8H2z" fill="#F59E0B" fillOpacity="0.8" />
      </g>

      {/* Bottom Figure: Blue cap, camera */}
      <g transform="translate(32, 24)">
        <path d="M12 6c0-3.5 3-6 7-6 3.5 0 6 2 7 4.5l6 1.5H19c-3 0-5 1-7 0z" fill="#2563EB" />
        <circle cx="18" cy="11" r="5" fill="#FBBF24" />
        <path d="M9 30c0-6 4-10 10-10h2c6 0 10 4 10 10H9z" fill="#1D4ED8" />
        <rect x="3" y="16" width="9" height="6" rx="1.5" fill="#06B6D4" />
      </g>

      {/* Sparkles */}
      <path d="M24 10l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="#67E8F9" />
      <path d="M60 30l.8 1.6 1.6.8-1.6.8-.8 1.6-.8-1.6-1.6-.8 1.6-.8.8-1.6z" fill="#F472B6" />
      <path d="M14 44l.6 1.2 1.2.6-1.2.6-.6 1.2-.6-1.2-1.2-.6 1.2-.6.6-1.2z" fill="#FDE047" />
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
  style, // 1. ADD THIS LINE
}: {
  children?: ReactNode
  label: string
  className?: string
  onPress?: () => void
  style?: React.CSSProperties // 2. ADD THIS LINE
}) {
  return (
    <div
      className={`tap ${className}`}
      style={style} // 3. ADD THIS LINE
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
  onHistory,
  onBack,
  onClose,
}: {
  onHistory?: () => void
  onBack?: () => void
  onClose?: () => void
}) {
  return (
    <div className="ask-header">
      <div className="drag" />
      {(onBack || onClose) && <BackButton onPress={onBack ?? onClose!} />}
      <div className="ask-lockup">
        <AskMark />
        <span>Ask Maps</span>
      </div>
      <div className="header-actions">
        <RoundAction icon="history" label="Chat history" onPress={onHistory} />
        <RoundAction icon="edit" label="New chat" />
        <RoundAction icon="close" label="Close" onPress={onClose} />
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
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      
      {/* 1. Top Search Bar Area & Category Chips Row (Directly matches Google Maps reference) */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30, padding: '44px 14px 0', pointerEvents: 'none' }}>
        
        {/* Floating Rounded Search Bar */}
        <div 
          onClick={onAsk}
          className="tap"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--control)',
            borderRadius: '9999px',
            padding: '0 8px 0 16px',
            height: '52px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.08)',
            pointerEvents: 'auto',
            cursor: 'pointer'
          }}
          role="button"
          tabIndex={0}
          aria-label="Search here"
        >
          {/* Authentic Google Maps 4-Color Pin */}
          <GooglePin size={24} />

          {/* Search Placeholder */}
          <span style={{ flex: 1, fontSize: '16px', color: 'var(--text-low)', fontWeight: 400 }}>
            Search here
          </span>

          {/* Right Action Icons: Mic, Lens, Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginRight: '4px' }}>
            <div style={{ color: 'var(--text-high)', display: 'grid', placeItems: 'center' }}>
              <Icon name="mic" size={21} />
            </div>
            <div style={{ color: 'var(--text-high)', display: 'grid', placeItems: 'center' }}>
              <Icon name="lens" size={20} />
            </div>
            
            {/* User Profile Avatar with Blue Ring */}
            <div 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#8bc34a',
                color: '#ffffff',
                display: 'grid',
                placeItems: 'center',
                fontSize: '17px',
                fontWeight: 600,
                fontFamily: 'system-ui, -apple-system, sans-serif',
                boxShadow: '0 0 0 2px var(--control), 0 0 0 4px #4285f4',
                flexShrink: 0,
                lineHeight: 1
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
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '10px',
            overflowX: 'auto',
            paddingBottom: '4px',
            pointerEvents: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {/* Ask Maps Chip (Active with Blue Accent Outline) */}
          <div
            onClick={onAsk}
            className="tap"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '36px',
              borderRadius: '9999px',
              background: '#182536',
              border: '1.5px solid #4285f4',
              color: '#8ab4f8',
              fontSize: '13px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              cursor: 'pointer'
            }}
          >
            <AskMark size={18} />
            <span style={{ color: '#ffffff' }}>Ask Maps</span>
          </div>

          {/* Restaurants Chip */}
          <div
            className="tap"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '36px',
              borderRadius: '9999px',
              background: 'var(--control)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-high)',
              fontSize: '13px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <Icon name="restaurants" size={17} />
            <span>Restaurants</span>
          </div>

          {/* Petrol Chip */}
          <div
            className="tap"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '36px',
              borderRadius: '9999px',
              background: 'var(--control)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-high)',
              fontSize: '13px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            <Icon name="petrol" size={17} />
            <span>Petrol</span>
          </div>

          {/* Coffee Chip */}
          <div
            className="tap"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 14px',
              height: '36px',
              borderRadius: '9999px',
              background: 'var(--control)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--text-high)',
              fontSize: '13px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              flexShrink: 0
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
          position: 'absolute',
          top: '154px',
          right: '14px',
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: 'var(--control)',
          color: 'var(--text-high)',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 3px 12px rgba(0,0,0,0.3)',
          border: '1px solid rgba(255,255,255,0.08)',
          pointerEvents: 'auto',
          zIndex: 15,
          cursor: 'pointer'
        }}
        title="Map Layers"
      >
        <Icon name="layers" size={20} />
      </div>

      {/* 3. Lower Floating Action Button Cluster (Compass, Theme Toggle, Directions) */}
      <div
        style={{
          position: 'absolute',
          bottom: '312px',
          right: '14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          pointerEvents: 'auto',
          zIndex: 26
        }}
      >
        {/* Vertical Pill containing Compass + White Sun Theme Toggle */}
        <div
          style={{
            background: 'var(--control)',
            borderRadius: '24px',
            padding: '3px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          {/* Compass / Recenter Button */}
          <div
            onClick={onRecenter}
            className="tap"
            style={{
              width: '40px',
              height: '38px',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--text-high)',
              cursor: 'pointer'
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
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: theme === 'dark' ? '#ffffff' : '#202124',
              color: theme === 'dark' ? '#202124' : '#ffffff',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              cursor: 'pointer'
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
          </div>
        </div>

        {/* Teal Directions Navigation Button */}
        <div
          onClick={onDirections}
          className="tap"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '16px',
            background: '#5ec3c6',
            color: '#08262a',
            display: 'grid',
            placeItems: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
            cursor: 'pointer'
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
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--canvas)',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: '0 -6px 24px rgba(0,0,0,0.5)',
          zIndex: 25,
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Grab Handle */}
        <div
          style={{
            width: '36px',
            height: '4px',
            borderRadius: '999px',
            background: '#5f6368',
            margin: '10px auto 12px auto'
          }}
        />

        {/* Header Row: "Be in the know" + Weather Badge */}
        <div
          style={{
            padding: '0 16px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Be in the know
          </span>

          {/* Weather Pill (32° • 62 PSI) */}
          <div
            style={{
              background: 'var(--raised)',
              borderRadius: '12px',
              padding: '4px 10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '2px',
              border: '1px solid rgba(255,255,255,0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <WeatherIcon size={16} />
              <span style={{ color: 'var(--text)', fontSize: '13px', fontWeight: 600 }}>32°</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4285f4' }} />
              <span style={{ color: 'var(--text-low)', fontSize: '10px', fontWeight: 500 }}>62 PSI</span>
            </div>
          </div>
        </div>

        {/* Promo Card: "Make plans with Ask Maps" */}
        <div
          onClick={onAsk}
          className="tap"
          style={{
            margin: '0 14px 12px',
            background: 'var(--raised)',
            borderRadius: '20px',
            padding: '14px 16px 12px',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            cursor: 'pointer'
          }}
        >
          {/* Card Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
            <span style={{ color: 'var(--text)', fontSize: '15px', fontWeight: 600 }}>Make plans with</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AskMark size={18} />
              <span style={{ color: 'var(--text)', fontSize: '15px', fontWeight: 600 }}>Ask Maps</span>
            </div>
          </div>

          {/* Interactive Search Chip & Characters Illustration */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
            <div
              style={{
                background: 'var(--input)',
                borderRadius: '999px',
                padding: '8px 14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--text-high)',
                fontSize: '13px',
                fontWeight: 500,
                maxWidth: '70%'
              }}
            >
              <Icon name="corner-arrow" size={15} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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
            height: '62px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            background: 'var(--canvas)',
            borderTop: '1px solid rgba(255,255,255,0.06)'
          }}
        >
          {/* Explore Tab (Active with Teal Pill) */}
          <div
            className="tap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px'
            }}
          >
            <div
              style={{
                width: '58px',
                height: '30px',
                borderRadius: '999px',
                background: '#004f54',
                color: '#55d0d4',
                display: 'grid',
                placeItems: 'center'
              }}
            >
              <Icon name="pin-filled" size={18} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text)' }}>
              Explore
            </span>
          </div>

          {/* You Tab */}
          <div
            onClick={onYou}
            className="tap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: '58px',
                height: '30px',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--text-low)',
                position: 'relative'
              }}
            >
              <Icon name="bookmark" size={20} />
              <span
                style={{
                  position: 'absolute',
                  top: '4px',
                  right: '18px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#f28b82'
                }}
              />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-low)' }}>
              You
            </span>
          </div>

          {/* Contribute Tab */}
          <div
            className="tap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px'
            }}
          >
            <div
              style={{
                width: '58px',
                height: '30px',
                display: 'grid',
                placeItems: 'center',
                color: 'var(--text-low)'
              }}
            >
              <Icon name="plus" size={20} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-low)' }}>
              Contribute
            </span>
          </div>
        </div>

        {/* iPhone Bottom Home Indicator */}
        <div
          style={{
            height: '16px',
            background: 'var(--canvas)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingTop: '2px'
          }}
        >
          <div
            style={{
              width: '134px',
              height: '4.5px',
              borderRadius: '999px',
              background: '#ffffff',
              opacity: 0.8
            }}
          />
        </div>
      </div>

      {/* 6. Save Confirmation Toast */}
      {saved && (
        <div className="toast" style={{ zIndex: 35, pointerEvents: 'none' }}>
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
function AskStart({
  onHistory,
  onSend,
  onClose,
}: {
  onHistory: () => void
  onSend: () => void
  onClose: () => void
}) {
  const [prompt, setPrompt] = useState("")
  return (
    <ReferenceScreen src="/assets/prototype/screen-2-clean.jpg">
      <BackButton onPress={onClose} />
      <Tap
        label="Open chat history"
        className="hotspot history-hotspot"
        onPress={onHistory}
      />
      <div
        className="prompt-overlay"
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label="Ask Maps prompt"
        data-placeholder="Ask a question"
        onInput={(e) => setPrompt(e.currentTarget.textContent ?? "")}
      />
      <Tap
        label="Send prompt"
        className="hotspot send-hotspot"
        onPress={onSend}
      />
      <Tap
        label="Use suggested prompt"
        className="hotspot suggestion-hotspot"
        onPress={onSend}
      />
      <Tap
        label="Close Ask Maps"
        className="hotspot close-hotspot"
        onPress={onClose}
      />
      {prompt.length > 0 && (
        <span className="typing-hint">Tap the blue arrow to send</span>
      )}
    </ReferenceScreen>
  )
}

function HistoryScreen({
  onOpen,
  onClose,
}: {
  onOpen: () => void
  onClose: () => void
}) {
  return (
    <ReferenceScreen src="/assets/prototype/screen-3.jpg">
      <BackButton onPress={onClose} />
      <Tap
        label="Open desired itinerary"
        className="hotspot history-row-hotspot"
        onPress={onOpen}
      />
      <span className="history-plan-title">
        give me a 2 day plan of food places base...
      </span>
      <Tap
        label="Close history"
        className="hotspot history-close-hotspot"
        onPress={onClose}
      />
    </ReferenceScreen>
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
  onHistory,
  onBack,
  onClose,
  onSave,
}: {
  onHistory: () => void
  onBack: () => void
  onClose: () => void
  onSave: () => void
}) {
  const dragStart = useRef<number | null>(null)
  const [mapExpanded, setMapExpanded] = useState(
    new URLSearchParams(window.location.search).get("chatmap") === "1",
  )
  const finishDrag = (clientY: number) => {
    if (dragStart.current === null) return
    const distance = clientY - dragStart.current
    setMapExpanded(distance > 24 ? true : distance < -24 ? false : !mapExpanded)
    dragStart.current = null
  }
  return (
    <div className="chat-screen">
      <div className="chat-overview-map">
        <img
          src="/assets/prototype/chat-overview-map.jpg"
          alt="Overview map of the itinerary"
        />
      </div>
      <AskHeader onHistory={onHistory} onBack={onBack} onClose={onClose} />
      <div
        className={`chat-response-sheet ${mapExpanded ? "map-expanded" : ""}`}
      >
        <div
          className="chat-sheet-grabber"
          role="button"
          tabIndex={0}
          aria-label={mapExpanded ? "Expand itinerary" : "Expand Overview Map"}
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
          <small>
            {mapExpanded
              ? "Slide up for itinerary"
              : "Slide down for Overview Map"}
          </small>
        </div>
        <div className="chat-itinerary-scroll">
          <div className="conversation-user">
            Plan a two-day Singapore food itinerary with cafés, views and local
            desserts.
          </div>
          <div className="conversation-assistant">
            <AskMark />
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
                <AskMark />
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
              src="/assets/prototype/chat-overview-map.jpg"
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

function getRouteDetail(
  from: TimelineStop,
  to: TimelineStop,
  index: number,
): RouteDetail {
  if (from.id === "kahve")
    return {
      icon: "train" as IconName,
      title: "Downtown Line",
      detail: "DT17 → DT15 · 12 min",
      lineClass: "downtown",
    }
  if (from.id === "suntec")
    return {
      icon: "bus" as IconName,
      title: "Bus 107",
      detail: "5 stops · 18 min",
    }
  if (from.id === "kobashi" && (to.id === "bounce-kobashi" || to.title.toLowerCase().includes("maxwell")))
    return { icon: "walk" as IconName, title: "Walk", detail: "350 m · 4 min" }
  if ((from.id === "bounce-kobashi" || from.title.toLowerCase().includes("maxwell")) && to.id === "green-oasis")
    return { icon: "walk" as IconName, title: "Walk", detail: "750 m · 11 min" }
  if (from.id === "kobashi" || to.bounceSource === "kobashi")
    return { icon: "walk" as IconName, title: "Walk", detail: "350 m · 4 min" }
  if (from.bounceSource === "kobashi")
    return { icon: "walk" as IconName, title: "Walk", detail: "750 m · 11 min" }
  if (from.id === "green-oasis")
    return {
      icon: "train" as IconName,
      title: "Thomson–East Coast Line",
      detail: "TE19 → TE18 · 14 min",
      lineClass: "thomson",
    }
  return index % 2 === 0
    ? { icon: "walk" as IconName, title: "Walk", detail: "450 m · 6 min" }
    : { icon: "bus" as IconName, title: "Bus 80", detail: "4 stops · 16 min" }
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
}) {
  const currentRef = useRef<HTMLDivElement>(null)
  const [mapExpanded, setMapExpanded] = useState(
    new URLSearchParams(window.location.search).get("expanded") === "1",
  )
  const [activeLeg, setActiveLeg] = useState<number | null>(selectedLegIndex ?? null)

  // Drawer Drag & Tap State
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const isDragging = useRef(false)
  const dragStartY = useRef(0)
  const totalDragDistance = useRef(0)

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
    setActiveLeg(index)
    setMapExpanded(true)
    onHighlightLeg?.(index)
  }

  const handleExpandDrawer = () => {
    setMapExpanded(false)
    setActiveLeg(null)
    onResetHighlight?.()
  }

  const currentStop = stops.find((stop) => stop.current) ?? stops[0]
  const displayStop = activeLeg !== null && stops[activeLeg + 1] ? stops[activeLeg + 1] : currentStop

  // Interactive Drag & Tap Handler
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true
    dragStartY.current = e.clientY
    totalDragDistance.current = 0
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
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
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
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
      <div style={{ position: 'absolute', top: '52px', left: '14px', zIndex: 30, pointerEvents: 'auto' }}>
        <BackButton onPress={onBack} theme={theme} />
      </div>

      {/* 2. Floating Action Buttons: Light/Dark Toggle and Compass directly above drawer on right side at all times */}
      <div
        className="plan-fab-cluster"
        style={{
          bottom: mapExpanded ? '165px' : 'calc(100% - 170px)',
          transform: dragOffsetY !== 0 ? `translate3d(0, ${dragOffsetY}px, 0)` : undefined,
          transition: isDragging.current ? 'none' : 'bottom 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s ease',
        }}
      >
        {/* Vertical Pill matching Main Screen */}
        <div
          style={{
            background: theme === 'dark' ? 'var(--control)' : '#ffffff',
            borderRadius: '24px',
            padding: '3px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            boxShadow: theme === 'dark' ? '0 4px 14px rgba(0,0,0,0.35)' : '0 4px 14px rgba(0,0,0,0.12)',
            border: theme === 'dark' ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.08)',
          }}
        >
          {/* Compass / Recenter */}
          <div
            onClick={() => onCurrent?.()}
            className="tap"
            style={{
              width: '40px',
              height: '38px',
              display: 'grid',
              placeItems: 'center',
              color: theme === 'dark' ? 'var(--text-high)' : '#202124',
              cursor: 'pointer',
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
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: theme === 'dark' ? '#ffffff' : '#202124',
              color: theme === 'dark' ? '#202124' : '#ffffff',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
              cursor: 'pointer',
            }}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={20} />
          </div>
        </div>
      </div>

      {/* 3. Interactive Drawer (Supports touch/mouse drag up & down and tap) */}
      <div 
        className={`plan-sheet ${mapExpanded ? "map-expanded" : ""}`}
        style={{
          transform: dragOffsetY !== 0 ? `translate3d(0, ${dragOffsetY}px, 0)` : undefined,
          transition: isDragging.current ? 'none' : 'top 0.35s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s ease',
        }}
      >
        <div
          className="sheet-grabber"
          role="button"
          tabIndex={0}
          aria-label={mapExpanded ? "Slide up for full plan" : "Slide down to expand map"}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          style={{ touchAction: 'none', cursor: 'ns-resize' }}
        >
          <span />
          <small>
            {mapExpanded
              ? "Slide up for full plan"
              : "Slide down to expand map"}
          </small>
        </div>
        {mapExpanded ? (
          <div className="expanded-current">
            <span className="time">{displayStop.time}</span>
            <Tap
              label={`Open ${displayStop.title}`}
              className="time-pill current-mini"
              onPress={() => onPlace(displayStop)}
            >
              <span>
                <small>{displayStop.current ? "CURRENT LOCATION" : "SELECTED STOP"}</small>
                <b>{displayStop.title}</b>
                <em>{displayStop.meta}</em>
              </span>
              <Icon name="chevron" />
            </Tap>
          </div>
        ) : (
          <div className="plan-sheet-scroll">
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
              <RoundAction icon="share" label="Share plan" />
              <RoundAction icon="more" label="More options" />
            </div>
            <div className="day-heading">
              <span>Day 1</span>
              <small>Shenton Way Coffee & Suntec Views</small>
            </div>
            <div className="timeline">
              {stops.map((stop, index) => (
                <div className="timeline-stop-group" key={stop.id}>
                  <div
                    className={`timeline-row ${stop.current ? "current" : ""} ${
                      stop.past ? "past" : ""
                    } ${stop.changed ? "changed" : ""}`}
                    ref={stop.current ? currentRef : undefined}
                  >
                    <span className="time">{stop.time}</span>
                    <i className="timeline-dot" />
                    <Tap
                      label={`Open ${stop.title}`}
                      className="time-pill"
                      onPress={() => onPlace(stop)}
                    >
                      <span>
                        <b>{stop.title}</b>
                        <small>{stop.meta}</small>
                      </span>
                      <Icon name="chevron" />
                    </Tap>
                  </div>
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
                          className={`route-detail ${isSelected ? "selected-route" : ""}`}
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
              ))}
            </div>
            <div className="day-heading">
              <span>Day 2</span>
              <small>Market Street & Chinatown</small>
            </div>
            <div className="scroll-spacer" />
          </div>
        )}
      </div>
    </div>
  )
}

function PlaceScreen({
  stop,
  nextStop,
  placementOptions,
  onBounce,
  onRevisit,
  onRevert,
  onBack,
}: {
  stop: TimelineStop
  nextStop?: TimelineStop
  placementOptions: TimelineStop[]
  onBounce: () => void
  onRevisit: (afterId: string) => void
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
        {stop.title === "KŌBASHI" && (
          <div className="place-hero-caption">
            Begin morning two at KŌBASHĪ on South Bridge Road for incredible
            artisan sourdough treats and morning pastries.
          </div>
        )}
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
        <div className="revisit-overlay">
          <Tap
            label="Close revisit options"
            className="revisit-backdrop"
            onPress={() => setShowRevisit(false)}
          />
          <div className="revisit-sheet">
            <div className="sheet-grip" />
            <div className="revisit-kicker">
              REVISIT {stop.title.toUpperCase()}
            </div>
            <div className="revisit-title">Insert after which stop?</div>
            <p>
              Choose where this location should be added back into your
              itinerary.
            </p>
            <div className="placement-list">
              {placementOptions.slice(0, 3).map((option) => (
                <Tap
                  key={option.id}
                  label={`Insert ${stop.title} after ${option.title}`}
                  className="placement-pill"
                  onPress={() => onRevisit(option.id)}
                >
                  <span>
                    <small>AFTER · {option.time}</small>
                    <b>{option.title}</b>
                    <em>{option.meta}</em>
                  </span>
                  <Icon name="plus" />
                </Tap>
              ))}
            </div>
          </div>
        </div>
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
  onSelect,
  onClose,
}: {
  sourceStop: TimelineStop
  theme: Theme
  onToggleTheme: () => void
  onSelect: (place: string) => void
  onClose: () => void
}) {
  const options = getBounceOptions(sourceStop)
  const insertsAfterCurrent = sourceStop.id === "kobashi"
  const [selectedOption, setSelectedOption] = useState(1)
  const confirmSelection = () =>
    selectedOption === 0 ? onClose() : onSelect(options[selectedOption].title)
  return (
    <div className="screen-page bounce-page">
      <div
        className="bounce-map-stage"
        aria-label="Map showing the itinerary area"
      >
        <picture>
          <source
            media="(prefers-reduced-data: reduce)"
            srcSet={
              theme === "light"
                ? "/assets/prototype/saved-overview-map-light.jpg"
                : "/assets/prototype/saved-overview-map.jpg"
            }
          />
          <img
            src={
              theme === "light"
                ? "/assets/prototype/saved-overview-map-light.jpg"
                : "/assets/prototype/saved-overview-map.jpg"
            }
            alt="Overview map of the itinerary with existing streets, route and location pins"
          />
        </picture>
        <MapControls theme={theme} onToggleTheme={onToggleTheme} />
      </div>
      <BackButton onPress={onClose} theme={theme} label="Back to place details" />
      <div className="bounce-sheet">
        <div className="bounce-grabber">
          <span />
        </div>
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
                  onPress={() => setSelectedOption(index)}
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
      </div>
    </div>
  )
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
  ].includes(requestedScreen ?? "")
    ? requestedScreen as Screen
    : "map"
  const [theme, setTheme] = useState<Theme>(
    new URLSearchParams(window.location.search).get("theme") === "light"
      ? "light"
      : "dark",
  )
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const [planStops, setPlanStops] = useState<TimelineStop[]>(initialStops)
  const [updateMessage, setUpdateMessage] = useState("")
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

  const highlightRouteLeg = (index: number) => {
    setSelectedLegIndex(index)
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "HIGHLIGHT_LEG", index },
        "*"
      )
    }
  }

  const resetRouteHighlight = () => {
    setSelectedLegIndex(null)
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: "RESET_HIGHLIGHT" },
        "*"
      )
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'THEME_TOGGLE', isDark: theme === 'dark' },
        '*'
      )
    }
  }, [theme])

  useEffect(() => {
    const isItinerary = screen === "plan" || screen === "updated"
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "SET_MODE",
          mode: isItinerary ? "itinerary" : "explore",
          stops: planStops,
        },
        "*"
      )
    }
  }, [screen, planStops])

  useEffect(() => {
    const handleIframeMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "ROUTE_CLICKED") {
        setSelectedLegIndex(event.data.index)
      }
    }
    window.addEventListener("message", handleIframeMessage)
    return () => window.removeEventListener("message", handleIframeMessage)
  }, [])
  const applyBounce = (place: string) => {
    let sourceIndex = planStops.findIndex((stop) => stop.id === selectedStop.id)
    if (sourceIndex < 0) return
    let next = [...planStops]
    if (selectedStop.id === "kobashi") {
      next = next.filter((stop) => stop.bounceSource !== "kobashi")
      sourceIndex = next.findIndex((stop) => stop.id === "kobashi")
      next.splice(sourceIndex + 1, 0, {
        id: "bounce-kobashi",
        time: "2:00 pm",
        title: place,
        meta: "Bounce addition · Nearby now",
        changed: true,
        bounceSource: "kobashi",
      })
      setUpdateMessage(`${place} was added after KŌBASHI.`)
    } else {
      next[sourceIndex] = {
        ...selectedStop,
        title: place,
        meta: "Bounce replacement · Real-time pick",
        changed: true,
        originalTitle: selectedStop.originalTitle ?? selectedStop.title,
        originalMeta: selectedStop.originalMeta ?? selectedStop.meta,
      }
      setUpdateMessage(`${place} replaced ${selectedStop.title}.`)
    }
    setPlanStops(next)
    setScreen("updated")
  }
  const applyRevisit = (afterId: string) => {
    const targetIndex = planStops.findIndex((stop) => stop.id === afterId)
    if (targetIndex < 0) return
    const revisitedStop: TimelineStop = {
      ...selectedStop,
      id: `revisit-${selectedStop.id}-${afterId}`,
      time: "Revisit",
      past: false,
      current: false,
      changed: true,
      meta: `${selectedStop.meta.split(" · ")[0]} · Added back`,
    }
    const next = [...planStops]
    next.splice(targetIndex + 1, 0, revisitedStop)
    setPlanStops(next)
    setUpdateMessage(
      `${selectedStop.title} was added after ${planStops[targetIndex].title}.`,
    )
    setScreen("updated")
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
  const selectedIndex = planStops.findIndex(
    (stop) => stop.id === selectedStop.id,
  )
  const nextSelectedStop =
    selectedIndex >= 0 ? planStops[selectedIndex + 1] : undefined

 return (
    <main className={`app-shell ${theme === "light" ? "light-shell" : ""}`}>
      
      {/* 1. Phone Container (Wraps the Map to strictly bound it to the iPhone edges) */}
      <div className={`phone theme-${theme}`} aria-live="polite" style={{ position: 'relative', overflow: 'hidden', background: 'transparent' }}>
        
        {/* Failsafe: Forces the native status bar and phone gradients to remain completely transparent */}
        <style>{`
          .status-bar, .phone::before { background: transparent !important; box-shadow: none !important; }
        `}</style>

        {/* 2. Global Background Map (Now strictly contained within the phone) */}
        <iframe 
          ref={iframeRef} 
          src="/map-prototype.html" 
          style={{ position: 'absolute', top: 0, left: 0, border: 'none', width: '100%', height: '100%', zIndex: 0 }}
          title="Live Routing Map"
        />

        {/* 3. React Screen Overlays (pointerEvents: 'none' ensures the background map is fully interactive) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
            <StatusBar />
            
            {screen === "map" && (
              <MapScreen
                  saved={false}
                  theme={theme}
                  onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
                  onAsk={() => setScreen("ask")}
                  onYou={() => setScreen("you")}
                  onDirections={() => setScreen("plan")}
                  onRecenter={() => {
                    if (iframeRef.current && iframeRef.current.contentWindow) {
                      iframeRef.current.contentWindow.postMessage({ type: 'RECENTER' }, '*')
                    }
                  }}
              />
            )}
            
            {/* The rest of the screens are wrapped in pointerEvents: 'auto' so they behave like solid pages when active */}
            {screen === "ask" && (
              <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                  <AskStart
                      onHistory={() => setScreen("history")}
                      onSend={() => setScreen("chat")}
                      onClose={() => setScreen("map")}
                  />
              </div>
            )}
            {screen === "history" && (
              <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                  <HistoryScreen
                      onOpen={() => setScreen("chat")}
                      onClose={() => setScreen("ask")}
                  />
              </div>
            )}
            {screen === "chat" && (
              <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                  <ChatScreen
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
                  onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
                  onAsk={() => setScreen("ask")}
                  onYou={() => setScreen("you")}
                  onDirections={() => setScreen("plan")}
                  onRecenter={() => {
                    if (iframeRef.current && iframeRef.current.contentWindow) {
                      iframeRef.current.contentWindow.postMessage({ type: 'RECENTER' }, '*')
                    }
                  }}
              />
            )}
            {screen === "you" && (
              <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                  <YouScreen
                      onPlan={() => setScreen("plan")}
                      onExplore={() => setScreen("map")}
                  />
              </div>
            )}
            {screen === "plan" && (
              <div style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
                  <PlanScreen
                      stops={planStops}
                      theme={theme}
                      onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
                      onCurrent={() => {
                        if (iframeRef.current && iframeRef.current.contentWindow) {
                          iframeRef.current.contentWindow.postMessage({ type: 'RECENTER' }, '*')
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
                  />
              </div>
            )}
            {screen === "place" && (
              <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                  <PlaceScreen
                      stop={selectedStop}
                      nextStop={nextSelectedStop}
                      placementOptions={planStops.filter((stop) => !stop.past)}
                      onBounce={() => setScreen("bounce")}
                      onRevisit={applyRevisit}
                      onRevert={revertSelectedStop}
                      onBack={() => setScreen("plan")}
                  />
              </div>
            )}
            {screen === "bounce" && (
              <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                  <BounceScreen
                      sourceStop={selectedStop}
                      theme={theme}
                      onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
                      onClose={() => setScreen("place")}
                      onSelect={applyBounce}
                  />
              </div>
            )}
            {screen === "updated" && (
              <div style={{ pointerEvents: 'none', width: '100%', height: '100%' }}>
                  <PlanScreen
                      stops={planStops}
                      theme={theme}
                      onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
                      onCurrent={() => {
                        if (iframeRef.current && iframeRef.current.contentWindow) {
                          iframeRef.current.contentWindow.postMessage({ type: 'RECENTER' }, '*')
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
                  />
              </div>
            )}
        </div>
      </div>
    </main>
  )
}

export default App
