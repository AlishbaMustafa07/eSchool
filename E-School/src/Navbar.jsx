import { useState } from 'react'

export function Brand({ footer = false }) {
  return (
    <a className={`brand ${footer ? 'brand-footer' : ''}`} href="/" aria-label="NovuLabs EduCore home">
      <span className="brand-mark">E</span>
      <span>EduCore<span className="brand-dot">.</span></span>
    </a>
  )
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />
        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '×' : '☰'}
        </button>
        <nav className={menuOpen ? 'nav-open' : ''}>
          <div className="nav-dropdown">
            <a href="/products/basic">Portals <span className="chevron">⌄</span></a>
            <div className="nav-popover">
              <b>Dedicated Workspaces</b>
              <a href="/products/basic">Admin Portal <em>Campus HQ</em></a>
              <a href="/products/desktop">Teacher Portal <em>Cockpit</em></a>
              <a href="/products/lms">Student Hub <em>LMS & Skills</em></a>
              <a href="/products/mobile-apps">Parent Companion <em>Mobile & Web</em></a>
              <b>Intelligence & Modules</b>
              <a href="/products/pro">AI Exam Generator <em className="paid">Smart</em></a>
              <a href="/products/integrations">Face Attendance & QR <em className="paid">Hardware</em></a>
              <a href="/products/cloud-services">Cloud & SLA <em className="paid">99.95%</em></a>
            </div>
          </div>
          <div className="nav-dropdown">
            <a href="/features">Platform <span className="chevron">⌄</span></a>
            <div className="nav-popover nav-popover-small">
              <a href="/features">All 14+ Modules</a>
              <a href="/pricing">SaaS Plans</a>
              <a href="/about">About NovuLabs</a>
              <a href="/blog">Campus Insights</a>
            </div>
          </div>
          <a href="/features">Modules</a>
          <a href="/pricing">Pricing</a>
          <div className="nav-dropdown">
            <a href="/help">Support <span className="chevron">⌄</span></a>
            <div className="nav-popover nav-popover-small">
              <a href="/help">Knowledge Base</a>
              <a href="/tutorials">Video Walkthroughs</a>
              <a href="/contact">Schedule Campus Demo</a>
            </div>
          </div>
          <a className="login-link" href="/login">Portal Login</a>
          <a className="button button-nav" href="/signup">Book a Demo <span>→</span></a>
        </nav>
      </div>
    </header>
  )
}
