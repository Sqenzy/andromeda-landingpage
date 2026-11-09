import React, { useState } from 'react';

export const APP_URL = 'https://app.andromedasecurity.eu';

function Arrow({ down = false }) {
  return <svg className="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d={down ? 'M12 4v16m-6-6 6 6 6-6' : 'M5 12h14m-6-6 6 6-6 6'} /></svg>;
}

function GalaxyMark({ className = '' }) {
  return <svg className={`galaxy-mark ${className}`} viewBox="0 0 40 40" fill="none" aria-hidden="true"><ellipse cx="20" cy="20" rx="17" ry="7" transform="rotate(-35 20 20)" stroke="currentColor" strokeWidth="1.5" /><path d="m20 12 1.8 6.2L28 20l-6.2 1.8L20 28l-1.8-6.2L12 20l6.2-1.8Z" fill="currentColor" /><circle cx="32" cy="9" r="1.5" fill="currentColor" /></svg>;
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Andromeda Security home"><GalaxyMark /><span>Andromeda<span className="brand-security"> Security</span></span></a>;
}

const capabilities = [
  { id: 'routing', title: 'Routing', heading: 'Every request. A clear direction.', description: 'Manage destination URLs and redirect settings in one workspace. Decide where your traffic goes, then stay in control of what happens next.', source: 'Incoming traffic', destination: 'Your destination', detail: 'Destination URLs · Redirect settings', icon: '↗' },
  { id: 'security', title: 'Security', heading: 'Your boundaries, by design.', description: 'Configure security checks and IP access policies around the way your application works. Bring your traffic rules and protection into the same picture.', source: 'Incoming request', destination: 'Your application', detail: 'Security checks · IP access policies', icon: '◇' },
  { id: 'visibility', title: 'Visibility', heading: 'See beyond the next request.', description: 'Authorized developers can review infrastructure status and audit history. Keep the details within reach without losing sight of the bigger picture.', source: 'Infrastructure', destination: 'Your workspace', detail: 'Infrastructure status · Audit history', icon: '◎' },
];

function ParticleField() {
  return <div className="particle-field" aria-hidden="true">{Array.from({ length: 90 }, (_, index) => {
    const side = index % 2 === 0 ? -1 : 1;
    const progress = Math.floor(index / 2) / 44;
    const angle = progress * Math.PI * 1.15 - 0.5;
    const radius = 32 + (index % 5) * 2.3;
    return <i key={index} style={{ '--x': `${50 + side * (28 + Math.sin(angle) * radius * 0.55)}%`, '--y': `${8 + progress * 84}%`, '--delay': `${-(index % 13)}s`, '--color': ['#4285f4', '#8c6bdb', '#76a6db', '#d3a8d8'][index % 4], '--size': `${index % 4 === 0 ? 5 : 3}px` }} />;
  })}</div>;
}

export default function Landing() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const selected = capabilities[active];

  function handleTabKey(event) {
    let next;
    if (event.key === 'ArrowRight') next = (active + 1) % capabilities.length;
    if (event.key === 'ArrowLeft') next = (active + capabilities.length - 1) % capabilities.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = capabilities.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`tab-${capabilities[next].id}`)?.focus();
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header" id="top">
        <Brand />
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} id="main-navigation" aria-label="Main navigation" onKeyDown={event => { if (event.key === 'Escape') { setMenuOpen(false); document.querySelector('.menu-toggle')?.focus(); } }}>
          <a href="#platform" onClick={() => setMenuOpen(false)}>Platform <span aria-hidden="true">⌄</span></a>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
          <a href="#get-started" onClick={() => setMenuOpen(false)}>Get started</a>
        </nav>
        <a className="button header-cta" href={APP_URL}>Open app <Arrow /></a>
        <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(value => !value)}>{menuOpen ? '✕' : '☰'}</button>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <ParticleField />
          <div className="hero-content">
            <div className="hero-brand"><GalaxyMark /><span>Andromeda Security</span></div>
            <h1 id="hero-title">A little clarity.<br />A world of control.</h1>
            <p className="hero-description">Your traffic, security, and infrastructure.<br className="desktop-break" /> Finally in the same orbit.</p>
            <div className="hero-actions"><a className="button" href={APP_URL}>Enter Andromeda <Arrow /></a><a className="button button-secondary" href="#platform">Explore the platform</a></div>
          </div>
          <a className="scroll-cue" href="#platform" aria-label="Discover the platform"><Arrow down /></a>
        </section>

        <section className="platform section-shell" id="platform" aria-labelledby="platform-title">
          <div className="section-heading"><p className="eyebrow">A more connected workspace</p><h2 id="platform-title">From incoming traffic<br />to the bigger picture.</h2><p>Less jumping between settings.<br />More space to focus on what comes next.</p></div>
          <div className="platform-explorer">
            <div className="capability-tabs" role="tablist" aria-label="Explore platform capabilities" onKeyDown={handleTabKey}>{capabilities.map((capability, index) => <button key={capability.id} type="button" role="tab" id={`tab-${capability.id}`} aria-selected={index === active} aria-controls="capability-panel" tabIndex={index === active ? 0 : -1} onClick={() => setActive(index)}>{capability.title}</button>)}</div>
            <div className="capability-panel" id="capability-panel" role="tabpanel" aria-labelledby={`tab-${selected.id}`} tabIndex={0}>
              <div className={`flow-illustration flow-${selected.id}`} role="img" aria-label={`${selected.source} connects through Andromeda to ${selected.destination}. ${selected.detail}.`}>
                <div className="flow-grid" />
                <div className="flow-endpoint"><span className="endpoint-icon" aria-hidden="true">{active === 2 ? '▤' : '↗'}</span><span>{selected.source}</span></div>
                <div className="flow-connection"><span /></div>
                <div className="flow-core"><GalaxyMark /><span>Andromeda</span></div>
                <div className="flow-connection"><span /></div>
                <div className="flow-endpoint"><span className="endpoint-icon" aria-hidden="true">{selected.icon}</span><span>{selected.destination}</span></div>
                <div className="flow-caption">{selected.detail}</div>
                <span className="illustration-label">Platform overview</span>
              </div>
              <div className="panel-description"><h3>{selected.heading}</h3><p>{selected.description}</p></div>
            </div>
          </div>
        </section>

        <section className="capabilities section-shell" id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-heading"><p className="eyebrow">Room to see things differently</p><h2 id="capabilities-title">Built around your<br />next move.</h2></div>
          <div className="feature-grid">{capabilities.map((capability, index) => <article key={capability.id}><div className={`feature-art feature-art-${capability.id}`} aria-hidden="true">{index === 0 ? <><span className="route-dot" /><span className="route-path" /><span className="route-arrow">↗</span></> : index === 1 ? <><div className="security-ring ring-outer" /><div className="security-ring ring-inner" /><span className="security-star">✧</span></> : <><div className="visibility-orbit" /><div className="visibility-orbit second-orbit" /><GalaxyMark /></>}</div><p className="feature-label">0{index + 1} / {capability.title}</p><h3>{capability.heading}</h3><p>{capability.description}</p></article>)}</div>
        </section>

        <section className="closing section-shell" id="get-started" aria-labelledby="closing-title"><GalaxyMark /><h2 id="closing-title">Your next move.<br />All in one place.</h2><p>Bring your infrastructure into focus.</p><a className="button" href={APP_URL}>Open the app <Arrow /></a><div className="closing-glow" aria-hidden="true" /></section>
      </main>
      <footer className="footer section-shell"><div className="footer-top"><Brand /><a href="#top">Back to top <Arrow down /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Andromeda Security</span><span>Your traffic. Your rules.</span></div></footer>
    </>
  );
}
