import React, { useState } from "react";

export const APP_URL = "https://app.andromedasecurity.eu";

function Icon({ name = "arrow", size = 20, ...props }) {
  const paths = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    routing: (
      <>
        <path d="M6 5v11a3 3 0 0 0 3 3h9M6 9h9a3 3 0 0 0 3-3V4m-3 12 3 3-3 3" />
        <circle cx="6" cy="4" r="2" />
      </>
    ),
    target: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
      </>
    ),
    block: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="m7 17 10-10M8 8h.01M16 16h.01" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
    terminal: (
      <>
        <path d="m5 7 5 5-5 5m8 0h6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.arrow}
    </svg>
  );
}
function Mark() {
  return (
    <svg
      className="brand-mark"
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path d="m16 3 13 24H3L16 3Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="m16 12 8 15H8l8-15Z" fill="currentColor" />
      <path d="M2 18h28" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Andromeda Security home">
      <Mark />
      <span>
        andromeda<span className="brand-suffix"> / security</span>
      </span>
    </a>
  );
}
const features = [
  {
    id: "routing",
    name: "Routing",
    icon: "routing",
    title: "Every request. The right route.",
    description:
      "Define destination URLs and redirect settings in one place. Build a clear path from incoming traffic to your application.",
    code: "route.resolve(request)",
  },
  {
    id: "targets",
    name: "Targets",
    icon: "target",
    title: "Your destinations, connected.",
    description:
      "Keep destination URLs organized and see where each route leads. Your endpoints, without the guesswork.",
    code: "target.destination",
  },
  {
    id: "ip-blocks",
    name: "IP blocks",
    icon: "block",
    title: "Draw the line on access.",
    description:
      "Configure IP access policies around your application. Make it clear which addresses are allowed and which are blocked.",
    code: "ip.policy.evaluate()",
  },
  {
    id: "security",
    name: "Security checks",
    icon: "shield",
    title: "A checkpoint before the endpoint.",
    description:
      "Bring security checks into your traffic configuration. Keep protection and routing in the same workflow.",
    code: "security.check(request)",
  },
];
function RoutingDiagram({ compact = false }) {
  return (
    <div
      className={`routing-diagram ${compact ? "compact" : ""}`}
      role="img"
      aria-label="Incoming request passes through Andromeda routing and security checks to configured targets. Blocked IPs are denied."
    >
      <div className="diagram-grid" />
      <svg
        className="wires"
        viewBox="0 0 800 290"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={compact ? "wire-small" : "wire"}>
            <stop stopColor="#454545" />
            <stop offset=".5" stopColor="#78f0ad" />
            <stop offset="1" stopColor="#454545" />
          </linearGradient>
        </defs>
        <path
          d="M140 145H345M455 145H520Q545 145 545 120V68Q545 53 570 53H660M455 145H660M455 145H520Q545 145 545 170V222Q545 237 570 237H660"
          stroke={`url(#${compact ? "wire-small" : "wire"})`}
        />
        <path className="blocked-wire" d="M400 180v72" />
        <circle className="signal" r="3">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M140 145H345"
          />
        </circle>
        <circle className="signal" r="3">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M455 145H520Q545 145 545 120V68Q545 53 570 53H660"
          />
        </circle>
      </svg>
      <div className="diagram-source">
        <div className="node-icon">
          <Icon name="globe" size={24} />
        </div>
        <strong>Incoming traffic</strong>
        <span>HTTPS request</span>
      </div>
      <div className="diagram-core">
        <div className="core-logo">
          <Mark />
        </div>
        <strong>Andromeda</strong>
        <span>
          <i className="status-dot" /> checks passed
        </span>
      </div>
      <div className="diagram-target target-one">
        <Icon name="target" />
        <div>
          <strong>Production</strong>
          <span>app.example.com</span>
        </div>
        <i className="status-dot" />
      </div>
      <div className="diagram-target target-two">
        <Icon name="target" />
        <div>
          <strong>API endpoint</strong>
          <span>api.example.com</span>
        </div>
        <i className="status-dot" />
      </div>
      <div className="diagram-target target-three">
        <Icon name="target" />
        <div>
          <strong>Fallback</strong>
          <span>backup.example.com</span>
        </div>
        <i className="status-dot muted" />
      </div>
      <div className="diagram-reject">
        <span>×</span> Blocked IP
      </div>
      <span className="wire-label">ROUTE + VERIFY</span>
    </div>
  );
}
function MiniVisual({ type }) {
  if (type === "routing")
    return (
      <div className="mini-routing" aria-hidden="true">
        <div className="mini-box">
          <Icon name="globe" />
          request
        </div>
        <div className="mini-line" />
        <div className="mini-box green">
          <Icon name="routing" />
          302 redirect
        </div>
        <div className="mini-branch">
          <span>
            /app <b>↗</b>
          </span>
          <span>
            /api <b>↗</b>
          </span>
        </div>
      </div>
    );
  if (type === "targets")
    return (
      <div className="mini-targets" aria-hidden="true">
        {["production", "api-endpoint", "fallback"].map((name, i) => (
          <div key={name}>
            <span>
              <i className={`status-dot ${i === 2 ? "muted" : ""}`} />
              {name}
            </span>
            <span>
              {i === 2 ? "Standby" : "Configured"}{" "}
              <Icon name="arrow" size={13} />
            </span>
          </div>
        ))}
      </div>
    );
  if (type === "ip-blocks")
    return (
      <div className="mini-policies" aria-hidden="true">
        <div>
          <span>192.0.2.0/24</span>
          <b className="deny">× Block</b>
        </div>
        <div>
          <span>198.51.100.8</span>
          <b className="allow">✓ Allow</b>
        </div>
        <div>
          <span>203.0.113.0/24</span>
          <b className="deny">× Block</b>
        </div>
      </div>
    );
  return (
    <div className="mini-checks" aria-hidden="true">
      <div className="check-shield">
        <Icon name="shield" size={45} />
      </div>
      <div>
        <span>
          <Icon name="check" size={14} /> IP policy
        </span>
        <span>
          <Icon name="check" size={14} /> Security rules
        </span>
        <span>
          <Icon name="check" size={14} /> Destination resolved
        </span>
      </div>
    </div>
  );
}
function ExplorerVisual({ feature }) {
  if (feature.id === "routing") return <RoutingDiagram />;
  return (
    <div className="explorer-detail">
      <div className="explorer-detail-icon">
        <Icon name={feature.icon} size={34} />
      </div>
      <MiniVisual type={feature.id} />
      <div className="detail-caption">
        <Icon name="terminal" size={16} />
        <code>{feature.code}</code>
        <span>Illustrative configuration</span>
      </div>
    </div>
  );
}
export default function Landing() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const selected = features[active];
  function handleTabKey(event) {
    let next;
    if (event.key === "ArrowRight") next = (active + 1) % features.length;
    if (event.key === "ArrowLeft")
      next = (active + features.length - 1) % features.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = features.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setActive(next);
      document.getElementById(`tab-${features[next].id}`)?.focus();
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header" id="top">
        <div className="header-inner">
          <Brand />
          <nav
            id="main-navigation"
            className={`main-nav ${menuOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setMenuOpen(false);
                document.querySelector(".menu-toggle")?.focus();
              }
            }}
          >
            <a href="#platform" onClick={() => setMenuOpen(false)}>
              Platform
            </a>
            <a href="#capabilities" onClick={() => setMenuOpen(false)}>
              Capabilities
            </a>
            <a href="#visibility" onClick={() => setMenuOpen(false)}>
              Visibility
            </a>
          </nav>
          <a className="button button-small header-cta" href={APP_URL}>
            Open app <Icon name="arrow" size={15} />
          </a>
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content">
            <a className="release-badge" href="#platform">
              <span className="status-dot" /> One workspace. Full control.{" "}
              <span className="badge-arrow">↗</span>
            </a>
            <h1 id="hero-title">
              Your traffic.
              <br />
              Your rules.<span className="hero-muted"> One platform.</span>
            </h1>
            <p className="hero-description">
              Route with precision. Define your boundaries.
              <br />
              The control layer for your traffic, targets, and security.
            </p>
            <div className="hero-actions">
              <a className="button" href={APP_URL}>
                Enter Andromeda <Icon />
              </a>
              <a className="button button-secondary" href="#platform">
                <Icon name="terminal" size={17} /> Explore the platform
              </a>
            </div>
            <p className="hero-note">
              Built for the people behind the infrastructure.
            </p>
          </div>
          <div className="console-preview">
            <div className="console-toolbar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>
                <Icon name="routing" size={14} /> Traffic overview
              </span>
              <span className="console-environment">
                <i className="status-dot" /> Example configuration
              </span>
            </div>
            <div className="console-body">
              <div className="console-sidebar">
                <Mark />
                <span className="sidebar-item selected">
                  <Icon name="routing" size={18} />
                </span>
                <span className="sidebar-item">
                  <Icon name="target" size={18} />
                </span>
                <span className="sidebar-item">
                  <Icon name="block" size={18} />
                </span>
                <span className="sidebar-item">
                  <Icon name="shield" size={18} />
                </span>
              </div>
              <div className="console-main">
                <div className="console-heading">
                  <div>
                    <span className="mono micro">WORKSPACE / OVERVIEW</span>
                    <h2>A clear path for every request.</h2>
                  </div>
                  <span className="config-badge">● Configuration preview</span>
                </div>
                <RoutingDiagram compact />
                <div className="console-bottom">
                  <span>
                    <Icon name="routing" size={14} /> Route traffic
                  </span>
                  <span>
                    <Icon name="target" size={14} /> Define targets
                  </span>
                  <span>
                    <Icon name="shield" size={14} /> Check access
                  </span>
                  <span className="example-label">ILLUSTRATIVE DATA</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="principles section-shell">
          <span>
            Less infrastructure friction.
            <br />
            <strong>More control where it matters.</strong>
          </span>
          <div>
            <Icon name="routing" /> Intentional routing
          </div>
          <div>
            <Icon name="shield" /> Explicit access policies
          </div>
          <div>
            <Icon name="terminal" /> One focused workspace
          </div>
        </div>
        <section
          className="capabilities section-shell"
          id="capabilities"
          aria-labelledby="capabilities-title"
        >
          <div className="section-heading">
            <p className="eyebrow">
              <span /> THE CONTROL LAYER
            </p>
            <h2 id="capabilities-title">
              Small details.
              <br />
              <span>Complete control.</span>
            </h2>
            <p>
              Four building blocks. One connected workflow.
              <br />
              Everything between a request and its destination.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <article className="feature-card" key={feature.id}>
                <div className="feature-card-top">
                  <Icon name={feature.icon} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{feature.name}</h3>
                <p>{feature.description}</p>
                <MiniVisual type={feature.id} />
                <a href="#platform" onClick={() => setActive(index)}>
                  Explore {feature.name.toLowerCase()}{" "}
                  <Icon name="arrow" size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>
        <section
          className="platform section-shell"
          id="platform"
          aria-labelledby="platform-title"
        >
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">
                <span /> FROM REQUEST TO DESTINATION
              </p>
              <h2 id="platform-title">
                See how it
                <br />
                <span>all connects.</span>
              </h2>
            </div>
            <p>
              No disconnected settings. No missing context.
              <br />
              Explore the pieces of your traffic workflow.
            </p>
          </div>
          <div className="platform-explorer">
            <div
              className="capability-tabs"
              role="tablist"
              aria-label="Explore platform capabilities"
              onKeyDown={handleTabKey}
            >
              {features.map((feature, index) => (
                <button
                  key={feature.id}
                  type="button"
                  role="tab"
                  id={`tab-${feature.id}`}
                  aria-selected={index === active}
                  aria-controls="capability-panel"
                  tabIndex={index === active ? 0 : -1}
                  onClick={() => setActive(index)}
                >
                  <Icon name={feature.icon} size={17} />
                  {feature.name}
                </button>
              ))}
            </div>
            <div
              className="capability-panel"
              id="capability-panel"
              role="tabpanel"
              aria-labelledby={`tab-${selected.id}`}
              tabIndex={0}
            >
              <div className="explorer-visual">
                <div className="visual-label">
                  <span className="status-dot" />
                  {selected.name} / configuration flow<span>EXAMPLE</span>
                </div>
                <ExplorerVisual feature={selected} />
              </div>
              <div className="panel-description">
                <div>
                  <span className="mono micro">
                    0{active + 1} / {selected.name.toUpperCase()}
                  </span>
                  <h3>{selected.title}</h3>
                  <p>{selected.description}</p>
                </div>
                <code>
                  <span>›</span> {selected.code}
                </code>
              </div>
            </div>
          </div>
        </section>
        <section
          className="visibility section-shell"
          id="visibility"
          aria-labelledby="visibility-title"
        >
          <div className="visibility-copy">
            <p className="eyebrow">
              <span /> CONTEXT, NOT COMPLEXITY
            </p>
            <h2 id="visibility-title">
              Stay close to
              <br />
              <span>your infrastructure.</span>
            </h2>
            <p>
              Authorized developers can review infrastructure status and audit
              history. Keep the details within reach without losing sight of the
              bigger picture.
            </p>
            <div className="visibility-points">
              <span>
                <Icon name="check" size={16} /> Infrastructure status
              </span>
              <span>
                <Icon name="check" size={16} /> Audit history
              </span>
              <span>
                <Icon name="shield" size={16} /> Permission-restricted access
              </span>
            </div>
          </div>
          <div className="audit-preview">
            <div className="audit-heading">
              <Icon name="terminal" size={17} /> Workspace activity{" "}
              <span>EXAMPLE</span>
            </div>
            <div className="audit-row">
              <span className="audit-symbol">
                <Icon name="routing" size={16} />
              </span>
              <div>
                Route configuration updated
                <small>destination_url → app.example.com</small>
              </div>
              <time>12:04:32</time>
            </div>
            <div className="audit-row">
              <span className="audit-symbol">
                <Icon name="block" size={16} />
              </span>
              <div>
                IP policy configured<small>192.0.2.0/24 → block</small>
              </div>
              <time>12:02:18</time>
            </div>
            <div className="audit-row">
              <span className="audit-symbol">
                <Icon name="shield" size={16} />
              </span>
              <div>
                Security settings updated<small>workspace / security</small>
              </div>
              <time>11:58:06</time>
            </div>
            <div className="audit-footer">
              <span className="status-dot" /> Explanatory preview, not live
              activity
            </div>
          </div>
        </section>
        <section
          className="closing section-shell"
          id="get-started"
          aria-labelledby="closing-title"
        >
          <div className="closing-grid" aria-hidden="true" />
          <div className="closing-mark">
            <Mark />
          </div>
          <p className="eyebrow">YOUR TRAFFIC. YOUR RULES.</p>
          <h2 id="closing-title">Take the controls.</h2>
          <p>A clearer view of everything in between.</p>
          <a className="button" href={APP_URL}>
            Open the app <Icon />
          </a>
          <span className="closing-subtext">
            Routing. Targets. Security. Connected.
          </span>
        </section>
      </main>
      <footer className="footer section-shell">
        <div className="footer-top">
          <Brand />
          <div>
            <a href="#platform">Platform</a>
            <a href="#capabilities">Capabilities</a>
            <a href={APP_URL}>
              Go to console <Icon name="arrow" size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Andromeda Security</span>
          <span>
            <i className="status-dot" /> Built for control.
          </span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
