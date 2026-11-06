import type { ReactNode } from 'react'

type IconName =
  | 'search' | 'mic' | 'camera' | 'history' | 'edit' | 'close' | 'trash'
  | 'bell' | 'bookmark' | 'more' | 'plus' | 'chevron' | 'people' | 'route'
  | 'share' | 'link' | 'like' | 'copy' | 'pin' | 'layers' | 'compass'

const exportTarget = new URLSearchParams(window.location.search).get('section')
const exportHidden = (id: string) => Boolean(exportTarget && exportTarget !== id)

const icons: Record<IconName, ReactNode> = {
  search: <><circle cx="11" cy="11" r="6"/><path d="m16 16 4.5 4.5"/></>,
  mic: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5.5 12a6.5 6.5 0 0 0 13 0M12 18.5V22"/></>,
  camera: <><rect x="3" y="6" width="18" height="14" rx="3"/><circle cx="12" cy="13" r="3.5"/><path d="m8 6 1.5-2h5L16 6"/></>,
  history: <><path d="M4 7V3m0 0h4M4 3l3 3"/><path d="M5.2 17.5A9 9 0 1 0 4 8"/><path d="M12 7v5l3 2"/></>,
  edit: <><path d="m4 20 4.5-1 10-10-3.5-3.5-10 10L4 20Z"/><path d="m13.5 6.5 3.5 3.5"/></>,
  close: <path d="m5 5 14 14M19 5 5 19"/>,
  trash: <><path d="M4 7h16M9 3h6l1 4H8l1-4ZM7 7l1 14h8l1-14"/><path d="M10 11v6m4-6v6"/></>,
  bell: <><path d="M6 16h12l-1.5-2V9a4.5 4.5 0 0 0-9 0v5L6 16Z"/><path d="M10 19a2 2 0 0 0 4 0"/></>,
  bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z"/>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  plus: <path d="M12 4v16M4 12h16"/>,
  chevron: <path d="m7 9 5 5 5-5"/>,
  people: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c.5-4 2.5-6 6-6s5.5 2 6 6M15 15c3 0 5 1.5 6 4"/></>,
  route: <><path d="M7 20a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM17 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/><path d="M9.5 15.5c5 0 1-7 5-7"/></>,
  share: <><path d="M12 16V3m0 0L7 8m5-5 5 5"/><path d="M5 12v9h14v-9"/></>,
  link: <><path d="m10 14 4-4"/><path d="M7.5 16.5 5 19a4 4 0 0 1-5.5-5.5L3 10a4 4 0 0 1 5.5 0M16.5 7.5 19 5a4 4 0 0 1 5.5 5.5L21 14a4 4 0 0 1-5.5 0" transform="translate(-1 -1)"/></>,
  like: <path d="M7 11v10H3V11h4Zm0 8h9.5a2 2 0 0 0 2-1.7l1-6A2 2 0 0 0 17.5 9H14l.5-4C14.7 3 12 2 11 4L7 11Z"/>,
  copy: <><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3"/></>,
  pin: <><path d="M12 22s7-6 7-13A7 7 0 0 0 5 9c0 7 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/></>,
}

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{icons[name]}</svg>
}

function AskMark() {
  return (
    <svg className="ask-mark" viewBox="0 0 32 32" aria-label="Recreated Ask Maps mark">
      <path d="M15 3v8M11 7h8" stroke="#8ab4f8"/>
      <path d="M20 10c-7-5-14 0-14 6s7 10 12 6c3-2 2-6-1-7-3-1-5 3-2 5" stroke="#4285f4"/>
      <path d="M19 21c3-1 5-4 5-7" stroke="#34a853"/>
      <path d="M24 14c0-2-1-4-3-5" stroke="#fbbc04"/>
      <path d="M21 9c-1-1-2-1-3-2" stroke="#ea4335"/>
    </svg>
  )
}

function Spec({ label, children, note }: { label: string; children: ReactNode; note: string }) {
  return <div className="spec"><div className="spec-label">{label}</div><div className="spec-example">{children}</div><div className="spec-note">{note}</div></div>
}

function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section id={id} data-export-section={id} className="section" hidden={exportHidden(id)}>
      <div className="section-rule" />
      <div className="section-head"><span>{eyebrow}</span><div><h2>{title}</h2><p>{intro}</p></div></div>
      {children}
    </section>
  )
}

const swatches = [
  ['Canvas', '#121212', 'Primary sheet · observed'],
  ['Raised', '#1B1F20', 'Cards · approximate'],
  ['Control', '#292A2D', 'Icon buttons · approximate'],
  ['Input', '#3C4043', 'Fields and chips · approximate'],
  ['Divider', '#5F6368', 'Hairlines · approximate'],
  ['Text', '#FFFFFF', 'Primary content · observed'],
  ['Text secondary', '#BDC1C6', 'Metadata · approximate'],
  ['Google blue', '#4285F4', 'Ask + location · approximate'],
  ['Teal', '#00A3A9', 'Selected + action · approximate'],
  ['Deep teal', '#005D62', 'Button fill · approximate'],
  ['Open', '#34A853', 'Open status · approximate'],
  ['Rating', '#F9AB00', 'Stars · approximate'],
  ['Alert', '#F28B82', 'Count + closed · approximate'],
  ['Route', '#2439E8', 'Route cards · sampled'],
]

const iconNames: {name: IconName; label: string}[] = [
  {name:'search',label:'Search'}, {name:'mic',label:'Microphone'}, {name:'camera',label:'Camera'},
  {name:'history',label:'History'}, {name:'edit',label:'Edit'}, {name:'close',label:'Close'},
  {name:'trash',label:'Delete'}, {name:'bell',label:'Notifications'}, {name:'bookmark',label:'Save'},
  {name:'more',label:'More'}, {name:'plus',label:'Add'}, {name:'chevron',label:'Dropdown'},
  {name:'people',label:'Shared'}, {name:'route',label:'Route'}, {name:'share',label:'Share'},
  {name:'link',label:'Source'}, {name:'like',label:'Feedback'}, {name:'copy',label:'Copy'},
  {name:'pin',label:'Place'}, {name:'layers',label:'Layers'}, {name:'compass',label:'Location'},
]

function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral'|'teal'|'outline' }) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

function App() {
  return (
    <main>
      <header className="cover" data-export-section="cover" hidden={exportHidden('cover')}>
        <div className="cover-top">
          <div className="brand-lockup"><AskMark /><strong>Ask Maps</strong><span>source app system</span></div>
          <nav aria-label="Sections"><a href="#brand">01</a><a href="#colour">02</a><a href="#type">03</a><a href="#components">04</a><a href="#icons">05</a><a href="#imagery">06</a></nav>
        </div>
        <div className="cover-grid">
          <div><p className="kicker">Dark mode · mobile maps · AI assistance</p><h1>Design<br/>system</h1></div>
          <div className="cover-summary"><p>A specimen library extracted from nine source-app screenshots. Dense information, soft controls and a map-first hierarchy.</p><dl><div><dt>Source</dt><dd>9 screens</dd></div><div><dt>Mode</dt><dd>Dark</dd></div><div><dt>Status</dt><dd>Screenshot-derived</dd></div></dl></div>
        </div>
        <div className="map-band" aria-label="Source screenshot detail"><img src="/assets/source-screen-1.jpg" alt="Untouched source screenshot showing the source application's dark map" /></div>
        <div className="download-row"><span>Reference package · PNG, HTML, source, tokens and assets</span><a className="download" href="/exports/ask-maps-design-system.zip" download>Download ZIP <span>↓</span></a></div>
      </header>

      <Section id="brand" eyebrow="01 / Brand" title="Map-first, quietly intelligent" intro="A near-black utility surface sits over expressive cartography. White type leads; blue and teal signal assistance, place and action.">
        <div className="brand-grid">
          <Spec label="Primary lockup · recreated from screenshots" note="Ask Maps · multicolour sparkle glyph + white wordmark · vector recreation, not official artwork">
            <div className="logo-stage"><div className="brand-lockup large"><AskMark /><strong>Ask Maps</strong></div></div>
          </Spec>
          <Spec label="Compact product mark" note="32×32 base · blue dominant · red, yellow and green details">
            <div className="mark-stage"><AskMark /><AskMark /><AskMark /></div>
          </Spec>
          <Spec label="Character" note="Tone · direct, useful, local · Density · compact · Shape · soft, circular, layered">
            <div className="principles"><div><b>01</b><span>Maps remain the context.</span></div><div><b>02</b><span>Assistance stays one gesture away.</span></div><div><b>03</b><span>Metadata earns its space.</span></div></div>
          </Spec>
          <Spec label="Logo usage" note="Use on near-black only · preserve clear space equal to glyph width · no invented light mark">
            <div className="logo-dos"><div className="logo-good"><div className="brand-lockup"><AskMark /><strong>Ask Maps</strong></div><small>Preferred</small></div><div className="logo-missing"><span>Light-background version</span><small>Not observed · placeholder</small></div></div>
          </Spec>
        </div>
      </Section>

      <Section id="colour" eyebrow="02 / Colour" title="Night surfaces, precise signals" intro="Tonal blacks create depth without decorative shadow. Accent colour is scarce and semantic; map imagery supplies the broader palette.">
        <div className="swatch-grid">
          {swatches.map(([name, hex, use]) => <div className="swatch" key={name}><div style={{background:hex}}/><strong>{name}</strong><code>{hex}</code><span>{use}</span></div>)}
        </div>
        <div className="colour-notes">
          <div><span className="tiny-label">Application</span><p>White establishes hierarchy; secondary grey holds metadata; teal means place or selected action; Google blue is reserved for assistance and location.</p></div>
          <div className="contrast-demo"><span>Primary / #121212</span><b>High-emphasis text</b><small>Use #FFFFFF or #E8EAED</small></div>
          <div className="contrast-demo muted"><span>Raised / #1B1F20</span><b>Supporting content</b><small>Use #BDC1C6</small></div>
        </div>
      </Section>

      <Section id="type" eyebrow="03 / Typography" title="Human scale, map density" intro="The source appears Google Sans–like. Manrope is the documented open substitute; IBM Plex Mono carries measurements and token values.">
        <div className="font-cards">
          <Spec label="Heading + interface" note="Manrope · open approximation for unavailable Google Sans · 400 / 500 / 600">
            <div className="font-sample">Aa <span>Manrope</span></div>
          </Spec>
          <Spec label="Specifications" note="IBM Plex Mono · 400 / 500 · token values and measurements only">
            <div className="font-sample mono">Aa <span>IBM Plex Mono</span></div>
          </Spec>
        </div>
        <div className="type-ramp">
          <div><code>Display · 72/72 · 500 · −.035em</code><p className="t-display">Find your way</p></div>
          <div><code>Title · 40/44 · 500 · −.025em</code><p className="t-title">Your recent places</p></div>
          <div><code>Heading · 24/30 · 600 · −.015em</code><p className="t-heading">Day 2: Market Street vistas</p></div>
          <div><code>Body · 16/24 · 400 · 0</code><p className="t-body">Here is your updated itinerary with verified walking routes and real-time transit data.</p></div>
          <div><code>UI · 14/20 · 500 · 0</code><p className="t-ui">Invite collaborators</p></div>
          <div><code>Caption · 12/16 · 400 · .005em</code><p className="t-caption">Private list · 19 places</p></div>
        </div>
      </Section>

      <Section id="components" eyebrow="04 / Components" title="Soft controls, useful density" intro="Reusable specimens are drawn only from controls and content patterns visible in the source screenshots.">
        <div className="component-board">
          <Spec label="Search · default" note="Height 52 · radius full · surface/input · 16px text · 44px actions">
            <div className="search-field"><span className="maps-pin">●</span><span>Search here</span><i/><Icon name="mic"/><Icon name="camera"/></div>
          </Spec>
          <Spec label="Prompt field · multiline + docked" note="Radius 20 / full · surface/input · blue focus caret · microphone action">
            <div className="prompt-stack"><div className="prompt large-prompt"><span>Ask a question</span><Icon name="mic"/></div><div className="prompt"><span>Ask a question</span><Icon name="mic"/></div></div>
          </Spec>
          <Spec label="Pills · neutral, outline, action" note="Height 36–44 · radius full · 14px/500 · icon optional">
            <div className="pill-row"><Pill><Icon name="bookmark" size={17}/> Saved <Icon name="chevron" size={15}/></Pill><Pill tone="outline"><AskMark/> Ask Maps</Pill><Pill tone="teal"><Icon name="plus" size={17}/> New list</Pill></div>
          </Spec>
          <Spec label="Icon buttons · neutral + teal" note="40–48 square · circular · 2px rounded outline icon">
            <div className="icon-button-row"><span className="icon-button"><Icon name="history"/></span><span className="icon-button"><Icon name="edit"/></span><span className="icon-button"><Icon name="close"/></span><span className="icon-button teal"><Icon name="route"/></span><span className="icon-button teal"><Icon name="share"/></span></div>
          </Spec>
          <Spec label="Suggestion cards · horizontal" note="Min width 220 · radius 18 · raised surface · 16px body">
            <div className="suggestions"><div>What can Ask Maps help me with today?</div><div>Free things to do near me</div><div>Plan a food trail</div></div>
          </Spec>
          <Spec label="History row · default + delete action" note="Radius 16 · raised surface · 20px padding · title truncates at one line">
            <div className="history-card"><div><b>organise my pins in the list “Food places to explore”</b><span>1 hour ago</span></div><Icon name="trash"/></div>
          </Spec>
          <Spec label="List rows · shared, private, badge" note="Min height 88 · 1px divider · 52px avatar · metadata line">
            <div className="list-stack"><div className="list-row"><span className="emoji">🤤</span><div><b>Food places to explore</b><small><Icon name="people" size={14}/> Shared list · 832 places</small></div><em>48</em><Icon name="more"/></div><div className="list-row"><span className="emoji line">◉</span><div><b>Korea</b><small>Private list · 2 places</small></div><Icon name="more"/></div></div>
          </Spec>
          <Spec label="Place card · content + status + actions" note="Title 18/24 · metadata 13/18 · green open / pink closed · circular actions">
            <div className="place-card"><div className="place-heading"><div><a>KŌBASHI</a><p><b>4.0</b> <span className="star">★</span> (352) · $10–40 · Bakery</p><p><span className="open">Open</span> · Closes 6 pm</p></div><div className="icon-button-row"><span className="icon-button teal"><Icon name="route"/></span><span className="icon-button teal"><Icon name="share"/></span></div></div><div className="photo-mosaic"><img src="/assets/source-screen-5.jpg" alt="Untouched source screenshot detail showing bakery photography"/><img src="/assets/source-screen-6.jpg" alt="Untouched source screenshot detail showing place photography"/></div></div>
          </Spec>
          <Spec label="Bottom navigation · selected + notification" note="Height 92 · canvas/raised · three equal destinations · teal selected well">
            <div className="bottom-nav"><div><Icon name="pin"/><span>Explore</span></div><div className="selected"><i/><Icon name="bookmark"/><span>You</span></div><div><Icon name="plus"/><span>Contribute</span></div></div>
          </Spec>
          <Spec label="Sheet anatomy · full state" note="Radius 28 28 0 0 · canvas · drag handle 36×4 · sticky product header">
            <div className="sheet-demo"><div className="sheet-handle"/><div className="sheet-header"><div className="brand-lockup"><AskMark/><strong>Ask Maps</strong></div><div className="icon-button-row"><span className="icon-button"><Icon name="history"/></span><span className="icon-button"><Icon name="edit"/></span><span className="icon-button"><Icon name="close"/></span></div></div><div className="sheet-copy"><span className="message">update all routes</span><small>1 hour ago</small><p>Here is your fully updated itinerary with verified walking routes and real-time transit data.</p></div></div>
          </Spec>
          <Spec label="Map controls + route cards" note="Current location blue · controls 44 circular · route cards cobalt with white type">
            <div className="map-component"><img src="/assets/source-screen-4.jpg" alt="Untouched source screenshot showing route cards over the dark map"/><div className="map-actions"><span className="icon-button"><Icon name="layers"/></span><span className="icon-button"><Icon name="compass"/></span></div></div>
          </Spec>
          <Spec label="Feedback + source actions" note="24px outline icons · 24px gaps · low emphasis until interaction">
            <div className="feedback"><span><Icon name="link"/> Sources</span><div><Icon name="like"/><span className="rotate"><Icon name="like"/></span><Icon name="copy"/><Icon name="more"/></div><small>AI can make mistakes, so double-check responses</small></div>
          </Spec>
        </div>
        <div className="token-strip">
          <div><span>Radius</span><b>4</b><b>8</b><b>12</b><b>16</b><b>20</b><b>28</b><b>Full</b></div>
          <div><span>Space</span><b>4</b><b>8</b><b>12</b><b>16</b><b>20</b><b>24</b><b>32</b><b>40</b></div>
          <div><span>Border</span><b>1px / 18%</b><b>Icon 2px</b><b>Focus 2px blue</b></div>
        </div>
      </Section>

      <Section id="icons" eyebrow="05 / Icons" title="Rounded outline, clear action" intro="A 24-pixel outline family recreated from observed source functions. Selected destinations may switch to filled or colour-backed treatment.">
        <div className="icon-grid">{iconNames.map(({name,label}) => <div className="icon-tile" key={name}><Icon name={name} size={28}/><strong>{label}</strong><code>{name} · 24 / 2</code></div>)}</div>
        <div className="icon-guidance"><div><span>Default</span><Icon name="bookmark" size={32}/><code>#E8EAED · 2px</code></div><div className="teal-state"><span>Selected</span><Icon name="bookmark" size={32}/><code>#8DE7EA · filled well</code></div><p>Keep line caps and joins rounded. Use colour to signal state, not decoration. Platform status-bar and keyboard symbols are out of scope.</p></div>
      </Section>

      <Section id="imagery" eyebrow="06 / Illustration & imagery" title="The map is the illustration" intro="Cartography establishes place and atmosphere; venue photography proves detail. Only untouched supplied screenshots are used here because independent image assets were not provided.">
        <div className="imagery-grid">
          <Spec label="Map field · navigation context" note="Deep navy + petrol cartography · cyan saved markers · cobalt route cards · source screenshot unchanged">
            <div className="image-frame hero-map"><img src="/assets/source-screen-9.jpg" alt="Untouched source screenshot showing saved places across Japan"/></div>
          </Spec>
          <Spec label="Place photography · evidence, not decoration" note="Food, interiors, storefront and architecture · clipped mosaics · source screenshot unchanged">
            <div className="image-frame place-photo"><img src="/assets/source-screen-5.jpg" alt="Untouched source screenshot showing place photography"/></div>
          </Spec>
          <Spec label="List identity · emoji + line avatar" note="Emoji is user content · cyan line avatars identify generated or private lists">
            <div className="avatar-row"><span>🤤</span><span>☕</span><span className="line-avatar">◉</span><span className="line-avatar">▣</span></div>
          </Spec>
          <Spec label="Promotional illustration" note="Observed only as a small raster collage · independent source asset missing">
            <div className="asset-placeholder"><div className="orb o1"/><div className="orb o2"/><div className="orb o3"/><b>Asset placeholder</b><span>Use the official Ask Maps promotional collage when supplied.</span></div>
          </Spec>
        </div>
      </Section>

      <section className="review" id="review" data-export-section="review" hidden={exportHidden('review')}>
        <div><span className="kicker">Review / handoff</span><h2>Built from what was visible.<br/>Honest about what was not.</h2></div>
        <div className="review-grid">
          <div><h3>Could not determine exactly</h3><ul><li>Proprietary font files and exact metrics</li><li>CSS dimensions behind raster captures</li><li>Alpha values and elevation compositing</li><li>Exact teal variants across map and UI</li><li>Original icon vector geometry</li></ul></div>
          <div><h3>Missing assets / placeholders</h3><ul><li>Official Ask Maps vector lockup</li><li>Light-background logo variant</li><li>Independent map tile artwork</li><li>Original place photography files</li><li>Promotional collage illustration</li></ul></div>
          <div><h3>Tokens included</h3><ul><li>14 colour roles</li><li>6 text styles + 2 font families</li><li>7 radius values</li><li>8 spacing values</li><li>Border, icon and focus treatments</li></ul></div>
          <div><h3>Checks</h3><ul className="checks"><li>All six reference sections present</li><li>Source assets only</li><li>No reference-brand carry-over</li><li>Responsive and print-ready</li><li>Export package verified</li></ul></div>
        </div>
        <div className="export-card"><div><AskMark/><span><b>Ask Maps design system</b><small>PNG · editable HTML · React/CSS · tokens · source screenshots · README</small></span></div><div><a href="/exports/ask-maps-design-system.png" download>PNG ↓</a><a className="download" href="/exports/ask-maps-design-system.zip" download>Download package ↓</a></div></div>
        <footer><span>Screenshot-derived design system · v1.0</span><span>Prepared for Figma Make handoff</span></footer>
      </section>
    </main>
  )
}

export default App
