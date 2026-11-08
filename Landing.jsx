import React from 'react';

const features = [
  ['01 / ROUTE', 'Send visitors to the right place.', 'Manage destinations and order redirect or 404 rules. Match by continent, country, IP range, browser language, or a UTC schedule.'],
  ['02 / CONTROL', 'Set the boundaries.', 'Manage rate limits and IP access alongside your routes. Authorized developers can configure adaptive security checks and preview the visitor experience.'],
  ['03 / VERIFY', 'Know what actually applied.', 'Authorized administrators can review security application status, manage Cloudflare controls, and inspect server audit history without confusing a saved change with an applied one.'],
];

function ConsoleLink({ small = false }) {
  return <a className={`button${small ? ' small' : ''}`} href="/">Open console <span aria-hidden="true">↗</span></a>;
}

function RoutingExample() {
  const rules = [
    ['01', 'Country matches Germany', '→ EU destination'],
    ['02', 'Language matches English', '→ EN destination'],
    ['03', 'No matching rule', '→ Show 404'],
  ];
  return (
    <figure className="diagram" aria-label="Illustration of ordered traffic routing">
      <div className="diagram-top"><span>Request → decision → destination</span><span>Example flow</span></div>
      <div className="flow">
        <div className="node">Incoming visitor</div><div className="connector" aria-hidden="true" />
        <div className="node engine"><img src="/favicon.svg" alt="" width="34" height="34" /><div><strong>Andromeda</strong><small>Evaluate your routing rules</small></div></div>
        <div className="connector" aria-hidden="true" />
        <div className="rules">{rules.map(([number, match, destination]) => (
          <div className="rule" key={number}><b>{number}</b><span>{match}</span><span>{destination}</span></div>
        ))}</div>
      </div>
      <figcaption>Illustrative rules, not live traffic. The first enabled matching rule wins.</figcaption>
    </figure>
  );
}

export default function Landing() {
  return <>
    <a className="skip" href="#main">Skip to content</a>
    <div className="wrap">
      <header>
        <a className="brand" href="/landing%20page/" aria-label="Andromeda Security home"><img src="/favicon.svg" alt="" width="40" height="40" /><span>Andromeda<small>Security</small></span></a>
        <nav aria-label="Main navigation"><a href="#capabilities">What it does</a><ConsoleLink small /></nav>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div>
            <div className="eyebrow">Traffic control, on your terms</div>
            <h1 id="hero-title">Your traffic.<br /><span>Your rules.</span></h1>
            <p className="intro">Decide where visitors go and how they get there. Manage redirect destinations, build routing rules, and configure security controls in one focused console.</p>
            <div className="actions"><ConsoleLink /><a className="text-link" href="#capabilities">Explore the controls <span aria-hidden="true">↓</span></a></div>
            <p className="note">Sign in to manage your routes. Infrastructure controls require authorized access.</p>
          </div>
          <RoutingExample />
        </section>
        <section id="capabilities" aria-labelledby="capabilities-title">
          <div className="section-head"><h2 id="capabilities-title">A clear path from request to destination.</h2><p>Keep everyday routing simple, with deeper controls when you need them.</p></div>
          <div className="features">{features.map(([number, title, description]) => (
            <article className="feature" key={number}><span className="number">{number}</span><h3>{title}</h3><p>{description}</p></article>
          ))}</div>
        </section>
        <section className="closing" aria-labelledby="closing-title"><div><h2 id="closing-title">Put your next request on the right path.</h2><p>Your destinations, routing rules, and security settings are in the console.</p></div><ConsoleLink /></section>
      </main>
      <footer><span>Andromeda Security</span><span>Traffic routing &amp; security administration</span></footer>
    </div>
  </>;
}
