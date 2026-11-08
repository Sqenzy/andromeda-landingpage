import React from 'react';

export const APP_URL = 'https://app.andromedasecurity.eu';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Andromeda Security home"><svg aria-hidden="true" viewBox="0 0 40 40"><ellipse cx="20" cy="20" rx="17" ry="7" transform="rotate(-35 20 20)" /><path d="m20 12 1.8 6.2L28 20l-6.2 1.8L20 28l-1.8-6.2L12 20l6.2-1.8Z" /><circle cx="32" cy="9" r="1.5" /></svg><span>andromeda<span className="brand-sub">SECURITY</span></span></a>;
}

export default function Landing() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header" id="top">
        <Brand />
        <nav aria-label="Main navigation"><a className="nav-detail" href="#platform">The platform</a><a className="nav-app" href={APP_URL}>Open app <Arrow /></a></nav>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span /> A CLEARER VIEW OF YOUR SECURITY</p>
            <h1 id="hero-title">Your traffic.<br />Your rules.<br /><span>Your orbit.</span></h1>
            <p className="hero-description">Bring your routes, security checks, and infrastructure controls into focus. One console to navigate it all.</p>
            <div className="hero-actions"><a className="button" href={APP_URL}>Enter Andromeda <Arrow /></a><a className="text-link" href="#platform">Explore the platform <span aria-hidden="true">↓</span></a></div>
            <p className="hero-note">Built for the people behind the infrastructure.</p>
          </div>
          <div className="orbital" role="img" aria-label="An orbital illustration with Andromeda at the center, connecting routing, security, and control">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" />
            <div className="orbital-line" /><div className="planet"><svg viewBox="0 0 100 100" aria-hidden="true"><path d="M23 73 50 22l27 51M34 56h32" /></svg></div>
            <span className="orbit-node node-one" /><span className="orbit-node node-two" /><span className="orbit-node node-three" />
            <div className="orbit-label label-one"><span>01</span> ROUTING</div><div className="orbit-label label-two"><span>02</span> SECURITY</div><div className="orbit-label label-three"><span>03</span> CONTROL</div>
            <span className="coordinates">ANDROMEDA / YOUR CONTROL CENTER</span>
          </div>
        </section>
        <section className="platform" id="platform" aria-labelledby="platform-title">
          <div className="section-intro"><p className="eyebrow">CONNECTED BY DESIGN</p><h2 id="platform-title">Less scattered.<br />More in control.</h2><p>Move from individual settings to a connected view of how your traffic is routed and protected.</p></div>
          <div className="features">
            <article><span className="feature-number">01 / ROUTING</span><h3>Give traffic a direction.</h3><p>Manage destination URLs and redirect settings from a single, focused workspace.</p><span className="feature-symbol" aria-hidden="true">↗</span></article>
            <article><span className="feature-number">02 / SECURITY</span><h3>Set your boundaries.</h3><p>Configure security checks and access policies to match the way your application works.</p><span className="feature-symbol" aria-hidden="true">⌘</span></article>
            <article><span className="feature-number">03 / VISIBILITY</span><h3>Keep the bigger picture.</h3><p>Authorized developers can review infrastructure status and audit history without losing sight of the details.</p><span className="feature-symbol" aria-hidden="true">◎</span></article>
          </div>
        </section>
        <section className="closing" aria-labelledby="closing-title"><div><p className="eyebrow">YOUR NEXT MOVE</p><h2 id="closing-title">Take control of your orbit.</h2></div><a className="button" href={APP_URL}>Open the app <Arrow /></a></section>
      </main>
      <footer><Brand /><p>Infrastructure in focus.</p><span>© {new Date().getFullYear()} Andromeda Security</span></footer>
    </>
  );
}
