import { useRef, useState, useEffect, type ReactNode } from "react"

type Screen = "map" | "ask" | "history" | "chat" | "saved" | "you" | "plan" | "place" | "bounce" | "updated"
type Theme = "dark" | "light"
type IconName = "history" | "edit" | "close" | "send" | "bookmark" | "check" | "pin" | "plus" | "clock" | "shuffle" | "route" | "share" | "chevron" | "bell" | "more" | "search" | "users" | "mic" | "trash" | "arrow" | "back" | "train" | "bus" | "walk" | "sun" | "moon" | "compass"

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

function AskMark() {
  return (
    <svg className="ask-mark" viewBox="0 0 28 28" aria-hidden="true">
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
}: {
  onPress: () => void
  label?: string
}) {
  return (
    <Tap label={label} className="back-button" onPress={onPress}>
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
          <Icon name="pin" />
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
}: {
  saved: boolean
  theme: Theme
  onToggleTheme: () => void
  onAsk: () => void
  onYou: () => void
}) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      
      {/* 1. Transparent Top Search Bar Area (Matches 2_2.jpg) */}
      <div style={{ position: 'absolute', top: 0, width: '100%', zIndex: 10, padding: '68px 22px 0', pointerEvents: 'none' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
            <Tap 
              label="Search here" 
              onPress={onAsk} 
              className="tap" 
              style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--control)', borderRadius: '999px', padding: '0 20px', color: 'var(--text-low)', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', height: '52px', pointerEvents: 'auto' }}
            >
                <Icon name="search" size={20} />
                <span style={{ fontSize: '16px' }}>Search here</span>
            </Tap>
            
            {/* Native-style Compass (For visual reference, non-interactive) */}
            <div className="round-action" style={{ background: 'var(--control)', color: 'var(--text)', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', height: '52px', width: '52px', borderRadius: '50%', display: 'grid', placeItems: 'center' }}>
              <Icon name="compass" />
            </div> 
        </div>
      </div>

      {/* 2. Theme Toggle (Interactive) */}
      <Tap
        label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        onPress={onToggleTheme}
        style={{ position: 'absolute', zIndex: 100, top: '135px', right: '22px', width: '52px', height: '52px', borderRadius: '50%', background: 'var(--control)', color: 'var(--text)', display: 'grid', placeItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', cursor: 'pointer', pointerEvents: 'auto' }}
      >
        <Icon name={theme === "dark" ? "sun" : "moon"} size={22} />
      </Tap>

      {/* 3. Bottom Nav Area (Interactive Ask Maps & Explore/You Buttons) */}
      <div style={{ position: 'absolute', bottom: 0, width: '100%', zIndex: 20, pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '20px' }}>
        
        {/* Floating Ask Maps Button (Interactive) */}
        <Tap 
          label="Open Ask Maps" 
          onPress={onAsk} 
          style={{ pointerEvents: 'auto', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--control)', borderRadius: '24px', padding: '12px 20px', color: 'var(--text)', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', cursor: 'pointer' }}
        >
          <AskMark />
          <span style={{ fontWeight: 'bold' }}>Ask Maps</span>
        </Tap>

        {/* Explore and You Navigation (Interactive) */}
        <div style={{ display: 'flex', gap: '16px', background: 'var(--surface)', padding: '10px 20px', borderRadius: '30px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', pointerEvents: 'auto' }}>
            <Tap label="Explore" className="nav-item active" onPress={() => {}} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--accent)' }}>
                <Icon name="pin" size={24} />
                <span style={{ fontSize: '12px', fontWeight: '500' }}>Explore</span>
            </Tap>
            <Tap label="You" className="nav-item" onPress={onYou} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)' }}>
                <Icon name="bookmark" size={24} />
                <span style={{ fontSize: '12px', fontWeight: '500' }}>You</span>
            </Tap>
        </div>
      </div>
      
      {/* 4. Save Confirmation Toast */}
      {saved && (
        <div className="toast" style={{ zIndex: 20, pointerEvents: 'none' }}>
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
  if (from.id === "kobashi" || to.bounceSource === "kobashi")
    return { icon: "walk" as IconName, title: "Walk", detail: "600 m · 8 min" }
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
}: {
  stops: TimelineStop[]
  theme: Theme
  onToggleTheme: () => void
  onCurrent?: () => void
  onPlace: (stop: TimelineStop) => void
  onBack: () => void
  updateMessage?: string
}) {
  const currentRef = useRef<HTMLDivElement>(null)
  const dragStart = useRef<number | null>(null)
  const [mapExpanded, setMapExpanded] = useState(
    new URLSearchParams(window.location.search).get("expanded") === "1",
  )
  const jump = () => {
    currentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
    onCurrent?.()
  }
  const currentStop = stops.find((stop) => stop.current) ?? stops[0]
  const finishDrag = (clientY: number) => {
    if (dragStart.current === null) return
    const distance = clientY - dragStart.current
    setMapExpanded(distance > 24 ? true : distance < -24 ? false : !mapExpanded)
    dragStart.current = null
  }
  return (
    <div className="screen-page plan-page">
      <div className="plan-map-stage">
        <img
          src={
            theme === "light"
              ? "/assets/prototype/saved-overview-map-light.jpg"
              : "/assets/prototype/saved-overview-map.jpg"
          }
          alt="Overview map for the saved plan"
        />
        <MapControls theme={theme} onToggleTheme={onToggleTheme} />
      </div>
      <BackButton onPress={onBack} />
      <div className={`plan-sheet ${mapExpanded ? "map-expanded" : ""}`}>
        <div
          className="sheet-grabber"
          role="button"
          tabIndex={0}
          aria-label={mapExpanded ? "Expand saved plan" : "Expand map"}
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
              ? "Slide up for full plan"
              : "Slide down to expand map"}
          </small>
        </div>
        {mapExpanded ? (
          <div className="expanded-current">
            <span className="time">{currentStop.time}</span>
            <Tap
              label={`Open ${currentStop.title}`}
              className="time-pill current-mini"
              onPress={() => onPlace(currentStop)}
            >
              <span>
                <small>CURRENT LOCATION</small>
                <b>{currentStop.title}</b>
                <em>{currentStop.meta}</em>
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
                      return (
                        <div className="route-detail">
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
      <BackButton onPress={onClose} label="Back to place details" />
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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'THEME_TOGGLE', isDark: theme === 'dark' },
        '*'
      )
    }
  }, [theme])
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
              <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                  <PlanScreen
                      stops={planStops}
                      theme={theme}
                      onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
                      onBack={() => setScreen("you")}
                      onPlace={(stop) => {
                      setSelectedStop(stop)
                      setScreen("place")
                      }}
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
              <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
                  <PlanScreen
                      stops={planStops}
                      theme={theme}
                      onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
                      updateMessage={updateMessage}
                      onBack={() => setScreen("you")}
                      onPlace={(stop) => {
                      setSelectedStop(stop)
                      setScreen("place")
                      }}
                  />
              </div>
            )}
        </div>
      </div>
    </main>
  )
}

export default App
